import { ArrowRight } from "lucide-react";

/**
 * Inline arrow used in "read more" / CTA style links.
 *
 * Rendered as an SVG icon instead of the literal "→" character so it displays
 * consistently across devices. The site's body font (Inter) does not include
 * the arrow glyph, so "→" falls back to each visitor's system font — which can
 * look broken or garbled in some environments. An SVG avoids that entirely.
 */
export function ReadMoreArrow({ className = "" }: { className?: string }) {
  return (
    <ArrowRight
      aria-hidden="true"
      className={`inline-block w-3.5 h-3.5 ml-0.5 align-[-0.2em] ${className}`}
    />
  );
}
