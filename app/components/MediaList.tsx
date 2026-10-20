"use client";
import { useRef, useState } from "react";
import {
  ArrowUpRight,
  Headphones,
  Newspaper,
  Radio,
  Video,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { media, type MediaType } from "@/app/lib/data";

gsap.registerPlugin(useGSAP);

const filters: ("All" | MediaType)[] = [
  "All",
  "Podcast",
  "Radio",
  "Video",
  "Article",
];
const icons = {
  Podcast: Headphones,
  Radio: Radio,
  Video: Video,
  Article: Newspaper,
};
const verbs = {
  Podcast: "Listen",
  Radio: "Listen",
  Video: "Watch",
  Article: "Read",
};

export default function MediaList() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const grid = useRef<HTMLDivElement>(null);
  const prev = useRef(active);
  const shown =
    active === "All" ? media : media.filter((m) => m.type === active);

  useGSAP(
    () => {
      if (prev.current === active) return;
      prev.current = active;
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          gsap.utils.toArray<HTMLElement>(grid.current!.children),
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "expo.out",
            stagger: 0.05,
            clearProps: "transform",
          },
        );
      });
    },
    { scope: grid, dependencies: [active], revertOnUpdate: true },
  );

  return (
    <section className="panel">
      <div
        data-reveal
        className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <span className="eyebrow">In the press</span>
          <h2 className="mt-2 text-h2">Interviews, talks and features.</h2>
        </div>
        <div
          role="group"
          aria-label="Filter media"
          className="flex flex-wrap gap-2"
        >
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={active === f}
              onClick={() => setActive(f)}
              className={`min-h-10 rounded-full border px-4 text-sm font-medium transition-colors duration-300 ${
                active === f
                  ? "border-ink bg-ink text-surface"
                  : "border-line hover:border-ink"
              }`}
            >
              {f === "All" ? "All" : `${f}s`}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={grid}
        data-reveal-group
        className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3"
      >
        {shown.map((m) => {
          const Icon = icons[m.type];
          return (
            <article
              key={m.title}
              className="card-interactive flex flex-col gap-4"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="badge gap-1.5">
                  <Icon size={12} aria-hidden /> {m.type}
                </span>
                {m.date && <span className="eyebrow">{m.date}</span>}
              </div>
              <div>
                <h3 className="text-lg font-semibold leading-snug tracking-tight">
                  {m.title}
                </h3>
                <p className="mt-1 text-sm italic text-muted">{m.source}</p>
              </div>
              <p className="text-sm text-muted">{m.blurb}</p>
              {m.href && (
                <a
                  href={m.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link mt-auto inline-flex items-center gap-1 text-sm"
                >
                  {verbs[m.type]} <ArrowUpRight size={14} />
                </a>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}