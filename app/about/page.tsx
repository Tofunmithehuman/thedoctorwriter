import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Camera,
  Music,
  Stethoscope,
} from "lucide-react";
import Page from "@/app/components/Page";
import Flower from "@/app/components/Flower";
import HeroImage from "@/app/components/HeroImage";
import { SITE, highlights, honors } from "@/app/lib/data";
import DrSimoyan from "@/public/assets/Dr.Simoyan.webp";

export const metadata: Metadata = { title: "About" };

const roles = [
  {
    icon: Stethoscope,
    title: "Physician",
    text: "An addiction medicine and family medicine physician, and a full professor at Drexel University College of Medicine.",
  },
  {
    icon: BookOpen,
    title: "Author",
    text: "Books on recovery, women in medicine, Christmas music history, nature and travel.",
  },
  {
    icon: Music,
    title: "Musician",
    text: "A pianist and ukulele player who records as Peju, The Doctor Singer.",
  },
  {
    icon: Camera,
    title: "Photographer",
    text: "Nature, travel and city photography that fills her books.",
  },
];

const facts = [
  { label: "Full professor", value: "Drexel Psychiatry" },
  { label: "Board certified", value: "Addiction & family medicine" },
  { label: "Fulbright Specialist", value: "Nigeria, 2012–14" },
  { label: "Humanism in Medicine Medal", value: "2022" },
];

export default function About() {
  return (
    <Page>
      {/* INTRO */}
      <section className="grid items-center gap-8 p-4 md:grid-cols-2 md:gap-12 md:p-6">
        <div
          data-reveal-group
          className="flex flex-col items-start gap-5 md:py-6"
        >
          <span className="eyebrow">About</span>
          <h1 className="text-display">
            Hello, I&rsquo;m Dr. Olapeju Simoyan.
          </h1>
          <p className="max-w-[52ch] text-base text-muted">
            Known as The Doctor Writer and Doctor Singer, I bridge dentistry,
            public health, family medicine and addiction medicine. I practice
            addiction medicine and teach as a full professor in the Department
            of Psychiatry at Drexel University College of Medicine.
          </p>
          <p className="max-w-[52ch] text-base text-muted">
            Alongside medicine, I express myself through writing, music and
            photography, because science and art together help us care for
            people in fuller ways.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              Book a talk <ArrowUpRight size={16} />
            </Link>
            <Link href="/books" className="btn-secondary">
              See my books
            </Link>
          </div>
          <span className="badge">MD · MPH · BDS · FAAFP · DFASAM</span>
        </div>
        <HeroImage src={DrSimoyan} alt="Portrait of Dr. Olapeju Simoyan" />
      </section>

      {/* ROLES */}
      <section className="panel">
        <div data-reveal>
          <span className="eyebrow">What I do</span>
          <h2 className="mt-2 text-h2">Four ways I tell stories.</h2>
        </div>
        <div
          data-reveal-group
          className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {roles.map(({ icon: Icon, title, text }, i) => (
            <div
              key={title}
              className="card group relative flex flex-col gap-4 overflow-hidden"
            >
              <Flower
                tone={i}
                delay={i * 0.15}
                className="absolute -right-5 -top-5 size-20 md:-right-6 md:-top-6 md:size-24"
              />
              <span className="relative grid size-11 place-items-center rounded-btn bg-brand-400 text-brand-950">
                <Icon size={20} strokeWidth={1.75} />
              </span>
              <h3 className="card-title relative">{title}</h3>
              <p className="relative text-sm text-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AT A GLANCE */}
      <section className="panel-soft grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div data-reveal className="flex flex-col justify-end gap-4">
          <span className="eyebrow">At a glance</span>
          <p className="text-statement">
            A physician-scholar whose work explores where medicine and the arts
            meet.
          </p>
        </div>
        <div data-reveal-group className="grid grid-cols-2 gap-3">
          {facts.map((f) => (
            <div key={f.label} className="tile">
              <span className="eyebrow">{f.label}</span>
              <span className="text-xl leading-snug tracking-tight">
                {f.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CAREER + HONORS */}
      <section className="panel grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <div data-reveal>
            <span className="eyebrow">Career highlights</span>
            <h2 className="mt-2 text-h2">
              Building programs that help people heal.
            </h2>
          </div>
          <ul data-reveal-group className="mt-6 flex flex-col">
            {highlights.map((h) => (
              <li
                key={h}
                className="border-b border-line py-3 text-sm text-muted"
              >
                {h}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div data-reveal>
            <span className="eyebrow">Honors &amp; awards</span>
            <h2 className="mt-2 text-h2">
              Recognized for service and humanism.
            </h2>
          </div>
          <ul data-reveal-group className="mt-6 flex flex-col">
            {honors.map((h) => (
              <li
                key={h.text}
                className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-line py-3 text-sm"
              >
                <span className="eyebrow pt-0.5">{h.year}</span>
                <span className="text-muted">{h.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="panel-brand flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
        <div data-reveal>
          <h2 className="text-h2 text-brand-950!">
            Let&rsquo;s inspire your audience.
          </h2>
          <p className="mt-2 max-w-[44ch] text-brand-900">
            Invite me to speak at your school, conference or event.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn-dark shrink-0">
            Get in touch <ArrowUpRight size={16} />
          </Link>
          <a
            href={SITE.amazon}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary shrink-0 border-brand-950/20 bg-transparent"
          >
            Shop on Amazon <ArrowUpRight size={16} />
          </a>
        </div>
      </section>
    </Page>
  );
}