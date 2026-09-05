import ProgSeoPage from "@/components/ProgSeoPage";

export default function ConvertHeicToJpgEn() {
  return (
    <ProgSeoPage
      title="Convert HEIC to JPG Online — Free, No Upload | ImageMarker"
      description="Convert iPhone HEIC photos to JPG right in your browser. The decoder runs locally in WebAssembly, so your photos never leave your device. Supports batch conversion and preserves image quality. No install, no sign-up."
      canonical="https://imagemarker.app/en/convert-heic-to-jpg"
      h1="Convert HEIC to JPG Online — Free, 100% Local"
      siteHeaderCurrent="convert"
      toolHref="/en/convert/heic-to-jpg"
      toolCta="Open the HEIC → JPG converter"
      featureList={[
        "100% local in-browser HEIC decoding via WebAssembly",
        "No upload — photos never leave your device",
        "Supports batch HEIC to JPG conversion",
        "Preserves image quality at the JPG re-encode step",
      ]}
      intro={[
        "HEIC is the default photo format on iPhones since iOS 11, and it produces smaller files than JPG at the same quality — which is great for storage on the phone, and a real problem the moment you try to send one of those photos to a Windows PC, an older Android device, an email attachment, a government form, or a web upload that only accepts JPG. Windows can preview HEIC only with an installed extension; most upload forms reject the format outright. This page explains how to convert HEIC to JPG in the browser using ImageMarker's local-only converter, without uploading your original photos to a stranger's server.",
        "The technical wrinkle is that browsers do not natively decode HEIC — the format uses HEVC compression, and the licensing of that codec means no browser ships a decoder in the standard image pipeline. ImageMarker solves this with a WebAssembly HEIC decoder that runs inside your browser tab: the HEIC bytes get parsed and decoded locally, then re-encoded to JPG by the browser's Canvas API. The photo never touches a server — which is significant, because most online HEIC converters silently upload the file to their servers just to run the decode step.",
        "Practical use cases: converting a batch of holiday photos before uploading them to a Windows PC, converting a photo of a receipt or document taken on an iPhone before sending it to a government portal that only accepts JPG, converting a photo of an ID or passport before submitting it to a KYC form, converting screenshots for a blog post or a support ticket. The output is a standard JPG that opens on any device, any operating system, any web browser or email client.",
        "Quality-wise, the re-encode step uses the browser's Canvas API with the JPG quality set to preserve visible detail — the resulting JPG is visually indistinguishable from the HEIC original at normal viewing distance. If file size matters (say the destination form has a size cap), the output can be further compressed with the size slider in the compressor. If you need multiple sizes, convert once and resize the JPG rather than converting from HEIC each time.",
      ]}
      bullets={[
        "The WebAssembly HEIC decoder runs entirely inside the browser tab — nothing uploads.",
        "Batch mode: drop a folder of HEIC files and get JPGs back in one operation.",
        "JPG output is universally compatible with Windows, Android, email, print, government forms.",
      ]}
      faqs={[
        { q: "Why can't Windows or Android open HEIC files directly?", a: "HEIC uses the HEVC codec, which requires paid licensing that Microsoft and Google chose not to include by default. Windows requires two installed extensions from the Microsoft Store; older Android versions cannot open HEIC at all. Converting to JPG side-steps all of that." },
        { q: "Is my photo uploaded to a server to be decoded?", a: "No. ImageMarker uses a WebAssembly HEIC decoder that runs inside your browser tab, so both the decode and the re-encode happen locally. This is unusual — most 'free online HEIC converters' upload your photo to their server to run the decode step, then send the JPG back." },
        { q: "Does converting HEIC to JPG lose quality?", a: "There is a small quality loss at the JPG re-encode step (JPG is lossy), but the tool uses a high quality setting so the visual difference is essentially invisible at normal viewing. If you need pixel-perfect fidelity, convert to PNG instead — PNG is lossless." },
        { q: "Can I convert multiple HEIC files at once?", a: "Yes. Drop or select multiple HEIC files and the tool processes them locally in batch, then packages the JPG outputs together for download. The heavier the batch, the more your device's memory matters, but a mid-range laptop handles 100+ HEIC files comfortably." },
        { q: "Does the output JPG carry the HEIC's Live Photo or Portrait mode data?", a: "No — Live Photo motion and Portrait mode depth data are HEIC-specific containers that JPG doesn't support. The output is a standard still JPG image of the primary frame. EXIF (date, camera model, GPS if present) is copied over by default; use the EXIF cleaner if you want to strip that as well." },
        { q: "What if the HEIC file has the .heif extension instead?", a: "HEIF and HEIC are the same underlying container with different extensions — HEIF is the format name, HEIC is Apple's file extension. The converter accepts both." },
      ]}
      seeAlso={[
        { href: "/en/convert/heic-to-jpg", label: "The full HEIC → JPG converter" },
        { href: "/en/convert-png-to-jpg", label: "Convert PNG to JPG" },
        { href: "/en/convert-webp-to-jpg", label: "Convert WebP to JPG" },
        { href: "/en/exif-clean", label: "Strip EXIF metadata from the converted JPG" },
      ]}
    />
  );
}
