-- 功能許願（以及未來其他表單）的收件匣。刻意不存 IP、User-Agent：
-- 這是隱私工具的回饋表單，只留回覆與排優先序需要的欄位。
CREATE TABLE IF NOT EXISTS submissions (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at      TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  form            TEXT    NOT NULL,
  email           TEXT,
  feature_request TEXT    NOT NULL,
  lang            TEXT    NOT NULL,
  source          TEXT    NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions (created_at);
