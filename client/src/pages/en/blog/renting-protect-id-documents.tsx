import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Check, Copy } from "lucide-react";
import { ReadMoreArrow } from "@/components/read-more-arrow";
import { SiteFooter } from "@/components/SiteFooter";
import { trackToolEvent } from "@/lib/analytics";
import { copyText } from "@/lib/copyText";
import {
  setPageSeo,
  articleSchema,
  blogBreadcrumb,
  faqSchema,
  howToSchema,
} from "@/lib/seo";

const URL = "https://imagemarker.app/en/blog/renting-protect-id-documents";
const OG = "https://imagemarker.app/og/renting-protect-id-documents.png";

// 2026-10 補三塊：這頁九成曝光是 AI 引用（GSC 查詢表拆不出來），看得到的查詢
// 全是 AI 模式的追問——"show me an example of what that looks like"、
// "please draft that message"、"what if you don't want to"。
// 所以補的是 AI 回答裡給不了的東西：範例圖、可複製的訊息範本、替代做法。
const WATERMARK_TEXT = "For 12 Oak Street rental application only — 2026/07";

/** 假證件示意圖。全部用虛構資料＋SPECIMEN 字樣，不能看起來像真的證件。 */
function SpecimenIdCard({ watermarked }: { watermarked: boolean }) {
  return (
    <svg
      viewBox="0 0 428 270"
      role="img"
      aria-label={
        watermarked
          ? `Specimen ID card with a tiled watermark reading "${WATERMARK_TEXT}"`
          : "Specimen ID card with no watermark"
      }
      className="w-full h-auto rounded-xl border border-gray-200 shadow-sm"
    >
      {watermarked && (
        <defs>
          <pattern
            id="renting-wm-tile"
            width="300"
            height="44"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-24)"
          >
            <text
              x="0"
              y="26"
              fontSize="11.5"
              fontWeight="600"
              fontFamily="system-ui, sans-serif"
              fill="#1d4ed8"
              fillOpacity="0.42"
            >
              {WATERMARK_TEXT}
            </text>
          </pattern>
        </defs>
      )}
      <rect width="428" height="270" rx="16" fill="#eef2f7" />
      <rect width="428" height="44" rx="16" fill="#cbd5e1" />
      <rect y="28" width="428" height="16" fill="#cbd5e1" />
      <text x="20" y="28" fontSize="13" fontWeight="700" fill="#334155" fontFamily="system-ui, sans-serif">
        SPECIMEN · NATIONAL IDENTITY CARD
      </text>
      <rect x="20" y="62" width="104" height="132" rx="8" fill="#d1d9e4" />
      <circle cx="72" cy="112" r="24" fill="#aab6c6" />
      <path d="M36 190c4-30 20-44 36-44s32 14 36 44z" fill="#aab6c6" />
      {[
        ["SURNAME", "DOE", 74],
        ["GIVEN NAMES", "JANE", 110],
        ["DATE OF BIRTH", "01 JAN 1990", 146],
        ["DOCUMENT NO.", "X0000000", 182],
      ].map(([label, value, y]) => (
        <g key={label as string} fontFamily="system-ui, sans-serif">
          <text x="144" y={y as number} fontSize="9" fill="#64748b" letterSpacing="0.5">
            {label}
          </text>
          <text x="144" y={(y as number) + 17} fontSize="15" fontWeight="600" fill="#1e293b">
            {value}
          </text>
        </g>
      ))}
      <text x="20" y="236" fontSize="10" fill="#64748b" fontFamily="ui-monospace, monospace">
        IDXDOE&lt;&lt;JANE&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;X0000000&lt;&lt;&lt;&lt;&lt;&lt;
      </text>
      {watermarked && (
        <rect width="428" height="270" rx="16" fill="url(#renting-wm-tile)" />
      )}
    </svg>
  );
}

type LandlordMessage = { key: string; title: string; when: string; text: string };

const LANDLORD_MESSAGES: LandlordMessage[] = [
  {
    key: "send_watermarked",
    title: "Sending a watermarked copy",
    when: "You're happy to share ID and want the landlord to know why it's marked.",
    text: `Hi [Name],

Thanks for considering my application for [address]. Please find attached a copy of my ID for identity verification. For my own security, the copy is watermarked for this application only — all details remain fully readable.

Once the check is complete, could you let me know how long the copy will be kept, and delete it when it's no longer needed?

Best regards,
[Your name]`,
  },
  {
    key: "ask_before_sending",
    title: "Asking before you send anything",
    when: "You haven't seen the property yet, or you'd rather show the original.",
    text: `Hi [Name],

Happy to verify my identity for [address]. Before I send a copy of my ID, could you tell me what it will be used for, who will have access to it, and how long it will be stored?

If it's only needed to confirm who I am, I can show the original in person at the viewing, or on a short video call.

Best regards,
[Your name]`,
  },
];

