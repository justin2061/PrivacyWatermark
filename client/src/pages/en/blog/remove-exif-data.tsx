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

export default function RemoveExifData() {
  useEffect(() => {
    return setPageSeo({
      title: "Why You Should Remove EXIF Data Before Sharing Photos",
      description: "Your photos carry hidden EXIF metadata — GPS location, device, and timestamps. Learn the privacy risks and how to remove EXIF data for free, right in your browser.",
      canonical: "https://imagemarker.app/en/blog/remove-exif-data",
      locale: "en_US",
      jsonLd: [
        articleSchema({
          headline: "Why You Should Remove EXIF Data Before Sharing Photos",
          description: "Your photos carry hidden EXIF metadata — GPS location, device, and timestamps. Learn the privacy risks and how to remove EXIF data for free, right in your browser.",
          url: "https://imagemarker.app/en/blog/remove-exif-data",
          datePublished: "2026-06-28",
          dateModified: "2026-06-28",
        }),
        blogBreadcrumb(
          "Why You Should Remove EXIF Data",
          "https://imagemarker.app/en/blog/remove-exif-data",
          "en"
        ),
        faqSchema([
          {
            q: "Does removing EXIF reduce image quality?",
            a: "No. Metadata is separate from the pixels. Stripping it leaves the visible image untouched.",
          },
          {
            q: "Don't social networks already remove it?",
            a: "Some do for the displayed image, but behavior varies and direct file transfers (email, chat, cloud links) usually keep the metadata intact. Removing it yourself is the only reliable guarantee.",
          },
          {
            q: "Is the EXIF cleaner really private?",
            a: "Yes. It processes everything locally in your browser; no photo is ever sent to a server.",
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
          <span>Blog</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <header className="mb-8">
            <time dateTime="2026-06-28" className="text-sm text-muted-foreground">
              Published June 2026 &middot; 6 min read
            </time>
            <h1 className="text-3xl font-bold mt-2 leading-snug">
              Why You Should Remove EXIF Data Before Sharing Photos
            </h1>
          </header>

          <div className="prose prose-neutral max-w-none">
            <p>
              Every photo your phone or camera takes carries a hidden layer of
              information you never see &mdash; and rarely intend to share. It is
              called EXIF metadata, and it can include the exact GPS coordinates
              where the photo was taken, the date and time, your camera or phone
              model, and even its serial number. When you post or send a photo, all
              of that often travels with it. This article explains what EXIF data
              reveals, why it is a privacy risk, and how to strip it before
              sharing.
            </p>

            <h2>What Is EXIF Data?</h2>
            <p>
              EXIF (Exchangeable Image File Format) is a standard for embedding
              technical and contextual metadata inside image files, mostly JPEGs.
              Photographers value some of it &mdash; shutter speed, aperture, ISO,
              lens &mdash; for reviewing their work. But the same block of data
              quietly records far more sensitive details:
            </p>
            <ul>
              <li>
                <strong>GPS location:</strong> precise latitude and longitude of
                where the shot was taken.
              </li>
              <li>
                <strong>Date and time:</strong> exactly when, down to the second.
              </li>
              <li>
                <strong>Device info:</strong> make, model, and sometimes a unique
                serial number.
              </li>
              <li>
                <strong>Software and settings:</strong> the app or editor used and
                how the camera was configured.
              </li>
            </ul>

            <h2>The Privacy Risks of EXIF Data</h2>
            <p>
              The GPS field is the dangerous one. A single photo posted from home
              can reveal your home address. A picture of your kids in the backyard
              can pinpoint where they live and play. Sell something online with a
              photo taken in your living room, and a stranger may learn exactly
              where you keep it. Stalkers and burglars have used geotagged photos
              for precisely this. Beyond location:
            </p>
            <ul>
              <li>
                <strong>Pattern of life.</strong> Timestamps across many photos map
                your routine &mdash; where you are and when.
              </li>
              <li>
                <strong>Device fingerprinting.</strong> A consistent camera serial
                number can link &quot;anonymous&quot; posts back to you.
              </li>
              <li>
                <strong>Doxxing fuel.</strong> Combined with other clues, EXIF can
                de-anonymize an account you meant to keep separate.
              </li>
            </ul>
            <p>
              Many large social platforms strip EXIF on upload &mdash; but not all,
              and not when you send the original file directly over email, chat, or
              a cloud link. The only reliable approach is to remove it yourself
              before sharing.
            </p>

            <h2>How to Remove EXIF Data for Free</h2>
            <p>
              You can clean metadata in seconds with{" "}
              <Link href="/exif-clean" className="text-primary hover:underline">
                ImageMarker&apos;s EXIF cleaner
              </Link>
              . Like the watermark tool, it runs entirely in your browser, so your
              photos are <strong>never uploaded</strong> &mdash; which matters a
              great deal when the whole point is privacy.
            </p>
            <ol>
              <li>
                <strong>
                  Open{" "}
                  <Link href="/exif-clean" className="text-primary hover:underline">
                    imagemarker.app/exif-clean
                  </Link>
                </strong>{" "}
                in any modern browser.
              </li>
              <li>
                <strong>Add the photo(s)</strong> you are about to share &mdash; they
                stay on your device.
              </li>
              <li>
                <strong>Let the tool strip the metadata</strong>, including GPS,
                timestamps, and device info.
              </li>
              <li>
                <strong>Download the clean copy</strong> and share that one instead
                of the original.
              </li>
            </ol>

            <h2>When You Should Always Strip EXIF</h2>
            <ul>
              <li>Posting photos taken at or near your home.</li>
              <li>Selling items online from photos shot indoors.</li>
              <li>Sharing pictures of children anywhere public.</li>
              <li>Sending files to people you do not fully trust.</li>
              <li>Posting from a pseudonymous or separate account.</li>
            </ul>
            <p>
              While you are protecting an image, consider adding a{" "}
              <Link href="/en/" className="text-primary hover:underline">
                watermark
              </Link>{" "}
              too &mdash; metadata removal protects your privacy, a watermark
              protects your ownership.
            </p>

            <h2>FAQ</h2>
            <p>
              <strong>Q: Does removing EXIF reduce image quality?</strong>
              <br />A: No. Metadata is separate from the pixels. Stripping it leaves
              the visible image untouched.
            </p>
            <p>
              <strong>Q: Don&apos;t social networks already remove it?</strong>
              <br />A: Some do for the displayed image, but behavior varies and
              direct file transfers (email, chat, cloud links) usually keep the
              metadata intact. Removing it yourself is the only reliable guarantee.
            </p>
            <p>
              <strong>Q: Is the EXIF cleaner really private?</strong>
              <br />A: Yes. It processes everything locally in your browser; no
              photo is ever sent to a server.
            </p>
          </div>

          <div className="mt-10 p-6 bg-blue-50 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">
              Strip hidden data before you share.
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Remove GPS and EXIF metadata for free, 100% in your browser. Nothing
              is uploaded.
            </p>
            <Link
              href="/exif-clean"
              className="inline-block px-5 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Clean EXIF Data Free<ReadMoreArrow />
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
