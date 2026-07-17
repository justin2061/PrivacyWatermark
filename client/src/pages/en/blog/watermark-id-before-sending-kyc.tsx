import { useEffect } from "react";
import { Link } from "wouter";
import { ReadMoreArrow } from "@/components/read-more-arrow";
import { SiteFooter } from "@/components/SiteFooter";
import {
  setPageSeo,
  articleSchema,
  blogBreadcrumb,
  faqSchema,
} from "@/lib/seo";

const URL = "https://imagemarker.app/en/blog/watermark-id-before-sending-kyc";

const TITLE =
  "How to Watermark Your ID Before Sending — Free KYC Document Protection";

const DESCRIPTION =
  "Sending your ID for KYC verification? Learn how to watermark a passport or ID copy before you send it — what text to use, how to keep it accepted, and how to do it free in your browser with zero uploads.";

export default function WatermarkIdBeforeSendingKyc() {
  useEffect(() => {
    return setPageSeo({
      title: TITLE,
      description: DESCRIPTION,
      canonical: URL,
      locale: "en_US",
      jsonLd: [
        articleSchema({
          headline: TITLE,
          description: DESCRIPTION,
          url: URL,
          datePublished: "2026-07-15",
          dateModified: "2026-07-15",
        }),
        blogBreadcrumb(
          "How to Watermark Your ID Before Sending — Free KYC Document Protection",
          URL,
          "en"
        ),
        faqSchema([
          {
            q: "Will a watermark get my KYC application rejected?",
            a: "It can, if it is too heavy. Many KYC checks are automated and read your document with OCR, so a dense or dark watermark over the number, photo, or machine-readable zone may trigger a re-submission. Keep opacity around 40–60% and check every field is still readable before you send. Watermarking is safest for manual and email submissions, and for copies going to landlords, employers, agents, or support staff.",
          },
          {
            q: "What should the watermark on my ID actually say?",
            a: "Three things: the recipient, the purpose, and the date — for example \"For [Platform] KYC verification only — 2026-07-15\". A generic \"COPY\" says nothing about who may use the file or for how long, so it deters very little. Naming one recipient and one purpose is what makes the copy hard to reuse somewhere else.",
          },
          {
            q: "Is it legal to watermark my own passport copy?",
            a: "Adding a semi-transparent purpose note across a copy of your own document is a common and widely suggested privacy practice. You are labelling a copy, not altering the identifying details, and your original document is untouched. A watermark carries no legal force on its own — treat it as deterrence and reduced reuse value, not as a guarantee.",
          },
          {
            q: "Does ImageMarker upload my ID to a server?",
            a: "No. ImageMarker runs entirely in your browser — your passport or ID photo never leaves your device, and there is nothing on our side to store, log, or breach. That is the whole point of using a client-side tool for a document this sensitive.",
          },
          {
            q: "Can I watermark my ID on my phone?",
            a: "Yes. ImageMarker works in any modern mobile browser, so you can photograph your ID, watermark it, and download the marked copy on the same phone you will submit it from — without the original ever being uploaded.",
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
            <time dateTime="2026-07-15" className="text-sm text-muted-foreground">
              Published July 2026 &middot; 7 min read
            </time>
            <h1 className="text-3xl font-bold mt-2 leading-snug">
              How to Watermark Your ID Before Sending &mdash; Free KYC Document
              Protection
            </h1>
          </header>

          <div className="prose prose-neutral max-w-none">
            <p>
              The moment arrives quietly. You have signed up for a crypto
              exchange, a neobank, a trading app, a delivery platform, or a
              betting site, and before you can withdraw, trade, or get paid, a
              screen appears: <em>&quot;Verify your identity. Upload a photo of
              your passport or driver&apos;s license.&quot;</em> You hold your
              document up to the camera, tap submit, and you are through in ten
              seconds. It feels like nothing.
            </p>
            <p>
              But that image is now permanent. It exists on servers you will
              never see, held by companies you did not knowingly choose, for a
              period nobody told you about. This guide is about the small step
              that fits into those ten seconds: how to watermark your ID before
              sending it, what the text should say, and &mdash; honestly &mdash;
              when a watermark helps and when it will get you bounced back to the
              upload screen.
            </p>

            <h2>Why watermark your ID before sending it for KYC</h2>
            <p>
              A clean, unmarked scan of your passport is not a picture. It is a
              reusable credential. It carries your full legal name, date of
              birth, document number, nationality, and face &mdash; the exact
              bundle another platform will accept as proof that someone is you.
              Nothing on that image says who was allowed to hold it or why. A
              copy sitting in a support inbox looks identical to the copy you
              deliberately submitted, and it verifies just as well.
            </p>
            <p>
              A watermark changes the economics. Writing the recipient and the
              purpose across the document makes one copy good for exactly one
              thing. A file stamped{" "}
              <em>&quot;For [Exchange] KYC verification only&quot;</em> is
              conspicuously wrong if it later shows up at a lender, a gambling
              site, or a SIM registration desk. It does not make theft
              impossible &mdash; nothing does &mdash; but it strips most of the
              resale and reuse value out of a leaked copy, and that is precisely
              what opportunistic fraud runs on. You can add one for free at{" "}
              <Link href="/en/" className="text-primary hover:underline">
                ImageMarker
              </Link>{" "}
              without the file ever leaving your device.
            </p>

            <h2>Where your KYC documents actually end up</h2>
            <p>
              This is the part almost nobody thinks about at the upload screen,
              and it is the strongest argument for marking the copy. When you
              submit an ID for verification, you are not sending it to one place.
              You are sending it into a chain:
            </p>
            <ul>
              <li>
                <strong>The platform itself.</strong> The company whose logo is
                on the screen, and whose privacy policy you probably did not
                read.
              </li>
              <li>
                <strong>Its identity-verification vendor.</strong> This is the
                key one. Most platforms do not build KYC in-house &mdash; they
                buy it. The company that actually receives, reads, and scores
                your passport image is often a specialist third party you have
                never heard of and have no relationship with. Their name may
                appear nowhere in the flow.
              </li>
              <li>
                <strong>Cloud storage.</strong> The image, and any derived crops
                or extracted text, sits in object storage somewhere, usually with
                backups and replicas in more than one region.
              </li>
              <li>
                <strong>Human reviewers and support agents.</strong> Automated
                checks fail routinely. When they do, a person opens your document
                and looks at it &mdash; possibly at the vendor, possibly at an
                outsourced review team.
              </li>
              <li>
                <strong>Retention that outlives your account.</strong> Financial
                and gaming regulations often require verification records to be
                kept for years <em>after</em> a relationship ends. Closing your
                account and deleting the app does not pull your passport scan
                back out of that chain.
              </li>
            </ul>
            <p>
              None of this is necessarily improper &mdash; it is how the industry
              is built. But it means the single copy you sent is now several
              copies, in several systems, under several parties&apos; control,
              for a duration you do not set. You cannot shorten that chain. You{" "}
              <em>can</em> control what is written on the file before it enters
              it.
            </p>

            <h2>What to write on the watermark</h2>
            <p>
              A watermark only deters reuse if it says something a fraudster
              cannot shrug off. Three elements do the work: the{" "}
              <strong>recipient</strong>, the <strong>purpose</strong>, and the{" "}
              <strong>date</strong>.
            </p>
            <ul>
              <li>
                <strong>Weak:</strong> &quot;COPY&quot;. It is true of every
                copy ever made. It names no one, limits nothing, and expires
                never. A file marked &quot;COPY&quot; still verifies fine
                somewhere else.
              </li>
              <li>
                <strong>Weak:</strong> &quot;Confidential&quot; or &quot;Do not
                distribute&quot;. Better tone, same problem &mdash; no recipient,
                no purpose, no date.
              </li>
              <li>
                <strong>Strong:</strong> &quot;For [Platform] KYC verification
                only &mdash; 2026-07-15&quot;. Now the copy is bound to one
                company, one process, and one moment in time.
              </li>
            </ul>
            <p>
              Each element earns its place. The <strong>recipient</strong> means
              the copy is visibly out of context anywhere else, and it tells you
              which submission leaked if it ever resurfaces. The{" "}
              <strong>purpose</strong> narrows it from &quot;proof of
              identity&quot; to one specific check &mdash; useful, because a
              generic ID copy is the flexible thing a fraudster wants. The{" "}
              <strong>date</strong> ages the file: a two-year-old verification
              stamp invites questions that a clean scan never would.
            </p>
            <p>
              Use the platform&apos;s real name, not an abbreviation. Write the
              date in an unambiguous format. And write it as one line you would
              be comfortable having a support agent read, because one will.
            </p>

            <h2>How to watermark your ID before sending &mdash; step by step</h2>
            <p>
              The safe way to protect a passport copy online is to never let it
              go online in the first place.{" "}
              <Link href="/en/" className="text-primary hover:underline">
                ImageMarker
              </Link>{" "}
              is a free KYC document watermark tool that runs{" "}
              <strong>entirely in your browser</strong> &mdash; the image is
              processed on your own device and is never uploaded to any server.
              For a document this sensitive, that property matters more than any
              feature.
            </p>
            <ol>
              <li>
                <strong>
                  Open{" "}
                  <Link href="/en/" className="text-primary hover:underline">
                    imagemarker.app/en/
                  </Link>
                </strong>{" "}
                in any modern browser, on your phone or your computer.
              </li>
              <li>
                <strong>Add the photo of your ID.</strong> It stays on your
                device the whole time &mdash; nothing is transmitted.
              </li>
              <li>
                <strong>Type your purpose-bound text</strong>, for example
                &quot;For [Platform] KYC verification only &mdash;
                2026-07-15&quot;.
              </li>
              <li>
                <strong>Turn on tiled / repeat mode</strong> so the text covers
                the whole document. A single mark in one corner is a two-second
                crop away from being gone; tiled coverage cannot be removed
                without visibly wrecking the image.
              </li>
              <li>
                <strong>Set opacity to roughly 40&ndash;60%.</strong> Clearly
                legible, but light enough that the verifier &mdash; human or
                machine &mdash; can still read the fields underneath.
              </li>
              <li>
                <strong>Check the critical fields.</strong> Name, document
                number, face photo, and the machine-readable zone must all still
                be readable. Zoom in before you accept it.
              </li>
              <li>
                <strong>Download and send the watermarked copy only.</strong>{" "}
                Then delete the unmarked original from your camera roll and your
                downloads folder, so there is no clean version to send by
                accident later.
              </li>
            </ol>

            <h2>Will KYC actually accept a watermarked ID?</h2>
            <p>
              Here is the honest answer, because you deserve one before you spend
              a minute on this: <strong>sometimes it will not</strong>, and you
              should know that going in.
            </p>
            <p>
              Modern KYC is increasingly automated. Your upload is typically read
              by OCR, cross-checked against the machine-readable zone, examined
              for signs of tampering, and often paired with a liveness selfie
              check. Two things follow. First, a heavy watermark can genuinely
              break the read &mdash; if text sits across the document number or
              the MRZ, the check may fail and you will be asked to re-submit.
              Second, tamper-detection systems are built to notice edits to the
              image, and a watermark is an edit. That does not mean you are
              suspected of forgery, but it does mean an automated flow may simply
              refuse the file.
            </p>
            <p>
              So be practical about it:
            </p>
            <ul>
              <li>
                <strong>Keep it moderate.</strong> 40&ndash;60% opacity, thin
                text, nothing dark or dense sitting over the photo, the number,
                or the MRZ. Legibility is the constraint, not a preference.
              </li>
              <li>
                <strong>Watermarking pays off most for manual submissions.</strong>{" "}
                Copies sent by email, or handed to landlords, employers,
                recruitment agents, accountants, or support staff, are the ones
                that sit in inboxes for years. That is exactly where a
                purpose-bound mark does its best work.
              </li>
              <li>
                <strong>Treat a rejection as a signal, not a defeat.</strong> If
                an official in-app uploader rejects your watermarked file, submit
                the clean copy{" "}
                <em>through that official flow</em> &mdash; do not go around it
                by emailing the document to someone instead. The in-app flow is
                the more controlled channel; email is the one that leaks.
              </li>
              <li>
                <strong>If a person objects, pay attention.</strong> An automated
                uploader rejecting a watermark is a technical fact. A
                &quot;support agent&quot; in a DM insisting you send an unmarked
                scan is something else entirely.
              </li>
            </ul>
            <p>
              A watermark is deterrence and reduced reuse value. It is not a
              legal shield, and it does not bind anyone. Judge it on that basis
              and it is clearly worth the minute it costs.
            </p>

            <h2>Extra protections beyond the watermark</h2>
            <ul>
              <li>
                <strong>Send only the page that was asked for.</strong> If the
                photo page is required, do not send the whole passport. Fewer
                fields in the chain, less to lose.
              </li>
              <li>
                <strong>Strip the EXIF metadata.</strong> A phone photo of your
                passport can carry GPS coordinates &mdash; usually your home
                &mdash; plus the device identity and timestamp. Remove it with
                the{" "}
                <Link
                  href="/en/exif-clean"
                  className="text-primary hover:underline"
                >
                  EXIF cleaner
                </Link>{" "}
                before you send.
              </li>
              <li>
                <strong>Avoid email and chat where you can.</strong> Those copies
                sit in two mailboxes indefinitely, get backed up, get forwarded,
                and get exposed by any breach of either account.
              </li>
              <li>
                <strong>Prefer the official in-app flow.</strong> A support agent
                asking for your ID by DM or reply is a classic phishing pattern
                &mdash; and even when the agent is genuine, that route puts your
                passport somewhere the verification pipeline was designed to keep
                it out of. If in doubt, close the message and start verification
                from inside the app.
              </li>
              <li>
                <strong>Ask about retention.</strong> &quot;How long do you keep
                the image, and who processes it?&quot; is a fair question. The
                answer, or the absence of one, tells you a lot.
              </li>
            </ul>
            <p>
              For the broader case for marking identity documents in general
              &mdash; not just at the KYC step &mdash; see{" "}
              <Link
                href="/en/blog/watermark-id-documents"
                className="text-primary hover:underline"
              >
                how to add a watermark to ID documents
              </Link>
              .
            </p>

            <h2>FAQ</h2>
            <p>
              <strong>Q: Will a watermark get my KYC application rejected?</strong>
              <br />A: It can, if it is too heavy. Many KYC checks are automated
              and read your document with OCR, so a dense or dark watermark over
              the number, photo, or machine-readable zone may trigger a
              re-submission. Keep opacity around 40&ndash;60% and confirm every
              field is still readable. Watermarking is safest for manual and email
              submissions, and for copies going to landlords, employers, agents,
              or support staff.
            </p>
            <p>
              <strong>Q: What should the watermark on my ID actually say?</strong>
              <br />A: Three things &mdash; the recipient, the purpose, and the
              date, e.g. &quot;For [Platform] KYC verification only &mdash;
              2026-07-15&quot;. A generic &quot;COPY&quot; says nothing about who
              may use the file or for how long, so it deters very little.
            </p>
            <p>
              <strong>Q: Is it legal to watermark my own passport copy?</strong>
              <br />A: Adding a semi-transparent purpose note across a copy of
              your own document is a common privacy practice. You are labelling a
              copy, not altering the identifying details, and your original stays
              untouched. A watermark carries no legal force on its own &mdash;
              treat it as deterrence and reduced reuse value.
            </p>
            <p>
              <strong>Q: Does ImageMarker upload my ID to a server?</strong>
              <br />A: No.{" "}
              <Link href="/en/" className="text-primary hover:underline">
                ImageMarker
              </Link>{" "}
              runs entirely in your browser &mdash; your passport or ID photo
              never leaves your device, and there is nothing on our side to
              store, log, or breach.
            </p>
            <p>
              <strong>Q: Can I watermark my ID on my phone?</strong>
              <br />A: Yes. It works in any modern mobile browser, so you can
              photograph your ID, watermark it, and download the marked copy on
              the same phone you will submit from.
            </p>
          </div>

          <div className="mt-10 p-6 bg-blue-50 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">
              Watermark your ID before you send it for KYC.
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Add a purpose-bound watermark for free, 100% in your browser.
              Nothing is uploaded.
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
