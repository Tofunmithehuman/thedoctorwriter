import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: {
    default: "Dr. Olapeju Simoyan | Physician, Author, Musician",
    template: "%s | Dr. Olapeju Simoyan",
  },
  description:
    "Physician, author and musician inspiring learning and healing through stories, music and talks.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body>
        <div className="page">
          <Navbar />
          <main className="flex flex-col gap-3">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
