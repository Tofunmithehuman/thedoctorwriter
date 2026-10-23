import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import Reveal from "@/app/components/Reveal";
import Flower from "@/app/components/Flower";
import HeroImage from "@/app/components/HeroImage";
import BooksShowcase from "@/app/components/Booksshowcase";
import DrSimoyan from "@/public/assets/DrSimoyan.png";

const stats = [
  { label: "Books published", n: 10, suffix: "+" },
  { label: "Talks given", n: 50, suffix: "+" },
  { label: "Years in medicine", n: 20, suffix: "+" },
  { label: "Songs recorded", n: 13, suffix: "" },
]; // ← placeholder numbers: replace with your real ones

const books = [
  {
    title: "Sweet Land of Liberty",
    text: "National symbols and songs, told through original photographs.",
  },
  {
    title: "Navigating the Methadone Maze",
    text: "A clear, hopeful guide to treatment for patients and families.",
  },
  {
    title: "I Played My Best",
    text: "The stories behind much-loved Christmas songs.",
  },
]; // ← verify titles and blurbs

export default function Home() {
  return (
    <Reveal>
      {/* HERO */}
      <div className="mx-auto flex w-full max-w-330 flex-col gap-3 p-3">
        <section className="grid items-center gap-8 p-4 md:grid-cols-2 md:gap-12 md:p-6">
          <div
            data-reveal-group
            className="flex flex-col items-start gap-5 md:py-6"
          >
            <span className="eyebrow">Physician · Author · Musician</span>
            <h1 className="text-display">
              Stories that heal, teach and inspire.
            </h1>
            <p className="max-w-[46ch] text-base text-muted">
              Through medicine, books and music, I help people feel heard and
              learn something worth carrying with them.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                Book a talk <ArrowUpRight size={16} />
              </Link>
              <Link href="/media" className="btn-secondary">
                <Play size={16} /> Watch TEDx
              </Link>
            </div>
            <span className="badge">TEDx speaker</span>
          </div>
          <HeroImage src={DrSimoyan} alt="Portrait of Dr. Olapeju Simoyan" />
        </section>

        {/* STATS */}
        <section className="panel-soft grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div data-reveal className="flex flex-col justify-end gap-4">
            <span className="eyebrow">About the work</span>
            <p className="text-statement">
              With a physician&rsquo;s care and an artist&rsquo;s ear, I turn
              lived experience into stories that help people heal and grow.
            </p>
          </div>
          <div data-reveal-group className="grid grid-cols-2 gap-3">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="tile group relative overflow-hidden"
              >
                <Flower
                  tone={i}
                  delay={i * 0.15}
                  className="absolute -right-5 -top-5 size-20 md:-right-6 md:-top-6 md:size-28"
                />
                <span className="eyebrow relative max-w-[65%]">{s.label}</span>
                <span
                  className="tile-number relative"
                  data-count={s.n}
                  data-suffix={s.suffix}
                >
                  {s.n}
                  {s.suffix}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED TALK */}
        <section className="panel grid items-center gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
          <div data-reveal className="flex flex-col items-start gap-4">
            <span className="eyebrow">Featured talk</span>
            <h2 className="text-h2">
              Music as a tool for learning and healing.
            </h2>
            <p className="max-w-[44ch] text-muted">
              Watch my TEDx talk on how song and story help us remember, connect
              and recover.
            </p>
            <Link href="/media" className="link inline-flex items-center gap-1">
              All talks &amp; media <ArrowUpRight size={16} />
            </Link>
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

        {/* BOOKS */}
        <BooksShowcase />
      </div>
    </Reveal>
  );
}
