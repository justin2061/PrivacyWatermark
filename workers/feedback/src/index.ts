/**
 * imagemarker.app 回饋表單收件 Worker。
 *
 * 前端（client/src/lib/waitlist.ts）以 JSON POST 到這裡：
 *   { form: "waitlist", email?: string, feature_request: string, lang, source, "bot-field"?: string }
 *
 * 流程：驗證 → 寫入 D1（這一步成功才回 200）→ 背景寄通知信到站長信箱。
 * 通知信寄失敗不影響回應：資料已經在 D1，信只是方便看，不是唯一副本。
 *
 * 刻意不存 IP、User-Agent、國家：這是隱私工具的回饋表單。
 */
import { EmailMessage } from "cloudflare:email";

export interface Env {
  DB: D1Database;
  NOTIFY: SendEmail;
  /** 逗號分隔的允許來源。 */
  ALLOWED_ORIGINS: string;
  NOTIFY_FROM: string;
  /** secret：站長收件信箱（須為 Email Routing 已驗證的目的地址）。 */
  NOTIFY_TO?: string;
}

/** 目前只收功能許願。Pro 候補已於 2026-11 從頁面移除；新增表單時在這裡登記。 */
const FORMS = new Set(["waitlist"]);
const LANGS = new Set(["zh", "en", "ja"]);

const MAX_BODY_BYTES = 8 * 1024;
const MAX_REQUEST_CHARS = 2000;
const MAX_EMAIL_CHARS = 254;
const MAX_SOURCE_CHARS = 64;

interface Submission {
  form: string;
  email: string | null;
  featureRequest: string;
  lang: string;
  source: string;
}

type Parsed = { ok: true; value: Submission } | { ok: true; honeypot: true } | { ok: false; error: string };

function isAllowedOrigin(origin: string | null, env: Env): origin is string {
  if (!origin) return false;
  if (/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) return true;
  return env.ALLOWED_ORIGINS.split(",")
    .map((s) => s.trim())
    .includes(origin);
}

function corsHeaders(origin: string): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(status: number, body: unknown, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...headers },
  });
}

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function parse(raw: unknown): Parsed {
  if (!raw || typeof raw !== "object") return { ok: false, error: "invalid_body" };
  const data = raw as Record<string, unknown>;

  // 蜜罐：真人看不到這欄。機器人填了就假裝成功，不給它重試的線索。
  if (str(data["bot-field"])) return { ok: true, honeypot: true };

  const form = str(data.form);
  if (!FORMS.has(form)) return { ok: false, error: "unknown_form" };

  const featureRequest = str(data.feature_request);
  if (!featureRequest) return { ok: false, error: "feature_request_required" };
  if (featureRequest.length > MAX_REQUEST_CHARS) return { ok: false, error: "feature_request_too_long" };

  // Email 選填：空字串視為沒填；有填就要像個 Email。
  const emailRaw = str(data.email);
  if (emailRaw && (emailRaw.length > MAX_EMAIL_CHARS || !/^\S+@\S+\.\S+$/.test(emailRaw))) {
    return { ok: false, error: "invalid_email" };
  }

  const lang = str(data.lang);
  if (!LANGS.has(lang)) return { ok: false, error: "invalid_lang" };

  const source = str(data.source).slice(0, MAX_SOURCE_CHARS) || "unknown";

  return {
    ok: true,
    value: { form, email: emailRaw || null, featureRequest, lang, source },
  };
}

/* ---------------------------------------------------------------- 通知信 --- */

function utf8Base64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
}

/** 76 字元折行（RFC 2045）。 */
function wrap76(s: string): string {
  return s.replace(/.{1,76}/g, "$&\r\n").trimEnd();
}

function buildMime(env: Env, to: string, s: Submission, id: number): string {
  const subject = `[imagemarker] ${s.form} #${id} (${s.lang}/${s.source})`;
  const body = [
    `表單：${s.form}`,
    `語系：${s.lang}`,
    `來源：${s.source}`,
    `Email：${s.email ?? "（未填）"}`,
    "",
    s.featureRequest,
    "",
    `— D1 submissions.id = ${id}`,
  ].join("\n");

  const domain = env.NOTIFY_FROM.split("@")[1] ?? "imagemarker.app";
  const headers = [
    `From: ImageMarker Feedback <${env.NOTIFY_FROM}>`,
    `To: ${to}`,
    // 直接按回覆就能回給使用者（有留 Email 才加）。
    ...(s.email ? [`Reply-To: ${s.email}`] : []),
    `Subject: =?UTF-8?B?${utf8Base64(subject)}?=`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${crypto.randomUUID()}@${domain}>`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
  ];
  return `${headers.join("\r\n")}\r\n\r\n${wrap76(utf8Base64(body))}\r\n`;
}

async function notify(env: Env, s: Submission, id: number): Promise<void> {
  if (!env.NOTIFY_TO) {
    console.warn("NOTIFY_TO not set; skipping email for submission", id);
    return;
  }
  try {
    const msg = new EmailMessage(env.NOTIFY_FROM, env.NOTIFY_TO, buildMime(env, env.NOTIFY_TO, s, id));
    await env.NOTIFY.send(msg);
  } catch (err) {
    // 資料已在 D1，這裡只記錄，不讓使用者看到失敗。
    console.error("notify failed for submission", id, err);
  }
}

/* ------------------------------------------------------------------ 入口 --- */

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const origin = request.headers.get("Origin");
    const allowed = isAllowedOrigin(origin, env);

    if (request.method === "OPTIONS") {
      return allowed ? new Response(null, { status: 204, headers: corsHeaders(origin) }) : new Response(null, { status: 403 });
    }
    if (request.method !== "POST") return json(405, { ok: false, error: "method_not_allowed" });
    if (!allowed) return json(403, { ok: false, error: "origin_not_allowed" });

    const cors = corsHeaders(origin);

    if (!(request.headers.get("Content-Type") ?? "").includes("application/json")) {
      return json(415, { ok: false, error: "json_required" }, cors);
    }
    const text = await request.text();
    if (new TextEncoder().encode(text).length > MAX_BODY_BYTES) {
      return json(413, { ok: false, error: "too_large" }, cors);
    }

    let raw: unknown;
    try {
      raw = JSON.parse(text);
    } catch {
      return json(400, { ok: false, error: "invalid_json" }, cors);
    }

    const parsed = parse(raw);
    if (!parsed.ok) return json(400, { ok: false, error: parsed.error }, cors);
    if ("honeypot" in parsed) return json(200, { ok: true }, cors);

    const s = parsed.value;
    let id: number;
    try {
      const row = await env.DB.prepare(
        "INSERT INTO submissions (form, email, feature_request, lang, source) VALUES (?, ?, ?, ?, ?) RETURNING id",
      )
        .bind(s.form, s.email, s.featureRequest, s.lang, s.source)
        .first<{ id: number }>();
      if (!row) throw new Error("insert returned no row");
      id = row.id;
    } catch (err) {
      console.error("D1 insert failed", err);
      return json(500, { ok: false, error: "storage_failed" }, cors);
    }

    ctx.waitUntil(notify(env, s, id));
    return json(200, { ok: true }, cors);
  },
} satisfies ExportedHandler<Env>;
