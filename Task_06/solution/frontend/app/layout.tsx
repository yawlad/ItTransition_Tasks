import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai_Looped } from "next/font/google";
import Image from "next/image";
const font = IBM_Plex_Sans_Thai_Looped({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Task 6",
  description: "Task 6",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${font.className} bg-main text-slate-100 `}>
        <main className="relative">
          <Image
            src={"./bubble.svg"}
            width={3000}
            height={3000}
            alt=""
            className="fixed left-0 top-0 opacity-30 animate-buble-anim-v1 z-0"
          />
          <Image
            src={"./bubble_2.svg"}
            width={2000}
            height={2000}
            alt=""
            className="fixed right-0 top-0 opacity-50 animate-buble-anim-v2"
          />
          <div className="relative z-10">{children}</div>
        </main>
      </body>
    </html>
  );
}
