"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type CatId = "all" | "music" | "health" | "history";

type Book = {
  title: string;
  genre: string;
  cats: Exclude<CatId, "all">[];
  tone: string; // placeholder cover gradient
  ink: string; // placeholder cover text colour
  image?: StaticImageData; // ← add real covers: import cover from "@/public/assets/books/x.webp"
};

// ← placeholder categories + copy: adjust to your real books
const categories: { id: CatId; label: string }[] = [
  { id: "all", label: "All books" },
  { id: "music", label: "Music & songs" },
  { id: "health", label: "Health & recovery" },
  { id: "history", label: "History & photography" },
];

const books: Book[] = [
  {
    title: "Sweet Land of Liberty",
    genre: "Photography · Songs",
    cats: ["music", "history"],
    tone: "from-brand-200 to-brand-600",
    ink: "text-brand-950",
  },
  {
    title: "Navigating the Methadone Maze",
    genre: "Health · Recovery",
    cats: ["health"],
    tone: "from-brand-800 to-brand-950",
    ink: "text-white",
  },
  {
    title: "I Played My Best",
    genre: "Music · Christmas songs",
    cats: ["music"],
    tone: "from-brand-300 to-brand-500",
    ink: "text-brand-950",
  },
];

function Cover({
  book,
  className = "",
  text = false,
}: {
  book: Book;
  className?: string;
  text?: boolean;
}) {
  return (
    <div
      className={`relative aspect-2/3 overflow-hidden rounded-[3px] bg-linear-to-br shadow-[0_12px_28px_-14px_rgb(24_23_22/0.55)] ${book.tone} ${className}`}
    >
      {book.image ? (
        <Image
          src={book.image}
          alt=""
          fill
          sizes="(min-width: 768px) 15vw, 40vw"
          className="object-cover"
        />
      ) : text ? (
        <div
          className={`absolute inset-0 flex flex-col justify-between p-[10%] ${book.ink}`}
        >
          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] opacity-80">
            Olapeju Simoyan
          </span>
          <span className="text-[clamp(0.75rem,1.5vw,1.05rem)] font-semibold leading-tight tracking-tight">
            {book.title}
          </span>
        </div>
      ) : null}
    </div>
  );
}

export default function BooksShowcase() {
  const [active, setActive] = useState<CatId>("all");
  const grid = useRef<HTMLDivElement>(null);
  const prev = useRef(active);

  const shown =
    active === "all" ? books : books.filter((b) => b.cats.includes(active));
  const label = categories.find((c) => c.id === active)!.label;

  // Re-animate the grid whenever the category changes (not on first render)
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
            stagger: 0.08,
            clearProps: "transform",
          },
        );
      });
    },
    { scope: grid, dependencies: [active], revertOnUpdate: true },
  );

  return (
    <section className="panel">
      {/* Heading + category strip */}
      <div className="grid gap-8 lg:grid-cols-[1fr_1.7fr] lg:items-end lg:gap-10">
        <div data-reveal className="flex flex-col items-start gap-4">
          <span className="eyebrow">Explore the library</span>
          <h2 className="text-display">Books</h2>
          <Link href="/books" className="btn-primary">
            View all books <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* bleeds off the panel edge, like the reference */}
        <div className="-mx-6 min-w-0 md:-mx-10 lg:mx-0 lg:-mr-10">
          <div
            data-reveal-group
            role="group"
            aria-label="Book categories"
            className="flex snap-x gap-3 overflow-x-auto px-6 pb-1 md:px-10 lg:px-0 lg:pr-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((c) => {
              const covers =
                c.id === "all"
                  ? books
                  : books.filter((b) =>
                      b.cats.includes(c.id as Exclude<CatId, "all">),
                    );
              const on = active === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setActive(c.id)}
                  className={`w-40 shrink-0 snap-start rounded-card p-3 text-left transition-all duration-500 ease-out-expo md:w-44 ${
                    on
                      ? "bg-brand-100 ring-2 ring-ink"
                      : "bg-soft hover:bg-brand-100/70"
                  }`}
                >
                  <div className="flex h-20 gap-2 overflow-hidden [mask-image:linear-gradient(to_bottom,black_45%,transparent)]">
                    {covers.map((b) => (
                      <Cover
                        key={b.title}
                        book={b}
                        className="w-[42%] shrink-0 self-start"
                      />
                    ))}
                  </div>
                  <span className="mt-3 block text-sm font-medium">
                    {c.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filter row */}
      <div data-reveal className="mt-10 flex items-center justify-between">
        <span className="border-b-2 border-ink pb-1 text-sm font-semibold">
          {label}
        </span>
        <span className="text-sm text-muted" aria-live="polite">
          {shown.length} {shown.length === 1 ? "Item" : "Items"}
        </span>
      </div>

      {/* Product grid */}
      <div
        ref={grid}
        data-reveal-group
        className="mt-5 grid gap-x-3 gap-y-10 sm:grid-cols-2 md:grid-cols-3"
      >
        {shown.map((b) => (
          <article key={b.title} className="group">
            <Link href="/books" aria-label={b.title} className="block">
              <div className="grid aspect-square place-items-center rounded-card bg-soft p-6 transition-colors duration-500 group-hover:bg-brand-100">
                <Cover
                  book={b}
                  text
                  className="w-[46%] transition-transform duration-500 ease-out-expo group-hover:-translate-y-2 group-hover:scale-[1.03]"
                />
              </div>
            </Link>
            <h3 className="mt-5 text-[0.95rem] font-semibold tracking-tight">
              {b.title}
            </h3>
            <p className="mt-1 text-sm italic text-muted">{b.genre}</p>
            <p className="mt-2 text-sm font-medium">Olapeju Simoyan</p>
            {/* Swap for a price (e.g. "$18.00") or your Amazon link */}
            <Link
              href="/books"
              className="link mt-1 inline-flex items-center gap-1 text-sm"
            >
              Buy now <ArrowUpRight size={14} />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
