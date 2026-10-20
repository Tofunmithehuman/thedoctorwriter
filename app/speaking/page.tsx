import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  GraduationCap,
  Play,
  School,
  Sprout,
} from "lucide-react";
import Page from "@/app/components/Page";
import PageHero from "@/app/components/PageHero";
import Photo from "@/app/components/Photo";
import { IMG, audiences, pastTalks } from "@/app/lib/data";

export const metadata: Metadata = {
  title: "Speaking",
  description:
    "Speaking engagements for students and educators on writing, music and the arts for mental health and resilience.",
};

const icons = [Sprout, School, GraduationCap];

export default function Speaking() {
  return (
    <Page>
      <PageHero
        eyebrow="Speaking"
        title="Inspiring students and educators."
        text="Creativity isn’t just an outlet. It’s a vital tool for emotional well-being, self-expression and resilience. Dr. Simoyan blends medicine and the arts to show how writing, music and storytelling support mental health."
        image={{
          src: IMG.camera,
          alt: "Dr. Simoyan in scrubs holding a camera",
        }}
        actions={
          <>
            <Link href="/contact" className="btn-primary">
              Book a talk <ArrowUpRight size={16} />
            </Link>
            <Link href="/media" className="btn-secondary">
              <Play size={16} /> Watch TEDx
            </Link>
          </>
        }
      />

      {/* AUDIENCES */}
      <section className="panel">
        <div data-reveal>
          <span className="eyebrow">Tailored sessions</span>
          <h2 className="mt-2 text-h2">Sessions for every audience.</h2>
        </div>
        <div data-reveal-group className="mt-8 grid gap-3 lg:grid-cols-3">
          {audiences.map((a, i) => {
            const Icon = icons[i];
            return (
              <div
                key={a.title}
                className="card-interactive flex flex-col gap-4"
              >
                <span className="grid size-11 place-items-center rounded-btn bg-brand-400 text-brand-950">
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                <h3 className="card-title">{a.title}</h3>
                <ul className="flex flex-col gap-3 text-sm text-muted">
                  {a.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span
                        aria-hidden
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-500"
                      />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* STATEMENT + PHOTO */}
      <section className="panel-soft grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div data-reveal className="flex flex-col gap-4">
          <span className="eyebrow">Why it matters</span>
          <p className="text-statement">
            Drawing on years as both a doctor and an artist, Dr. Simoyan equips
            teachers and students with ways to nurture creativity that will
            serve them for life.
          </p>
        </div>
        <div data-reveal>
          <Photo
            src={IMG.uke}
            alt="Dr. Simoyan with a ukulele in a flower garden"
            className="relative aspect-4/3"
          />
        </div>
      </section>

      {/* PAST TALKS */}
      <section className="panel">
        <div data-reveal>
          <span className="eyebrow">Past speaking engagements</span>
          <h2 className="mt-2 text-h2">Recently on stage.</h2>
        </div>
        <div data-reveal-group className="mt-8 grid gap-3 md:grid-cols-3">
          {pastTalks.map((t) => (
            <figure key={t.venue} className="group">
              <Photo
                src={t.image}
                alt={`Dr. Simoyan speaking at ${t.venue}`}
                sizes="(min-width: 768px) 33vw, 100vw"
                className="relative aspect-4/3 [&_img]:transition-transform [&_img]:duration-700 [&_img]:ease-out group-hover:[&_img]:scale-105"
              />
              <figcaption className="mt-3">
                <span className="block text-sm font-semibold">{t.venue}</span>
                <span className="eyebrow">{t.date}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="panel-brand flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
        <div data-reveal>
          <h2 className="text-h2 text-brand-950!">
            Schedule a speaking engagement.
          </h2>
          <p className="mt-2 max-w-[46ch] text-brand-900">
            Tell me about your school, conference or event and let&rsquo;s shape
            a session for your audience.
          </p>
        </div>
        <Link href="/contact" className="btn-dark shrink-0">
          Request information <ArrowUpRight size={16} />
        </Link>
      </section>
    </Page>
  );
}