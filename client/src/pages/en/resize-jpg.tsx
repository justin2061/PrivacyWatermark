import ProgSeoPage from "@/components/ProgSeoPage";

export default function ResizeJpgEn() {
  return (
    <ProgSeoPage
      title="Resize JPG Online — Free, No Upload | ImageMarker"
      description="Resize a JPG photo by pixel dimensions or percentage right in your browser. Presets for LinkedIn, passport photos and social media. Aspect ratio lock prevents distortion. Nothing is uploaded."
      canonical="https://imagemarker.app/en/resize-jpg"
      h1="Resize a JPG Image Online — Free, 100% Local"
      siteHeaderCurrent="resize"
      toolHref="/en/resize"
      toolCta="Open the free image resizer"
      featureList={[
        "100% local in-browser resizing via Canvas",
        "Resize by pixel dimensions or percentage",
        "Aspect ratio lock prevents distortion",
        "Instant preview with output file size",
      ]}
      intro={[
        "Resizing a JPG is one of those tasks that sounds trivial until you actually need to hit a specific size for a specific form. LinkedIn profile photo is 400×400 (or 1024×1024 for the high-res version). Instagram post is 1080×1080. Facebook cover photo is 851×315. Passport photo submissions are usually 600×600 or 900×1200 depending on country. A US driver's license upload wants 1200 px on the long side. Getting a JPG to any of these specific sizes, without stretching or distorting the image, is what a resizer does. This page walks through how to resize a JPG in the browser using ImageMarker's local-only resizer.",
        "The workflow: drop a JPG on the tool, enter the target dimensions in pixels (or the target percentage), and the browser's Canvas API resamples the image with a high-quality bilinear or bicubic filter. The output is a fresh JPG at the chosen size — no metadata quirks, no format shifts, just a resized copy of the same image. Aspect ratio is locked by default, so entering the width automatically updates the height proportionally. Unlocking the ratio lets you resize to an exact non-proportional target (say, cropping-then-resizing to fit a rigid form field), but for most cases you want the lock on.",
        "There are two dimensions to the size question: pixel dimensions and file size. Resizing to smaller pixel dimensions almost always cuts file size dramatically — a 4000×3000 JPG resized to 1200×900 is one-tenth the pixel count, and roughly one-fifth to one-tenth the file size in bytes. If you need to hit a specific byte size (say, under 200 KB or 100 KB), resize first, then run through the compressor to trim quality until the file is under the cap. That combination gets essentially any phone photo under a specific size target while keeping faces, text and details legible.",
        "The privacy note is the same one that applies to every ID-related upload: many 'free online resizers' upload your image to their servers to run the resize step. That is usually invisible in the workflow, but the image sits on their servers afterwards for a retention period they never specify. ImageMarker's resizer runs entirely inside your browser tab using Canvas — the JPG never crosses the network, and there is no server-side copy to leak. That matters most when the JPG in question is a passport photo, a license scan, or an ID copy that needs to be resized for an application form.",
      ]}
      bullets={[
        "Presets for LinkedIn (400×400, 1024×1024), passport photos, Instagram, Facebook, HD/4K.",
        "Aspect ratio lock prevents the stretched-face problem when resizing portrait photos.",
        "Combine with the compressor to hit both a pixel-dimension and a byte-size target.",
      ]}
      faqs={[
        { q: "Can I resize by exact pixel dimensions or by percentage?", a: "Both. Enter width and height in pixels when the destination is a specific form (LinkedIn 400×400, passport photo 600×600), or enter a percentage when you just want the image smaller. The two inputs update each other automatically." },
        { q: "Does resizing keep the aspect ratio?", a: "Yes by default. Aspect ratio lock is on, so changing width updates height proportionally. Unlock it only when you deliberately want to stretch or squash — the wrong-aspect result on a portrait is usually obvious." },
        { q: "Will resizing to smaller dimensions reduce file size?", a: "Almost always, and often dramatically. A 4000×3000 JPG resized to 1200×900 is roughly one-fifth to one-tenth the file size in bytes. For heavy uploads, resize before compress." },
        { q: "Is the resized JPG uploaded to any server?", a: "No. ImageMarker's resizer runs entirely inside your browser tab using Canvas, so the source JPG never leaves your device. This is important when the JPG is a passport photo or ID scan being resized for an application form." },
        { q: "What quality filter does the tool use?", a: "The browser's Canvas API applies a bicubic-quality resampling filter by default, which is what modern photo editors use. Sharp text and edges stay clean; smooth gradients stay smooth. The result is visually indistinguishable from the same resize done in Photoshop for most inputs." },
        { q: "Can I resize a whole batch of JPGs?", a: "Yes — the resize step is fast enough that running through a folder of JPGs one at a time takes seconds. For batch resize as part of a watermarking or export workflow, the batch watermark tool exports each image at a target size in a single operation." },
      ]}
      seeAlso={[
        { href: "/en/resize", label: "The full image resizer (presets and custom sizes)" },
        { href: "/en/compress-to-200kb", label: "Then compress the JPG to a specific byte size" },
        { href: "/en/social-crop", label: "Crop for social media (Instagram, Reels, TikTok)" },
        { href: "/en/blog/social-media-image-sizes", label: "Full social media image size guide" },
      ]}
    />
  );
}
