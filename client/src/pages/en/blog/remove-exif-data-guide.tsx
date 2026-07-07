import { useEffect } from "react";
import { Link } from "wouter";
import {
  setPageSeo,
  articleSchema,
  blogBreadcrumb,
  faqSchema,
} from "@/lib/seo";

const URL = "https://imagemarker.app/en/blog/remove-exif-data-guide";

export default function RemoveExifDataGuideEn() {
  useEffect(() => {
    return setPageSeo({
      title:
        "Why You Should Remove EXIF Data Before Uploading Photos | ImageMarker",
      description:
        "Every photo you upload can carry hidden EXIF metadata — including the exact GPS location where it was taken. Learn the privacy risks of photo metadata and how to remove EXIF data free, 100% in your browser.",
      canonical: URL,
      locale: "en_US",
      jsonLd: [
        articleSchema({
          headline: "Why You Should Remove EXIF Data Before Uploading Photos",
          description:
            "A practical guide to EXIF metadata privacy: what EXIF data reveals, how GPS geotags can expose your location, and how to remove EXIF data for free in your browser before uploading.",
          url: URL,
          datePublished: "2026-07-07",
        }),
        blogBreadcrumb(
          "Why You Should Remove EXIF Data Before Uploading Photos",
          URL,
          "en"
        ),
        faqSchema([
          {
            q: "What is EXIF data in a photo?",
            a: "EXIF (Exchangeable Image File Format) is metadata embedded inside image files, mostly JPEGs. It can include GPS coordinates, the date and time a photo was taken, the camera or phone model and serial number, and the settings used.",
          },
          {
            q: "Can someone find my location from a photo?",
            a: "Yes, if the photo still contains its EXIF GPS tag. Many photos taken on smartphones record the exact latitude and longitude. Anyone with the original file can read that geotag and see precisely where it was taken — potentially your home.",
          },
          {
            q: "Do social media sites remove EXIF data automatically?",
            a: "Some large platforms strip EXIF from the displayed image on upload, but behavior varies by site and does not apply when you send the original file directly over email, chat, or a cloud link. Removing it yourself is the only reliable guarantee.",
          },
          {
            q: "Does removing EXIF data reduce image quality?",
            a: "No. Metadata is stored separately from the pixels. Stripping it leaves the visible image exactly as it was — same resolution, same quality.",
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
              Published July 2026 &middot; 6 min read
            </time>
            <h1 className="text-3xl font-bold mt-2 leading-snug">
              Why You Should Remove EXIF Data Before Uploading Photos
            </h1>
          </header>

          <div className="prose prose-neutral max-w-none">
            <p>
              Every photo your phone or camera takes carries a hidden layer of
              information you never see &mdash; and rarely mean to share. It is
              called EXIF metadata, and buried in it can be the exact GPS
              coordinates where the photo was taken, the date and time, your
              device model, and even its serial number. When you upload or send a
              photo, all of that often travels with it. This guide explains what
              EXIF data reveals, why it is a real privacy risk, and how to remove
              it before you upload.
            </p>

            <h2>What Is EXIF Data?</h2>
            <p>
              EXIF (Exchangeable Image File Format) is a standard for embedding
              technical and contextual metadata inside image files, most commonly
              JPEGs. Photographers value some of it &mdash; shutter speed,
              aperture, ISO, lens &mdash; for reviewing their work. But the same
              block of data quietly records far more sensitive details:
            </p>
            <ul>
              <li>
                <strong>GPS location:</strong> the precise latitude and longitude
                where the shot was taken.
              </li>
              <li>
                <strong>Date and time:</strong> exactly when, often down to the
                second.
              </li>
              <li>
                <strong>Device info:</strong> make, model, and sometimes a unique
                serial number.
              </li>
              <li>
                <strong>Software and settings:</strong> the app or editor used
                and how the camera was configured.
              </li>
            </ul>

            <h2>The Privacy Risks of EXIF Data</h2>
            <p>
              The GPS field is the dangerous one. A single photo uploaded from
              home can reveal your home address. A picture of your kids in the
              backyard can pinpoint where they live and play. Sell something
              online with a photo taken in your living room, and a stranger may
              learn exactly where you keep it. Stalkers and burglars have used
              geotagged photos for precisely this. Beyond location:
            </p>
            <ul>
              <li>
                <strong>Pattern of life.</strong> Timestamps across many photos
                map your routine &mdash; where you are and when.
              </li>
              <li>
                <strong>Device fingerprinting.</strong> A consistent camera
                serial number can link &quot;anonymous&quot; posts back to you.
              </li>
              <li>
                <strong>Doxxing fuel.</strong> Combined with other clues, EXIF
                can de-anonymize an account you meant to keep separate.
              </li>
            </ul>

            <h2>&quot;Doesn&apos;t Social Media Already Strip It?&quot;</h2>
            <p>
              Partly &mdash; and unreliably. Many large social platforms remove
              EXIF from the image they <em>display</em>, but the behavior varies
              from site to site and can change without notice. More importantly,
              stripping only happens on those specific platforms. The moment you
              send the <strong>original file</strong> directly &mdash; over email,
              a chat app, a shared cloud folder, or a file-transfer link &mdash;
              the metadata usually travels intact. The only reliable approach is
              to remove it yourself before the file leaves your device.
            </p>

            <h2>How to Remove EXIF Data for Free</h2>
            <p>
              You can clean metadata in seconds with{" "}
              <Link href="/en/exif-clean" className="text-primary hover:underline">
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
                  <Link
                    href="/en/exif-clean"
                    className="text-primary hover:underline"
                  >
                    imagemarker.app/en/exif-clean
                  </Link>
                </strong>{" "}
                in any modern browser.
              </li>
              <li>
                <strong>Add the photo(s)</strong> you are about to upload &mdash;
                they stay on your device.
              </li>
              <li>
                <strong>Let the tool strip the metadata</strong>, including GPS,
                timestamps, and device info.
              </li>
              <li>
                <strong>Download the clean copy</strong> and upload that one
                instead of the original.
              </li>
            </ol>

            <h2>When You Should Always Strip EXIF</h2>
            <ul>
              <li>Uploading photos taken at or near your home.</li>
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
              protects your ownership. This is especially important for{" "}
              <Link
                href="/en/blog/watermark-id-before-sharing"
                className="text-primary hover:underline"
              >
                ID documents you share online
              </Link>
              , where you want to strip location data <em>and</em> mark the copy
              for a single purpose.
            </p>

            <h2>FAQ</h2>
            <p>
              <strong>Q: What is EXIF data in a photo?</strong>
              <br />A: EXIF (Exchangeable Image File Format) is metadata embedded
              inside image files. It can include GPS coordinates, the date and
              time taken, the camera or phone model and serial number, and the
              settings used.
            </p>
            <p>
              <strong>Q: Can someone find my location from a photo?</strong>
              <br />A: Yes, if the photo still contains its EXIF GPS tag. Many
              smartphone photos record exact coordinates, and anyone with the
              original file can read that geotag &mdash; potentially revealing
              your home.
            </p>
            <p>
              <strong>
                Q: Do social media sites remove EXIF data automatically?
              </strong>
              <br />A: Some strip it from the displayed image, but behavior
              varies and direct file transfers (email, chat, cloud links) usually
              keep the metadata intact. Removing it yourself is the only reliable
              guarantee.
            </p>
            <p>
              <strong>Q: Does removing EXIF data reduce image quality?</strong>
              <br />A: No. Metadata is separate from the pixels. Stripping it
              leaves the visible image untouched.
            </p>
          </div>

          <div className="mt-10 p-6 bg-blue-50 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">
              Strip hidden data before you upload.
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Remove GPS and EXIF metadata for free, 100% in your browser.
              Nothing is uploaded.
            </p>
            <Link
              href="/en/exif-clean"
              className="inline-block px-5 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Clean EXIF Data Free &rarr;
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
                  Strip location data and mark your ID copy for a single purpose
                  before sharing.
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  Read more →
                </span>
              </article>
            </Link>
            <Link href="/en/blog/digital-identity-protection">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  Digital Identity Protection: 7 Steps to Keep Your Documents
                  Safe
                </h3>
                <p className="text-sm text-muted-foreground">
                  A practical 7-step guide covering watermarks, EXIF removal and
                  secure sharing.
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  Read more →
                </span>
              </article>
            </Link>
            <Link href="/en/blog/best-watermark-generators">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  5 Best Free Watermark Generators in 2026
                </h3>
                <p className="text-sm text-muted-foreground">
                  Compare 5 top watermark tools by features, price and privacy.
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
