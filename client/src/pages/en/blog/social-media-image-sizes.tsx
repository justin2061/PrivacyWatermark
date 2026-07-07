import { useEffect } from "react";
import { Link } from "wouter";
import {
  setPageSeo,
  articleSchema,
  blogBreadcrumb,
  faqSchema,
} from "@/lib/seo";

const URL = "https://imagemarker.app/en/blog/social-media-image-sizes";
const OG = "https://imagemarker.app/og/social-media-image-sizes.png";

export default function SocialMediaImageSizesEn() {
  useEffect(() => {
    return setPageSeo({
      title:
        "How to Resize Images for Social Media: The Complete 2026 Size Guide | ImageMarker",
      description:
        "Every image size you need for Instagram, Facebook, LinkedIn and X in 2026 — posts, stories, profile and cover photos — plus how to resize your images free in your browser.",
      canonical: URL,
      locale: "en_US",
      ogImage: OG,
      jsonLd: [
        articleSchema({
          headline:
            "How to Resize Images for Social Media: The Complete 2026 Size Guide",
          description:
            "The recommended 2026 image dimensions for Instagram, Facebook, LinkedIn and X, why aspect ratio matters, and how to resize free in your browser.",
          url: URL,
          datePublished: "2026-07-08",
          image: OG,
        }),
        blogBreadcrumb(
          "How to Resize Images for Social Media: The Complete 2026 Size Guide",
          URL,
          "en"
        ),
        faqSchema([
          {
            q: "What is the best image size for an Instagram post in 2026?",
            a: "For a square post, 1080×1080 pixels (1:1). For a portrait post, 1080×1350 (4:5), which takes up the most vertical space in the feed. Stories and Reels are 1080×1920 (9:16). Instagram displays at 1080px wide, so uploading at that width keeps images crisp without wasting file size.",
          },
          {
            q: "Why do my social media images look blurry or get cropped?",
            a: "Two reasons. Blurriness usually means the image was uploaded smaller than the platform's display width and got upscaled. Cropping happens when the aspect ratio doesn't match what the platform expects — a landscape photo forced into a square slot loses its edges. Resizing to the correct dimensions and ratio before uploading fixes both.",
          },
          {
            q: "Should I resize images before uploading to social media?",
            a: "Yes. Resizing to each platform's recommended dimensions gives you control over the crop, keeps images sharp, and reduces file size so posts load faster. It also prevents the platform's automatic compression from being applied to an unnecessarily large original.",
          },
          {
            q: "How can I resize images for social media for free?",
            a: "Use ImageMarker's resize tool: add your image, enter the target dimensions (or pick an aspect ratio), and download. It runs entirely in your browser, so nothing is uploaded to a server.",
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
              How to Resize Images for Social Media: The Complete 2026 Size Guide
            </h1>
          </header>

          <img
            src={OG}
            alt="Social media image sizes — the complete 2026 guide"
            width={1200}
            height={630}
            className="w-full rounded-xl border mb-8"
          />

          <div className="prose prose-neutral max-w-none">
            <p>
              You spend real effort on a photo, post it, and the platform crops
              off the top of someone&apos;s head or renders it soft and pixelated.
              It&apos;s one of the small, persistent frustrations of posting online
              &mdash; and it&apos;s almost always a sizing problem, not a
              photography one. Every network expects images at particular
              dimensions and aspect ratios, and when your file doesn&apos;t match,
              it gets cropped or upscaled to fit. This guide lists the sizes that
              actually matter in 2026 and shows how to hit them in seconds.
            </p>

            <h2>Two Numbers That Decide Everything</h2>
            <p>
              Before the tables, the concepts. Two things determine how your image
              renders: its <strong>aspect ratio</strong> (the shape &mdash; square,
              portrait, landscape) and its <strong>resolution</strong> (the pixel
              dimensions). Aspect ratio decides whether the platform crops your
              image; resolution decides whether it looks sharp. Match the ratio and
              nothing gets cut off. Meet or slightly exceed the display width and
              nothing looks blurry. Get both right and your image appears exactly
              as you intended.
            </p>

            <h2>Instagram</h2>
            <ul>
              <li>
                <strong>Square post:</strong> 1080&times;1080 (1:1)
              </li>
              <li>
                <strong>Portrait post:</strong> 1080&times;1350 (4:5) &mdash; the
                most feed space you can claim
              </li>
              <li>
                <strong>Landscape post:</strong> 1080&times;566 (1.91:1)
              </li>
              <li>
                <strong>Stories &amp; Reels:</strong> 1080&times;1920 (9:16)
              </li>
              <li>
                <strong>Profile photo:</strong> 320&times;320 (displayed as a
                circle)
              </li>
            </ul>
            <p>
              Instagram displays feed images at 1080px wide, so that&apos;s your
              target width. Portrait 4:5 is the workhorse for reach because it
              fills more of the vertical feed than a square.
            </p>

            <h2>Facebook</h2>
            <ul>
              <li>
                <strong>Shared post (landscape):</strong> 1200&times;630 (1.91:1)
              </li>
              <li>
                <strong>Square post:</strong> 1080&times;1080 (1:1)
              </li>
              <li>
                <strong>Stories:</strong> 1080&times;1920 (9:16)
              </li>
              <li>
                <strong>Profile photo:</strong> 170&times;170 minimum
              </li>
              <li>
                <strong>Cover photo:</strong> 851&times;315 on desktop
              </li>
            </ul>
            <p>
              The 1200&times;630 landscape is also the standard for link-preview
              images &mdash; the same dimensions used for Open Graph cards across
              the web, which is why it&apos;s such a safe default.
            </p>

            <h2>LinkedIn</h2>
            <ul>
              <li>
                <strong>Shared post image:</strong> 1200&times;627 (1.91:1)
              </li>
              <li>
                <strong>Square post:</strong> 1080&times;1080 (1:1)
              </li>
              <li>
                <strong>Profile photo:</strong> 400&times;400 recommended
              </li>
              <li>
                <strong>Personal cover / background:</strong> 1584&times;396
              </li>
              <li>
                <strong>Company page logo:</strong> 300&times;300
              </li>
            </ul>

            <h2>X (Twitter)</h2>
            <ul>
              <li>
                <strong>In-stream (landscape) image:</strong> 1600&times;900
                (16:9)
              </li>
              <li>
                <strong>Square image:</strong> 1080&times;1080 (1:1)
              </li>
              <li>
                <strong>Profile photo:</strong> 400&times;400 (displayed as a
                circle)
              </li>
              <li>
                <strong>Header / banner:</strong> 1500&times;500 (3:1)
              </li>
            </ul>
            <p>
              X compresses aggressively, so uploading at a generous resolution like
              1600&times;900 gives the recompression more to work with and keeps
              your image looking clean in the timeline.
            </p>

            <h2>A Few Rules That Cut Through the Numbers</h2>
            <ul>
              <li>
                <strong>1080px wide is the universal safe width.</strong> Almost
                every feed displays around it, so a 1080px-wide image looks sharp
                nearly everywhere.
              </li>
              <li>
                <strong>Vertical wins on mobile.</strong> 4:5 and 9:16 fill more of
                a phone screen and stop the scroll; landscape leaves empty bands.
              </li>
              <li>
                <strong>Keep important content away from the edges.</strong> The
                same image is cropped differently across placements &mdash; keep
                faces and text safely inside the frame.
              </li>
              <li>
                <strong>Design your link-preview card at 1200&times;630.</strong>{" "}
                It&apos;s the one ratio shared by Facebook, LinkedIn and web Open
                Graph previews.
              </li>
            </ul>

            <h2>How to Resize in Your Browser &mdash; Free and Private</h2>
            <p>
              You don&apos;t need Photoshop or an account for this. With{" "}
              <Link href="/en/resize" className="text-primary hover:underline">
                ImageMarker&apos;s resize tool
              </Link>{" "}
              you can hit any of these dimensions in seconds, and because it runs{" "}
              <strong>entirely in your browser</strong>, your images are never
              uploaded to a server.
            </p>
            <ol>
              <li>
                <strong>
                  Open{" "}
                  <Link
                    href="/en/resize"
                    className="text-primary hover:underline"
                  >
                    imagemarker.app/en/resize
                  </Link>
                </strong>{" "}
                and add your image.
              </li>
              <li>
                <strong>Enter the target dimensions</strong> for your platform
                &mdash; say 1080&times;1350 for an Instagram portrait post.
              </li>
              <li>
                <strong>Download</strong> the resized image, ready to post.
              </li>
            </ol>
            <p>
              For the best result, resize first and then run the file through a{" "}
              <Link href="/en/compress" className="text-primary hover:underline">
                compressor
              </Link>{" "}
              so it loads fast without visible quality loss &mdash; and if the
              image is your own work, add a{" "}
              <Link href="/en/" className="text-primary hover:underline">
                watermark
              </Link>{" "}
              before it goes public.
            </p>

            <h2>FAQ</h2>
            <p>
              <strong>
                Q: What is the best image size for an Instagram post in 2026?
              </strong>
              <br />A: 1080&times;1080 for square, 1080&times;1350 for portrait
              (best reach), and 1080&times;1920 for Stories and Reels.
            </p>
            <p>
              <strong>
                Q: Why do my social media images look blurry or get cropped?
              </strong>
              <br />A: Blur means the image was smaller than the display width and
              got upscaled; cropping means the aspect ratio didn&apos;t match.
              Resizing to the correct dimensions fixes both.
            </p>
            <p>
              <strong>
                Q: Should I resize images before uploading to social media?
              </strong>
              <br />A: Yes &mdash; it gives you control over the crop, keeps images
              sharp, and reduces file size so posts load faster.
            </p>
            <p>
              <strong>
                Q: How can I resize images for social media for free?
              </strong>
              <br />A: Use{" "}
              <Link href="/en/resize" className="text-primary hover:underline">
                ImageMarker&apos;s resize tool
              </Link>{" "}
              &mdash; enter the dimensions and download. It runs in your browser
              with no upload.
            </p>
          </div>

          <div className="mt-10 p-6 bg-blue-50 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">
              Resize for any platform in seconds.
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Free, 100% in your browser. Enter the dimensions and download &mdash;
              nothing uploaded.
            </p>
            <Link
              href="/en/resize"
              className="inline-block px-5 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Open the Resize Tool &rarr;
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
            <Link href="/en/blog/image-compression-guide">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  Image Compression: How to Reduce File Size Without Losing
                  Quality
                </h3>
                <p className="text-sm text-muted-foreground">
                  Shrink your resized images for the web without visible quality
                  loss.
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  Read more →
                </span>
              </article>
            </Link>
            <Link href="/en/blog/watermark-best-practices">
              <article className="block border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium mb-1">
                  Watermark Best Practices: Placement, Opacity &amp; Design Tips
                </h3>
                <p className="text-sm text-muted-foreground">
                  Protect your own work before you post it to social media.
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
                  Preparing a whole set for social? Stamp them all at once.
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
