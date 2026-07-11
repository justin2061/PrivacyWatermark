import { useEffect } from "react";
import { Link } from "wouter";
import { ReadMoreArrow } from "@/components/read-more-arrow";
import {
  setPageSeo,
  articleSchema,
  blogBreadcrumb,
  faqSchema,
} from "@/lib/seo";

const URL = "https://imagemarker.app/en/blog/watermark-id-before-sharing";

export default function WatermarkIdBeforeSharingEn() {
  useEffect(() => {
    return setPageSeo({
      title:
        "How to Watermark Your ID Before Sharing It Online | ImageMarker",
      description:
        "Renting, a new job, or opening an account often means sending a photo of your ID. Learn why you should add a watermark to your ID document first — and how to do it free, 100% in your browser.",
      canonical: URL,
      locale: "en_US",
      jsonLd: [
        articleSchema({
          headline: "How to Watermark Your ID Before Sharing It Online",
          description:
            "Why you should add a watermark to your ID document before sharing it for renting, job applications or banking — and a free, private, in-browser way to do it.",
          url: URL,
          datePublished: "2026-07-07",
        }),
        blogBreadcrumb(
          "How to Watermark Your ID Before Sharing It Online",
          URL,
          "en"
        ),
        faqSchema([
          {
            q: "Is it legal to watermark my own ID document?",
            a: "Yes. Adding a semi-transparent note such as \"For rental application only\" across your own ID copy is a widely accepted way to limit misuse. You are not altering the identifying details — you are marking the purpose of that specific copy. It does not invalidate the document; the original in your wallet is untouched.",
          },
          {
            q: "What should the watermark actually say?",
            a: "State the single purpose and recipient, for example \"For [Company] job application only — not valid for other use\". Naming the purpose and the date makes a leaked copy far harder to reuse for anything else.",
          },
          {
            q: "Will a watermark stop identity theft completely?",
            a: "No single step does. A purpose-stating watermark is a strong deterrent that makes your ID copy much less useful to a fraudster, but combine it with only sharing when truly required, stripping EXIF metadata, and never sending the file over insecure channels.",
          },
          {
            q: "Is it safe to upload my ID to a watermark website?",
            a: "Only if the tool runs locally. ImageMarker processes your image entirely in your browser — your ID is never uploaded to any server, which is essential when the whole point is protecting a sensitive document.",
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
            <time dateTime="2026-07-07" className="text-sm text-muted-foreground">
              Published July 2026 &middot; 7 min read
            </time>
            <h1 className="text-3xl font-bold mt-2 leading-snug">
              How to Watermark Your ID Before Sharing It Online
            </h1>
          </header>

          <div className="prose prose-neutral max-w-none">
            <p>
              At some point almost everyone is asked to &quot;just send a photo
              of your ID.&quot; A landlord wants it before signing a lease, an
              employer needs it for onboarding, a bank asks for it to open an
              account. It feels routine &mdash; so most people snap a clear
              picture and send the original. That unprotected copy is exactly
              what scammers hope for. This guide explains why you should add a
              watermark to your ID before sharing it, what the watermark should
              say, and how to do it for free without uploading your document
              anywhere.
            </p>

            <h2>Why an Unprotected ID Copy Is So Risky</h2>
            <p>
              A photo of your ID is not just an image &mdash; it is a bundle of
              the exact details needed to impersonate you: full legal name, date
              of birth, ID or document number, and often your address and
              photo. Once you send that file, you lose all control over it. It
              can be forwarded, screenshotted, saved to a shared drive, or
              exposed in a data breach months later.
            </p>
            <p>
              With a clean, unmarked copy, a fraudster can attempt to:
            </p>
            <ul>
              <li>Open bank accounts, loans, or credit lines in your name.</li>
              <li>
                Pass &quot;know your customer&quot; identity checks on other
                platforms.
              </li>
              <li>
                Register phone numbers or utilities used for further scams.
              </li>
              <li>
                Combine it with other leaked data to build a full profile of
                you.
              </li>
            </ul>
            <p>
              The problem is that a plain copy looks equally valid no matter who
              holds it. There is nothing on the image tying it to the one
              specific, legitimate purpose you sent it for.
            </p>

            <h2>What a Watermark Actually Does</h2>
            <p>
              A watermark solves this by writing the <strong>purpose</strong>{" "}
              directly onto the copy. A line of semi-transparent text across the
              document &mdash; something like{" "}
              <em>&quot;For rental application only — not valid for other
              use&quot;</em>{" "}
              &mdash; does three things at once:
            </p>
            <ul>
              <li>
                <strong>It limits reuse.</strong> A copy stamped &quot;for job
                application only&quot; is obviously out of place if it later
                surfaces at a bank or a loan application, making it far harder
                to misuse.
              </li>
              <li>
                <strong>It signals awareness.</strong> A watermarked ID tells
                anyone handling it that you understand the risks and are paying
                attention &mdash; a strong psychological deterrent.
              </li>
              <li>
                <strong>It creates a paper trail.</strong> Naming the recipient
                and date shows precisely which copy went where, useful if a leak
                is ever traced.
              </li>
            </ul>
            <p>
              Importantly, you are not altering the identifying information or
              forging anything. You are labelling <em>this particular copy</em>{" "}
              for one use. The original document in your wallet remains fully
              valid.
            </p>

            <h2>How to Watermark Your ID — Step by Step</h2>
            <p>
              You can do this in under a minute with{" "}
              <Link href="/en/" className="text-primary hover:underline">
                ImageMarker
              </Link>
              , a free watermark tool that runs{" "}
              <strong>entirely in your browser</strong>. Your ID is never
              uploaded to a server, which matters a great deal when the whole
              point is protecting a sensitive document.
            </p>
            <ol>
              <li>
                <strong>
                  Open{" "}
                  <Link href="/en/" className="text-primary hover:underline">
                    imagemarker.app/en
                  </Link>
                </strong>{" "}
                in any modern browser, on your phone or computer.
              </li>
              <li>
                <strong>Add the photo of your ID.</strong> It stays on your
                device the entire time.
              </li>
              <li>
                <strong>Type a purpose-specific watermark</strong>, for example{" "}
                &quot;For ABC Rentals lease application only — 2026/07/07&quot;.
                Name the recipient and the date.
              </li>
              <li>
                <strong>Adjust opacity and placement</strong> so the text is
                clearly readable across the important details (name, number,
                photo) without hiding them completely &mdash; the recipient
                still needs to verify it.
              </li>
              <li>
                <strong>Download the watermarked copy</strong> and send that
                one, never the original unmarked file.
              </li>
            </ol>

            <h2>Common Scenarios Where You Should Watermark First</h2>

            <h3>Renting a Home</h3>
            <p>
              Landlords and agents routinely ask for ID and proof of income
              before a viewing or lease. This is one of the most common places
              copies get mishandled &mdash; forwarded over chat apps, stored
              indefinitely, or requested by fake listings. Stamp{" "}
              &quot;For rental application only&quot; and the property or agency
              name before sending anything.
            </p>

            <h3>Job Applications and Onboarding</h3>
            <p>
              New employers need ID to verify your right to work, but recruitment
              scams also ask for ID early to harvest data. A watermark reading
              &quot;For [Company] employment verification only&quot; makes a
              leaked copy useless elsewhere &mdash; and gives you a reason to
              pause if a &quot;recruiter&quot; objects to it.
            </p>

            <h3>Banking and Financial Accounts</h3>
            <p>
              Opening accounts, applying for loans, or completing identity checks
              often requires an ID photo. Because these copies sit closest to
              your money, they are the highest-value target. Mark them tightly to
              the specific institution and purpose.
            </p>

            <h2>Extra Steps That Pair Well With Watermarking</h2>
            <p>
              A watermark protects against <em>reuse</em>. To round out your
              privacy, also:
            </p>
            <ul>
              <li>
                <strong>Strip the metadata.</strong> Your photo may carry EXIF
                data including GPS location. Remove it with the{" "}
                <Link
                  href="/en/exif-clean"
                  className="text-primary hover:underline"
                >
                  EXIF cleaner
                </Link>{" "}
                before sending.
              </li>
              <li>
                <strong>Share only what is required.</strong> Cover or crop
                fields the recipient does not actually need.
              </li>
              <li>
                <strong>Use a secure channel.</strong> Avoid public chats or
                email where possible; prefer the organisation&apos;s official
                upload portal.
              </li>
            </ul>

            <h2>FAQ</h2>
            <p>
              <strong>Q: Is it legal to watermark my own ID document?</strong>
              <br />A: Yes. Adding a semi-transparent note such as &quot;For
              rental application only&quot; across your own copy is a widely
              accepted way to limit misuse. You are marking the purpose, not
              altering the identifying details, and the original document stays
              valid.
            </p>
            <p>
              <strong>Q: What should the watermark actually say?</strong>
              <br />A: State the single purpose and recipient, e.g. &quot;For
              [Company] job application only — not valid for other use&quot;.
              Adding the date makes a leaked copy even harder to reuse.
            </p>
            <p>
              <strong>
                Q: Will a watermark stop identity theft completely?
              </strong>
              <br />A: No single step does. A purpose-stating watermark is a
              strong deterrent that makes your ID copy far less useful to a
              fraudster; combine it with sharing only when required, stripping
              EXIF data, and using secure channels.
            </p>
            <p>
              <strong>
                Q: Is it safe to upload my ID to a watermark website?
              </strong>
              <br />A: Only if the tool runs locally.{" "}
              <Link href="/en/" className="text-primary hover:underline">
                ImageMarker
              </Link>{" "}
              processes everything in your browser &mdash; your ID is never
              uploaded to any server.
            </p>
          </div>

          <div className="mt-10 p-6 bg-blue-50 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">
              Watermark your ID before you send it.
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Add a purpose-stating watermark for free, 100% in your browser.
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

        {/* Related articles */}
        <section className="mt-12 border-t pt-8">
          <h2 className="text-xl font-semibold mb-4">Related Articles</h2>
          <div className="space-y-4">
            <Link href="/en/blog/watermark-id-documents">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  How to Add Watermark to ID Documents — Protect Your Identity
                  Online
                </h3>
                <p className="text-sm text-muted-foreground">
                  Why unprotected ID documents are risky and how to watermark
                  them free in your browser.
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
                  How rental scammers exploit your documents and how
                  watermarking protects you.
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
                  Strip hidden GPS and device metadata before you share any
                  photo or document.
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  Read more<ReadMoreArrow />
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
