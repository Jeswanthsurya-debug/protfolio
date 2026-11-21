import type { Metadata, Viewport } from "next";
import { Anton, Geist, Geist_Mono, Caveat_Brush } from "next/font/google";
import "./globals.css";

const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const brush = Caveat_Brush({ subsets: ["latin"], weight: "400", variable: "--font-caveat" });

export const metadata: Metadata = {
  title: "Jeswanth Surya · Portfolio",
  description: "CS engineering student building practical AI, cloud and web projects. Based in Chennai.",
};
export const viewport: Viewport = { themeColor: "#09090b", width: "device-width", initialScale: 1 };

// Runs before paint so nothing flashes before the cursors start.
const boot = `(function(){try{var q=new URLSearchParams(location.search).get('agents');var s=localStorage.getItem('agents');var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;var on=q==='on'||(q!=='off'&&s!=='off'&&!rm);if(on){document.documentElement.classList.add('build-mode');setTimeout(function(){if(!window.__ab)document.documentElement.classList.remove('build-mode')},6000)}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${anton.variable} ${geist.variable} ${mono.variable} ${brush.variable}`}>
      <head><script dangerouslySetInnerHTML={{ __html: boot }} /></head>
      <body>
        <div id="boot" aria-hidden="true">
          <span className="font-mono text-xs tracking-[.3em] text-zinc-400">BOOTING AGENTS</span>
          <div className="w-48 bg-zinc-800"><i /></div>
        </div>
        {children}
      </body>
    </html>
  );
}
