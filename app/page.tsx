import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import Reveal from "@/app/components/Reveal";
import Image from "next/image";
import DrSimoyan from "@/public/assets/Dr.Simoyan.webp";

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
          <div
            data-reveal
            className="relative aspect-4/5 overflow-hidden rounded-card bg-brand-100 md:aspect-auto md:h-[calc(100dvh-10rem)] md:max-h-176 md:min-h-112"
          >
            <Image
              src={DrSimoyan}
              alt="Portrait of Dr. Olapeju Simoyan"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
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
            {stats.map((s) => (
              <div key={s.label} className="tile">
                <span className="eyebrow">{s.label}</span>
                <span
                  className="tile-number"
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
          {/* Swap for a YouTube/TED embed (iframe with aspect-video) */}
          <Link
            href="/media"
            aria-label="Watch the TEDx talk"
            data-reveal
            className="group relative grid aspect-video place-items-center overflow-hidden rounded-card bg-ink"
          >
            <span className="grid size-16 place-items-center rounded-full bg-brand-400 text-brand-950 transition-transform duration-300 ease-out-expo group-hover:scale-110">
              <Play size={24} fill="currentColor" />
            </span>
          </Link>
        </section>

        {/* BOOKS */}
        <section className="panel">
          <div
            data-reveal
            className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <span className="eyebrow">Books</span>
              <h2 className="mt-2 text-h2">Explore the library</h2>
            </div>
            <Link href="/books" className="btn-primary self-start">
              View all books <ArrowUpRight size={16} />
            </Link>
          </div>
          <div data-reveal-group className="mt-8 grid gap-3 md:grid-cols-3">
            {books.map((b) => (
              <Link
                key={b.title}
                href="/books"
                className="card-interactive flex flex-col gap-4"
              >
                <div className="aspect-3/4 rounded-btn bg-linear-to-br from-brand-200 to-brand-600" />
                <h3 className="card-title">{b.title}</h3>
                <p className="text-sm text-muted">{b.text}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="panel-brand grid items-center gap-6 md:grid-cols-2 md:gap-12">
          <div data-reveal>
            <span className="eyebrow text-brand-800!">Newsletter</span>
            <h2 className="mt-2 text-h2 text-brand-950!">
              Medicine &amp; the Arts
            </h2>
            <p className="mt-2 max-w-[40ch] text-brand-900">
              A monthly note of encouragement, new releases and upcoming talks.
            </p>
          </div>
          {/* Connect to your email provider (Mailchimp, ConvertKit, etc.) */}
          <form
            data-reveal
            className="flex flex-col gap-3 sm:flex-row"
            action="#"
          >
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="Email address"
              className="input"
            />
            <button type="submit" className="btn-dark shrink-0">
              Sign up
            </button>
          </form>
        </section>
      </div>
    </Reveal>
  );
}
