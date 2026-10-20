import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Music } from "lucide-react";
import Page from "@/app/components/Page";
import PageHero from "@/app/components/PageHero";
import MediaList from "@/app/components/MediaList";
import { SITE, music } from "@/app/lib/data";

export const metadata: Metadata = {
  title: "Media",
  description:
    "Talks, podcasts, interviews, articles and music by Dr. Olapeju Simoyan.",
};

export default function Media() {
  return (
    <Page>
      <PageHero
        eyebrow="Media"
        title="Talks, interviews and music."
        text="Watch her TEDx talk, hear her on podcasts and radio, read features about her work, and listen to her albums as Peju, The Doctor Singer."
        actions={
          <>
            <a
              href={SITE.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              YouTube channel <ArrowUpRight size={16} />
            </a>
            <Link href="/contact" className="btn-secondary">
              Book a talk
            </Link>
          </>
        }
      />

      {/* FEATURED TALK */}
      <section className="panel grid items-center gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
        <div data-reveal className="flex flex-col items-start gap-4">
          <span className="eyebrow">Featured talk</span>
          <h2 className="text-h2">The transformative power of music.</h2>
          <p className="max-w-[44ch] text-muted">
            Her TEDx talk on how song and story help us remember, connect and
            recover.
          </p>
        </div>
        <div
          data-reveal
          className="relative aspect-video overflow-hidden rounded-sm bg-ink"
        >
          <iframe
            className="absolute inset-0 size-full"
            src="https://www.youtube.com/embed/mJ3H4vsFpZI?si=DshO4edqabI1_OoX"
            title="Dr. Olapeju Simoyan TEDx talk"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </section>

      {/* MUSIC */}
      <section className="panel-soft">
        <div data-reveal>
          <span className="eyebrow">Music</span>
          <h2 className="mt-2 text-h2">Peju sings.</h2>
        </div>
        <div data-reveal-group className="mt-8 grid gap-3 md:grid-cols-3">
          {music.map((m) => (
            <a
              key={m.title}
              href={m.href}
              target="_blank"
              rel="noopener noreferrer"
              className="tile group gap-8 transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-btn bg-brand-400 text-brand-950">
                  <Music size={20} strokeWidth={1.75} />
                </span>
                <span className="eyebrow">{m.year}</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold leading-snug tracking-tight">
                  {m.title}
                </h3>
                <span className="link mt-3 inline-flex items-center gap-1 text-sm">
                  Listen now <ArrowUpRight size={14} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <MediaList />
    </Page>
  );
}