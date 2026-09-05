import ProgSeoPage from "@/components/ProgSeoPage";

export default function CropPhotoEn() {
  return (
    <ProgSeoPage
      title="Crop a Photo Online — Free, No Upload | ImageMarker"
      description="Crop a photo online with pixel-perfect precision. Presets for Instagram, TikTok, LinkedIn, passport photos and custom aspect ratios. Everything runs in your browser — nothing is uploaded."
      canonical="https://imagemarker.app/en/crop-photo"
      h1="Crop a Photo Online — Free, 100% Local"
      siteHeaderCurrent="social-crop"
      toolHref="/en/social-crop"
      toolCta="Open the free photo cropper"
      featureList={[
        "Presets for every current social media size",
        "Custom aspect ratio and pixel dimensions",
        "Drag-to-position crop with live preview",
        "100% local in-browser processing — no uploads",
      ]}
      intro={[
        "Cropping a photo is deceptively particular. A slightly off-center crop for an Instagram post cuts a face in half. A 4:5 crop for a portrait works, a 1:1 crop for the same portrait loses the subject's shoulders. A LinkedIn banner (1584×396) is impossibly wide, a Twitter/X header (1500×500) is almost as bad, and a TikTok Reel (1080×1920) is impossibly tall. This page explains how to crop a photo cleanly in the browser using ImageMarker's local-only cropper, with presets for every current platform and drag-to-position control over what stays in the frame.",
        "The workflow: drop a photo on the tool, pick a preset (Instagram square, story, portrait, Reels, TikTok, YouTube thumbnail, X header, LinkedIn banner, Facebook cover, Pinterest 2:3), and the crop overlay appears at the correct aspect ratio. Drag the overlay to position it, drag the corners to resize the crop within the same ratio, and the live preview shows exactly what the final image will look like. The download is a fresh JPG or PNG at the target dimensions, ready to upload. For custom crops (banner ads, blog hero images, print pieces), switch to custom mode and enter the pixel dimensions directly.",
        "The reason cropping matters more than resizing for social media is composition. Instagram feed is a portrait 4:5 crop; if you shoot in landscape 16:9, the platform will crop the sides off automatically, often through a face. Reels and TikTok are 9:16 vertical; a landscape shot cropped centrally cuts off half the interesting parts. By cropping deliberately before upload, you keep composition control instead of letting the platform's algorithm center the crop somewhere ugly. The tool's drag-to-position overlay is what makes deliberate cropping feasible without opening Photoshop.",
        "Privacy-wise, cropping a photo before uploading it also has a practical side. Photos taken indoors often catch bystanders, personal documents in the background, a monitor with sensitive information, or a wall calendar with medical appointments. Cropping the frame down to just the subject removes all of that from the version you share. ImageMarker's cropper runs entirely inside your browser tab, so the source photo never leaves your device — which matters when the reason you are cropping is to remove sensitive material from the background before the photo goes public.",
      ]}
      bullets={[
        "Presets for Instagram, TikTok, Reels, YouTube thumbnails, X, LinkedIn, Facebook, Pinterest.",
        "Drag-to-position crop with live preview — no more platform-cropped-through-a-face uploads.",
        "Custom aspect ratios and pixel dimensions for banner ads, print pieces, blog heroes.",
      ]}
      faqs={[
        { q: "Which social media aspect ratios are covered by the presets?", a: "Instagram (1:1 square, 4:5 portrait, 9:16 story), Reels and TikTok (9:16), YouTube thumbnail (16:9), Twitter/X header (1500×500), LinkedIn banner (1584×396), Facebook cover, Pinterest 2:3, and 1:1 profile-photo presets for every platform." },
        { q: "Can I crop to a custom aspect ratio?", a: "Yes. Switch to custom mode and enter the width and height in pixels; the crop overlay updates to that ratio. Useful for print pieces, banner ads, blog hero images and platforms whose ratios aren't in the presets." },
        { q: "Is my photo uploaded anywhere?", a: "No. Cropping runs entirely inside your browser using Canvas. The source photo never leaves your device, which is why the tool is safe to use on screenshots, private photos and photos that catch sensitive material in the background." },
        { q: "Can I crop for multiple platforms from the same source?", a: "Yes — one download per crop. Because everything runs locally, cropping the same source for Instagram square, Story, Reels and LinkedIn takes only a few seconds each without any upload round-trip." },
        { q: "Does the cropper add any watermark or ad to the output?", a: "No. The output is a clean crop of your original — no watermark, no branding overlay, no ads, no promo strips." },
        { q: "Does it work on mobile?", a: "Yes. Drag-to-position the crop area works on touch as well as mouse, so cropping for a Story or Reel on the phone that shot the photo is the most direct path." },
      ]}
      seeAlso={[
        { href: "/en/social-crop", label: "The full social media cropper" },
        { href: "/en/resize-jpg", label: "Resize the cropped photo to specific dimensions" },
        { href: "/en/compress-to-200kb", label: "Compress the cropped photo to a specific size" },
        { href: "/en/blog/social-media-image-sizes", label: "Full social media image size guide" },
      ]}
    />
  );
}
