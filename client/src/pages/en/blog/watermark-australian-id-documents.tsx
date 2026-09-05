import { useEffect } from "react";
import { Link } from "wouter";
import { ReadMoreArrow } from "@/components/read-more-arrow";
import { InlineCTA } from "@/components/InlineCTA";
import { SiteFooter } from "@/components/SiteFooter";
import {
  setPageSeo,
  articleSchema,
  blogBreadcrumb,
  faqSchema,
  howToSchema,
} from "@/lib/seo";

const SLUG = "watermark-australian-id-documents";

const URL =
  "https://imagemarker.app/en/blog/watermark-australian-id-documents";

const HEADLINE =
  "How to Watermark Australian ID Documents Before Sending Them";

const DESCRIPTION =
  "Real estate agents, employers, banks and crypto exchanges all ask for copies of your driver's licence, Medicare card or passport in Australia. What the 100-point check requires, what the Privacy Act 1988 (after the 2024 amendments) gives you, and how to watermark the file before sending — free, in your browser.";
const OG = "https://imagemarker.app/og/watermark-australian-id-documents.png";

export default function WatermarkAustralianIdDocumentsEn() {
  useEffect(() => {
    return setPageSeo({
      title:
        "Watermark Australian ID Documents Before Sending — Free Local Tool | ImageMarker",
      description: DESCRIPTION,
      canonical: URL,
      locale: "en_AU",
      ogImage: OG,
      jsonLd: [
        articleSchema({
          headline: HEADLINE,
          description: DESCRIPTION,
          url: URL,
          datePublished: "2026-09-06",
          dateModified: "2026-09-06",
          image: OG,
        }),
        blogBreadcrumb(HEADLINE, URL, "en"),
        howToSchema({
          name: "How to watermark an Australian ID document before sending",
          description:
            "Add a purpose-bound watermark to a photo of your Australian driver's licence, Medicare card or passport, entirely in your browser, before you send it to a real estate agent, employer, bank or KYC vendor.",
          steps: [
            {
              name: "Open the tool",
              text: "Open imagemarker.app/en/ in any modern browser on your phone or laptop. No install, no account. The image never leaves your device.",
            },
            {
              name: "Add the ID photo",
              text: "Drop or select the photo. Everything runs inside your browser using Canvas, so the file is never uploaded to a server.",
            },
            {
              name: "Type recipient, purpose and date",
              text: "For example: For [agency name] rental application only — 6 Sep 2026. Bind the file to one recipient, one purpose and one date.",
            },
            {
              name: "Tile at 30-45% opacity",
              text: "Turn on tiled coverage and set opacity to 30-45% so the licence number, name and photo underneath stay readable for the recipient's OCR.",
            },
            {
              name: "Send the watermarked copy only",
              text: "Send the marked version through the recipient's official channel, then delete the clean original from your device so it cannot be reused later.",
            },
          ],
        }),
        faqSchema([
          {
            q: "What is the 100-point identification check and does watermarking break it?",
            a: "The 100-point check comes from the Financial Transaction Reports Act 1988 and is used by banks, some financial services and government agencies to verify identity. Documents are assigned point values — a passport is 70 points, a driver's licence 40 points, a Medicare card 25 points, and so on — and you need 100 combined to open certain accounts. Watermarking with a semi-transparent purpose label does not change the document's point value, because the identifying details remain readable. What triggers rejection is a heavy watermark that covers name, number, photo or date of birth; keep opacity at 30-45% and check every field is legible before sending.",
          },
          {
            q: "What does the Privacy Act 1988 give me when a business holds my ID copy?",
            a: "The Privacy Act 1988 and its Australian Privacy Principles (APPs) apply to businesses turning over more than $3 million a year, and to all businesses regardless of size in specific sectors (health, credit reporting, tax file numbers, retention of personal data). The 2024 amendments (in force through 2025-2026) added a right to erasure, a statutory tort for serious invasions of privacy, tougher penalties for repeated breaches, and clearer notification obligations. In practice, you can request access to a copy of what a business holds about you (APP 12), correction (APP 13), and increasingly deletion when the retention purpose has ended. The Office of the Australian Information Commissioner (OAIC) handles complaints.",
          },
          {
            q: "Will a watermark get my crypto exchange or bank application rejected?",
            a: "Not if it stays light. Australian financial services under AUSTRAC's AML/CTF regime (which includes banks, remitters, digital currency exchange providers registered with AUSTRAC, and casinos) must verify customer identity, typically through third-party KYC vendors — Frankie Financial, GreenID, IDVerse, iSignthis, ThreatMetrix, Sumsub and Onfido are the ones most often named in Australian privacy policies. Opacity around 30-40% with tiled coverage and a light neutral color passes most automated checks. Watermark with the platform's registered ACN or ABN name plus the KYC vendor name if the privacy policy discloses it.",
          },
          {
            q: "Can a real estate agent legally demand my driver's licence copy at inspection?",
            a: "They can ask, but the request has to be justified for a specific purpose under the APPs. At the inspection stage, the agent is collecting details for a viewing register, which usually does not require a full licence scan — offering to show the licence for sighting is reasonable. At the rental application stage, a copy is a normal ask, but you are entitled to know why it is being collected, who else will see it (including the landlord and any tenant-check services), how long it is retained and how to request deletion. Recent OAIC enforcement action against real estate agencies for excessive tenant data collection is worth knowing about — the standard is 'reasonably necessary', not 'convenient'.",
          },
          {
            q: "Should I mask my Medicare card number?",
            a: "For most purposes outside Medicare and Medicare-linked services (private health insurance, prescription-only pharmacies, some hospitals), a Medicare card number is not needed. The number is a health identifier and should not be routinely provided as a proof of identity — despite being on the 100-point list. If a business asks for a full Medicare card scan for identity verification only, ask why, and consider masking the number itself with the mosaic tool while keeping the name visible for the sighting purpose.",
          },
          {
            q: "Does ImageMarker upload my ID to a server?",
            a: "No. Everything runs inside your browser, so the image never leaves your device and there is nothing on our side to store, log, or leak. Switch on flight mode and the tool still works — the simplest way to prove it to yourself before you use it on an identity document.",
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
            <time
              dateTime="2026-09-06"
              className="text-sm text-muted-foreground"
            >
              Published September 2026 &middot; 9 min read
            </time>
            <h1 className="text-3xl font-bold mt-2 leading-snug">{HEADLINE}</h1>
          </header>

          <div className="prose prose-neutral max-w-none">
            <p>
              The rental application asks for scans of your driver&apos;s
              licence, a Medicare card and a payslip. The crypto exchange
              asks for a licence and a passport for the 100-point check.
              The neobank asks for a licence upload plus a selfie. The
              new-employer onboarding portal wants a licence for TFN
              verification. Each request is normal on its own; each also
              creates a permanent file in someone else&apos;s system that
              you have no visibility into afterwards.
            </p>
            <p>
              The Optus data breach in 2022 and the Medibank breach the
              same year both dumped millions of Australian ID copies into
              the wider criminal ecosystem, and neither was a niche
              incident — they hit customers who had done nothing more
              risky than sign up for a service that later got breached.
              That is the context for this article. What Australian ID
              documents actually reveal, what the Privacy Act 1988 and
              its 2024 amendments give you, when a watermark helps and
              when the 100-point check accepts it, and how to watermark
              the file locally in your browser so a leaked copy is bound
              to exactly one transaction.
            </p>

            <h2>What Australian ID documents actually reveal</h2>
            <p>
              The three most-requested Australian ID documents are the
              state-issued driver&apos;s licence, the Medicare card and
              the Australian passport. Each carries a different mix of
              identifying data, and each has slightly different rules
              about what it is legitimately used for.
            </p>
            <p>
              A <strong>state driver&apos;s licence</strong> (NSW,
              Victorian, Queensland, WA, SA, Tasmanian, ACT or NT) prints
              your full name, address, date of birth, licence number,
              photograph, signature, and (on the newer digital licences)
              a barcode encoding the same fields. Address on the licence
              is significant — most other Australian IDs do not print
              your home address, but the licence does. That makes a
              licence copy the primary vector for identity fraud
              targeting Australian consumers: a fraudster with a clean
              licence scan can pass most automated checks that require
              proof of address.
            </p>
            <p>
              A <strong>Medicare card</strong> shows your name, Medicare
              number, an individual reference number (1-9) that identifies
              you within a household, and an expiry date. The number is
              a health identifier, not a general identity credential —
              but because it is on the 100-point list, businesses often
              ask for it anyway. Handing out your Medicare number
              routinely is a bad habit; it is one of the fields that
              tends to end up in fraud databases after breaches.
            </p>
            <p>
              An <strong>Australian passport</strong> biographical page
              carries the same shape of data as any modern e-passport —
              passport number, full name, nationality, date of birth,
              sex, place of birth, expiry, photograph, signature and MRZ.
              The MRZ (two lines of OCR-A text at the bottom) encodes
              most of the fields in machine-readable form; if you mask
              the printed fields but leave the MRZ visible, the copy is
              effectively unmasked.
            </p>
            <p>
              Combined — licence for address + passport for identity +
              Medicare card for the third document — one submission
              gives a fraudster the full 100-point kit. That is why
              rental applications and crypto exchanges are among the
              most-targeted collection points.
            </p>

            <h2>The 100-point check, briefly explained</h2>
            <p>
              The 100-point identity check comes from the Financial
              Transaction Reports Act 1988 and remains the standard shape
              of identity verification used by Australian banks, financial
              services and many government agencies. Documents are
              assigned point values:
            </p>
            <ul>
              <li>
                <strong>70 points</strong> — Australian or foreign
                passport, birth certificate, citizenship certificate.
              </li>
              <li>
                <strong>40 points</strong> — driver&apos;s licence,
                proof-of-age card, government-issued firearms licence.
              </li>
              <li>
                <strong>35 points</strong> — utility bill in your name at
                your current address (if not from a document already used).
              </li>
              <li>
                <strong>25 points</strong> — Medicare card, credit card
                statement, ATO notice of assessment.
              </li>
              <li>
                <strong>Other secondary documents</strong> at 25 or 40
                points, depending on the type.
              </li>
            </ul>
            <p>
              You need 100 points combined. The check does not depend on
              the file being unmarked — the recipient reads the identity
              fields off each document, and any watermark that leaves
              those fields legible is acceptable. What triggers rejection
              is a heavy watermark that covers name, number, photo or
              date of birth. The rule of thumb: opacity 30-45%, tiled
              coverage, light neutral color, and check every field is
              legible before you send.
            </p>

            <h2>Where the Privacy Act 1988 fits</h2>
            <p>
              The <strong>Privacy Act 1988</strong> and its Australian
              Privacy Principles (APPs) apply to businesses turning over
              more than $3 million per year, plus specific sectors
              regardless of size (health service providers, credit
              reporting bodies, businesses handling tax file numbers,
              some others). Most businesses asking for your ID copy are
              covered, though small landlords and small businesses under
              the threshold may not be — which cuts both ways.
            </p>
            <p>
              The 2024 amendments (Privacy and Other Legislation Amendment
              Act 2024, in force through 2025) added several things worth
              knowing:
            </p>
            <ul>
              <li>
                A statutory tort for serious invasions of privacy, giving
                individuals a right to sue for damages in specific
                circumstances.
              </li>
              <li>
                Explicit right to erasure and clearer rules on retention.
                Businesses should hold personal data only as long as
                needed for the disclosed purpose, and delete it when
                that purpose ends.
              </li>
              <li>
                Higher penalties for repeated privacy breaches, and
                broader powers for the Office of the Australian
                Information Commissioner (OAIC).
              </li>
              <li>
                Clearer breach-notification obligations, tightening the
                already-existing NDB scheme.
              </li>
            </ul>
            <p>
              Practically, the two questions to ask when a business
              collects an ID copy are: <em>&quot;What is it used for,
              and how long is it kept?&quot;</em> Under APP 5, you are
              entitled to be told both at collection. Under APP 12 and
              APP 13 you can request access and correction. And now,
              increasingly, you can request deletion at the end of the
              retention period.
            </p>

            <h2>What to write on the watermark</h2>
            <p>
              Three elements every time: the <strong>recipient</strong>,
              the <strong>purpose</strong>, the <strong>date</strong>.
              Write the recipient&apos;s registered name — the trading
              name on the ABR (Australian Business Register) if the
              recipient is a business.
            </p>
            <ul>
              <li>
                <strong>Weak:</strong> &quot;COPY&quot; or
                &quot;CONFIDENTIAL&quot;.
              </li>
              <li>
                <strong>Weak:</strong> &quot;For 100-point check
                only&quot; — which 100-point check?
              </li>
              <li>
                <strong>Strong:</strong> &quot;For CoinJar Australia Pty
                Ltd account opening only — 6 Sep 2026&quot;.
              </li>
              <li>
                <strong>Even stronger:</strong> &quot;For CoinJar (via
                GreenID) 100-point check — 6 Sep 2026&quot;. Naming the
                KYC provider makes the copy visibly out of place at any
                other provider.
              </li>
            </ul>

            <InlineCTA
              tool="watermark"
              position="mid_article"
              location={SLUG}
              lang="en"
            />

            <h2>Scenario by scenario</h2>

            <h3>Rental application</h3>
            <p>
              The Australian rental market is one of the most
              privacy-hostile settings in the country. Agencies routinely
              collect scans of driver&apos;s licence, Medicare card, bank
              statements, payslips, references — and share them with
              third-party tenant-check services (TICA, Equifax Tenancy
              Verification, National Tenancy Database) whose retention
              periods are long and whose accuracy has been questioned by
              consumer advocates. Recent OAIC enforcement against
              agencies for excessive collection is worth being aware of.
            </p>
            <p>
              At the <strong>inspection stage</strong>, offer to show the
              licence for sighting rather than sending a scan. At the{" "}
              <strong>application stage</strong>, a licence copy is
              expected but should be watermarked with the agency&apos;s
              trading name, the property address, and &quot;rental
              application only&quot; plus the date. The Medicare card is
              worth pushing back on — it is not necessary for a rental
              application; a passport, birth certificate, utility bill or
              bank statement can substitute at 100-point value if the
              agency insists on their own tally.
            </p>

            <h3>Banks and neobanks (CBA, ANZ, Westpac, NAB, Up, Judo,
              Volt)</h3>
            <p>
              Regulated under AUSTRAC&apos;s AML/CTF regime; identity
              verification and record-keeping for at least seven years are
              legally required. Bank onboarding routes through a
              third-party KYC provider named in the privacy policy —
              GreenID, Frankie Financial, Onfido and IDVerse are common
              in Australia. A light watermark passes automated checks; a
              fresh scan is expected for account tier upgrades.
            </p>

            <h3>AUSTRAC-registered digital currency exchanges</h3>
            <p>
              CoinJar, Independent Reserve, BTC Markets, Swyftx and
              others are registered with AUSTRAC as digital currency
              exchange providers and run full 100-point KYC. The file
              retention is measured in years. Watermark with the
              exchange&apos;s registered corporate name, the KYC vendor
              if named, and the date.
            </p>

            <h3>Employment onboarding (TFN, superannuation)</h3>
            <p>
              A new employer collecting your TFN, superannuation choice
              and identity documents is legitimately required to verify
              identity. The ATO&apos;s guidance says employers should
              handle TFN information under separate privacy provisions
              (TFN Rule 2015). Watermark the licence copy with the
              employer&apos;s legal name and &quot;employment onboarding
              only&quot; plus the date. Do the upload through the HR
              portal, not by email attachment to a hiring manager.
            </p>

            <h3>Motor vehicle sales, hire and insurance</h3>
            <p>
              Buying or selling a car, hiring one, changing insurance —
              all of these usually ask for a licence copy. Some of these
              are collected loosely (a small dealership on a phone
              camera); some are collected through professional systems
              (large insurers with proper document management).
              Watermark on the spot from your phone browser: &quot;For
              [business] [transaction] only — [date]&quot;.
            </p>

            <h3>Medicare-linked and health-service contexts</h3>
            <p>
              Genuinely need your Medicare number: bulk-billed GP
              appointments, PBS prescriptions, some hospital
              admissions. Do not need your Medicare number: rental
              applications, gym signups, mobile phone plans,
              age-verification signups. The card should not travel
              outside health contexts as a general 25-point ID document
              if you can avoid it.
            </p>

            <h2>Beyond the watermark</h2>
            <ul>
              <li>
                <strong>Strip EXIF metadata</strong> before you send. A
                phone photo of your licence typically carries GPS
                coordinates and a precise timestamp; your licence
                already prints your address, but the GPS adds where you
                actually were at the moment. Remove them with the{" "}
                <Link
                  href="/en/exif-clean"
                  className="text-primary hover:underline"
                >
                  EXIF cleaner
                </Link>
                .
              </li>
              <li>
                <strong>Mask MRZ on a passport copy</strong> when the
                recipient does not need to verify document authenticity.
                Use mosaic or solid color, not blur.
              </li>
              <li>
                <strong>Use the recipient&apos;s portal rather than
                email.</strong> Portals leave audit trails and control
                access; email attachments sit forever on multiple
                servers.
              </li>
              <li>
                <strong>Refuse to send Medicare cards to non-health
                contexts.</strong> The 25-point value is not worth the
                circulation risk of a health identifier.
              </li>
              <li>
                <strong>Request access annually.</strong> Ask one or two
                businesses holding your ID copy for a copy of what they
                hold, under APP 12. It tells you what they have.
              </li>
            </ul>

            <InlineCTA
              tool="exif-clean"
              position="mid_article"
              location={SLUG}
              lang="en"
            />

            <h2>If an ID copy has already leaked</h2>
            <ol>
              <li>
                <strong>Report to Scamwatch and ReportCyber</strong> — the
                first for scam and fraud reports at the ACCC, the second
                for cybercrime through the Australian Cyber Security
                Centre. Both produce reference numbers useful for later
                steps.
              </li>
              <li>
                <strong>Contact IDCARE</strong>{" "}
                — Australia&apos;s national identity and cyber support
                service, free for individuals, at idcare.org or
                1800 595 160. They walk you through recovery specific to
                Australian ID documents.
              </li>
              <li>
                <strong>Place a ban on your credit report</strong>{" "}
                at Equifax, Experian and illion. It stops new credit
                accounts opening in your name; free, online, effective
                for 21 days at a time and extendable.
              </li>
              <li>
                <strong>Apply for a new driver&apos;s licence
                number</strong> at your state licensing authority if the
                licence itself was in the leak. NSW, Vic and other
                states process these under fraud-flag procedures once
                you can point to a specific breach.
              </li>
              <li>
                <strong>If the passport was in the leak</strong>, contact
                the Australian Passport Office to discuss cancellation
                and reissue.
              </li>
            </ol>
            <p>
              A watermarked copy makes step 4 and 5 much cleaner. You
              can identify the specific submission that leaked, the
              agency involved and the date — instead of trying to
              reconstruct which of the many places you sent an ID copy
              to over the last five years was the source.
            </p>

            <h2>FAQ</h2>
            <p>
              <strong>Q: What is the 100-point identification check and
              does watermarking break it?</strong>
              <br />A: The 100-point check comes from the Financial
              Transaction Reports Act 1988. Documents are assigned point
              values — passport 70, licence 40, Medicare card 25 — and
              you need 100 combined. A semi-transparent watermark does
              not change the point value as long as identifying details
              remain legible. Keep opacity at 30-45% and verify every
              field is readable.
            </p>
            <p>
              <strong>Q: What does the Privacy Act 1988 give me when a
              business holds my ID copy?</strong>
              <br />A: Rights to be informed of purpose and retention
              (APP 5), access (APP 12), correction (APP 13), and
              increasingly deletion after the 2024 amendments. Businesses
              turning over more than $3 million are covered, plus
              specific sectors regardless of size. The OAIC handles
              complaints.
            </p>
            <p>
              <strong>Q: Will a watermark get my crypto exchange or bank
              application rejected?</strong>
              <br />A: Not if it stays light. AUSTRAC-registered
              financial services and DCE providers verify identity
              through KYC vendors like GreenID, Frankie Financial,
              IDVerse and Onfido. Opacity around 30-40% with tiled
              coverage passes most automated checks.
            </p>
            <p>
              <strong>Q: Can a real estate agent legally demand my
              licence copy at inspection?</strong>
              <br />A: They can ask, but the APPs limit collection to
              what is reasonably necessary. Offer to show the licence
              for sighting at inspection; a copy is expected at
              application stage. Recent OAIC enforcement targets agencies
              for excessive tenant data collection.
            </p>
            <p>
              <strong>Q: Should I mask my Medicare card number?</strong>
              <br />A: For most purposes outside health services, yes.
              The Medicare number is a health identifier, not a general
              identity credential. Ask why it is being collected, and
              consider masking the number itself with the mosaic tool
              while keeping the name visible.
            </p>
            <p>
              <strong>Q: Does ImageMarker upload my ID to a server?</strong>
              <br />A: No. Everything runs inside your browser, so the
              image never leaves your device. Switch on flight mode and
              the tool still works.
            </p>

            <h2>Before you hit send</h2>
            <p>
              Handing over ID copies in Australia is not something you
              can avoid. The Optus and Medibank breaches taught the whole
              country that a routine copy can outlive both the reason
              you sent it and the business you sent it to. What you can
              control in the ten seconds before send is what is written
              across the file. Bind each copy to one agency, one
              purpose, one date. Skip the Medicare card where it is not
              needed. Strip the metadata. Send through official portals.
              That is the difference between a copy that works for
              exactly the transaction it was made for and a copy that
              works for whoever ends up with it.
            </p>
          </div>

          <div className="mt-10 p-6 bg-blue-50 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">
              Watermark your Australian ID before you send it.
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Free, no sign-up, 100% in your browser. Nothing is uploaded.
            </p>
            <Link
              href="/en/"
              className="inline-block px-5 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Watermark My ID Free<ReadMoreArrow />
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
      </main>

      <SiteFooter lang="en" />
    </div>
  );
}
