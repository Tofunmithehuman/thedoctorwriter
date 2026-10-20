import type { ReactNode } from "react";
import Reveal from "@/app/components/Reveal";

/** Standard page wrapper: same max width + spacing as the home page, with scroll reveals switched on. */
export default function Page({ children }: { children: ReactNode }) {
  return (
    <Reveal>
      <div className="mx-auto flex w-full max-w-330 flex-col gap-3 p-3">
        {children}
      </div>
    </Reveal>
  );
}