function LandlordMessageCard({ item }: { item: LandlordMessage }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyText(item.text);
    setCopied(true);
    // GA4：沿用 tool_name 欄位放範本 key，用來看哪一則真的被複製
    trackToolEvent("landlord_message_copy", item.key);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="not-prose border border-gray-200 rounded-lg p-4 bg-white mb-4">
      <h3 className="text-base font-semibold text-gray-900 m-0">{item.title}</h3>
      <p className="text-sm text-gray-500 mt-1 mb-3">{item.when}</p>
      <pre className="bg-gray-50 border border-gray-200 rounded-md px-3 py-2.5 mb-3 text-[14px] leading-relaxed text-gray-900 whitespace-pre-wrap break-words font-sans">
        {item.text}
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copy the "${item.title}" message`}
        className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
          copied
            ? "bg-green-600 text-white"
            : "bg-primary text-white hover:bg-blue-700"
        }`}
      >
        {copied ? (
          <>
            <Check className="w-4 h-4" aria-hidden="true" />
            Copied
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" aria-hidden="true" />
            Copy message
          </>
        )}
      </button>
    </div>
  );
}

export default function RentingProtectIdDocumentsEn() {
  useEffect(() => {
    return setPageSeo({
      title:
        "Renting? Protect Your ID Documents from Fraud | ImageMarker",
      description:
        "Renting almost anywhere means handing over a copy of your ID, payslips and bank statements. Here's what landlords in different countries actually ask for — and how to share it without handing fraudsters a ready-made identity kit.",
      canonical: URL,
      locale: "en_US",
      ogImage: OG,
      jsonLd: [
        articleSchema({
          headline:
            "Renting an Apartment? How to Protect Your ID Documents from Fraud",
          description:
            "What documents landlords request when you rent, how those copies get abused, and a free in-browser way to watermark and strip metadata before you send them.",
          url: URL,
          datePublished: "2026-07-08",
          dateModified: "2026-10-01",
          image: OG,
        }),
        blogBreadcrumb(
          "Renting an Apartment? How to Protect Your ID Documents from Fraud",
          URL,
          "en"
        ),
        howToSchema({
          name: "How to share ID documents safely when renting",
          description: "Every step runs inside your browser — nothing is uploaded to a server. Add a watermark, remove EXIF, compress, resize or crop in about a minute.",
          steps: [
            { name: "Open the tool", text: "Open imagemarker.app/en/ in any modern browser on your phone or laptop. No install, no account — the tool loads directly." },
            { name: "Add your image", text: "Drop or select the image you want to process. Every step runs inside your browser, so the file never uploads and there is no server-side copy afterwards." },
            { name: "Adjust the settings", text: "Use the live preview to dial the tool-specific options — watermark text, opacity, quality slider, crop overlay, mosaic region — until the output matches what you need." },
            { name: "Download the result", text: "Save the processed image to your device. For anything sensitive, delete the clean original from your gallery once the marked or cleaned version has been sent." },
          ],
        }),
        faqSchema([
          { q: "What documents do landlords usually ask for when renting?", a: "Typically a government photo ID, proof of income such as payslips or an employment letter, a bank statement, and sometimes a reference or credit report. The US often adds a credit and background check; parts of Europe expect a Schufa report or guarantor." },
          { q: "Is it safe to send my ID to a landlord or letting agent?", a: "With precautions, yes. Watermark the copy with its purpose, strip the EXIF metadata, and use an official portal rather than a public chat where possible." },
          { q: "How do rental scammers misuse ID copies?", a: "A clean ID gives them your name, date of birth, document number and photo — enough to open accounts or pass identity checks. Fake listings often exist purely to harvest these files." },
          { q: "Can I watermark my ID without uploading it anywhere?", a: "Yes. ImageMarker processes everything in your browser, so your ID never leaves your device." },
          { q: "What if I don't want to send a copy of my ID to a landlord?", a: "Ask what it's for and how long it will be kept, then offer to show the original in person or on a video call, or to submit it through an official portal. Where an ID check is legally required, such as the UK's Right to Rent, you can't skip it — but you can still limit how the copy is shared." },
        ]),
      ],
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3 text-sm text-muted-foreground">
          <Link href="/en/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/en/blog"
            className="hover:text-foreground transition-colors"
          >
            Blog
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <header className="mb-8">
            <time dateTime="2026-07-08" className="text-sm text-muted-foreground">
              Published July 2026 &middot; Updated October 2026 &middot; 9 min read
            </time>
            <h1 className="text-3xl font-bold mt-2 leading-snug">
              Renting an Apartment? How to Protect Your ID Documents from Fraud
            </h1>
          </header>

          <img
            src={OG}
            alt="Protect your ID documents when renting an apartment"
            width={1200}
            height={630}
            className="w-full rounded-xl border mb-8"
          />

          <div className="prose prose-neutral max-w-none">
            <p>
              Finding a place to live is stressful enough without the quiet
              second job that comes with it: proving you are who you say you are.
              Almost everywhere in the world, securing a rental means handing a
              stranger a copy of your most sensitive documents &mdash; and doing
              it fast, before someone else takes the flat. That pressure is
              exactly what fraudsters count on. This guide walks through what
              landlords in different countries actually ask for, how those copies
              get abused, and how to share them without handing over a ready-made
              identity kit.
            </p>
            <p className="text-sm">
              <strong>Jump to:</strong>{" "}
              <a href="#watermark-example">what a watermarked ID looks like</a>{" "}
              &middot;{" "}
              <a href="#landlord-messages">copy-paste messages for your landlord</a>{" "}
              &middot;{" "}
              <a href="#dont-want-to-send">if you don&apos;t want to send a copy</a>
            </p>

            <h2>What Landlords Ask For Around the World</h2>
            <p>
              The specific paperwork changes with the market, but the shape of it
              is remarkably consistent. Nearly every application wants to confirm
              three things: who you are, that you can pay, and that you have a
              track record.
            </p>
            <ul>
              <li>
                <strong>United States:</strong> a photo ID, recent pay stubs or
                an offer letter, and consent to a credit and background check.
                Applications routinely ask for your Social Security number.
              </li>
              <li>
                <strong>United Kingdom:</strong> a passport or biometric residence
                permit for the legally required &quot;Right to Rent&quot; check,
                plus proof of income and often a previous-landlord reference.
              </li>
              <li>
                <strong>Germany and much of the EU:</strong> a national ID or
                passport, a Schufa-style credit report, recent payslips, and
                sometimes a guarantor.
              </li>
              <li>
                <strong>Asia-Pacific:</strong> commonly a national ID card or
                passport, proof of employment, and a bank statement, with a
                deposit paid up front.
              </li>
            </ul>
            <p>
              Notice the through-line: in every case you end up sending a
              high-resolution image of a government ID that lists your full legal
              name, date of birth, document number and often your address and
              face. That single file is the crown jewel.
            </p>

            <h2>Why an Unprotected Copy Is Dangerous</h2>
            <p>
              A photo of your ID is not really a picture &mdash; it is structured
              data. Once you send it, you lose all control over where it travels.
              It can be forwarded to a &quot;colleague,&quot; screenshotted,
              parked in a shared inbox for years, or swept up in a data breach
              long after you&apos;ve moved in. With a clean copy in hand, a
              fraudster can attempt to open bank accounts or loans in your name,
              clear identity checks on other platforms, or register services used
              for further scams.
            </p>
            <p>
              The rental world has a specific hazard on top of this: the{" "}
              <strong>fake listing</strong>. A surprising number of too-good
              listings exist for one reason only &mdash; to collect ID documents
              and deposits from hopeful applicants. You send your passport for a
              viewing that never happens, and the &quot;landlord&quot; vanishes
              with a perfect copy of your identity.
            </p>

            <h2>Protect the Copy Before You Send It</h2>
            <p>
              You usually can&apos;t refuse to provide ID &mdash; a legitimate
              landlord genuinely needs to verify you. What you <em>can</em> do is
              make each copy useful for one purpose and useless for anything else.
              Three quick steps do most of the work.
            </p>

            <h3>1. Watermark it with its purpose</h3>
            <p>
              Add a line of semi-transparent text across the document naming the
              specific reason and recipient, for example{" "}
              <em>&quot;For 12 Oak Street rental application only &mdash; 2026/07&quot;</em>.
              A copy stamped this way is obviously out of place if it later
              surfaces at a bank or another agency, and it signals to anyone
              handling it that you&apos;re paying attention. You can do this in
              under a minute with{" "}
              <Link href="/en/" className="text-primary hover:underline">
                ImageMarker
              </Link>
              , which runs <strong>entirely in your browser</strong> &mdash; your
              ID is never uploaded to a server, which is the whole point when the
              file itself is the thing you&apos;re protecting.
            </p>

            <figure id="watermark-example" className="not-prose my-8 scroll-mt-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <SpecimenIdCard watermarked={false} />
                  <p className="text-sm text-gray-600 mt-2 mb-0">
                    <strong>Before:</strong> a clean copy works for anyone,
                    anywhere.
                  </p>
                </div>
                <div>
                  <SpecimenIdCard watermarked />
                  <p className="text-sm text-gray-600 mt-2 mb-0">
                    <strong>After:</strong> every detail is still readable, but
                    the copy only makes sense for one application.
                  </p>
                </div>
              </div>
              <figcaption className="text-xs text-gray-500 mt-3">
                Specimen card with fictional details. Tile the text across the
                whole document, not in one corner, so it can&apos;t simply be
                cropped off.{" "}
                <Link href="/en/" className="text-primary hover:underline">
                  Make yours in your browser
                </Link>
                .
              </figcaption>
            </figure>

            <h3>2. Strip the hidden metadata</h3>
            <p>
              Photos taken on a phone can carry EXIF metadata, including the exact
              GPS coordinates where the picture was taken &mdash; often your home.
              Remove it with the{" "}
              <Link href="/en/exif-clean" className="text-primary hover:underline">
                EXIF cleaner
              </Link>{" "}
              before sending anything. It also runs locally.
            </p>

            <h3>3. Share what&apos;s required, through the right channel</h3>
            <p>
              Cover or crop fields the landlord doesn&apos;t actually need. Prefer
              an agency&apos;s official application portal over a public chat app
              or personal email, and be wary of anyone who demands documents{" "}
              <em>before</em> you&apos;ve seen the property or signed anything.
            </p>

            <h2 id="landlord-messages" className="scroll-mt-6">
              Copy-Paste Messages for Your Landlord
            </h2>
            <p>
              Most landlords accept a watermarked copy without a second thought,
              especially if you explain it up front. Swap in the bracketed parts
              and send.
            </p>
            {LANDLORD_MESSAGES.map((item) => (
              <LandlordMessageCard key={item.key} item={item} />
            ))}

            <h2 id="dont-want-to-send" className="scroll-mt-6">
              What If You Don&apos;t Want to Send a Copy?
            </h2>
            <p>
              Verifying who you are and keeping a copy of your ID are two
              different things. A landlord often needs the first; the second is
              usually a matter of habit. Some alternatives worth offering:
            </p>
            <ul>
              <li>
                <strong>Show the original in person</strong> at the viewing or
                the signing, and let them note the details they need.
              </li>
              <li>
                <strong>Offer a short video call</strong> to show your ID live if
                you can&apos;t meet.
              </li>
              <li>
                <strong>Send only what&apos;s required.</strong> Cover the
                document number or other fields they don&apos;t need with the{" "}
                <Link href="/en/mosaic" className="text-primary hover:underline">
                  mosaic tool
                </Link>
                , and ask before sending the back of a card.
              </li>
              <li>
                <strong>Use the official channel.</strong> An agency&apos;s
                application portal or ID-check service beats an email attachment
                that sits in an inbox for years.
              </li>
            </ul>
            <p>
              Where a landlord is legally required to check ID &mdash; the UK&apos;s
              Right to Rent is the clearest example &mdash; you can&apos;t skip the
              check, but you still get a say in how the copy is shared. And if
              someone refuses every alternative and insists on a clean,
              unmarked copy over chat before you&apos;ve even seen the flat, treat
              that as the warning sign it usually is.
            </p>

            <h2>Red Flags of a Rental Document Scam</h2>
            <ul>
              <li>
                A &quot;landlord&quot; who is conveniently abroad and can never
                meet or show the property in person.
              </li>
              <li>
                Pressure to send ID and a deposit immediately to &quot;hold&quot;
                a flat that&apos;s priced suspiciously low.
              </li>
              <li>
                Requests for documents over informal channels &mdash; WhatsApp,
                Telegram, a personal Gmail &mdash; with no company paper trail.
              </li>
              <li>
                Objections when you send a watermarked copy. A genuine landlord
                won&apos;t mind; a scammer wants the clean file.
              </li>
            </ul>

            <h2>A One-Minute Routine</h2>
            <p>
              Before every rental application, run the same short checklist: open{" "}
              <Link href="/en/" className="text-primary hover:underline">
                imagemarker.app/en
              </Link>
              , add your ID photo, stamp it with the address and purpose, adjust
              opacity so the details stay verifiable without being hidden, strip
              the EXIF data, and download the protected copy. Send <em>that</em>{" "}
              file &mdash; never the original. It takes about as long as writing
              the email you&apos;re attaching it to, and it turns your identity
              from an open document into one that only works for the flat you
              actually want.
            </p>

            <h2>FAQ</h2>
            <p>
              <strong>
                Q: What documents do landlords usually ask for when renting?
              </strong>
              <br />A: Typically a government photo ID, proof of income such as
              payslips or an employment letter, a bank statement, and sometimes a
              reference or credit report. The US often adds a credit and
              background check; parts of Europe expect a Schufa report or
              guarantor.
            </p>
            <p>
              <strong>
                Q: Is it safe to send my ID to a landlord or letting agent?
              </strong>
              <br />A: With precautions, yes. Watermark the copy with its
              purpose, strip the EXIF metadata, and use an official portal rather
              than a public chat where possible.
            </p>
            <p>
              <strong>Q: How do rental scammers misuse ID copies?</strong>
              <br />A: A clean ID gives them your name, date of birth, document
              number and photo &mdash; enough to open accounts or pass identity
              checks. Fake listings often exist purely to harvest these files.
            </p>
            <p>
              <strong>
                Q: Can I watermark my ID without uploading it anywhere?
              </strong>
              <br />A: Yes.{" "}
              <Link href="/en/" className="text-primary hover:underline">
                ImageMarker
              </Link>{" "}
              processes everything in your browser, so your ID never leaves your
              device.
            </p>
            <p>
              <strong>
                Q: What if I don&apos;t want to send a copy of my ID to a
                landlord?
              </strong>
              <br />A: Ask what it&apos;s for and how long it will be kept, then
              offer to show the original in person or on a video call, or to
              submit it through an official portal. Where an ID check is legally
              required, such as the UK&apos;s Right to Rent, you can&apos;t skip
              it &mdash; but you can still limit how the copy is shared.
            </p>
          </div>

          <div className="mt-10 p-6 bg-blue-50 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">
              Applying for a flat? Protect your ID first.
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Watermark your documents for free, 100% in your browser. Nothing is
              uploaded.
            </p>
            <Link
              href="/en/"
              className="inline-block px-5 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Watermark My Documents Free<ReadMoreArrow />
            </Link>
          </div>

          <p className="mt-8 text-center text-sm text-gray-400">
            <a
              href="https://ko-fi.com/justinlee2061"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              &#9749; If this article helped you, buy me a coffee
            </a>
          </p>
        </article>

        {/* Related articles */}
        <section className="mt-12 border-t pt-8">
          <h2 className="text-xl font-semibold mb-4">Related Articles</h2>
          <div className="space-y-4">
            <Link href="/en/blog/watermark-id-before-sharing">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  How to Watermark Your ID Before Sharing It Online
                </h3>
                <p className="text-sm text-muted-foreground">
                  Why to watermark your ID first, what it should say, and how to
                  do it free in your browser.
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  Read more<ReadMoreArrow />
                </span>
              </article>
            </Link>
            <Link href="/en/blog/rental-scam-prevention">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  Rental Application Safety: Watermark Documents Before Sharing
                </h3>
                <p className="text-sm text-muted-foreground">
                  How rental scammers exploit your documents and how watermarking
                  protects you.
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  Read more<ReadMoreArrow />
                </span>
              </article>
            </Link>
            <Link href="/en/blog/remove-exif-data-guide">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  Why You Should Remove EXIF Data Before Uploading Photos
                </h3>
                <p className="text-sm text-muted-foreground">
                  Strip hidden GPS and device metadata before you share any photo
                  or document.
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  Read more<ReadMoreArrow />
                </span>
              </article>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter lang="en" />
    </div>
  );
}
