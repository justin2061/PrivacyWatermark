import { useEffect } from "react";
import { Link } from "wouter";
import {
  setPageSeo,
  articleSchema,
  blogBreadcrumb,
  faqSchema,
} from "@/lib/seo";

const URL = "https://imagemarker.app/en/blog/renting-protect-id-documents";
const OG = "https://imagemarker.app/og/renting-protect-id-documents.png";

export default function RentingProtectIdDocumentsEn() {
  useEffect(() => {
    return setPageSeo({
      title:
        "Renting an Apartment? How to Protect Your ID Documents from Fraud | ImageMarker",
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
          image: OG,
        }),
        blogBreadcrumb(
          "Renting an Apartment? How to Protect Your ID Documents from Fraud",
          URL,
          "en"
        ),
        faqSchema([
          {
            q: "What documents do landlords usually ask for when renting?",
            a: "It varies by country, but the common set is a government photo ID (passport, national ID or driver's licence), proof of income such as recent payslips or an employment letter, a bank statement, and sometimes a reference or a previous landlord's contact. In the US you may also face a credit and background check; in much of Europe a Schufa-style credit report or a guarantor is common.",
          },
          {
            q: "Is it safe to send my ID to a landlord or letting agent?",
            a: "Only with precautions. Legitimate landlords do need to verify who you are, but you rarely need to send a pristine, unmarked copy. Watermark the copy with its purpose (\"For [address] rental application only\"), strip the EXIF metadata, and share it through an official portal rather than a public chat or email whenever possible.",
          },
          {
            q: "How do rental scammers misuse ID copies?",
            a: "A clean ID image contains your full name, date of birth, document number and often your address and photo — everything needed to open accounts, pass identity checks, or build a fuller profile when combined with leaked data. Fake listings frequently exist only to harvest these documents from hopeful applicants.",
          },
          {
            q: "Can I watermark my ID without uploading it anywhere?",
            a: "Yes. ImageMarker runs entirely in your browser, so your ID never leaves your device. You add the watermark, adjust opacity and placement, and download the protected copy locally — nothing is sent to a server.",
          },
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
              Published July 2026 &middot; 8 min read
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
              Watermark My Documents Free &rarr;
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
                  Read more →
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
                  Read more →
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
                  Read more →
                </span>
              </article>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-sm text-gray-500 text-center">
            © 2026 ImageMarker — Protect your privacy
          </p>
        </div>
      </footer>
    </div>
  );
}
