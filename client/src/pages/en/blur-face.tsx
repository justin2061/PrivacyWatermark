import ProgSeoPage from "@/components/ProgSeoPage";

export default function BlurFaceEn() {
  return (
    <ProgSeoPage
      title="Blur a Face in a Photo Online — Free, No Upload | ImageMarker"
      description="Blur faces, license plates, ID numbers and screen contents in a photo before you post it online. Mosaic, gaussian blur and solid color box modes. Everything runs in your browser — nothing is uploaded."
      canonical="https://imagemarker.app/en/blur-face"
      h1="Blur a Face in a Photo Online — Free, 100% Local"
      siteHeaderCurrent="mosaic"
      toolHref="/en/mosaic"
      toolCta="Open the free blur / mosaic tool"
      featureList={[
        "Three modes: mosaic, gaussian blur, solid color box",
        "Blur faces, license plates, ID numbers, screen contents",
        "Multiple regions on one photo, each individually removable",
        "100% local in-browser processing — no uploads",
      ]}
      intro={[
        "Blurring faces is one of those tasks that used to require Photoshop and now takes fifteen seconds in a browser. The use cases are common enough: a group photo posted to LinkedIn where one person didn't consent, a school event photo where bystanders' children are in the frame, a protest or street photo where identifying people would put them at risk, a screenshot of a group chat that shows other people's profile pictures, a photo of a receipt with someone else's name on it. This page explains how to blur a face — or a license plate, or an ID number, or a monitor screen — in a photo using ImageMarker's local-only mosaic tool, without uploading the original photo to a server.",
        "The tool offers three modes and each has a specific use. Mosaic replaces the selected region with a grid of large colored pixels — visually obvious that something has been hidden, and impossible to reverse if the pixel size is large enough. Gaussian blur smooths the region into a soft smear — subtler visually, but light blur over legible text can sometimes be partially recovered by modern models, so use heavier blur when the content matters. Solid color box replaces the region with a single fill color — the strongest option, appropriate for anything that must be non-recoverable (ID numbers, bank card numbers, medical record numbers).",
        "Practical workflow: drop a photo on the tool, drag a rectangle over each face or sensitive area, pick the mode and strength, and the preview updates immediately. Multiple regions can be added to the same photo (a group shot with three faces, for example), and each region is individually adjustable and removable, so you can iterate until the coverage is right. The download is a fresh JPG or PNG with the blur baked into the pixels — the original is unchanged and stays on your device, and the blurred version has no way for a viewer to recover what was underneath.",
        "The reason to prefer a local tool for this task is the privacy paradox at its core: the original photo, before you blur it, is exactly the version you don't want a random server to keep a copy of. Many online blur tools upload the source image, run the blur on their server, and send back the result — which means the pre-blur version sits in their storage for a retention period they never specify. ImageMarker's mosaic tool runs entirely inside your browser tab using Canvas. The source photo never leaves your device, so there is no pre-blur copy to leak. That is the whole point of a client-side tool for a task that is fundamentally about privacy.",
      ]}
      bullets={[
        "Blur, mosaic or solid-color-box faces, license plates, ID numbers, screen contents.",
        "Multiple regions on one photo, each individually adjustable and removable.",
        "Original photo never leaves your browser — no pre-blur copy on any server.",
      ]}
      faqs={[
        { q: "Can I blur just one face in a group photo?", a: "Yes. Drag a rectangle over each face you want to hide — you can add as many regions as you need, each independently sized and positioned. The rest of the photo is untouched." },
        { q: "Is my photo uploaded anywhere?", a: "No. The mosaic tool runs entirely inside your browser using Canvas. The pre-blur original never leaves your device, which is the whole point of a local tool for hiding sensitive content — the version you didn't want to share isn't sitting on a stranger's server afterwards." },
        { q: "Can someone reverse the blur and see the face underneath?", a: "Not from a properly-sized mosaic or heavy gaussian blur — the original pixels are discarded when the tool re-encodes the image. The exception is very light blur over legible text or faces, which modern AI models can sometimes partially recover. For anything that must stay unreadable (ID numbers, faces of people who could be harmed), use the solid color box mode or a heavy mosaic with large pixel blocks." },
        { q: "What's the difference between mosaic, blur and solid color?", a: "Mosaic makes it visually obvious that something has been hidden — a grid of large color blocks. Gaussian blur is subtler but can be partially reversed if too light. Solid color box completely replaces the region with one color, which is the strongest and non-reversible option — appropriate for ID numbers, credit card numbers and anything else that must stay unreadable no matter what." },
        { q: "Can I use this to hide license plates in car photos?", a: "Yes — that's one of the most common use cases, especially for photos being posted to marketplaces or social media. Solid color box mode is what most people want here: it completely hides the plate rather than just softening it, which matters because a partially-blurred plate can sometimes be read." },
        { q: "Does it work on phones?", a: "Yes. Drag-to-select the blur region works on touch as well as mouse, so blurring a face in a photo you just took on the phone is a one-step operation. No app to install." },
      ]}
      seeAlso={[
        { href: "/en/mosaic", label: "The full mosaic / blur tool" },
        { href: "/en/exif-clean", label: "Also strip GPS from the photo (EXIF cleaner)" },
        { href: "/en/", label: "Watermark the photo before sharing" },
        { href: "/en/blog/protect-photos-online", label: "Full guide to protecting photos online" },
      ]}
    />
  );
}
