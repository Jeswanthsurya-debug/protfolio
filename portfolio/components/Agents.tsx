"use client";
import { useEffect, useRef, useState } from "react";
import { Bot, Pause, Play, Route, Square } from "lucide-react";

const NAMES = ["Scout", "Layout", "Typeset", "Motion", "QA", "Deploy", "Copy", "Lint", "Index", "Render", "Palette", "Review"];
const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ec4899", "#14b8a6", "#38bdf8", "#eab308", "#06b6d4", "#f97316", "#84cc16", "#10b981", "#e11d48"];
const HEAD = `<svg width="16" height="16" viewBox="0 0 16 16"><line x1="8" y1="1.5" x2="8" y2="4" stroke="#fff" stroke-width="1.2"/><circle class="ant" cx="8" cy="1.5" r="1.3" fill="#fff"/><rect x="2" y="4" width="12" height="10" rx="3" fill="#0b0b0f"/><circle class="eye" cx="6" cy="9" r="1.5" fill="#7dffb2"/><circle class="eye" cx="10" cy="9" r="1.5" fill="#7dffb2"/></svg>`;
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const out = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

type Kind = "type" | "pop" | "wipe";
type Job = { el: HTMLElement; kind: Kind; ph: number; t: number; box: HTMLElement; text: string; sx: number; sy: number; dur: [number, number, number] };
type Agent = { dom: HTMLElement; x: number; y: number; job: Job | null; idle: number };

