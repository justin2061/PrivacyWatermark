import ProgSeoPage from "@/components/ProgSeoPage";

export default function CompressTo100kbEn() {
  return (
    <ProgSeoPage
      title="Compress Image to 100KB Online — Free, No Upload | ImageMarker"
      description="Compress a photo down to 100KB in your browser. Some government forms, exam boards and legacy portals cap uploads at 100KB — this tool combines resize and quality slider to hit that target while keeping the image legible. Nothing is uploaded."
      canonical="https://imagemarker.app/en/compress-to-100kb"
      h1="Compress an Image to 100 KB Online — Free, No Upload"
      siteHeaderCurrent="compress"
      toolHref="/en/compress"
      toolCta="Open the free compressor"
      featureList={[
        "100% local in-browser processing — no uploads",
        "Aggressive quality range for hard 100 KB targets",
        "Pairs with the resizer for very small file targets",
        "Supports JPG, PNG and WebP input",
      ]}
      intro={[
        "100 KB is a genuinely tight target. Some government forms, exam boards, legacy HR portals and older forums still cap image uploads at 100 KB or less, and a modern phone photo (often 3-5 MB) has to shrink by 30-50x to fit. Doing that without ruining the image takes more than just dragging the quality slider — but it is straightforward once you know the order: resize first, then compress. This page explains how to hit 100 KB cleanly using ImageMarker's local-only compressor and resizer.",
        "The trick is that file size shrinks super-linearly with pixel count, not with quality. Dropping quality alone from 85% to 30% might cut a 4 MB photo in half; halving the pixel dimensions (say from 4000×3000 to 2000×1500) cuts it to a quarter without touching quality at all. So the workflow to hit 100 KB from a phone photo is: resize to 1200-1500 px on the long side first, then compress at 55-70% JPG or WebP. That combination almost always lands under 100 KB while keeping faces, text and identifying details fully legible — which is usually what a form actually cares about.",
        "For screenshots and images with large flat colored areas, PNG is a trap at this size target. Convert to JPG or WebP as part of the compress step — the size drop is often 60-80% before the quality slider does anything. WebP is the smaller of the two by roughly 25%, but if the destination form only accepts JPG (a lot of government portals still do), JPG is what you want.",
        "Everything happens in your browser. The photo you are shrinking is often an ID scan, a signed form, an application document, or a passport photo — files where the wrong online tool becomes a bigger risk than the original size problem. ImageMarker's compressor uses the browser's Canvas API to encode locally, so the source file never crosses the network. That is the whole point of a local-only tool for a task that is fundamentally about privacy.",
      ]}
      bullets={[
        "Combines with the resizer for aggressive 100 KB targets on 4K phone photos.",
        "JPG and WebP output — JPG for legacy government forms, WebP for the smallest possible file.",
        "Live size preview so you can dial the slider in precisely rather than compressing repeatedly.",
      ]}
      faqs={[
        { q: "Can I hit 100 KB without resizing the image first?", a: "Sometimes, if the source is already small. A 1500×1000 phone photo might land under 100 KB at 60% JPG. Anything above 3 MP usually needs a resize step to hit 100 KB without ugly compression artifacts. Resize first, then compress." },
        { q: "What quality setting should I try first?", a: "60% JPG on a resized 1200 px image is a good first guess. The compressor shows the resulting file size in real time, so adjust up or down until you are just under 100 KB. Anything below 40% starts to show visible block artifacts on faces and text." },
        { q: "Does compressing to 100 KB make the photo unreadable?", a: "Not if you resize first. A 1200 px wide photo at 60% JPG keeps faces, text and identifying details legible — which is what forms actually need. The mistake most people make is trying to force a 4000 px photo down to 100 KB with quality alone, which produces the ugly block-artifact photos you see on old forums." },
        { q: "Is my photo uploaded to a server?", a: "No. ImageMarker's compressor runs entirely inside your browser, so the source photo never leaves your device. That is especially important for the ID scans, application forms and passport photos that often carry a 100 KB upload cap." },
        { q: "Which format is smallest at 100 KB?", a: "WebP is roughly 25% smaller than JPG at the same visual quality. JPG is safer for compatibility — a lot of government and academic upload forms only accept JPG. The compressor supports both output formats and you can switch at any time." },
        { q: "Does the tool watermark or add an overlay to the compressed image?", a: "No. There are no watermarks, no branding overlays, no ads on the output. The compressed image is a clean re-encoding of your original, with only the pixels and format that you asked for." },
      ]}
      seeAlso={[
        { href: "/en/compress-to-200kb", label: "Compress to 200 KB (easier target)" },
        { href: "/en/resize-jpg", label: "Resize a JPG first, then compress" },
        { href: "/en/convert-png-to-jpg", label: "Convert PNG to JPG for smaller size" },
        { href: "/en/blog/image-compression-guide", label: "Full image compression guide" },
      ]}
    />
  );
}
