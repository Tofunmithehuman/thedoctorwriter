import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Page from "@/app/components/Page";
import PageHero from "@/app/components/PageHero";
import BooksShowcase from "@/app/components/Booksshowcase";
import { SITE, reviews } from "@/app/lib/data";

export const metadata: Metadata = {
  title: "Books",
  description:
    "Books by Dr. Olapeju Simoyan on recovery, women in medicine, Christmas music, nature and travel.",
};

export default function Books() {
  return (
    <Page>
      <PageHero
        eyebrow="Books"
        title="Books for healing, learning and wonder."
        text="From recovery guides and women in medicine to Christmas carol history, nature and travel photography, each book grows out of a physician’s curiosity and an artist’s eye."
        actions={
          <>
            <a
              href={SITE.amazon}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Shop on Amazon <ArrowUpRight size={16} />
            </a>
            <a
              href={SITE.store}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Digital store <ArrowUpRight size={16} />
            </a>
          </>
        }
      />

      <BooksShowcase full />

      {/* REVIEWS */}
      <section className="panel-soft">
        <div data-reveal>
          <span className="eyebrow">Reviews</span>
          <h2 className="mt-2 text-h2">What readers and reviewers say.</h2>
        </div>
        <div data-reveal-group className="mt-8 grid gap-3 md:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.quote} className="tile gap-8">
              <blockquote className="text-lg leading-snug tracking-tight">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption>
                <span className="eyebrow block">{r.source}</span>
                <span className="mt-1 block text-sm italic text-muted">
                  {r.book}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="panel-brand flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
        <div data-reveal>
          <h2 className="text-h2 text-brand-950!">Never miss a new release.</h2>
          <p className="mt-2 max-w-[46ch] text-brand-900">
            Follow Dr. Simoyan on Amazon for updates on new books and
            collaborations with other authors.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={SITE.amazon}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-dark"
          >
            Follow on Amazon <ArrowUpRight size={16} />
          </a>
          <a
            href={SITE.catalog}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary border-brand-950/20 bg-transparent"
          >
            Flip-book catalog <ArrowUpRight size={16} />
          </a>
        </div>
      </section>
    </Page>
  );
}