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

const SLUG = "watermark-uk-passport-copy";

const URL = "https://imagemarker.app/en/blog/watermark-uk-passport-copy";

const HEADLINE =
  "How to Watermark a UK Passport Copy Before Sending It";

const DESCRIPTION =
  "UK passport copies are asked for by letting agents, employers doing Right to Work checks, banks and crypto exchanges. What actually leaks from a UK passport scan, what UK GDPR gives you, and how to watermark the copy before you send it — free, in your browser.";
const OG = "https://imagemarker.app/og/watermark-uk-passport-copy.png";

export default function WatermarkUkPassportCopyEn() {
  useEffect(() => {
    return setPageSeo({
      title:
        "Watermark UK Passport Copy Before Sending — Free Local Tool | ImageMarker",
      description: DESCRIPTION,
      canonical: URL,
      locale: "en_GB",
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
          name: "How to watermark a UK passport copy before sending",
          description:
            "Add a purpose-bound watermark to a UK passport scan or photo entirely in your browser, before you send it to a letting agent, employer, bank or KYC vendor.",
          steps: [
            {
              name: "Open the tool",
              text: "Open imagemarker.app/en/ in any modern browser on your phone or laptop. No install, no account. The image never leaves your device.",
            },
            {
              name: "Add the biographical page",
              text: "Drop or select the photo or scan. Only the biographical (photo) page is usually needed — the visa and stamp pages are separate information you rarely need to send.",
            },
            {
              name: "Type recipient, purpose and date",
              text: "For example: For [letting agency name] Right to Rent check only — 6 Sep 2026. Bind the file to one recipient, one purpose and one date.",
            },
            {
              name: "Tile at 30-45% opacity",
              text: "Turn on tiled coverage and set opacity to 30-45% so the passport number, name, date of birth and MRZ underneath stay readable for the recipient.",
            },
            {
              name: "Send the watermarked copy only",
              text: "Send the marked version through the recipient's official channel, then delete the clean original from your device so it cannot be reused by mistake.",
            },
          ],
        }),
        faqSchema([
          {
            q: "What can someone do with a copy of my UK passport?",
            a: "The UK passport biographical page carries passport number, full name, nationality, date of birth, sex, place of birth, issue date, expiry, signature and photograph — plus the machine-readable zone (MRZ) at the bottom which encodes most of those fields in a fixed OCR-friendly format. That combination is enough to open online crypto exchanges and neobanks, apply for buy-now-pay-later credit, register for overseas services that accept a passport as sole ID, and impersonate you in KYC flows at services you have never used. The MRZ specifically means that masking the printed fields alone is not enough — a passport scan with a visible MRZ can be fully reconstructed even if the printed fields are covered.",
          },
          {
            q: "What does UK GDPR give me when I send a passport copy to a business?",
            a: "The UK GDPR and Data Protection Act 2018 apply to any business that processes your personal data as a controller — which includes a letting agent, employer, bank or KYC vendor holding your passport image. You have the right to be told the purpose of processing, the lawful basis (usually contract or legal obligation), the retention period, and the identity of any processors. You also have rights of access, rectification, erasure (with limits — legal obligation to retain can override erasure), restriction, portability, and objection. In practice, two questions do most of the work at a counter: 'what is the copy used for, and how long do you keep it?'",
          },
          {
            q: "Will a watermark get my Right to Work or Right to Rent check rejected?",
            a: "The Home Office guidance for both Right to Work and Right to Rent focuses on verifying the identity of the person against the document, not on receiving a clean unmodified image. As long as name, date of birth, photograph, expiry and MRZ are clearly legible, a light purpose-bound watermark is usually accepted. In practice, more employers and letting agents are moving to Identity Service Providers (IDSPs) that use certified digital identity checks — those flows sometimes ask for a live selfie and a clean scan and may reject a watermarked image at the automated step. The safe order is: try with a light watermark first; if the IDSP specifically rejects it, resubmit clean for that step only.",
          },
          {
            q: "Should I mask the MRZ (the two bottom lines) on my passport copy?",
            a: "If the recipient does not actually need to read it, yes — but with a proper mosaic or solid-color block, not a light blur. The MRZ is a fixed-format machine-readable payload; a light blur over it can be partially decoded by modern OCR, which effectively defeats masking. For Right to Work, Right to Rent and financial KYC, the recipient often does need the MRZ (it is how the automated document check verifies authenticity), so leave it visible under the watermark. For a hotel check-in, an insurance claim, or a general 'photo for our records', mask it — those recipients do not need it.",
          },
          {
            q: "What if a letting agent asks for a passport copy before a viewing?",
            a: "That is not required for Right to Rent, which only applies when a tenancy begins. Offer to bring your passport to the viewing for sighting, or send a heavily watermarked copy marked 'For [agency name] viewing appointment only — [date]' if the agent insists. An agent who refuses to show a property unless you send a full passport scan first is either lazy or running a scam listing; scraped rental listings on Gumtree and Facebook Marketplace, followed by a passport-and-deposit request over WhatsApp, are a common UK rental fraud pattern.",
          },
          {
            q: "Does ImageMarker upload my passport to a server?",
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
              Renting a flat in London or Manchester, opening a Monzo or
              Starling account, starting a new job that requires a Right to
              Work check, signing up for a crypto exchange, applying for a
              professional qualification — nearly every serious transaction
              in UK life ends with the same prompt: <em>&quot;Please send a
              photo of the biographical page of your passport.&quot;</em>{" "}
              You hold the passport up, take the photo, and hit send. Ten
              seconds, and the file is in someone else&apos;s system for
              years.
            </p>
            <p>
              This article is about what actually happens after those ten
              seconds. What a UK passport copy really gives away, what UK
              GDPR and the Data Protection Act 2018 give you, when a
              watermark helps and when it will get you bounced back at an
              Identity Service Provider check, and how to watermark the
              copy locally in your browser so a leaked file is bound to
              exactly one transaction. Everything the tool does runs on
              your own device.
            </p>

            <h2>What a UK passport copy actually contains</h2>
            <p>
              The UK biometric passport biographical page carries:
            </p>
            <ul>
              <li>
                <strong>Full name</strong> (surname and given names, in the
                printed and MRZ forms).
              </li>
              <li>
                <strong>Nationality</strong> (British Citizen, British
                Overseas Territories Citizen, etc.), <strong>place of
                birth</strong>, and <strong>date of birth</strong>.
              </li>
              <li>
                <strong>Passport number</strong> and{" "}
                <strong>personal number</strong>. The passport number is
                the one on every ticket, hotel booking and KYC form; the
                personal number is a separate lifetime identifier.
              </li>
              <li>
                <strong>Sex</strong>, <strong>issue date</strong>,{" "}
                <strong>expiry date</strong>, issuing authority.
              </li>
              <li>
                <strong>Photograph</strong> and <strong>signature</strong>,
                both at high enough resolution to be reused.
              </li>
              <li>
                <strong>MRZ (Machine Readable Zone)</strong>: two lines of
                fixed-format OCR-A text at the bottom of the page that
                encode passport number, nationality, date of birth, sex
                and expiry in a compact machine-readable form. This is the
                zone airport border readers scan.
              </li>
            </ul>
            <p>
              The MRZ is worth pausing on. It is the highest-density identity
              payload on the whole page. A cheap smartphone app can decode
              it in under a second and dump the full contents to text.
              Two consequences follow:
            </p>
            <ol>
              <li>
                Masking the printed fields but leaving the MRZ visible is
                effectively no masking at all — the MRZ contains the same
                information in machine form.
              </li>
              <li>
                Light blur over the MRZ can be partially decoded by
                modern OCR. If you need to hide the MRZ, use a proper
                mosaic or solid-color block, not a Gaussian blur.
              </li>
            </ol>
            <p>
              The rest of the page is what most people think of as the
              passport&apos;s data: enough to open online-only accounts,
              impersonate you in KYC flows, and produce convincing forged
              documents that pass automated checks. A clean high-resolution
              scan of both sides of a UK passport is the identity theft
              equivalent of handing over a starter kit.
            </p>

            <h2>Where UK GDPR fits</h2>
            <p>
              Almost every business handling your passport copy in the UK
              is a data controller under the <strong>UK GDPR</strong> and{" "}
              <strong>Data Protection Act 2018</strong>. That gives you a
              defined set of rights, and gives them a defined set of
              obligations.
            </p>
            <p>
              The rights that matter most in passport-copy contexts:
            </p>
            <ul>
              <li>
                <strong>Right to be informed</strong> — you should be told
                the purpose of processing, the lawful basis, the retention
                period, and any recipients (including processors). If a
                letting agent, employer or crypto exchange will not name
                its KYC processor, that itself is a signal.
              </li>
              <li>
                <strong>Right of access (SAR)</strong> — you can request a
                copy of your personal data held by a controller,
                including the passport image and any derived data.
                Controllers must respond within one month, extendable to
                three in complex cases, generally at no cost.
              </li>
              <li>
                <strong>Right to erasure</strong> — you can ask a
                controller to delete your passport image once the
                purpose is complete. This right has limits: where the
                controller has a legal obligation to retain (five years
                under Money Laundering Regulations 2017 for
                anti-money-laundering purposes, for example), erasure can
                be refused. But outside that limit, deletion should
                happen when the purpose ends.
              </li>
              <li>
                <strong>Right to rectification, restriction,
                portability</strong> and{" "}
                <strong>objection</strong> — used less often for passport
                copies specifically, but worth knowing.
              </li>
            </ul>
            <p>
              Two practical questions do most of the work at a counter:
              <em>&quot;What is the copy used for, and how long is it
              retained for?&quot;</em> A well-run business answers both
              easily. Hesitation is information.
            </p>

            <h2>What to write on the watermark</h2>
            <p>
              Three elements, every time: the <strong>recipient</strong>,
              the <strong>purpose</strong>, and the <strong>date</strong>.
              Write the recipient&apos;s registered legal name — the exact
              trading name that appears on Companies House if it is a UK
              limited company, not a nickname.
            </p>
            <ul>
              <li>
                <strong>Weak:</strong> &quot;COPY&quot; or
                &quot;CONFIDENTIAL&quot; — names nobody, limits nothing,
                never expires.
              </li>
              <li>
                <strong>Weak:</strong> &quot;For KYC only&quot; — which KYC?
                A passport copy marked &quot;for KYC only&quot; still fits
                the next KYC.
              </li>
              <li>
                <strong>Strong:</strong> &quot;For Monzo Bank Ltd account
                opening only — 6 Sep 2026&quot;. One controller, one
                process, one moment.
              </li>
              <li>
                <strong>Even stronger for regulated services:</strong> add
                the KYC vendor named in the privacy policy. &quot;For Monzo
                Bank Ltd (via Onfido) account opening — 6 Sep 2026&quot;.
              </li>
            </ul>

            <InlineCTA
              tool="watermark"
              position="mid_article"
              location={SLUG}
              lang="en"
            />

            <h2>Scenario by scenario</h2>

            <h3>Renting a flat (Right to Rent)</h3>
            <p>
              Right to Rent, introduced in 2016, requires landlords in
              England to check that adult occupants have the right to live
              in the UK. A passport is one of the acceptable documents.
              But the check is only triggered when a tenancy is being
              granted, not at the viewing stage. A letting agent who
              requires a passport scan just to book a viewing is asking
              for more than the law requires.
            </p>
            <p>
              At the <strong>viewing stage</strong>, offer to bring your
              passport for sighting, or send a heavily watermarked copy
              marked &quot;For [agent] viewing appointment only — [date]&quot;
              if remote. At the <strong>tenancy agreement stage</strong>,
              a copy is reasonable — watermark with the agency name plus
              the property address plus &quot;Right to Rent check
              only&quot;. Increasingly, letting agencies use certified
              Identity Service Providers (IDSPs) such as Onfido, Yoti,
              iProov and Persona for a digital Right to Rent check. Those
              flows include a live selfie and may require a clean scan at
              the automated step; a light watermark generally passes, but
              be ready to resubmit clean if the specific IDSP rejects it.
            </p>

            <h3>Right to Work checks for employment</h3>
            <p>
              Since April 2022, employers checking the Right to Work of
              British and Irish citizens can use certified Identity Document
              Validation Technology (IDVT) providers instead of doing a
              manual check. The IDVT step usually involves uploading a
              passport image plus a selfie to the IDSP&apos;s portal;
              images are then held for a defined retention period.
              Watermark with the employer name plus &quot;Right to Work
              check only&quot; plus the date. Do the IDVT step through
              the employer&apos;s official portal, not via email
              attachments to the hiring manager.
            </p>

            <h3>UK banks and neobanks (Monzo, Starling, Revolut, HSBC, Barclays)</h3>
            <p>
              Regulated under FCA rules and the Money Laundering
              Regulations 2017, which require identity verification and
              record-keeping for at least five years after the customer
              relationship ends. Almost all bank onboarding routes through
              a third-party KYC provider named in the privacy policy. A
              light watermark generally passes automated document checks;
              a fresh watermarked scan is expected for account tier
              upgrades (higher deposit limits, wealth products, business
              accounts).
            </p>

            <h3>Crypto exchanges regulated in the UK</h3>
            <p>
              Since the FCA&apos;s cryptoasset registration regime came
              into force, UK-facing crypto exchanges (or those serving UK
              customers under the overseas persons exemption) run
              full KYC. Coinbase, Kraken, Bitpanda and others use standard
              KYC vendors; the file is stored for compliance retention
              periods. Watermark the same way as a bank: exchange name,
              vendor name if named, date.
            </p>

            <h3>Hotels, car hire and travel agents</h3>
            <p>
              A hotel front desk asking to hold a copy for &quot;incidental
              purposes&quot;, a car hire counter asking for a scan against
              rental damage claims, a travel agent processing a package
              booking. These often store the image less carefully than a
              regulated financial service. Watermark on the spot from your
              phone browser: &quot;For [hotel] booking [reference] only —
              [date]&quot;. Mask the MRZ if they only need to see your
              face and name — the MRZ is not needed for a hotel check-in.
            </p>

            <h3>Solicitors, conveyancers and estate agents (property
              purchase)</h3>
            <p>
              Buying a property triggers anti-money-laundering identity
              verification by the solicitor, the mortgage lender and
              sometimes the estate agent. Each keeps a copy for at least
              five years after the transaction. Watermark each submission
              separately — one for the solicitor, one for the lender, one
              for the agent — with the recipient name and &quot;property
              [address] AML check only&quot; plus the date.
            </p>

            <h2>Beyond the watermark</h2>
            <ul>
              <li>
                <strong>Send only the biographical page</strong>, unless
                the specific process requires visa or stamp pages. Fewer
                pages in circulation, fewer fields to lose.
              </li>
              <li>
                <strong>Mask the MRZ</strong> when the recipient does not
                need to verify document authenticity themselves. Use a
                mosaic or solid color block, not a blur.
              </li>
              <li>
                <strong>Strip the EXIF metadata</strong> before you send.
                A phone photo of your passport typically carries GPS
                coordinates and a precise timestamp; your passport does
                not print your home address, but the GPS effectively adds
                one. Remove them with the{" "}
                <Link
                  href="/en/exif-clean"
                  className="text-primary hover:underline"
                >
                  EXIF cleaner
                </Link>
                .
              </li>
              <li>
                <strong>Prefer the recipient&apos;s portal to an email
                attachment.</strong> Portals have access logs; emails
                sit forever on multiple servers.
              </li>
              <li>
                <strong>Exercise your DSAR right periodically.</strong>{" "}
                Every year or so, ask one or two businesses holding your
                passport copy for a Subject Access Request. It tells you
                what they actually have and where.
              </li>
            </ul>

            <InlineCTA
              tool="exif-clean"
              position="mid_article"
              location={SLUG}
              lang="en"
            />

            <h2>If a passport copy has already leaked</h2>
            <ol>
              <li>
                <strong>Report to Action Fraud</strong> (0300 123 2040 or
                actionfraud.police.uk) if identity fraud is suspected. You
                get a Crime Reference Number needed for later steps.
              </li>
              <li>
                <strong>Register with CIFAS Protective Registration</strong>{" "}
                — a paid annual service that flags your details across
                CIFAS-member lenders, insurers and telcos, requiring
                extra checks when someone tries to open something in your
                name. Well worth the fee after a suspected passport leak.
              </li>
              <li>
                <strong>Contact the passport issuer (HMPO)</strong> if you
                believe your passport itself has been compromised — they
                can advise on cancellation and reissue, especially if the
                physical passport has also been lost.
              </li>
              <li>
                <strong>Send DSARs to any businesses you believe leaked
                the copy</strong>, then exercise the erasure right for
                any remaining copies not under a legal retention
                obligation.
              </li>
            </ol>
            <p>
              A watermarked copy is what makes step 4 possible. You can
              point to the specific submission that leaked, the
              controller involved, and the date — instead of trying to
              reconstruct after the fact.
            </p>

            <h2>FAQ</h2>
            <p>
              <strong>Q: What can someone do with a copy of my UK
              passport?</strong>
              <br />A: The biographical page carries passport number,
              full name, date of birth, MRZ and photograph — enough to
              open online crypto exchanges and neobanks, apply for BNPL
              credit, register for overseas services, and impersonate
              you in KYC flows. The MRZ specifically means masking the
              printed fields alone is not enough.
            </p>
            <p>
              <strong>Q: What does UK GDPR give me when I send a
              passport copy to a business?</strong>
              <br />A: UK GDPR and the Data Protection Act 2018 apply to
              any business processing your data. You have rights to be
              informed of purpose and retention, to access, to
              rectification, to erasure (with legal-obligation limits),
              and to object. Two questions do most of the work: what is
              the copy used for, and how long is it retained?
            </p>
            <p>
              <strong>Q: Will a watermark get my Right to Work or Right
              to Rent check rejected?</strong>
              <br />A: Home Office guidance focuses on identity
              verification, not clean unmodified images. A light
              purpose-bound watermark usually passes if name, DOB, photo,
              expiry and MRZ are clearly legible. Digital IDSP flows are
              stricter; try light watermark first, resubmit clean only if
              the automated check rejects it.
            </p>
            <p>
              <strong>Q: Should I mask the MRZ?</strong>
              <br />A: If the recipient does not need it, yes — with a
              proper mosaic or solid-color block, not a blur. For Right
              to Work, Right to Rent and financial KYC the recipient
              usually does need the MRZ. For a hotel or insurance claim,
              they don&apos;t.
            </p>
            <p>
              <strong>Q: What if a letting agent asks for a passport
              copy before a viewing?</strong>
              <br />A: That is not required for Right to Rent, which
              only applies when a tenancy begins. Offer to bring your
              passport for sighting, or send a heavily watermarked copy
              if remote. Scraped rental listings followed by a
              passport-and-deposit request over WhatsApp are a common UK
              rental fraud pattern.
            </p>
            <p>
              <strong>Q: Does ImageMarker upload my passport to a
              server?</strong>
              <br />A: No. Everything runs inside your browser, so the
              image never leaves your device. Switch on flight mode and
              the tool still works.
            </p>

            <h2>Before you hit send</h2>
            <p>
              You cannot avoid sending UK passport copies. What is written
              on those copies when they go is still up to you. Bind each
              copy to one controller, one purpose, one date. Send only
              the pages that are required. Mask the MRZ when the
              recipient does not need to verify authenticity themselves.
              Strip the metadata. Then send through the recipient&apos;s
              official portal, not to an email address someone gave you
              on WhatsApp. That is the difference between a copy that
              works for exactly the transaction it was made for and a
              copy that works for whoever ends up with it.
            </p>
          </div>

          <div className="mt-10 p-6 bg-blue-50 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">
              Watermark your UK passport copy before you send it.
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Free, no sign-up, 100% in your browser. Nothing is uploaded.
            </p>
            <Link
              href="/en/"
              className="inline-block px-5 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Watermark My Passport Free<ReadMoreArrow />
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
