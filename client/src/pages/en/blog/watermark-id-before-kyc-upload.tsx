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

const SLUG = "watermark-id-before-kyc-upload";

const URL = "https://imagemarker.app/en/blog/watermark-id-before-kyc-upload";

const HEADLINE =
  "Watermark Your ID Before Uploading to Apps — What Actually Happens to the File After You Hit Submit";

const DESCRIPTION =
  "Crypto exchanges, neobanks, gig apps and dating platforms all ask you to upload a photo of your ID. What happens to that file after you submit it — which third-party KYC vendor sees it, how long it is kept, when a watermark helps, and when it will get you bounced back.";
const OG = "https://imagemarker.app/og/watermark-id-before-kyc-upload.png";

export default function WatermarkIdBeforeKycUploadEn() {
  useEffect(() => {
    return setPageSeo({
      title:
        "Watermark ID Before Uploading to Apps — Protect ID When Sharing Online",
      description: DESCRIPTION,
      canonical: URL,
      locale: "en_US",
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
          name: "How to watermark your ID before uploading it to an app",
          description:
            "Add a purpose-bound watermark to a photo of your passport or driver's license entirely in your browser, before you upload it to a crypto exchange, neobank, gig app or any other online service that runs a KYC check.",
          steps: [
            {
              name: "Check whether the app runs its own KYC or uses a vendor",
              text: "Look at the privacy policy for names like Sumsub, Onfido, Persona, Jumio, IDnow, Veriff or iProov. If a vendor is named, your ID is going to at least two organisations: the app you signed up for and the KYC vendor.",
            },
            {
              name: "Open imagemarker.app/en/",
              text: "Open imagemarker.app/en/ on the device you will upload from. No install, no account. The image never leaves your device.",
            },
            {
              name: "Type the recipient, purpose and date",
              text: "For example: For [App name] KYC verification only — 6 Sep 2026. Bind the file to one platform and one purpose, so it is obviously out of place if it surfaces anywhere else.",
            },
            {
              name: "Tile lightly and check every field",
              text: "Turn on tiled or repeat mode, set opacity to about 30-45%. The watermark has to sit under an OCR that reads your name, document number and MRZ. Verify each field is still legible before you upload.",
            },
            {
              name: "Upload the watermarked file only",
              text: "Upload the marked version, then delete the clean original from your gallery and Files so it cannot be uploaded again by mistake to a different app later.",
            },
          ],
        }),
        faqSchema([
          {
            q: "Is it safe to watermark an ID before uploading it to an app?",
            a: "For manual reviews and lightweight KYC flows, yes — a semi-transparent purpose note on a copy of your own document is a labelling step, not tampering, and the identifying details stay readable. For automated liveness or document-authenticity checks (crypto exchanges, some neobanks), a heavy watermark can get flagged. The practical order is: try with a light 30-45% opacity watermark first, and resubmit clean only if the automated check rejects it. Never do it the other way round — once a clean copy is on the vendor's servers, you cannot pull it back.",
          },
          {
            q: "Who actually sees my ID after I upload it to an app?",
            a: "Almost always more organisations than the app itself. A typical crypto exchange or neobank routes the file through a third-party KYC vendor — Sumsub, Onfido, Persona, Jumio, IDnow, Veriff or iProov are the ones you will see named in privacy policies. The vendor runs OCR, checks the document against reference databases, and hands a pass/fail decision back to the app. Your ID sits on the vendor's storage for as long as their contract with the app requires, often measured in years rather than months.",
          },
          {
            q: "Will a watermark get my KYC application rejected?",
            a: "It can, if it is too heavy. Automated document checks read the machine-readable zone, the number and the face crop. A dense tile at 60%+ opacity or dark colours over those regions will trigger a re-submission. Keep opacity 30-45%, use a light neutral colour, and zoom in to verify the MRZ, ID number and face crop are all cleanly readable before you upload. Manual reviews are much more forgiving; automated ones are the strict case.",
          },
          {
            q: "How do I protect my ID when sharing it online with people who are not KYC vendors?",
            a: "The same three-element watermark — recipient, purpose, date — plus channel-specific care. Do not send an ID as a WhatsApp attachment when a portal upload exists; do not email an unwatermarked scan to a support address; do not paste one into a shared Notion or Google Drive folder where the access list has grown over time. If the recipient is an individual (a landlord, a private employer, a coach), assume they will not delete it, and mark the copy accordingly.",
          },
          {
            q: "What about the selfie some apps ask for alongside the ID?",
            a: "Do not watermark that. The purpose of the selfie is to prove you are the person on the ID via liveness detection, which needs an unedited face image and often video frames. What you can do is check the privacy policy for how long the selfie is retained — biometric data is regulated separately in several states and countries, and a few vendors keep selfies for six years or more.",
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
              Published September 2026 &middot; 10 min read
            </time>
            <h1 className="text-3xl font-bold mt-2 leading-snug">
              {HEADLINE}
            </h1>
          </header>

          <div className="prose prose-neutral max-w-none">
            <p>
              The prompt is always the same. You are three screens into a
              signup flow — a crypto exchange, a neobank, a food-delivery
              rider app, a dating site that wants a verified badge, a gig
              platform that wants to pay you — and a modal appears:{" "}
              <em>&quot;To continue, upload a photo of your passport or
              driver&apos;s license.&quot;</em> You hold your document up,
              snap the photo, tap upload. Ten seconds, and you are back to
              whatever you were doing.
            </p>
            <p>
              That photo is now permanent. Not on the app&apos;s server —
              often on someone else&apos;s. It has been read by OCR you did
              not know about, compared against document databases in
              countries you have not been to, and filed under a retention
              policy nobody explained. It will still be there when you close
              the account. It will probably still be there when the company
              is acquired, or breached, or wound down.
            </p>
            <p>
              This guide is about the small step that fits into the ten
              seconds before you hit upload: how to protect your ID when
              sharing it online, what to write on the watermark, which apps
              accept a watermarked ID and which will bounce you, and which
              KYC vendors are actually seeing your file when you submit to
              the big consumer apps. If you want the general playbook, we
              cover it in{" "}
              <Link
                href="/en/blog/watermark-id-before-sending-kyc"
                className="text-primary hover:underline"
              >
                how to watermark your ID before sending
              </Link>
              . This article stays specifically inside the app-upload
              flow.
            </p>

            <h2>What actually happens after you tap upload</h2>
            <p>
              Most people picture the file sitting on the app&apos;s own
              server. It usually is not — or not for long. Here is the
              actual path for a typical consumer app running a KYC check.
            </p>
            <ol>
              <li>
                <strong>Your browser or app uploads the file</strong> to the
                app&apos;s backend over TLS.
              </li>
              <li>
                <strong>The backend hands the file to a KYC vendor</strong>{" "}
                via an API. The vendor is a separate company you have no
                direct relationship with. Read the privacy policy for names
                like <em>Sumsub</em>, <em>Onfido</em>, <em>Persona</em>,{" "}
                <em>Jumio</em>, <em>IDnow</em>, <em>Veriff</em> or{" "}
                <em>iProov</em>.
              </li>
              <li>
                <strong>The vendor runs OCR</strong> to extract the
                document number, name, date of birth, expiry, and the
                machine-readable zone on a passport.
              </li>
              <li>
                <strong>The vendor runs authenticity checks</strong> against
                reference specimens for that document type, plus tamper
                detection on the file itself.
              </li>
              <li>
                <strong>The vendor runs a database lookup</strong> against
                sanctions lists (OFAC, EU, UK), politically-exposed-person
                lists, and often against fraud shared-signal databases fed by
                other customers of the same vendor.
              </li>
              <li>
                <strong>The vendor returns a pass/fail decision</strong> to
                the app, plus extracted metadata.
              </li>
              <li>
                <strong>Both the app and the vendor store the file</strong>{" "}
                for a retention period — typically five to seven years for
                regulated financial services, driven by anti-money-laundering
                record-keeping rules, plus whatever the vendor&apos;s own
                contract says.
              </li>
            </ol>
            <p>
              The important line is item 2. The moment you upload to a
              regulated app, you are consenting — through the privacy
              policy — to the file being handed to a processor. That
              processor has its own security posture, its own breach
              history, and its own retention. A watermark travels with the
              file through that whole chain. It is on every copy at every
              hop.
            </p>

            <h2>The apps that ask, and what to know before you upload</h2>
            <p>
              Almost every app that asks for an ID has its own reason and
              its own tolerance for a watermarked file. It is worth
              knowing the categories, because the right amount of
              friction to accept varies.
            </p>

            <h3>Crypto exchanges</h3>
            <p>
              The strictest category. Binance, Coinbase, Kraken, Bitstamp,
              OKX, Bybit, Bitfinex — all run automated document checks with
              liveness detection, all keep records for years to satisfy
              travel-rule and AML obligations across the jurisdictions they
              operate in. Watermarks work here <em>if</em> they are light
              enough not to interfere with the MRZ and face crop; try
              opacity around 30% and neutral text colour first. Rejections
              usually come back within minutes, so the try-and-adjust loop
              is cheap. What is not cheap is uploading a clean scan to an
              exchange that then gets breached — the 2018{" "}
              <em>MyHeritage</em>-scale precedent for KYC vendors already
              exists in the crypto space.
            </p>

            <h3>Neobanks and fintech</h3>
            <p>
              Revolut, Wise, Chime, N26, Monzo, Starling, Cash App. These
              are regulated as either banks or e-money institutions in most
              markets, so record-keeping is legally required. Almost all
              route through a KYC vendor; the vendor&apos;s name is usually
              in the privacy policy under processors or sub-processors. A
              light watermark is generally accepted for account opening;
              upgrades to higher limits sometimes trigger a fresh clean
              copy request, which is a legitimate business need but also a
              moment to check the privacy policy again.
            </p>

            <h3>Gig platforms and delivery apps</h3>
            <p>
              Uber, Lyft, DoorDash, Deliveroo, Grab, Bolt. Driver
              verification is stricter than rider verification. Driver&apos;s
              license upload plus a selfie is standard, refreshed every few
              months. Watermark handling is inconsistent — Uber and
              DoorDash tolerate light watermarks in most markets; some
              regional apps do not. If your app is the platform&apos;s
              rejection is silent (verification simply doesn&apos;t
              complete), start with no watermark and add one only if the
              same clean copy is being asked for on repeat.
            </p>

            <h3>Dating and social verification</h3>
            <p>
              Tinder Verified, Bumble Photo Verification, Match&apos;s
              verified badge, Hinge&apos;s verification tick. The stated
              purpose is bot and impersonation reduction. These usually
              require a live selfie mirroring a pose the app selects; a
              document is asked for less often, and when it is, a
              purpose-bound watermark saying &quot;For [platform]
              verification only&quot; is entirely reasonable to send. Do
              not send an unwatermarked copy over in-app chat, ever — that
              is not the verification flow, it is a scam.
            </p>

            <h3>Gambling, betting and age-restricted platforms</h3>
            <p>
              Regulated in most markets and required to verify identity and
              age at signup and often before withdrawal. Same shape as a
              neobank in terms of KYC vendor routing. A watermark saying
              &quot;For [platform] age verification only — [date]&quot; is
              proportionate.
            </p>

            <h3>Marketplace, gig and freelance platforms</h3>
            <p>
              Upwork, Fiverr, Airbnb host verification, Etsy seller
              verification. Purpose is proving identity and tax residency.
              Airbnb in particular retains ID information for a long
              period; watermarking with the platform name and a specific
              date is the right shape.
            </p>

            <h3>Remittance and money transfer</h3>
            <p>
              Wise, Remitly, WorldRemit, Xoom. Regulated as money service
              businesses. Same routing pattern through a KYC vendor. A
              watermark on the passport used at signup is fine; a fresh
              clean copy is sometimes requested for a large one-off
              transfer, which is a compliance ask you can meet with a fresh
              watermarked file dated the day of the transfer.
            </p>

            <InlineCTA
              tool="watermark"
              position="mid_article"
              location={SLUG}
              lang="en"
            />

            <h2>What to write on the watermark</h2>
            <p>
              Three elements, every time: the <strong>recipient</strong>,
              the <strong>purpose</strong>, the <strong>date</strong>.
              Everything else is decoration.
            </p>
            <ul>
              <li>
                <strong>Weak:</strong> &quot;COPY&quot; or
                &quot;CONFIDENTIAL&quot;. True of almost every file
                circulating. Names nobody, limits nothing, never expires.
              </li>
              <li>
                <strong>Weak:</strong> &quot;For KYC only&quot;. Which KYC?
                A copy that says &quot;for KYC&quot; is a copy that fits
                the next KYC vendor too.
              </li>
              <li>
                <strong>Strong:</strong> &quot;For Coinbase account KYC only
                &mdash; 6 Sep 2026&quot;. One organisation, one process,
                one moment.
              </li>
            </ul>
            <p>
              Two extras worth using when the file is heading to a
              particularly sensitive destination — an emigration
              application, an overseas bank account, a crypto exchange
              with a shaky reputation:
            </p>
            <ul>
              <li>
                <strong>Add the vendor name.</strong> If the privacy policy
                names the KYC vendor, write it too: &quot;For [App] via
                [vendor] — [date]&quot;. It narrows the copy&apos;s useful
                life if it ever escapes into the shared-signal databases
                many KYC vendors run.
              </li>
              <li>
                <strong>Add an expiry hint.</strong> &quot;For [App] KYC —
                valid only for submission on 6 Sep 2026&quot; makes the
                copy visibly stale a month later, so a resubmission
                attempt with the same file to a different app looks
                obviously off.
              </li>
            </ul>

            <h2>The right way to upload: a checklist</h2>
            <p>
              This is what actually reduces risk in the moment before you
              tap the button.
            </p>
            <ol>
              <li>
                <strong>Take the photo in the app itself</strong> if the
                app supports it. That path usually keeps the file in
                memory rather than saving it to your camera roll. If it
                does not support it, take a fresh photo you will delete
                right after — do not reuse the one from three months ago
                that has been sitting in your gallery.
              </li>
              <li>
                <strong>Strip the EXIF metadata.</strong> A phone photo of
                your ID usually carries GPS coordinates. If the app upload
                path preserves them, the vendor now knows where you were
                standing when you took the photo. Remove them with the{" "}
                <Link
                  href="/en/exif-clean"
                  className="text-primary hover:underline"
                >
                  EXIF cleaner
                </Link>
                .
              </li>
              <li>
                <strong>Watermark it</strong> with the recipient, purpose
                and date. Opacity 30-45%, tiled coverage, neutral
                colour.
              </li>
              <li>
                <strong>Verify every field is still readable.</strong>{" "}
                Zoom to 200%. If the MRZ, ID number or face crop is not
                cleanly legible, dial the opacity down.
              </li>
              <li>
                <strong>Upload only over the app or a website you
                trust.</strong> Never as a WhatsApp forward, an email
                attachment, or a Telegram file to &quot;support&quot;. If
                the vendor asks for a re-upload &quot;because their system
                is down&quot;, that is not the vendor.
              </li>
              <li>
                <strong>Delete the clean and watermarked copies from
                your device</strong> once the upload is confirmed. Both.
                A watermarked copy in your gallery is also fair game for
                a phone that gets stolen or backed up to a compromised
                cloud account.
              </li>
              <li>
                <strong>Read the retention clause</strong> in the privacy
                policy before you close the tab. It usually appears under
                &quot;data retention&quot; or &quot;record-keeping&quot;.
                Multi-year retention is normal for regulated services and
                a good reason to be selective about which apps you sign
                up for.
              </li>
            </ol>

            <h2>The selfie is a separate problem</h2>
            <p>
              Many app upload flows ask for a live selfie alongside the
              ID, to prove you are the person on the document. You cannot
              watermark that in the same way — the vendor needs an
              unedited face image and often a short video, and altering
              either will fail the check.
            </p>
            <p>
              What you can do is treat the selfie as its own privacy
              question. Ask, before you record:
            </p>
            <ul>
              <li>
                Is the selfie kept as an image, a video, a
                biometric-template hash, or all three? Different retention
                and different regulatory exposure.
              </li>
              <li>
                Is the biometric template shared across the vendor&apos;s
                other customers to detect duplicate signups? This is
                common at Sumsub, Onfido, Persona and Jumio, and it means
                a signup at one crypto exchange is quietly cross-checked
                against every other exchange using the same vendor.
              </li>
              <li>
                Does your state or country regulate biometric data
                separately? Illinois BIPA, Texas CUBI, Washington HB 1493,
                the EU GDPR&apos;s Article 9 special-category rules, and
                the UK GDPR&apos;s equivalents all apply — and many
                vendors have paid material settlements under BIPA
                specifically.
              </li>
            </ul>
            <p>
              None of this is a reason not to complete a KYC. It is a
              reason to prefer apps that let you delete both ID and
              biometric data on account closure, and to check the
              deletion actually happens.
            </p>

            <InlineCTA
              tool="exif-clean"
              position="mid_article"
              location={SLUG}
              lang="en"
            />

            <h2>When to refuse, or defer</h2>
            <p>
              An upload request is not automatically legitimate. A few
              patterns worth pausing on:
            </p>
            <ul>
              <li>
                <strong>&quot;Upload your ID to verify your account&quot;
                on a legitimate app you already have an account with,</strong>{" "}
                sent by email or push. Log into the app directly and
                check for an in-app KYC prompt. If there is none, the
                email is the scam.
              </li>
              <li>
                <strong>Support asking for an ID copy on chat</strong>{" "}
                — Discord, Telegram, WhatsApp, SMS. Legitimate support
                does not collect KYC documents this way; there is a
                secure portal for that.
              </li>
              <li>
                <strong>A payout requires a second, higher-quality
                scan</strong> that you did not need at signup. Sometimes
                legitimate (regulatory tier upgrade), sometimes an account
                takeover step by whoever is inside your account already.
                Check the exact status of the payout through official
                channels before you supply a new file.
              </li>
              <li>
                <strong>A landlord, coach, tutor, private employer or
                individual counterparty asks for a &quot;copy for
                records&quot;.</strong> Individuals rarely have the
                controls a regulated business does. Send a heavily
                watermarked copy or offer to show the original in
                person.
              </li>
              <li>
                <strong>An app whose privacy policy will not name the
                KYC vendor.</strong> A processor that will not be named is
                worth thinking twice about, because you cannot check the
                vendor&apos;s own posture in advance.
              </li>
            </ul>

            <h2>Sharing ID online without a KYC vendor in the loop</h2>
            <p>
              A lot of &quot;protect ID when sharing online&quot; questions
              are not about apps at all. They are about landlords, private
              employers, tutors, adoption agencies, embassy paperwork,
              lawyers, freelance clients. Different shape of risk, same
              principles:
            </p>
            <ul>
              <li>
                <strong>Prefer a portal over a message.</strong> An SFTP
                or web portal has an audit log; a WhatsApp attachment does
                not.
              </li>
              <li>
                <strong>Send only what is asked for.</strong> A copy of
                the passport photo page, not the visa pages. The front of
                a driver&apos;s license, not the back.
              </li>
              <li>
                <strong>Watermark with the recipient&apos;s real name.</strong>{" "}
                Not &quot;landlord&quot; — the actual full name or
                registered agency. Not &quot;support&quot; — the actual
                team or ticket number.
              </li>
              <li>
                <strong>Set an expectation of deletion.</strong> One line
                in the message asking that the copy be deleted after the
                purpose is served. It is not a guarantee, but it puts the
                obligation in writing.
              </li>
              <li>
                <strong>Follow up.</strong> A month after the transaction
                completes, ask for confirmation of deletion. Most
                counterparties will delete when reminded; a few will
                admit they never deleted anything, which is information
                you can act on.
              </li>
            </ul>

            <h2>FAQ</h2>
            <p>
              <strong>
                Q: Is it safe to watermark an ID before uploading it to an
                app?
              </strong>
              <br />A: For manual reviews and lightweight KYC flows, yes.
              For automated liveness or document-authenticity checks
              (crypto exchanges, some neobanks), a heavy watermark can get
              flagged, so try with a light 30-45% opacity watermark first
              and only resubmit clean if the automated check rejects it.
              Never do it the other way round — once a clean copy is on
              the vendor&apos;s servers, you cannot pull it back.
            </p>
            <p>
              <strong>
                Q: Who actually sees my ID after I upload it to an app?
              </strong>
              <br />A: Almost always more organisations than the app
              itself. A typical crypto exchange or neobank routes the file
              through a third-party KYC vendor — Sumsub, Onfido, Persona,
              Jumio, IDnow, Veriff or iProov are the ones you will see
              named in privacy policies. The vendor stores the file for
              years under the app&apos;s retention contract.
            </p>
            <p>
              <strong>
                Q: Will a watermark get my KYC application rejected?
              </strong>
              <br />A: It can, if it is too heavy. Keep opacity 30-45%,
              use a light neutral colour, and zoom in to verify the MRZ,
              ID number and face crop are all cleanly readable before you
              upload. Manual reviews are much more forgiving; automated
              ones are the strict case.
            </p>
            <p>
              <strong>
                Q: How do I protect my ID when sharing it online with
                people who are not KYC vendors?
              </strong>
              <br />A: Same three-element watermark — recipient, purpose,
              date — plus channel-specific care. Do not send an ID as a
              WhatsApp attachment when a portal upload exists; do not
              email an unwatermarked scan to a support address; do not
              paste one into a shared drive folder.
            </p>
            <p>
              <strong>
                Q: What about the selfie some apps ask for alongside the
                ID?
              </strong>
              <br />A: Do not watermark that. The purpose of the selfie
              is to prove you are the person on the ID via liveness
              detection, which needs an unedited face image. What you can
              do is check the privacy policy for how long the selfie is
              retained, since biometric data is regulated separately in
              several places.
            </p>
            <p>
              <strong>Q: Does ImageMarker upload my ID to a server?</strong>
              <br />A: No. Everything runs inside your browser, so the
              image never leaves your device and there is nothing on our
              side to store, log, or leak. Switch on flight mode and the
              tool still works — the simplest way to prove it to yourself
              before you use it on an identity document.
            </p>

            <h2>Ten seconds, before you tap submit</h2>
            <p>
              The upload takes ten seconds. The consequences last as long
              as the vendor&apos;s retention policy, which is measured in
              years. What you can control in those ten seconds is what is
              written across the file. Bind it to one app, one purpose,
              one date. Strip the metadata. Delete the clean copy from
              your device. That is the difference between a file that
              works for exactly one thing and a file that works for
              whoever ends up with it.
            </p>
          </div>

          <div className="mt-10 p-6 bg-blue-50 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">
              Watermark your ID before you upload it to an app.
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
