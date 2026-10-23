"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { books, categories, type Book, type CatId } from "@/app/lib/data";

gsap.registerPlugin(useGSAP);

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
      className={`relative overflow-hidden rounded-[3px] bg-linear-to-br shadow-[0_12px_28px_-14px_rgb(24_23_22/0.55)] ${
        book.wide ? "aspect-3/2" : "aspect-2/3"
      } ${book.tone} ${className}`}
    >
      {book.image ? (
        <Image
          src={book.image}
          alt=""
          fill
          unoptimized
          sizes="(min-width: 768px) 20vw, 50vw"
          className="object-cover"
        />
      ) : text ? (
        <div
          className={`absolute inset-0 flex flex-col justify-between p-[10%] ${book.ink}`}
        >
          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] opacity-80">
            Olapeju Simoyan
          </span>
          <span className="text-[clamp(0.75rem,1.4vw,1rem)] font-semibold leading-tight tracking-tight">
            {book.title}
          </span>
        </div>
      ) : null}
    </div>
  );
}

/**
 * Home:  <BooksShowcase />            heading + category strip + first 6 books
 * Books: <BooksShowcase full />       category strip + every book with descriptions
 */
export default function BooksShowcase({
  full = false,
  limit = 6,
}: {
  full?: boolean;
  limit?: number;
}) {
  const [active, setActive] = useState<CatId>("all");
  const grid = useRef<HTMLDivElement>(null);
  const prev = useRef(active);

  const shown =
    active === "all" ? books : books.filter((b) => b.cat === active);
  const visible = full ? shown : shown.slice(0, limit);
  const label = categories.find((c) => c.id === active)!.label;

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

  const strip = (
    <div
      className={
        full ? "-mx-6 md:-mx-10 ps-4" : "-mx-6 min-w-0 md:-mx-10 lg:mx-0 lg:-mr-10 ps-4"
      }
    >
      <div
        data-reveal-group
        role="group"
        aria-label="Book categories"
        className={`flex snap-x gap-3 overflow-x-auto px-6 py-1 md:px-10 scrollbar-none [&::-webkit-scrollbar]:hidden ${
          full ? "" : "lg:px-0 lg:pr-10"
        }`}
      >
        {categories.map((c) => {
          const covers = (
            c.id === "all" ? books : books.filter((b) => b.cat === c.id)
          ).slice(0, 3);
          const on = active === c.id;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(c.id)}
              className={`w-40 shrink-0 snap-start rounded-card p-3 text-left transition-all duration-500 ease-out-expo md:w-44 ${
                on
                  ? "bg-brand-100 ring-1 ring-inset ring-ink"
                  : "bg-soft hover:bg-brand-100/70"
              }`}
            >
              <div className="flex h-20 gap-2 overflow-hidden mask-[linear-gradient(to_bottom,black_45%,transparent)]">
                {covers.map((b) => (
                  <Cover
                    key={b.title}
                    book={b}
                    className="w-[42%] shrink-0 self-start"
                  />
                ))}
              </div>
              <span className="mt-3 block text-sm font-medium">{c.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <section className="panel">
      {full ? (
        strip
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_1.7fr] lg:items-end lg:gap-10">
          <div data-reveal className="flex flex-col items-start gap-4">
            <span className="eyebrow">Explore the library</span>
            <h2 className="text-display">Books</h2>
            <Link href="/books" className="btn-primary">
              View all books <ArrowUpRight size={16} />
            </Link>
          </div>
          {strip}
        </div>
      )}

      <div data-reveal className="mt-10 flex items-center justify-between">
        <span className="border-b-2 border-ink pb-1 text-sm font-semibold">
          {label}
        </span>
        <span className="text-sm text-muted" aria-live="polite">
          {shown.length} {shown.length === 1 ? "Item" : "Items"}
        </span>
      </div>

      <div
        ref={grid}
        data-reveal-group
        className={`mt-5 grid gap-x-3 gap-y-10 sm:grid-cols-2 ${full ? "lg:grid-cols-3" : "md:grid-cols-3"}`}
      >
        {visible.map((b) => (
          <article key={b.title} className="group flex flex-col">
            <a
              href={b.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${b.title} (opens in a new tab)`}
              className="block"
            >
              <div className="grid aspect-square place-items-center rounded-card bg-soft p-6 transition-colors duration-500 group-hover:bg-brand-100">
                <Cover
                  book={b}
                  text
                  className={`${b.wide ? "w-[72%]" : "w-[46%]"} transition-transform duration-500 ease-out-expo group-hover:-translate-y-2 group-hover:scale-[1.03]`}
                />
              </div>
            </a>
            <h3 className="mt-5 text-[0.95rem] font-semibold tracking-tight">
              {b.title}
            </h3>
            <p className="mt-1 text-sm italic text-muted">
              {categories.find((c) => c.id === b.cat)!.label}
              {b.note ? ` · ${b.note}` : ""}
            </p>
            {b.badge && (
              <span className="badge mt-2 self-start">{b.badge}</span>
            )}
            {full && <p className="mt-3 text-sm text-muted">{b.blurb}</p>}
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
              <a
                href={b.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link inline-flex items-center gap-1 text-sm"
              >
                Order now <ArrowUpRight size={14} />
              </a>
              {b.href2 && (
                <a
                  href={b.href2.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link inline-flex items-center gap-1 text-sm"
                >
                  {b.href2.label} <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      {!full && shown.length > limit && (
        <div data-reveal className="mt-10 flex justify-center">
          <Link href="/books" className="btn-secondary">
            See all {shown.length} books <ArrowUpRight size={16} />
          </Link>
        </div>
      )}
    </section>
  );
}
