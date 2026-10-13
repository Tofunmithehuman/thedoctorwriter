import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Camera,
  Music,
  Stethoscope,
} from "lucide-react";
import Reveal from "@/app/components/Reveal";

export const metadata: Metadata = { title: "About" };

const roles = [
  {
    icon: Stethoscope,
    title: "Physician",
    text: "Caring for patients with compassion and listening first.",
  },
  {
    icon: BookOpen,
    title: "Author",
    text: "Writing books that make health and history easier to understand.",
  },
  {
    icon: Music,
    title: "Musician",
    text: "Using song to teach, comfort and bring people together.",
  },
  {
    icon: Camera,
    title: "Photographer",
    text: "Capturing nature and everyday moments that tell a story.",
  },
];

const values = [
  {
    label: "Listen first",
    text: "Every good story begins with paying attention.",
  },
  { label: "Teach with stories", text: "People remember what moves them." },
  { label: "Create with care", text: "Work that is kind, clear and useful." },
];

export default function About() {
  return (
    <Reveal>
      {/* INTRO */}
      <section className="panel grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr] md:gap-12">
        <div data-reveal-group className="flex flex-col items-start gap-5">
          <span className="eyebrow">About</span>
          <h1 className="text-display">
            Hello, I&rsquo;m Dr. Olapeju Simoyan.
          </h1>
          <p className="max-w-[52ch] text-base text-muted">
            I&rsquo;m a physician, author and musician. My work sits where
            medicine meets the arts: books that explain, songs that comfort and
            talks that help people learn.
          </p>
          <p className="max-w-[52ch] text-base text-muted">
            {/* Replace with your real bio, 2-3 sentences */}
            Add a short personal story here: where you trained, what drives you,
            and why you write and perform.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              Book a talk <ArrowUpRight size={16} />
            </Link>
            <Link href="/books" className="btn-secondary">
              See my books
            </Link>
          </div>
        </div>
        {/* Swap for <Image fill className="object-cover" /> */}
        <div
          data-reveal
          className="relative aspect-4/5 overflow-hidden rounded-card bg-linear-to-br from-brand-200 via-brand-400 to-brand-700"
          role="img"
          aria-label="Portrait of Dr. Olapeju Simoyan"
        />
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
          {roles.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card flex flex-col gap-4">
              <span className="grid size-11 place-items-center rounded-btn bg-brand-400 text-brand-950">
                <Icon size={20} strokeWidth={1.75} />
              </span>
              <h3 className="card-title">{title}</h3>
              <p className="text-sm text-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* APPROACH */}
      <section className="panel-soft grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div data-reveal className="flex flex-col justify-end gap-4">
          <span className="eyebrow">My approach</span>
          <p className="text-statement">
            I believe stories are one of the strongest tools we have for
            learning and for healing.
          </p>
        </div>
        <div
          data-reveal-group
          className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3"
        >
          {values.map((v) => (
            <div key={v.label} className="tile">
              <span className="eyebrow">{v.label}</span>
              <p className="mt-6 text-sm">{v.text}</p>
            </div>
          ))}
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
        <Link href="/contact" className="btn-dark shrink-0">
          Get in touch <ArrowUpRight size={16} />
        </Link>
      </section>
    </Reveal>
  );
}
