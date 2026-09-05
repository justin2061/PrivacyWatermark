import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { setPageSeo, webAppSchema, faqSchema } from "@/lib/seo";
import type { NavKey } from "@/lib/tools";

// Shared shell for the /en/ programmatic-SEO landing pages
// (compress-to-Nkb, convert-*-to-jpg, resize-jpg, crop-photo, blur-face).
// Each page passes its own title, H1, intro, feature list, FAQ set and the
// href of the underlying tool. The tool itself lives on its own route — this
// page is the SEO surface for the long-tail query, with a prominent CTA into
// the tool, plus a FAQPage JSON-LD block Google can pick up.

export interface ProgSeoFaq {
  q: string;
  a: string;
}

export interface ProgSeoPageProps {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  h1: string;
  /** One or more paragraphs of 300-500 word SEO body copy. */
  intro: string[];
  /** Short feature/benefit bullets shown as a 3-column grid. */
  bullets?: string[];
  /** FAQ pairs — rendered visibly and emitted as FAQPage JSON-LD. */
  faqs: ProgSeoFaq[];
  /** Href of the actual working tool this landing page funnels to. */
  toolHref: string;
  /** Label for the primary CTA button. */
  toolCta: string;
  /** Current tool key for the SiteHeader active-state — falls back to none. */
  siteHeaderCurrent?: NavKey;
  /** WebApplication feature list for the JSON-LD (short bullets). */
  featureList: string[];
  /** Optional secondary link list ("See also") — { href, label } tuples. */
  seeAlso?: { href: string; label: string }[];
}

export default function ProgSeoPage(props: ProgSeoPageProps) {
  const {
    title,
    description,
    canonical,
    ogImage,
    h1,
    intro,
    bullets,
    faqs,
    toolHref,
    toolCta,
    siteHeaderCurrent,
    featureList,
    seeAlso,
  } = props;

  useEffect(() => {
    return setPageSeo({
      title,
      description,
      canonical,
      locale: "en_US",
      ogImage,
      jsonLd: [
        webAppSchema({
          name: h1,
          description,
          url: canonical,
          inLanguage: "en",
          featureList,
        }),
        faqSchema(faqs),
      ],
    });
  }, [title, description, canonical, ogImage, h1, featureList, faqs]);

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader lang="en" current={siteHeaderCurrent} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 leading-snug">
          {h1}
        </h1>

        <Card className="p-6 bg-blue-50 border-blue-200 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-sm text-gray-700 leading-relaxed">
                <Lock className="inline w-4 h-4 text-blue-600 mr-1" aria-hidden="true" />
                <strong>100% local processing.</strong> The tool runs entirely
                inside your browser — nothing is uploaded to any server.
              </p>
            </div>
            <Link
              href={toolHref}
              className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              {toolCta}
              <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
            </Link>
          </div>
        </Card>

        <section className="prose prose-sm sm:prose max-w-none text-gray-700 mb-10">
          {intro.map((p, i) => (
            <p key={i} className="mb-4 leading-relaxed">
              {p}
            </p>
          ))}
        </section>

        {bullets && bullets.length > 0 && (
          <section className="mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {bullets.map((b, i) => (
                <Card key={i} className="p-4">
                  <CheckCircle2
                    className="w-5 h-5 text-green-600 mb-2"
                    aria-hidden="true"
                  />
                  <p className="text-sm text-gray-700 leading-relaxed">{b}</p>
                </Card>
              ))}
            </div>
          </section>
        )}

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <Card key={i} className="p-5">
                <p className="text-base font-semibold text-gray-900 mb-2">
                  {f.q}
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">{f.a}</p>
              </Card>
            ))}
          </div>
        </section>

        <div className="mt-8 p-6 bg-blue-50 rounded-lg text-center">
          <p className="text-base text-gray-800 mb-3">
            Ready to try it? The tool loads instantly — no sign-up, no upload.
          </p>
          <Link
            href={toolHref}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            {toolCta}
            <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
          </Link>
        </div>

        {seeAlso && seeAlso.length > 0 && (
          <section className="mt-10 pt-6 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-2">See also</p>
            <ul className="text-sm text-gray-600 space-y-1">
              {seeAlso.map((s, i) => (
                <li key={i}>
                  <Link
                    href={s.href}
                    className="text-blue-600 hover:underline"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      <SiteFooter lang="en" />
    </div>
  );
}
