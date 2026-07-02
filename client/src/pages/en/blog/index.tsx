import { useEffect } from "react";
import { Link } from "wouter";
import { setPageSeo } from "@/lib/seo";

type Category = "Security" | "Photography" | "Tutorial" | "Privacy";

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: Category;
}

const articles: Article[] = [
  {
    slug: "tinypng-iloveimg-squoosh-alternatives",
    title:
      "TinyPNG, iLoveIMG & Squoosh Alternatives That Never Upload Your Images (2026)",
    excerpt:
      "TinyPNG and iLoveIMG process your images on their servers. An honest comparison of 4 free image tools by privacy: which ones truly run in your browser, plus batch, watermark and EXIF features.",
    date: "2026-07-03",
    category: "Privacy",
  },
  {
    slug: "digital-identity-protection",
    title: "Digital Identity Protection: 7 Steps to Keep Your Documents Safe",
    excerpt:
      "A practical 7-step guide to digital identity protection: watermark documents, strip EXIF data, share securely, and prevent online identity theft.",
    date: "2026-06-28",
    category: "Privacy",
  },
  {
    slug: "watermark-best-practices",
    title: "Watermark Best Practices: Placement, Opacity & Design Tips",
    excerpt:
      "Where should a watermark go? What opacity works best? Learn placement, opacity, color and design tips to protect your images without ruining them.",
    date: "2026-06-28",
    category: "Photography",
  },
  {
    slug: "remove-exif-data",
    title: "Why You Should Remove EXIF Data Before Sharing Photos",
    excerpt:
      "Your photos carry hidden EXIF metadata — GPS location, device and timestamps. Learn the risks and how to remove EXIF data free, right in your browser.",
    date: "2026-06-28",
    category: "Privacy",
  },
  {
    slug: "batch-watermark-images",
    title: "How to Batch Watermark Multiple Images at Once — Free Tool",
    excerpt:
      "Need to watermark dozens of photos at once? Batch watermark multiple images free in your browser — faster than Photoshop or Lightroom, no upload required.",
    date: "2026-06-28",
    category: "Tutorial",
  },
  {
    slug: "rental-scam-prevention",
    title: "Rental Application Safety: Watermark Documents Before Sharing",
    excerpt:
      "Renting a place means handing over your ID and pay stubs. Learn how rental scammers exploit your documents and how watermarking protects you.",
    date: "2026-06-28",
    category: "Security",
  },
  {
    slug: "protect-photos-online",
    title: "How to Protect Your Photos Online — Complete Guide for Photographers",
    excerpt:
      "A complete guide to protecting your photos online: watermarks vs metadata vs DRM, copyright basics, and a practical workflow for photographers.",
    date: "2026-06-28",
    category: "Photography",
  },
  {
    slug: "watermark-photos-free",
    title: "Best Free Online Watermark Tool 2026 — No Upload Required",
    excerpt:
      "Looking for a free watermark tool that doesn't upload your photos? Compare the best client-side tools of 2026 and why local processing protects privacy.",
    date: "2026-06-28",
    category: "Tutorial",
  },
  {
    slug: "watermark-id-documents",
    title: "How to Add Watermark to ID Documents — Protect Your Identity Online",
    excerpt:
      "Sharing a photo of your passport or ID? Add a watermark first. Learn why unprotected ID documents are risky and how to watermark them free in your browser.",
    date: "2026-06-28",
    category: "Security",
  },
  {
    slug: "watermark-photos-online",
    title: "How to Add Watermark to Photos Online — Free Tool (2026)",
    excerpt:
      "Learn how to add watermarks to your photos for free. Protect your photography with text or logo watermarks — no software needed, 100% private.",
    date: "2026-06-25",
    category: "Photography",
  },
];

const categoryStyles: Record<Category, string> = {
  Security: "bg-red-100 text-red-800",
  Photography: "bg-purple-100 text-purple-800",
  Tutorial: "bg-blue-100 text-blue-800",
  Privacy: "bg-green-100 text-green-800",
};

export default function BlogIndexEn() {
  useEffect(() => {
    return setPageSeo({
      title: "ImageMarker Blog — Photo Security & Watermark Guides",
      description: "Guides on watermarking photos and documents, removing EXIF data, and protecting your privacy online — all from ImageMarker, the free 100% browser-based tool.",
      canonical: "https://imagemarker.app/en/blog",
      locale: "en_US",
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
        <div className="mb-10">
          <h1 className="text-3xl font-bold leading-snug">ImageMarker Blog</h1>
          <p className="mt-3 text-muted-foreground">
            Practical guides on watermarking photos and documents, removing EXIF
            metadata, and protecting your privacy online. Every tool we cover runs
            100% in your browser — nothing is ever uploaded.
          </p>
        </div>

        <ul className="space-y-6">
          {articles.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/en/blog/${article.slug}`}
                className="block rounded-xl border bg-card p-6 transition-colors hover:border-foreground/30 hover:bg-accent/40"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryStyles[article.category]}`}
                  >
                    {article.category}
                  </span>
                  <time
                    dateTime={article.date}
                    className="text-xs text-muted-foreground"
                  >
                    {article.date}
                  </time>
                </div>
                <h2 className="text-xl font-semibold leading-snug">
                  {article.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {article.excerpt}
                </p>
                <span className="mt-3 inline-block text-sm font-medium text-primary">
                  Read more →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <footer className="border-t mt-8">
        <div className="max-w-3xl mx-auto px-4 py-8 text-sm text-muted-foreground">
          <p>© 2026 ImageMarker — Protecting your privacy.</p>
          <Link href="/en/" className="mt-1 inline-block hover:text-foreground transition-colors">
            ← Back to the watermark tool
          </Link>
        </div>
      </footer>
    </div>
  );
}