export default function Agents() {
  const [on, setOn] = useState(false);
  const [paused, setPaused] = useState(false);
  const [touring, setTouring] = useState(false);
  const [busy, setBusy] = useState(false);
  const api = useRef({ pause: () => {}, tour: () => {}, agents: () => {} });

  useEffect(() => {
    const root = document.documentElement;
    const building = root.classList.contains("build-mode");
    (window as unknown as { __ab: number }).__ab = 1;
    setOn(building);
    const st = { paused: false, touring: false };
    const timers: number[] = [];
    let raf = 0, tourRaf = 0, io: IntersectionObserver | null = null, layer: HTMLElement | null = null;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-build]"));
    const pending = new Set(els);
    const queue: HTMLElement[] = [];
    const full = new WeakMap<HTMLElement, string>();
    const agents: Agent[] = [];
    const boot = document.getElementById("boot");

    const finish = (el: HTMLElement) => {
      if (el.dataset.build === "type" && full.has(el)) el.textContent = full.get(el)!;
      el.style.clipPath = ""; el.style.minHeight = ""; el.classList.add("built");
    };

    /* ---------- tour ---------- */
    const stopTour = () => {
      if (!st.touring) return;
      st.touring = false; setTouring(false); cancelAnimationFrame(tourRaf);
      ["wheel", "touchstart", "mousedown", "keydown"].forEach((e) => window.removeEventListener(e, onUser));
    };
    function onUser(e: Event) {
      if (e.type === "keydown" && !["Escape", "ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes((e as KeyboardEvent).key)) return;
      stopTour();
    }
    const runTour = () => {
      history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
      const total = root.scrollHeight - innerHeight;
      if (total <= 0) return;
      const v = 0.11, tr = 1600, T = total / v + tr; // px/ms, ease time, duration
      st.touring = true; setTouring(true);
      ["wheel", "touchstart", "mousedown", "keydown"].forEach((e) => window.addEventListener(e, onUser, { passive: true }));
      const t0 = performance.now();
      const step = (n: number) => {
        if (!st.touring) return;
        const t = n - t0;
        const y = t < tr ? (v * t * t) / (2 * tr) : t < T - tr ? (v * tr) / 2 + v * (t - tr) : total - (v * (T - t) * (T - t)) / (2 * tr);
        window.scrollTo(0, clamp(y, 0, total));
        if (t >= T) { stopTour(); return; }
        tourRaf = requestAnimationFrame(step);
      };
      tourRaf = requestAnimationFrame(step);
    };
    const startTour = () => {
      if (st.touring) { stopTour(); return; }
      sessionStorage.setItem("tour", "1"); location.reload();
    };

    /* ---------- controls ---------- */
    const togglePause = () => { if (!building) return; st.paused = !st.paused; setPaused(st.paused); };
    const toggleAgents = () => {
      const next = building ? "off" : "on";
      try { localStorage.setItem("agents", next); } catch {}
      location.href = location.pathname; // drop ?agents= so the saved choice applies
    };
    api.current = { pause: togglePause, tour: startTour, agents: toggleAgents };
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      if (k === "t") startTour(); else if (k === "a") toggleAgents(); else if (k === "p") togglePause();
    };
    window.addEventListener("keydown", onKey);

    /* ---------- engine ---------- */
    const heroReady = () => els.every((el) => el.getBoundingClientRect().top >= innerHeight || el.classList.contains("built"));
    const maybeTour = () => {
      if (!sessionStorage.getItem("tour")) return;
      sessionStorage.removeItem("tour");
      const began = performance.now();
      const poll = window.setInterval(() => {
        const idle = !building || (queue.length === 0 && agents.every((a) => !a.job));
        if ((idle && heroReady()) || performance.now() - began > 15000) { clearInterval(poll); timers.push(window.setTimeout(runTour, 700)); }
      }, 250);
      timers.push(poll);
    };

    const start = () => {
      if (!building) { boot?.remove(); maybeTour(); return; }
      boot?.classList.add("done"); timers.push(window.setTimeout(() => boot?.remove(), 450));
      els.forEach((el) => { if (el.dataset.build === "type") full.set(el, el.textContent || ""); });
      layer = document.createElement("div"); layer.className = "ab-layer"; document.body.appendChild(layer);
      const count = matchMedia("(max-width:767px)").matches ? 6 : 12;
      for (let i = 0; i < count; i++) {
        const dom = document.createElement("div"); dom.className = "ab-cur";
        dom.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24"><path d="M3 2l17 8-7 2-3 7z" fill="${COLORS[i]}" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/></svg><div class="ab-tag" style="background:${COLORS[i]}">${HEAD}${NAMES[i]}</div>`;
        layer.appendChild(dom);
        agents.push({ dom, x: innerWidth * (0.15 + Math.random() * 0.7), y: innerHeight + 30, job: null, idle: 0 });
      }
      const sortQ = () => queue.sort((a, b) => { const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect(); return ra.top - rb.top || ra.left - rb.left; });
      io = new IntersectionObserver((es) => {
        let added = false;
        es.forEach((e) => { if (e.isIntersecting) { const el = e.target as HTMLElement; io!.unobserve(el); pending.delete(el); queue.push(el); added = true; } });
        if (added) sortQ();
      }, { rootMargin: "0px 0px -6% 0px" });
      els.forEach((el) => io!.observe(el));

      const begin = (a: Agent, el: HTMLElement) => {
        const kind = el.dataset.build as Kind;
        const r = el.getBoundingClientRect();
        const text = full.get(el) || "";
        const box = document.createElement("div"); box.className = "ab-box";
        box.innerHTML = "<i></i><i></i><i></i><i></i><b></b>"; (box.lastChild as HTMLElement).textContent = `${kind} · ${el.tagName.toLowerCase()}`;
        layer!.appendChild(box);
        const dist = Math.hypot(r.left - a.x, r.top - a.y);
        const B = kind === "type" ? clamp(text.length * 16, 350, 1400) : kind === "wipe" ? 800 : 450;
        a.job = { el, kind, ph: 0, t: 0, box, text, sx: a.x, sy: a.y, dur: [clamp(dist / 1.4, 450, 1100), 450, B] };
        a.dom.style.opacity = "1";
      };
      const setBox = (b: HTMLElement, r: DOMRect, p: number) => {
        b.style.transform = `translate(${r.left}px,${r.top}px)`; b.style.width = r.width * p + "px"; b.style.height = r.height * p + "px";
      };

      let last = performance.now(), sweep = 0;
      const tick = (now: number) => {
        const dt = Math.min(50, now - last); last = now;
        const d = st.paused ? 0 : dt;
        sweep += dt;
        if (sweep > 200) { sweep = 0; pending.forEach((el) => { if (el.getBoundingClientRect().bottom < 0) { pending.delete(el); io!.unobserve(el); finish(el); } }); }
        if (!st.paused) {
          while (queue.length && agents.filter((a) => a.job).length < 6) {
            const a = agents.find((x) => !x.job); if (!a) break;
            const el = queue.shift()!;
            if (el.getBoundingClientRect().bottom < 0) { finish(el); continue; }
            begin(a, el);
          }
        }
        for (const a of agents) {
          const j = a.job;
          if (j) {
            j.t += d;
            const r = j.el.getBoundingClientRect();
            const [G, D, B] = j.dur;
            if (j.ph === 0) {
              const p = clamp(j.t / G, 0, 1), e = ease(p);
              a.x = j.sx + (r.left - j.sx) * e; a.y = j.sy + (r.top - j.sy) * e;
              if (p >= 1) { j.ph = 1; j.t = 0; }
            } else if (j.ph === 1) {
              const p = out(clamp(j.t / D, 0, 1));
              a.x = r.left + r.width * p; a.y = r.top + r.height * p; setBox(j.box, r, p);
              if (j.t >= D) {
                j.ph = 2; j.t = 0;
                if (j.kind === "type") { j.el.style.minHeight = r.height + "px"; j.el.textContent = ""; }
                if (j.kind === "wipe") j.el.style.clipPath = "inset(0 100% 0 0)";
                j.el.classList.add("built"); if (j.kind === "pop") j.el.classList.add("pop");
              }
            } else {
              const p = clamp(j.t / B, 0, 1);
              setBox(j.box, r, 1);
              if (j.kind === "type") j.el.textContent = j.text.slice(0, Math.floor(p * j.text.length));
              if (j.kind === "wipe") j.el.style.clipPath = `inset(0 ${(1 - out(p)) * 100}% 0 0)`;
              a.x = r.left + r.width * (j.kind === "wipe" ? out(p) : 1); a.y = r.top + r.height;
              if (p >= 1) {
                finish(j.el); j.el.classList.remove("pop");
                const b = j.box; b.style.opacity = "0"; window.setTimeout(() => b.remove(), 300);
                a.job = null; a.idle = 0;
              }
            }
          } else a.idle += dt;
          a.dom.style.transform = `translate(${clamp(a.x, 0, innerWidth - 90)}px,${clamp(a.y, 0, innerHeight - 30)}px)`;
          if (!a.job && a.idle > 700) a.dom.style.opacity = "0";
        }
        setBusy(agents.some((a) => a.job) || queue.length > 0);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      maybeTour();
    };

    timers.push(window.setTimeout(start, building ? 950 : 0));
    return () => {
      window.removeEventListener("keydown", onKey); stopTour();
      timers.forEach((t) => { clearTimeout(t); clearInterval(t); });
      cancelAnimationFrame(raf); io?.disconnect(); layer?.remove();
    };
  }, []);

  return (
    <div role="toolbar" aria-label="Page controls" className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-full border border-zinc-800 bg-zinc-950 p-1.5 shadow-2xl shadow-black/60">
      <button className="btn !border-transparent !px-3 sm:!px-4" onClick={() => api.current.pause()} disabled={!on || !busy} aria-label="Pause or resume (P)">
        {paused ? <Play size={15} /> : <Pause size={15} />}<span className="hidden sm:inline">{paused ? "Resume" : "Pause"}</span>
      </button>
      <button className={`btn !border-transparent !px-3 sm:!px-4 ${on ? "!text-accent" : ""}`} onClick={() => api.current.agents()} aria-pressed={on} aria-label="Toggle agents (A)">
        <Bot size={15} /><span className="hidden sm:inline">Agents {on ? "on" : "off"}</span>
      </button>
      <button className="btn !border-transparent !px-3 sm:!px-4" onClick={() => api.current.tour()} aria-label="Tour (T)">
        {touring ? <Square size={15} /> : <Route size={15} />}<span className="hidden sm:inline">{touring ? "Stop" : "Tour"}</span>
      </button>
    </div>
  );
}
