import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Agents from "@/components/Agents";
import { EMAIL, PHONE, SHOW_PHONE, hero, workStats, projects, stack, record, skills, principles, socials } from "@/lib/data";

const H2 = "font-display text-5xl uppercase leading-none sm:text-7xl";
const Label = ({ children }: { children: React.ReactNode }) => (
  <p data-build="type" className="mb-4 font-mono text-xs uppercase tracking-[.25em] text-accent">{children}</p>
);
const Stat = ({ v, l }: { v: string; l: string }) => (
  <div data-build="pop" className="border-l border-zinc-700 pl-4">
    <div className="font-display text-4xl text-white sm:text-5xl">{v}</div>
    <div className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">{l}</div>
  </div>
);

export default function Page() {
  return (
    <main>
      <Agents />
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-4 sm:px-10">
        <a href="#home" data-build="pop" className="font-display text-2xl focus-visible:outline-2 focus-visible:outline-accent">JS<span className="text-accent">.</span></a>
        <nav data-build="pop" className="hidden gap-7 font-mono text-xs uppercase tracking-widest text-zinc-400 md:flex">
          {["work", "stack", "record", "about", "contact"].map((s) => (
            <a key={s} href={`#${s}`} className="transition hover:text-white focus-visible:outline-2 focus-visible:outline-accent">{s}</a>
          ))}
        </nav>
        <a href="#contact" data-build="pop" className="btn btn-red !py-2">Hire me</a>
      </header>

      {/* HERO */}
      <section id="home" className="relative flex min-h-screen flex-col overflow-hidden px-5 pb-0 pt-24 sm:px-10 lg:block">
        <div data-build="wipe" aria-hidden className="metal pointer-events-none absolute inset-x-0 top-[10%] select-none text-center font-display text-[25vw] leading-[.9] lg:top-[8%]">PORTFOLIO</div>
        <div data-build="pop" aria-hidden className="pointer-events-none absolute bottom-0 left-1/2 h-[60vh] w-[90vw] max-w-[900px] -translate-x-1/2 rounded-full" style={{ background: "radial-gradient(closest-side, rgba(255,59,47,.55), rgba(255,59,47,0))" }} />

        <div className="relative z-20 max-w-sm lg:absolute lg:bottom-24 lg:left-10">
          <p data-build="type" className="font-brush text-3xl text-zinc-300">Hello, I&apos;m</p>
          <h1 data-build="wipe" className="font-display text-6xl uppercase leading-[.95] text-white sm:text-7xl">{hero.name}</h1>
          <p data-build="type" className="mt-3 font-mono text-xs uppercase tracking-widest text-accent">{hero.role}</p>
          <p data-build="type" className="mt-4 text-zinc-400">{hero.bio} {hero.bio2}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a data-build="pop" href="#work" className="btn btn-red">View work <ArrowUpRight size={16} /></a>
            <p data-build="type" className="flex items-center gap-1.5 font-mono text-xs text-zinc-500"><MapPin size={13} />Based in {hero.city}</p>
          </div>
        </div>

        <div className="relative z-20 mt-8 grid grid-cols-3 gap-4 lg:absolute lg:bottom-24 lg:right-10 lg:mt-0 lg:grid-cols-1 lg:gap-8">
          {hero.stats.map((s) => <Stat key={s.l} {...s} />)}
        </div>

        <div data-build="pop" className="portrait relative z-10 mx-auto mt-auto w-[min(92vw,560px)] lg:absolute lg:bottom-0 lg:left-1/2 lg:mt-0 lg:w-[600px] lg:-translate-x-1/2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/headshot.png" alt="Portrait of Jeswanth Surya" className="block w-full" />
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="mx-auto max-w-6xl px-5 py-28 sm:px-10">
        <div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div><Label>01 / Work</Label><h2 data-build="wipe" className={H2}>Work that ships</h2></div>
          <div className="max-w-md">
            <p data-build="type" className="mb-6 text-zinc-400">AI workflows, an agent concept and a browser game. Each one built to do something specific.</p>
            <div className="grid grid-cols-3 gap-4">{workStats.map((s) => <Stat key={s.l} {...s} />)}</div>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((p) => (
            <article key={p.title} data-build="pop" className="flex flex-col rounded-2xl border border-zinc-800 bg-zinc-950 p-7 transition hover:border-zinc-600">
              <h3 className="font-display text-3xl uppercase">{p.title}</h3>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-zinc-400">
                {p.points.map((t) => <li key={t} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />{t}</li>)}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => <span key={t} className="rounded-full border border-zinc-800 px-3 py-1 font-mono text-[11px] text-zinc-400">{t}</span>)}
              </div>
              <a href={p.code} target="_blank" rel="noreferrer" className="btn mt-6 self-start">Code <ArrowUpRight size={15} /></a>
            </article>
          ))}
        </div>
      </section>

      {/* STACK */}
      <section id="stack" className="py-20">
        <div className="mx-auto mb-10 max-w-6xl px-5 sm:px-10"><Label>02 / Stack</Label><h2 data-build="wipe" className={H2}>Tools I use</h2></div>
        <div data-build="pop" className="marq">
          <div className="marquee">
            {[...stack, ...stack].map((s, i) => (
              <span key={i} className="mx-2 whitespace-nowrap rounded-full border border-zinc-800 px-6 py-3 font-mono text-sm text-zinc-300 transition hover:border-accent hover:text-white">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* RECORD */}
      <section id="record" className="mx-auto max-w-4xl px-5 py-28 sm:px-10">
        <Label>03 / Record</Label><h2 data-build="wipe" className={`${H2} mb-14`}>The record</h2>
        <ol className="relative space-y-6 border-l border-zinc-800 pl-6 sm:pl-10">
          {record.map((r) => (
            <li key={r.title} data-build="pop" className="relative rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
              <span className="absolute -left-[31px] top-8 h-3 w-3 rounded-full bg-accent sm:-left-[47px]" />
              <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-wider">
                <span className="text-accent">{r.kind}</span><span className="text-zinc-500">{r.when}</span>
              </div>
              <h3 className="mt-2 text-xl font-semibold text-white">{r.title}</h3>
              <p className="text-sm text-zinc-500">{r.org}</p>
              <ul className="mt-3 space-y-1 text-sm text-zinc-400">{r.points.map((t) => <li key={t}>{t}</li>)}</ul>
            </li>
          ))}
        </ol>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-6xl px-5 py-28 sm:px-10">
        <Label>04 / About</Label><h2 data-build="wipe" className={`${H2} mb-12`}>About me</h2>
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-5 text-lg text-zinc-400">
            <p data-build="type">I&apos;m a third-year Computer Science Engineering student in Chennai. I work mostly in Python, with a focus on generative AI, Google Cloud and software development.</p>
            <p data-build="type">I completed a Data Analyst internship in a fintech environment and have built projects across AI workflows, DevOps assistance and web apps. I like turning new technology into something practical.</p>
          </div>
          <div className="space-y-5">
            {skills.map((g) => (
              <div key={g.g} data-build="pop">
                <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">{g.g}</p>
                <div className="flex flex-wrap gap-2">{g.items.map((i) => <span key={i} className="rounded-full border border-zinc-800 px-3 py-1 text-sm text-zinc-300">{i}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map(([t, d], i) => (
            <div key={t} data-build="pop" className="rounded-2xl border border-zinc-800 p-6">
              <span className="font-mono text-xs text-accent">0{i + 1}</span>
              <h3 className="mt-3 font-display text-2xl uppercase">{t}</h3>
              <p className="mt-2 text-sm text-zinc-500">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-6xl px-5 pb-16 pt-20 sm:px-10">
        <Label>05 / Contact</Label>
        <div data-build="pop" className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8 sm:p-14">
          <h2 className="font-display text-5xl uppercase leading-none sm:text-8xl">Let&apos;s build <span className="text-accent">something.</span></h2>
          <p className="mt-5 max-w-xl text-zinc-400">I&apos;m open to internships in 2026. The fastest way to reach me is email.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${EMAIL}`} className="btn btn-red"><Mail size={16} />{EMAIL}</a>
            {SHOW_PHONE && <a href={`tel:${PHONE}`} className="btn"><Phone size={16} />Call</a>}
          </div>
        </div>
        <div data-build="pop" className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {socials.map((s) => (
            <a key={s.n} href={s.h} target="_blank" rel="noreferrer" className="btn justify-between">{s.n}<ArrowUpRight size={15} /></a>
          ))}
        </div>
        <footer className="mt-16 flex flex-col justify-between gap-2 border-t border-zinc-900 pt-6 font-mono text-xs text-zinc-600 sm:flex-row">
          <span>© 2026 Jillella Jeswanth Surya</span><span>Chennai, India</span>
        </footer>
      </section>
      <div className="h-24" />
    </main>
  );
}
