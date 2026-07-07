import { useEffect } from "react";
import { Link } from "wouter";
import {
  setPageSeo,
  articleSchema,
  blogBreadcrumb,
  faqSchema,
} from "@/lib/seo";

const URL = "https://imagemarker.app/en/blog/image-compression-guide";
const OG = "https://imagemarker.app/og/image-compression-guide.png";

export default function ImageCompressionGuideEn() {
  useEffect(() => {
    return setPageSeo({
      title:
        "Image Compression: How to Reduce File Size Without Losing Quality | ImageMarker",
      description:
        "A practical guide to image compression: how lossy and lossless work, the difference between JPEG, PNG and WebP, and how to shrink files in your browser without visible quality loss.",
      canonical: URL,
      locale: "en_US",
      ogImage: OG,
      jsonLd: [
        articleSchema({
          headline:
            "Image Compression: How to Reduce File Size Without Losing Quality",
          description:
            "How image compression really works, when to use JPEG vs PNG vs WebP, and how to compress photos for free in your browser without uploading them.",
          url: URL,
          datePublished: "2026-07-08",
          image: OG,
        }),
        blogBreadcrumb(
          "Image Compression: How to Reduce File Size Without Losing Quality",
          URL,
          "en"
        ),
        faqSchema([
          {
            q: "How can I reduce image file size without losing quality?",
            a: "Use lossless compression, or lossy compression at a high quality setting (around 75–85% for JPEG or WebP). At that level most images shrink dramatically while the loss stays invisible to the eye. Also resize the image to the dimensions it will actually be displayed at — an oversized photo is the single biggest source of wasted file size.",
          },
          {
            q: "What's the difference between lossy and lossless compression?",
            a: "Lossless compression (PNG, and lossless WebP) rebuilds the image pixel-for-pixel, so quality is perfectly preserved but files are larger. Lossy compression (JPEG, standard WebP) permanently discards detail the eye barely notices to reach much smaller sizes. Photos suit lossy; logos, screenshots and line art with sharp edges suit lossless.",
          },
          {
            q: "Which format is best: JPEG, PNG or WebP?",
            a: "JPEG for photographs, PNG when you need transparency or crisp text and edges, and WebP as a modern all-rounder that beats both on size at similar quality and is supported by every current browser. Convert to WebP when file size is the priority and your audience uses up-to-date browsers.",
          },
          {
            q: "Can I compress images without uploading them to a website?",
            a: "Yes. ImageMarker's compressor runs entirely in your browser, so your images are never sent to a server. You choose the quality, see the resulting size, and download locally — nothing is uploaded.",
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
              Image Compression: How to Reduce File Size Without Losing Quality
            </h1>
          </header>

          <img
            src={OG}
            alt="Compress images without losing quality"
            width={1200}
            height={630}
            className="w-full rounded-xl border mb-8"
          />

          <div className="prose prose-neutral max-w-none">
            <p>
              A modern phone photo can weigh eight, ten, even twelve megabytes.
              That&apos;s wonderful for archiving and terrible for almost
              everything else &mdash; a page full of them crawls, an email bounces
              off an attachment limit, and a marketplace listing rejects the
              upload. The good news is that most of those megabytes are invisible.
              Compression is the art of throwing away the parts of an image your
              eye never sees, and done well, a file can lose 80% of its size and
              look identical. Here&apos;s how it actually works, and how to do it
              without shipping your photos to someone else&apos;s server.
            </p>

            <h2>What &quot;Compression&quot; Really Means</h2>
            <p>
              An uncompressed image stores a colour value for every single pixel.
              A 12-megapixel photo therefore holds twelve million of them &mdash;
              enormously redundant, because neighbouring pixels are usually almost
              the same. Compression exploits that redundancy. The question is only
              whether it does so while keeping every pixel recoverable, or by
              permanently discarding detail. That split &mdash; lossless versus
              lossy &mdash; is the one concept that explains every format
              decision you&apos;ll ever make.
            </p>

            <h3>Lossless: perfect, but larger</h3>
            <p>
              Lossless compression stores the image more efficiently without
              throwing anything away, so it decodes back pixel-for-pixel identical
              to the original. PNG and lossless WebP work this way. It&apos;s the
              right choice for anything with sharp edges and flat colour &mdash;
              logos, screenshots, diagrams, text &mdash; where even slight lossy
              artefacts would show as fuzz around the lines. The trade-off is
              size: lossless files stay comparatively large.
            </p>

            <h3>Lossy: smaller, and usually invisible</h3>
            <p>
              Lossy compression, used by JPEG and standard WebP, permanently drops
              information the human eye is bad at noticing &mdash; subtle colour
              gradations and fine high-frequency detail. Push it too far and you
              get the telltale blocky halos of an over-compressed JPEG. Keep it in
              a sensible range and the discarded data is genuinely imperceptible
              while the file collapses to a fraction of its original weight.
              Photographs, with their smooth gradients and organic detail, are the
              perfect candidate.
            </p>

            <h2>The Quality Slider Is the Whole Game</h2>
            <p>
              Every lossy compressor exposes a quality setting, usually 0&ndash;100.
              The relationship isn&apos;t linear, and that&apos;s the useful part.
              Dropping from 100 to about 80 sheds a huge amount of file size for a
              difference you effectively cannot see. Below roughly 60 the savings
              shrink while the damage becomes visible. For most web images,{" "}
              <strong>75&ndash;85% is the sweet spot</strong>: near-original
              appearance at a fraction of the bytes. When you can preview the
              result and its size, the honest approach is to lower quality until
              you just start to notice a change, then step back up one notch.
            </p>

            <h2>Resize Before You Compress</h2>
            <p>
              The most common reason a file is bloated isn&apos;t weak compression
              &mdash; it&apos;s that the image is far larger than it will ever be
              displayed. Serving a 4000-pixel-wide photo into a slot that renders
              at 800 pixels wastes the overwhelming majority of the data before
              compression even begins. Always{" "}
              <Link href="/en/resize" className="text-primary hover:underline">
                resize to the target dimensions
              </Link>{" "}
              first, then compress. The two steps together routinely turn a
              multi-megabyte original into a lean file of a few hundred kilobytes.
            </p>

            <h2>Choosing a Format</h2>
            <ul>
              <li>
                <strong>JPEG</strong> &mdash; the default for photographs. Broad
                support, excellent lossy compression, no transparency.
              </li>
              <li>
                <strong>PNG</strong> &mdash; for transparency, screenshots, logos
                and anything with crisp edges or text. Lossless, so larger.
              </li>
              <li>
                <strong>WebP</strong> &mdash; the modern all-rounder. At similar
                quality it typically beats JPEG and PNG on size, supports
                transparency and both lossy and lossless modes, and is supported
                by every current browser. Reach for it when size is the priority.
              </li>
            </ul>
            <p>
              If your images are still in a heavier format, converting them &mdash;
              for instance with a{" "}
              <Link href="/en/convert" className="text-primary hover:underline">
                format converter
              </Link>{" "}
              &mdash; is often the single biggest win before you even touch the
              quality slider.
            </p>

            <h2>How to Compress Images Privately, in Your Browser</h2>
            <p>
              Many popular compressors upload your images to their servers to do
              the work. For product shots, client photos, or anything you&apos;d
              rather not hand to a third party, that&apos;s a poor trade. You can
              get the same result locally with{" "}
              <Link href="/en/compress" className="text-primary hover:underline">
                ImageMarker&apos;s compressor
              </Link>
              , which runs <strong>entirely in your browser</strong>.
            </p>
            <ol>
              <li>
                <strong>
                  Open{" "}
                  <Link
                    href="/en/compress"
                    className="text-primary hover:underline"
                  >
                    imagemarker.app/en/compress
                  </Link>
                </strong>{" "}
                and add your image &mdash; it stays on your device.
              </li>
              <li>
                <strong>Adjust the quality</strong> and watch the output size
                update. Aim for the 75&ndash;85% range as a starting point.
              </li>
              <li>
                <strong>Compare</strong> the result against the original to
                confirm the loss is invisible at the size you&apos;ll use.
              </li>
              <li>
                <strong>Download</strong> the compressed file. Nothing was ever
                uploaded.
              </li>
            </ol>

            <h2>FAQ</h2>
            <p>
              <strong>
                Q: How can I reduce image file size without losing quality?
              </strong>
              <br />A: Use lossless compression, or lossy at a high setting
              (75&ndash;85%), and resize the image to the dimensions it&apos;ll
              actually be shown at &mdash; oversizing is the biggest source of
              wasted bytes.
            </p>
            <p>
              <strong>
                Q: What&apos;s the difference between lossy and lossless
                compression?
              </strong>
              <br />A: Lossless (PNG) preserves every pixel but stays larger; lossy
              (JPEG, WebP) discards barely-noticeable detail for much smaller
              files. Photos suit lossy; logos and screenshots suit lossless.
            </p>
            <p>
              <strong>Q: Which format is best — JPEG, PNG or WebP?</strong>
              <br />A: JPEG for photos, PNG for transparency and sharp edges, and
              WebP as a modern all-rounder that beats both on size at similar
              quality.
            </p>
            <p>
              <strong>
                Q: Can I compress images without uploading them to a website?
              </strong>
              <br />A: Yes.{" "}
              <Link href="/en/compress" className="text-primary hover:underline">
                ImageMarker
              </Link>{" "}
              compresses everything in your browser, so your images are never sent
              to a server.
            </p>
          </div>

          <div className="mt-10 p-6 bg-blue-50 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">
              Shrink your images without the quality hit.
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Compress photos for free, 100% in your browser. Nothing is uploaded.
            </p>
            <Link
              href="/en/compress"
              className="inline-block px-5 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Open the Image Compressor &rarr;
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
            <Link href="/en/blog/tinypng-iloveimg-squoosh-alternatives">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  TinyPNG, iLoveIMG &amp; Squoosh Alternatives That Never Upload
                  Your Images
                </h3>
                <p className="text-sm text-muted-foreground">
                  An honest privacy comparison of free image tools — which truly
                  run in your browser.
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  Read more →
                </span>
              </article>
            </Link>
            <Link href="/en/blog/social-media-image-sizes">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  How to Resize Images for Social Media: The Complete 2026 Size
                  Guide
                </h3>
                <p className="text-sm text-muted-foreground">
                  The right dimensions for every platform — pair with compression
                  for fast-loading posts.
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  Read more →
                </span>
              </article>
            </Link>
            <Link href="/en/blog/batch-watermark-photos">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  Batch Watermark: How to Add Watermarks to 100+ Photos in Seconds
                </h3>
                <p className="text-sm text-muted-foreground">
                  Stamp a whole folder at once, then compress the set for the web.
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
