import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Page from "@/app/components/Page";
import Flower from "@/app/components/Flower";

export default function NotFound() {
  return (
    <Page>
      <section className="panel group relative flex min-h-[70dvh] flex-col items-center justify-center gap-6 overflow-hidden py-16 text-center">
        <Flower
          tone={2}
          delay={0.4}
          className="absolute -left-6 top-[12%] size-24 md:left-[8%] md:size-32"
        />
        <Flower
          tone={3}
          delay={0.7}
          className="absolute -right-4 bottom-[14%] size-20 md:right-[9%] md:size-28"
        />
        <Flower
          tone={1}
          delay={1}
          className="absolute right-[14%] top-[10%] hidden size-14 md:block"
        />

        <div
          data-reveal
          role="img"
          aria-label="404"
          className="relative flex items-center justify-center gap-[0.04em] text-[clamp(6rem,24vw,17rem)] font-medium leading-none tracking-tighter text-brand-900"
        >
          <span aria-hidden>4</span>
          <Flower tone={0} delay={0.2} className="size-[0.78em]" />
          <span aria-hidden>4</span>
        </div>

        <div
          data-reveal-group
          className="relative flex flex-col items-center gap-4"
        >
          <h1 className="text-h2">This page wandered off.</h1>
          <p className="max-w-[44ch] text-muted">
            The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
            Let&rsquo;s get you back to something good.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn-primary">
              Back home <ArrowUpRight size={16} />
            </Link>
            <Link href="/books" className="btn-secondary">
              Browse books
            </Link>
          </div>
        </div>
      </section>
    </Page>
  );
}