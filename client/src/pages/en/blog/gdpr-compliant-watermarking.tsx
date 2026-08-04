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

const URL = "https://imagemarker.app/en/blog/gdpr-compliant-watermarking";
const OG = "https://imagemarker.app/og/gdpr-compliant-watermarking.png";

const TITLE =
  "GDPR-Compliant Watermarking: Add Watermarks Without Uploading | ImageMarker";

const DESCRIPTION =
  "Most watermark tools upload your files to their servers — which turns a two-minute task into a processor agreement, a transfer assessment and a breach surface. Here's why browser-based watermarking removes the problem, and how to verify a tool really doesn't upload.";

export default function GdprCompliantWatermarkingEn() {
  useEffect(() => {
    return setPageSeo({
      title: TITLE,
      description: DESCRIPTION,
      canonical: URL,
      locale: "en_US",
      ogImage: OG,
      jsonLd: [
        articleSchema({
          headline:
            "Zero Data Transfer: Why Browser-Based Watermarking Is the Only Truly GDPR-Compliant Option",
          description:
            "What GDPR actually requires when you send a document to an online watermark tool, why client-side processing removes the processor relationship entirely, and how to verify that a tool does not upload your files.",
          url: URL,
          datePublished: "2026-08-04",
          dateModified: "2026-08-04",
          image: OG,
        }),
        blogBreadcrumb(
          "Zero Data Transfer: Why Browser-Based Watermarking Is the Only Truly GDPR-Compliant Option",
          URL,
          "en"
        ),
        faqSchema([
          {
            q: "Is uploading personal data to an online watermark tool a GDPR issue?",
            a: "It can be. If the file contains personal data and you send it to a third-party service that processes it on your behalf, that service is acting as a processor. GDPR Article 28 requires a written contract with defined terms before that happens, and you also need to account for security, international transfers and your record of processing activities. Most free online tools give you none of that.",
          },
          {
            q: "Does client-side processing make a tool GDPR compliant?",
            a: "It removes one specific and expensive problem: if the file never leaves your device, there is no disclosure to a third party, so no processor relationship, no Article 28 contract and no international transfer to assess. It does not make you compliant on its own — you are still the controller and still need a lawful basis, data minimisation, sensible retention and secure devices. It eliminates the vendor side of the risk, not your own obligations.",
          },
          {
            q: "How can I verify that a watermark tool doesn't upload my files?",
            a: "Open your browser's developer tools, switch to the Network tab, and process a file. If it is genuinely client-side you will see no outbound request carrying the image. A blunter test: load the page, disconnect from the internet, and try to watermark something. A client-side tool keeps working offline; an upload-based one fails immediately.",
          },
          {
            q: "Are ID documents special category data under GDPR?",
            a: "Not automatically. An identity document is personal data, and often includes data that becomes special category in context — a photo used for biometric identification, or details revealing health, ethnic origin or religious belief. Regulators consistently treat identity documents as high-risk regardless of category, because a leak enables identity fraud directly. Treat them as sensitive whether or not Article 9 applies.",
          },
          {
            q: "Does \"we delete your files after one hour\" solve the problem?",
            a: "No. Deletion is a retention control, not a lawfulness control. The processing already happened when the file reached their server, and every obligation attached to that processing — a processor contract, security measures, transfer safeguards, breach notification if it goes wrong — applied from the moment of upload. A short retention period is good practice, but it does not remove the transfer or the paperwork it triggers.",
          },
          {
            q: "Does ImageMarker send my documents anywhere?",
            a: "No. ImageMarker processes images entirely in your browser using the Canvas API. Nothing is uploaded, so there is no server-side copy to store, log, subpoena or breach — which is verifiable from your own Network tab in a few seconds.",
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
            <time dateTime="2026-08-04" className="text-sm text-muted-foreground">
              Published August 2026 &middot; 12 min read
            </time>
            <h1 className="text-3xl font-bold mt-2 leading-snug">
              Zero Data Transfer: Why Browser-Based Watermarking Is the Only
              Truly GDPR-Compliant Option
            </h1>
          </header>

          <img
            src={OG}
            alt="GDPR-compliant watermarking with no file upload"
            width={1200}
            height={630}
            className="w-full rounded-xl border mb-8"
          />

          <div className="prose prose-neutral max-w-none">
            <p>
              Somewhere in your organisation, right now, someone has a passport
              scan open and a deadline. They need it marked
              &quot;CONFIDENTIAL&quot; before forwarding it to the client. They
              search &quot;free watermark tool&quot;, click the first result,
              drag the file in, and thirty seconds later the job is done.
            </p>
            <p>
              And a copy of a named individual&apos;s identity document now sits
              on a server belonging to a company nobody in your organisation has
              ever assessed, in a jurisdiction nobody has checked, under terms
              nobody has read, with no contract in place.
            </p>
            <p>
              That is not a hypothetical compliance failure. It is a disclosure
              of personal data to a third party, and under GDPR it comes with a
              specific, documented set of requirements &mdash; none of which were
              met, because the person doing it was simply trying to watermark a
              PDF before lunch.
            </p>
            <p>
              This article covers what the upload actually triggers, what
              client-side processing removes, what it emphatically does{" "}
              <em>not</em> remove, and how to verify in about thirty seconds
              whether a tool is really keeping your files on your own machine.
            </p>
            <p className="text-sm text-muted-foreground border-l-4 border-muted pl-4">
              This is a practical explainer written for people who handle
              documents, not legal advice. If you are designing a compliance
              programme, take it to your DPO or counsel.
            </p>

            <h2>What Actually Happens When You Upload to a Watermark Tool</h2>
            <p>
              The interface makes it feel local. You drag a file into a box on a
              web page, a spinner turns, and a marked file comes back. It reads
              like using an app on your computer. Usually it is not.
            </p>
            <p>In a conventional server-side tool, the sequence is:</p>
            <ol>
              <li>
                Your file is transmitted over the network to the provider&apos;s
                infrastructure &mdash; typically a cloud region you were never
                told about.
              </li>
              <li>
                It is written to disk or object storage so a worker process can
                open it.
              </li>
              <li>
                A rendering process opens the document, composites the watermark,
                and writes a new file.
              </li>
              <li>
                The result is served back through a CDN, often via a temporary
                public download link.
              </li>
              <li>
                Along the way, request logs, access logs, error traces and
                backups may retain fragments &mdash; filenames, IP addresses,
                sometimes the file itself in a failed-job queue.
              </li>
              <li>
                Files may be replicated across availability zones. If the
                provider uses a third-party storage or rendering vendor, there is
                now a sub-processor in the chain too.
              </li>
            </ol>
            <p>
              Every one of those steps is processing of personal data, performed
              by someone other than you, on your instruction. That is the exact
              definition of a processor relationship.
            </p>

            <h2>The Obligations That Attach the Moment You Click Upload</h2>
            <p>
              If the document contains personal data &mdash; a name is enough,
              never mind an ID number and a face &mdash; sending it to an outside
              service brings a specific list into play. Briefly, and in plain
              terms:
            </p>
            <ul>
              <li>
                <strong>A written processor contract (Article 28).</strong> Not
                optional, and not satisfied by a website&apos;s terms of service.
                It has to cover subject matter, duration, purpose, categories of
                data, confidentiality obligations, security measures,
                sub-processor rules, assistance with data-subject rights,
                deletion at the end, and audit rights. Free tools do not offer
                one, and would not sign yours.
              </li>
              <li>
                <strong>Security of processing (Article 32).</strong> You must be
                able to justify that the measures protecting that data are
                appropriate to the risk. &quot;I found the site on Google&quot;
                is not an assessment.
              </li>
              <li>
                <strong>International transfers (Chapter V).</strong> If the
                servers are outside the EEA or UK, you need a valid transfer
                mechanism &mdash; adequacy, standard contractual clauses &mdash;
                and, since <em>Schrems II</em>, a transfer impact assessment
                behind it. Most free tools do not disclose their hosting region
                at all.
              </li>
              <li>
                <strong>Records of processing (Article 30).</strong> Your ROPA is
                supposed to reflect where personal data actually goes. Shadow
                tooling by definition does not appear in it, which means the
                record is inaccurate &mdash; a finding in itself during an audit.
              </li>
              <li>
                <strong>Breach notification (Articles 33 and 34).</strong> If
                that provider is breached, it is <em>your</em> notification
                obligation to the supervisory authority within 72 hours, and
                potentially to every affected individual. You will be relying on
                a company you have no contract with to tell you promptly, which
                is not a position anyone wants to be in.
              </li>
              <li>
                <strong>A DPIA, potentially (Article 35).</strong> Large-scale or
                systematic handling of identity documents can require a formal
                impact assessment before processing starts.
              </li>
            </ul>
            <p>
              None of this is exotic. It is the ordinary cost of adding a vendor.
              The problem is the mismatch: the task takes thirty seconds, and the
              governance around doing it properly takes weeks. So in practice one
              of two things happens &mdash; the work gets done without the
              governance, or the tool gets blocked and people find another one.
              Both outcomes are bad.
            </p>

            <h2>&quot;We Delete Your Files After One Hour&quot; Misses the Point</h2>
            <p>
              Nearly every upload-based tool has this line, and it is meant to
              settle the question. It does not, for a simple reason: retention is
              a separate control from lawfulness.
            </p>
            <p>
              The processing occurred when the file arrived. Every obligation
              above attached at that moment, and a deletion job an hour later
              does not retroactively remove any of them. You still needed the
              contract. The transfer still happened. If they were breached at
              minute forty, the data was there to take.
            </p>
            <p>
              There is also the matter of what &quot;deleted&quot; means
              operationally. Deleted from primary storage, or from backups too?
              What about the CDN edge cache holding the processed result, the log
              lines with the filename, the failed-job queue? Short retention is
              genuinely good practice and worth having. It is simply not an
              answer to whether the transfer should have happened.
            </p>

            <h2>What Client-Side Processing Actually Changes</h2>
            <p>
              A browser-based tool works differently at the architectural level,
              not just the policy level. The page loads as JavaScript. Your file
              is opened by the browser through the File API and held in local
              memory. The watermark is composited with the Canvas API using your
              own CPU. The result is written to a Blob and saved through your
              browser&apos;s normal download path.
            </p>
            <p>
              At no point does the file cross the network. Which means:
            </p>
            <ul>
              <li>
                <strong>There is no disclosure to a third party.</strong> No
                processor, therefore no Article 28 contract to negotiate,
                because nobody is processing anything on your behalf.
              </li>
              <li>
                <strong>There is no international transfer.</strong> Chapter V
                simply does not engage &mdash; the data stayed on a device in
                your own office.
              </li>
              <li>
                <strong>There is no third-party breach surface.</strong> The
                provider cannot lose data it never received, cannot be compelled
                to hand over files it does not hold, and cannot have a rogue
                employee browse a bucket that does not exist.
              </li>
              <li>
                <strong>There is no sub-processor chain to map.</strong> No
                storage vendor, no rendering vendor, no analytics pipeline
                touching document content.
              </li>
              <li>
                <strong>The vendor-review workload collapses.</strong> Instead of
                a security questionnaire, a DPA negotiation and a transfer impact
                assessment, the diligence is a single verifiable claim: does the
                file leave the browser? You can check that yourself in under a
                minute, which is more than you can say for most vendor
                assurances.
              </li>
            </ul>
            <p>
              This is why the distinction is architectural rather than
              contractual. Every cloud tool asks you to <em>trust</em> that they
              handle your data well. A client-side tool asks you to trust nothing,
              because it never gets the data in the first place. Verified
              architecture beats promised policy, every time.
            </p>

            <h2>What It Does Not Change</h2>
            <p>
              Being straight about this matters, because &quot;GDPR
              compliant&quot; is not a property a tool can have on your behalf.
              Compliance is a property of <em>your</em> processing, and you are
              still the controller. Client-side processing removes the vendor
              risk. It leaves all of this with you:
            </p>
            <ul>
              <li>
                <strong>Lawful basis.</strong> You still need a reason to hold
                that ID scan at all &mdash; contract, legal obligation,
                legitimate interests, consent.
              </li>
              <li>
                <strong>Data minimisation.</strong> If you only need proof of
                address, you do not need the full account number on the bank
                statement. Redacting fields you do not need with a{" "}
                <Link href="/en/mosaic" className="text-primary hover:underline">
                  mosaic tool
                </Link>{" "}
                before you file or forward it is stronger protection than any
                watermark.
              </li>
              <li>
                <strong>Retention.</strong> A file on your laptop is still
                personal data. Delete it when the purpose ends; a local copy that
                lives forever is its own breach waiting to happen.
              </li>
              <li>
                <strong>Endpoint security.</strong> The processing is now on your
                device, which means disk encryption, screen locks and access
                control are doing real work.
              </li>
              <li>
                <strong>Onward transfers.</strong> The watermarked file still
                gets emailed to somebody. That transmission is its own
                processing, with its own security expectations.
              </li>
              <li>
                <strong>Data subject rights.</strong> Access, erasure,
                rectification &mdash; all still yours to honour, and arguably
                easier when there is no vendor to chase.
              </li>
            </ul>
            <p>
              The honest framing is this: browser-based processing does not make
              you compliant. It removes the single largest, most paperwork-heavy
              category of risk from a routine task, and leaves you with the
              obligations you were always going to have.
            </p>

            <h2>How to Verify a Tool Really Does Not Upload</h2>
            <p>
              Any site can claim &quot;100% private, files never leave your
              browser&quot;. The good news is that this is one of the few
              security claims a non-engineer can check directly.
            </p>

            <h3>The 30-second Network tab check</h3>
            <ol>
              <li>
                Open the tool&apos;s page, then open developer tools
                (<strong>F12</strong>, or right-click and choose Inspect).
              </li>
              <li>Switch to the <strong>Network</strong> tab and clear the log.</li>
              <li>Load a test image and apply a watermark.</li>
              <li>
                Watch the requests. A client-side tool shows essentially nothing
                &mdash; maybe an analytics ping or a font. An upload-based tool
                shows a POST request with a payload roughly the size of your
                file, which is unmistakable: a 4&nbsp;MB request is a 4&nbsp;MB
                photo going somewhere.
              </li>
            </ol>

            <h3>The offline test</h3>
            <p>
              Blunter and even more convincing. Load the page, then disconnect
              from the network entirely &mdash; airplane mode, or pull the cable.
              Now try to watermark a file. A genuinely client-side tool works
              perfectly, because everything it needs is already in the browser.
              An upload-based tool fails on the spot. Use a test image, not a
              real document, for obvious reasons.
            </p>

            <h3>Read the privacy policy for the tell</h3>
            <p>
              Server-side tools cannot avoid describing their storage. Look for
              phrases like &quot;files are deleted after X hours&quot;,
              &quot;stored securely on our servers&quot;, or a list of
              sub-processors and hosting regions. If a policy needs to explain
              how long your files are kept, they are being kept. A genuinely
              client-side tool has nothing to say on the subject beyond
              explaining that it receives nothing.
            </p>
            <p>
              For the record,{" "}
              <Link href="/en/" className="text-primary hover:underline">
                ImageMarker
              </Link>{" "}
              is built this way deliberately, and the Network tab check is the
              intended way to confirm it rather than a claim you are asked to
              accept.
            </p>

            <h2>Where This Matters Most</h2>
            <p>
              Some teams handle sensitive documents constantly and rarely think
              of it as &quot;data processing&quot; because it feels like
              paperwork.
            </p>
            <ul>
              <li>
                <strong>HR and recruitment:</strong> passports and right-to-work
                documents, visa paperwork, qualification certificates, bank
                details for payroll. Marked copies get forwarded between
                recruiters, hiring managers and payroll constantly.
              </li>
              <li>
                <strong>Property and lettings:</strong> tenant ID, proof of
                income, guarantor documents, referencing packs &mdash; and a{" "}
                <Link
                  href="/en/blog/real-estate-photo-watermarking"
                  className="text-primary hover:underline"
                >
                  photo pipeline with its own exposure
                </Link>{" "}
                alongside it.
              </li>
              <li>
                <strong>Finance and KYC:</strong> identity verification packs,
                proof of address, source-of-funds evidence &mdash; frequently
                emailed onwards to compliance teams and correspondent
                institutions.
              </li>
              <li>
                <strong>Healthcare administration:</strong> insurance cards,
                referral letters, consent forms. Health data carries elevated
                requirements as a matter of course.
              </li>
              <li>
                <strong>Legal and professional services:</strong> client identity
                verification for anti-money-laundering checks, evidence bundles,
                disclosure material.
              </li>
              <li>
                <strong>Education:</strong> student ID, guardian documentation,
                safeguarding records.
              </li>
            </ul>
            <p>
              In every one of these, the watermarking step is trivial and the
              document is not. That asymmetry is exactly why shadow tooling
              flourishes: nobody raises a change request to add a watermark.
            </p>

            <h2>A Practical Workflow for Sensitive Documents</h2>
            <ol>
              <li>
                <strong>Collect less.</strong> The cheapest compliance win
                available. If you do not need it, do not ask for it.
              </li>
              <li>
                <strong>Redact what you did not need.</strong> Obscure irrelevant
                fields before the file goes anywhere, using a{" "}
                <Link href="/en/mosaic" className="text-primary hover:underline">
                  local redaction tool
                </Link>
                .
              </li>
              <li>
                <strong>Watermark with purpose, recipient and date.</strong> Not
                a generic &quot;COPY&quot;. &quot;For [Recipient] tenancy
                verification only &mdash; 2026-08-04&quot; ties the copy to one
                use, so a leaked file is visibly out of context anywhere else.
                Keep opacity at 40&ndash;60% so every field stays readable
                &mdash; automated checks fail on documents they cannot read.
                ImageMarker handles both{" "}
                <Link href="/en/" className="text-primary hover:underline">
                  images
                </Link>{" "}
                and{" "}
                <Link
                  href="/en/pdf-watermark"
                  className="text-primary hover:underline"
                >
                  PDFs
                </Link>
                , in the browser.
              </li>
              <li>
                <strong>Strip metadata.</strong> Scans and phone photos carry{" "}
                <Link
                  href="/en/blog/remove-exif-data-guide"
                  className="text-primary hover:underline"
                >
                  EXIF data
                </Link>{" "}
                including GPS coordinates and device identifiers &mdash;
                additional personal data you did not intend to share, travelling
                inside the file. An{" "}
                <Link
                  href="/en/exif-clean"
                  className="text-primary hover:underline"
                >
                  EXIF removal tool
                </Link>{" "}
                clears it.
              </li>
              <li>
                <strong>Transmit securely and delete on schedule.</strong> The
                watermark protects the copy in the wild; encryption in transit
                and a real retention rule protect it everywhere else.
              </li>
              <li>
                <strong>Write the tool into your policy.</strong> If people have
                a sanctioned, verified, genuinely local option, they stop
                searching for one. Shadow IT is usually a symptom of a missing
                approved path, not carelessness.
              </li>
            </ol>

            <h2>FAQ</h2>
            <p>
              <strong>
                Q: Is uploading personal data to an online watermark tool a GDPR
                issue?
              </strong>
              <br />A: It can be. Sending a file containing personal data to a
              third-party service makes them a processor, which requires an
              Article 28 contract, appropriate security, and a transfer mechanism
              if they are outside the EEA or UK. Free tools rarely provide any of
              it.
            </p>
            <p>
              <strong>Q: Does client-side processing make a tool GDPR compliant?</strong>
              <br />A: It removes the processor relationship, the transfer
              question and the third-party breach surface entirely. It does not
              remove your own controller obligations &mdash; lawful basis,
              minimisation, retention, device security.
            </p>
            <p>
              <strong>Q: How can I verify a tool doesn&apos;t upload my files?</strong>
              <br />A: Open developer tools, watch the Network tab while you
              process a file, and look for an outbound request the size of your
              image. Or load the page, go offline, and see whether it still
              works.
            </p>
            <p>
              <strong>Q: Are ID documents special category data?</strong>
              <br />A: Not automatically, though they often contain data that
              becomes special category in context. Regulators treat them as
              high-risk regardless, because a leak enables identity fraud
              directly &mdash; so handle them as sensitive either way.
            </p>
            <p>
              <strong>
                Q: Does &quot;we delete your files after one hour&quot; solve it?
              </strong>
              <br />A: No. The processing already happened on upload, and every
              obligation attached then. Short retention is good practice, not a
              substitute for the transfer never having taken place.
            </p>
            <p>
              <strong>Q: Does ImageMarker send my documents anywhere?</strong>
              <br />A: No. Everything runs in your browser, so there is no
              server-side copy to store, log or breach &mdash; and you can
              confirm that from your own Network tab.
            </p>
          </div>

          <div className="mt-10 p-6 bg-blue-50 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">
              Watermark sensitive documents without transferring them anywhere.
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Free, no signup, no upload. Everything is processed in your browser
              &mdash; check the Network tab yourself.
            </p>
            <Link
              href="/en/"
              className="inline-block px-5 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Try ImageMarker Free<ReadMoreArrow />
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
            <Link href="/en/blog/real-estate-photo-watermarking">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  Protect Your Listings: How Real Estate Agents Batch Watermark
                  Property Photos in Seconds
                </h3>
                <p className="text-sm text-muted-foreground">
                  The same principles applied to tenant ID documents and a
                  high-volume photo pipeline.
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  Read more<ReadMoreArrow />
                </span>
              </article>
            </Link>
            <Link href="/en/blog/watermark-etsy-product-photos">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  Stop Photo Theft: The Complete Guide to Watermarking Your Etsy
                  Product Photos
                </h3>
                <p className="text-sm text-muted-foreground">
                  Client-side batch processing from a small business&apos;s point
                  of view.
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  Read more<ReadMoreArrow />
                </span>
              </article>
            </Link>
            <Link href="/en/blog/tinypng-iloveimg-squoosh-alternatives">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  TinyPNG, iLoveIMG &amp; Squoosh Alternatives That Never Upload
                  Your Images
                </h3>
                <p className="text-sm text-muted-foreground">
                  Which popular image tools actually process on their servers,
                  and which run locally.
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  Read more<ReadMoreArrow />
                </span>
              </article>
            </Link>
            <Link href="/en/blog/watermark-id-before-sending-kyc">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  How to Watermark Your ID Before Sending &mdash; Free KYC
                  Document Protection
                </h3>
                <p className="text-sm text-muted-foreground">
                  What to write on the watermark, and whether automated checks
                  will still accept it.
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
