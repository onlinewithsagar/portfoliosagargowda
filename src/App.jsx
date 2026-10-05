import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

/* ================= EDIT THESE ================= */
const EMAIL = "onlinewithsagar@gmail.com";
// Pre-filled mail: the subject + 2-line body make every enquiry tell you where it came from.
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent("Hello Sagar – found you via your portfolio (sagargowdag.vercel.app)")}&body=${encodeURIComponent("Hi Sagar, I came across your portfolio and would love to get in touch about: ____\r\nI found you through (LinkedIn / GitHub / Referral / Search / Other): ____")}`;
const LINKS = {
  email: MAILTO,
  linkedin: "https://www.linkedin.com/in/onlinewithsagar",
  github: "https://github.com/onlinewithsagar",
  resume: "/Sagar_Gowda_Resume.pdf", // put in /public
  handsfree: "", // TODO: HandsFreeStudio URL
  soundwealth: "", // TODO: SoundWealth URL
  site: "https://sagargowdag.vercel.app",
};
const HERO_BG = "/bgpic.png"; // hero background, put in /public
const HERO_IMG = "/hero-portrait.jpg"; // small avatar in the hero card (optional)
const DAY_ONE = new Date("2026-09-17T00:00:00");

/* ================= DATA ================= */
const NAV = [["Home", "home"], ["About", "about"], ["Journey", "journey"], ["Work", "work"], ["Skills", "skills"], ["Contact", "contact"]];
const SECTIONS = [["home", "Hero"], ["about", "About"], ["journey", "Journey"], ["ascent", "Overview"], ["education", "Education"], ["work", "Projects"], ["skills", "Skills"], ["beyond", "Beyond Code"], ["learning", "Learning"], ["contact", "Contact"], ["finale", "Finale"]];
const NAV_OF = { ascent: "journey", education: "journey", beyond: "skills", learning: "skills", finale: "contact" };

const PROJECTS = [
  ["Ride Sync", "Location · PWA · Digital Product", "Concept", "pin", "A location-sharing concept designed for bikers, bringing people together through real-time location awareness and a connected riding experience.", "Location sharing, mobile experience, user connectivity."],
  ["Rahasya AI", "AI · Privacy · Enterprise", "Concept", "shield", "A private AI platform concept for organizational environments, exploring secure AI interactions, conversational experiences and privacy-focused workflows.", "AI integration, enterprise applications, privacy."],
  ["HandsFreeStudio", "Web Development · Automation · Business", "Initiative", "spark", "A digital initiative focused on making websites, automation tools and growth strategies more accessible to businesses.", "Affordable digital solutions and practical business experiences.", "handsfree"],
  ["SoundWealth", "Web Development · Digital Experience", "Project", "wave", "A digital project exploring a modern web experience around the SoundWealth concept.", "Web experience.", "soundwealth"],
  ["VYBE", "Social Application · Firebase", "Concept", "users", "A social application concept exploring connected digital experiences, user authentication and interactive social features.", "Firebase and social application architecture."],
  ["AURA Resume", "AI · Career Technology · Resume", "Concept", "doc", "A resume-focused tool concept designed to help users improve their resumes through ATS-oriented keyword suggestions.", "Career technology and intelligent document improvement."],
];
const SKILLS = [
  ["Development", "code", ["HTML", "CSS", "JavaScript", "React", "Vite"]],
  ["Cloud & Infrastructure", "cloud", ["AWS", "Lambda", "API Gateway", "IAM", "CloudWatch", "S3"]],
  ["DevOps & Automation", "box", ["Docker", "Git", "GitHub", "CI/CD", "Linux"]],
  ["AI & Data", "spark", ["Python", "Pandas", "Scikit-learn", "FAISS", "Embeddings"]],
  ["Platforms & Tools", "layers", ["Firebase", "Netlify", "Vercel", "VS Code", "Databricks"]],
];
const IDS = [["The Developer", "code", "Turning ideas into functional experiences."], ["The Explorer", "compass", "Discovering technologies and possibilities."], ["The Builder", "box", "Creating products with purpose."], ["The Mentor", "users", "Sharing knowledge and encouraging others."]];
const HUMAN = [
  ["STEMX", "Mentorship", "users", "Contributed to STEM and robotics learning experiences for young students, helping introduce technical concepts through practical engagement."],
  ["BCA Forum", "Joint Secretary", "flag", "Served as Joint Secretary of the BCA Forum, contributing to student engagement and community activities."],
  ["HandsFreeStudio", "Entrepreneurship", "spark", "Exploring the intersection of technology and business through affordable websites, automation and digital growth solutions."],
];
const LEARN = [["Cloud Architecture", "cloud", "Understanding scalable infrastructure and cloud-native systems."], ["DevOps Engineering", "loop", "Exploring automation, CI/CD, infrastructure and deployment workflows."], ["Containerization", "box", "Building knowledge of Docker and container-based environments."], ["AI & Automation", "spark", "Exploring intelligent applications and practical automation."]];
const FOCUS = ["Building a strong corporate and technical foundation.", "Understanding enterprise technology environments.", "Developing problem-solving and collaboration skills.", "Continuously expanding my technical knowledge.", "Preparing for future opportunities in cloud and DevOps."];
const MILES = [
  ["Foundation", "cap", "BCA · Cyber Security & Cloud Architecture", ["Completed at Bengaluru City University.", "Introduced to computing, programming, software development and emerging technologies.", "Learned how systems are built, secured, deployed and managed."]],
  ["Internship", "cloud", "Cloud Computing Intern · ZoomInData", ["Worked on CloudOps AI, an AI-powered cloud management tool focused on cloud resource scanning and cost optimization.", "Explored cloud computing concepts, resource monitoring, and cloud infrastructure management.", "Contributed to developing solutions aimed at improving cloud resource utilization and reducing operational costs."]],
  ["Ideas into experiences", "box", "Projects & initiatives", ["Concepts and builds across web, AI, location and social.", "Ride Sync, Rahasya AI, HandsFreeStudio, SoundWealth, VYBE and AURA Resume."]],
  ["Day One", "flag", "Analyst Trainee · Cognizant", ["Joined on 17.09.2026 in Bengaluru.", "Stepping into the corporate technology environment."]],
  ["Direction", "spark", "Cloud · DevOps · Automation", ["Building a deeper understanding of cloud infrastructure and modern software delivery."]],
];

/* ================= ICONS ================= */
const P = {
  arrow: "M7 17L17 7M8 7h9v9", down: "M12 5v14m0 0l-6-6m6 6l6-6", download: "M12 4v11m0 0l-4-4m4 4l4-4M5 20h14", send: "M21 3L10 14M21 3l-7 18-4-7-7-4z",
  mail: "M4 6h16v12H4zM4 7l8 6 8-6", linkedin: "M6 9v11M6 5v.01M11 20v-7a3 3 0 016 0v7M11 9v11",
  github: "M9 19c-4 1.5-4-2-6-2m12 4v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 00-1.3-3.2 4.2 4.2 0 00-.1-3.2s-1-.3-3.5 1.3a12 12 0 00-6 0C6.6 2.8 5.6 3.1 5.6 3.1a4.2 4.2 0 00-.1 3.2A4.6 4.6 0 004.2 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21",
  pin: "M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11zM12 12a2 2 0 100-4 2 2 0 000 4z", spark: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z",
  code: "M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14", cloud: "M7 18a4 4 0 01-.5-8 5.5 5.5 0 0110.7 1A3.5 3.5 0 0117 18z",
  compass: "M12 21a9 9 0 100-18 9 9 0 000 18zM15.5 8.5l-2 5-5 2 2-5z", box: "M12 3l8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12v9M12 12L4 7.5",
  users: "M16 20v-1a4 4 0 00-4-4H8a4 4 0 00-4 4v1M10 11a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM20 20v-1a3 3 0 00-2-2.8M16 4.2a3.5 3.5 0 010 6.6",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z", wave: "M3 12h2l2-6 3 12 3-9 2 3h6", doc: "M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6",
  layers: "M12 3l9 5-9 5-9-5zM3 13l9 5 9-5", flag: "M5 21V4m0 0h11l-2 4 2 4H5", loop: "M20 12a8 8 0 01-14 5.3M4 12a8 8 0 0114-5.3M18 3v4h-4M6 21v-4h4",
  up: "M12 19V5m0 0l-6 6m6-6l6 6", cap: "M2 9l10-5 10 5-10 5zM6 11v5c3 2.5 9 2.5 12 0v-5", cal: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4", plus: "M12 5v14M5 12h14",
};
const Ic = ({ n, s = 20 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={P[n]} /></svg>
);
const Tile = ({ n, tone = "or" }) => <span className={`tile ${tone}`}><Ic n={n} s={22} /></span>;

/* ================= REUSABLE PIECES ================= */
function useInView(t = 0.15, once = false) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setOn(true); if (once) io.disconnect(); } else if (!once) setOn(false);
    }, { threshold: t, rootMargin: "0px 0px -6% 0px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [t, once]);
  return [ref, on];
}
function Reveal({ children, delay = 0, className = "", once = false, ...r }) {
  const [ref, on] = useInView(0.12, once);
  return <div ref={ref} className={`rv ${on ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }} {...r}>{children}</div>;
}
function Split({ text, className = "", delay = 0, as: Tag = "h2" }) {
  const [ref, on] = useInView(0.3, true);
  return (
    <Tag ref={ref} className={`sp ${on ? "in" : ""} ${className}`} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span className="w" key={i} aria-hidden="true"><span style={{ transitionDelay: `${delay + i * 70}ms` }}>{w}</span>&nbsp;</span>
      ))}
    </Tag>
  );
}
function Btn({ href = "#", onClick, variant = "pri", icon, children, ...r }) {
  const ref = useRef(null);
  const ext = /^https?:/.test(href);
  const rip = (e) => {
    const el = ref.current, b = el.getBoundingClientRect();
    el.style.setProperty("--rx", `${e.clientX - b.left}px`);
    el.style.setProperty("--ry", `${e.clientY - b.top}px`);
    el.classList.remove("rip"); void el.offsetWidth; el.classList.add("rip");
  };
  return (
    <a ref={ref} href={href} onClick={onClick} onPointerDown={rip} className={`btn ${variant}`} {...(ext ? { target: "_blank", rel: "noreferrer" } : {})} {...r}>
      {icon && <span className="bi"><Ic n={icon} s={18} /></span>}
      <span className="roll"><span>{children}</span><span aria-hidden="true">{children}</span></span>
    </a>
  );
}
function Sec({ id, idx, label, tone = "dark", bg = null, children, className = "" }) {
  const outer = useRef(null), inner = useRef(null);
  useFit(outer, inner);
  return (
    <section id={id} ref={outer} className={`sec ${tone} ${className}`} aria-label={label}>
      <div className="gl" />{bg}
      <div className="wrap" ref={inner}>
        <Reveal once className="sechead"><b>{String(idx).padStart(2, "0")}</b><i />{label}</Reveal>
        {children}
      </div>
    </section>
  );
}
const go = (id) => (e) => {
  e?.preventDefault();
  const y = document.getElementById(id).getBoundingClientRect().top + window.scrollY;
  window.__goto ? window.__goto(y) : window.scrollTo({ top: y, behavior: "smooth" });
};

const spot = (e) => { const b = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--mx", `${e.clientX - b.left}px`); e.currentTarget.style.setProperty("--my", `${e.clientY - b.top}px`); };

/* buttery wheel + keyboard scrolling: frame-rate independent easing, no library */
function useSmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || matchMedia("(pointer: coarse)").matches) return;
    let cur = scrollY, target = cur, run = false, last = 0, anim = null;
    const max = () => document.documentElement.scrollHeight - innerHeight;
    const clamp = (v) => Math.max(0, Math.min(max(), v));
    const tick = (t) => {
      if (anim) {
        const k = Math.min(1, (t - anim.t0) / anim.dur);
        const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
        cur = anim.from + (anim.to - anim.from) * e;
        scrollTo(0, cur);
        if (k < 1) requestAnimationFrame(tick); else { anim = null; run = false; target = cur; }
        return;
      }
      const dt = Math.min(48, last ? t - last : 16.7); last = t;
      cur += (target - cur) * (1 - Math.pow(1 - 0.09, dt / 16.67));
      if (Math.abs(target - cur) < 0.3) { cur = target; run = false; }
      scrollTo(0, cur);
      if (run) requestAnimationFrame(tick);
    };
    const start = () => { if (!run) { run = true; last = 0; requestAnimationFrame(tick); } };
    const push = (d) => { if (anim) { anim = null; run = false; } if (!run) { cur = scrollY; target = cur; } target = clamp(target + d); start(); };
    const goto = (y) => {
      const to = clamp(y), from = scrollY, dist = Math.abs(to - from);
      if (dist < 2) return;
      anim = { from, to, t0: performance.now(), dur: Math.min(2600, Math.max(900, 600 + dist * 0.32)) };
      run = true; requestAnimationFrame(tick);
    };
    const wheel = (e) => {
      if (e.ctrlKey || document.body.style.overflow === "hidden") return;
      e.preventDefault();
      push(e.deltaY * (e.deltaMode === 1 ? 32 : e.deltaMode === 2 ? innerHeight : 1));
    };
    const key = (e) => {
      const t = e.target;
      if (/INPUT|TEXTAREA|SELECT/.test(t.tagName) || t.isContentEditable || e.metaKey || e.ctrlKey || e.altKey || document.body.style.overflow === "hidden") return;
      const link = t.tagName === "BUTTON" || t.tagName === "A";
      const page = innerHeight * 0.9;
      let d;
      if (e.key === "ArrowDown") d = 90; else if (e.key === "ArrowUp") d = -90;
      else if (e.key === "PageDown") d = page; else if (e.key === "PageUp") d = -page;
      else if (e.key === " " && !link) d = e.shiftKey ? -page : page;
      else if (e.key === "Home") { e.preventDefault(); return goto(0); }
      else if (e.key === "End") { e.preventDefault(); return goto(max()); }
      if (d !== undefined) { e.preventDefault(); push(d); }
    };
    const sync = () => { if (!run) { cur = scrollY; target = cur; } };
    window.__goto = goto;
    addEventListener("wheel", wheel, { passive: false });
    addEventListener("keydown", key);
    addEventListener("scroll", sync, { passive: true });
    return () => { removeEventListener("wheel", wheel); removeEventListener("keydown", key); removeEventListener("scroll", sync); delete window.__goto; };
  }, []);
}

/* gentle scroll parallax for [data-par] layers */
function useParallax() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let els = [], raf = 0;
    const collect = () => { els = [...document.querySelectorAll("[data-par]")]; };
    const upd = () => {
      raf = 0;
      const vh = innerHeight;
      els.forEach((el) => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        el.style.transform = `translate3d(0,${(-(r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.par)).toFixed(1)}px,0)`;
      });
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(upd); };
    collect(); upd();
    const t = setTimeout(() => { collect(); upd(); }, 900);
    addEventListener("scroll", on, { passive: true }); addEventListener("resize", on);
    return () => { clearTimeout(t); removeEventListener("scroll", on); removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);
}


function CursorGlow() {
  const ref = useRef(null);
  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y, raf;
    const mv = (e) => { x = e.clientX; y = e.clientY; };
    const loop = () => { cx += (x - cx) * 0.07; cy += (y - cy) * 0.07; ref.current.style.transform = `translate3d(${cx - 250}px,${cy - 250}px,0)`; raf = requestAnimationFrame(loop); };
    addEventListener("mousemove", mv, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => { removeEventListener("mousemove", mv); cancelAnimationFrame(raf); };
  }, []);
  return <div ref={ref} className="cglow" aria-hidden="true" />;
}

/* ================= CAPSULE NAV ================= */
function Nav({ active, solid }) {
  const [open, setOpen] = useState(false);
  const refs = useRef({});
  const [ind, setInd] = useState({ x: 0, w: 0 });
  const place = () => { const el = refs.current[active]; el && setInd({ x: el.offsetLeft, w: el.offsetWidth }); };
  useLayoutEffect(place, [active, solid]);
  useEffect(() => { addEventListener("resize", place); return () => removeEventListener("resize", place); });
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);
  useEffect(() => { const k = (e) => e.key === "Escape" && setOpen(false); addEventListener("keydown", k); return () => removeEventListener("keydown", k); }, []);
  return (
    <>
      <header className={`nav ${solid ? "mini" : ""} ${open ? "open" : ""}`}>
        <a href="#home" className="logo" onClick={go("home")} aria-label="Sagar Gowda, home">
          <span className="sg">SG</span><span className="full">Sagar Gowda</span><i />
        </a>
        <nav className="links" aria-label="Primary">
          <span className="ind" style={{ transform: `translateX(${ind.x}px)`, width: ind.w }} />
          {NAV.map(([l, id]) => (
            <a key={id} ref={(el) => (refs.current[id] = el)} href={`#${id}`} className={active === id ? "act" : ""} aria-current={active === id ? "true" : undefined} onClick={go(id)}>{l}</a>
          ))}
        </nav>
        <Btn variant="pri sm" href="#contact" onClick={go("contact")} icon="send">Let's Talk</Btn>
        <button className={`burger ${open ? "x" : ""}`} aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
      </header>
      <div className={`drop ${open ? "open" : ""}`} aria-hidden={!open}>
        {NAV.map(([l, id], i) => (
          <a key={id} href={`#${id}`} tabIndex={open ? 0 : -1} style={{ transitionDelay: `${open ? 100 + i * 55 : 0}ms` }}
            onClick={(e) => { e.preventDefault(); setOpen(false); setTimeout(() => go(id)(), 380); }}>
            <small>0{i + 1}</small>{l}<Ic n="arrow" s={26} />
          </a>
        ))}
      </div>
    </>
  );
}

/* ================= SECTIONS ================= */
const PTS = [[100, 450], [340, 372], [580, 285], [820, 175], [1060, 62]];
const curve = (pts) => {
  const p = [[0, 492], ...pts];
  let d = `M${p[0][0]},${p[0][1]}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] || p[i], p1 = p[i], p2 = p[i + 1], p3 = p[i + 2] || p2;
    d += ` C${p1[0] + (p2[0] - p0[0]) / 6},${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6},${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]},${p2[1]}`;
  }
  return d;
};
const CLIMB = curve(PTS);
const PEAKS = [[340, 340], [580, 260], [820, 150], [1060, 36]];
const PINES = Array.from({ length: 22 }, (_, i) => [i * 56 + ((i * 37) % 30), 478 + ((i * 13) % 22)]);
const STARS = [[80, 60], [220, 30], [330, 90], [520, 40], [640, 110], [900, 30], [1120, 130], [1170, 60], [40, 160], [760, 60]];


/* About: identity orbit */

/* Education: cyber security ∩ cloud architecture */

function ProjArt({ i }) {
  const c = { viewBox: "0 0 240 180", className: "art" };
  if (i === 0) return (<svg {...c}><path className="gr" d="M0 60H240M0 120H240M60 0V180M120 0V180M180 0V180" /><path id="rt" className="dash" d="M22 152C62 152 70 92 112 102S172 44 208 40" /><circle r="5" fill="#FF7A45"><animateMotion dur="3.4s" repeatCount="indefinite"><mpath href="#rt" /></animateMotion></circle><circle className="pulse" cx="208" cy="40" r="8" /><circle cx="208" cy="40" r="5" fill="#fff" /><circle cx="22" cy="152" r="5" fill="none" stroke="#fff" /></svg>);
  if (i === 1) return (<svg {...c}><path className="stk" d="M120 20l60 22v44c0 40-27 62-60 72-33-10-60-32-60-72V42z" /><circle className="stk" cx="120" cy="82" r="13" /><path className="stk" d="M120 95v22" /><g className="chat"><rect x="14" y="128" width="70" height="14" rx="7" /><rect x="156" y="150" width="70" height="14" rx="7" /></g><circle className="pulse" cx="120" cy="82" r="14" /></svg>);
  if (i === 2) return (<svg {...c}><rect className="stk" x="22" y="26" width="196" height="128" rx="12" /><path className="stk" d="M22 50H218" /><circle cx="38" cy="38" r="4" fill="#FF7A45" /><circle cx="52" cy="38" r="4" fill="#fff" opacity=".6" /><rect className="blk" x="40" y="66" width="90" height="12" rx="6" /><rect className="blk b2" x="40" y="88" width="140" height="12" rx="6" /><rect className="blk b3" x="40" y="110" width="60" height="26" rx="8" /><path className="cur" d="M150 120v22l6-6 8 14 4-2-8-14 8-1z" /></svg>);
  if (i === 3) return (<svg {...c}>{[0, 1, 2, 3, 4, 5, 6, 7, 8].map((k) => <rect key={k} className="eq" x={26 + k * 22} y="40" width="12" height="100" rx="6" style={{ animationDelay: `${k * 0.13}s` }} />)}<path className="dash" d="M20 154H220" /></svg>);
  if (i === 4) return (<svg {...c}><path className="gr" d="M60 120L120 60L180 110M120 60V140" /><circle className="nd" cx="120" cy="60" r="16" /><circle className="nd n2" cx="60" cy="120" r="12" /><circle className="nd n3" cx="180" cy="110" r="14" /><circle className="nd n4" cx="120" cy="140" r="10" /><path className="stk bub" d="M150 22h44a8 8 0 0 1 8 8v20a8 8 0 0 1-8 8h-20l-10 10V58h-14a8 8 0 0 1-8-8V30a8 8 0 0 1 8-8z" /></svg>);
  return (<svg {...c}><rect className="stk" x="56" y="16" width="128" height="148" rx="10" /><rect className="kw" x="72" y="40" width="60" height="12" rx="6" /><path className="stk" d="M72 70H168M72 86H150M72 102H168M72 118H130" /><rect className="kw k2" x="72" y="130" width="76" height="12" rx="6" /><rect className="scan" x="52" y="16" width="136" height="3" /></svg>);
}







function Intro({ onDone }) {
  const [n, setN] = useState(0);
  const [st, setSt] = useState("run");
  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("intro") === "1"; } catch (e) { /* ignore */ }
    if (seen || matchMedia("(prefers-reduced-motion: reduce)").matches) { setSt("gone"); onDone(); return; }
    document.body.style.overflow = "hidden";
    const t0 = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / 1500);
      setN(Math.round(100 * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setSt("out"); onDone(); document.body.style.overflow = "";
        try { sessionStorage.setItem("intro", "1"); } catch (e) { /* ignore */ }
        setTimeout(() => setSt("gone"), 1300);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); document.body.style.overflow = ""; };
  }, []);
  if (st === "gone") return null;
  return (
    <div className={`intro ${st === "out" ? "out" : ""}`} aria-hidden="true">
      <div className="inum">{String(n).padStart(2, "0")}</div>
      <div className="ibar"><i style={{ transform: `scaleX(${n / 100})` }} /></div>
      <small>Sagar Gowda · Day One</small>
    </div>
  );
}


function useFit(oRef, iRef) {
  useLayoutEffect(() => {
    let best = 1;
    const fit = (reset) => {
      const o = oRef.current, w = iRef.current;
      if (!o || !w) return;
      if (innerWidth <= 1000) { w.style.transform = ""; best = 1; return; }
      if (reset) best = 1;
      const cs = getComputedStyle(o);
      const avail = o.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      best = Math.min(best, Math.max(0.55, avail / w.offsetHeight));
      w.style.transform = best < 0.999 ? `scale(${best})` : "";
    };
    fit(true);
    const ro = new ResizeObserver(() => fit(false));
    ro.observe(iRef.current);
    const onR = () => fit(true);
    addEventListener("resize", onR);
    document.fonts && document.fonts.ready.then(() => fit(true));
    const t = setTimeout(() => fit(true), 1200);
    return () => { ro.disconnect(); removeEventListener("resize", onR); clearTimeout(t); };
  }, []);
}

/* ---- Climb so far: self-playing story, no hover ---- */
function Peak() {
  const [ref, on] = useInView(0.35);
  const [sel, setSel] = useState(-1);
  const [tgt, setTgt] = useState(0);
  const pathRef = useRef(null), runRef = useRef(null), ctl = useRef(null);
  useEffect(() => {
    const path = pathRef.current, L = path.getTotalLength();
    const lens = PTS.map(([x, y]) => { let best = 0, bd = 1e12; for (let i = 0; i <= 400; i++) { const q = path.getPointAtLength((L * i) / 400); const d = (q.x - x) ** 2 + (q.y - y) ** 2; if (d < bd) { bd = d; best = i / 400; } } return best; });
    let from = 0, raf = 0, timer = 0, token = 0, alive = true;
    const draw = (f) => { const q = path.getPointAtLength(L * f); runRef.current.style.left = `${q.x / 12}%`; runRef.current.style.top = `${q.y / 5.2}%`; path.style.strokeDashoffset = String(1 - f); };
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const visit = (i, tk) => {
      if (!alive || tk !== token) return;
      setTgt(i);
      const to = lens[i], f0 = from, t0 = performance.now(), dur = f0 === 0 ? 1200 : 2400;
      const tick = (t) => {
        if (!alive || tk !== token) return;
        const k = Math.min(1, (t - t0) / dur);
        from = f0 + (to - f0) * ease(k); draw(from);
        if (k < 1) { raf = requestAnimationFrame(tick); return; }
        setSel(i);
        timer = setTimeout(() => {
          if (i + 1 < PTS.length) visit(i + 1, tk);
          else timer = setTimeout(() => { if (tk !== token) return; from = 0; draw(0); setSel(-1); visit(0, tk); }, 3200);
        }, 3600);
      };
      raf = requestAnimationFrame(tick);
    };
    const stop = () => { token++; clearTimeout(timer); cancelAnimationFrame(raf); };
    ctl.current = { stop, begin: (i) => { stop(); if (i === 0) { from = 0; draw(0); setSel(-1); } visit(i, token); } };
    draw(0);
    return () => { alive = false; stop(); };
  }, []);
  useEffect(() => { if (on) ctl.current.begin(0); else ctl.current.stop(); }, [on]);
  const cur = Math.max(sel, 0), m = MILES[cur];
  const [tx, ty] = PTS[tgt];
  return (
    <div ref={ref} className={`peak ${on ? "on" : ""}`}>
      <div className="pscene">
        <div className="pcam" style={{ transformOrigin: `${tx / 12}% ${ty / 5.2}%` }}>
          <svg viewBox="0 0 1200 520" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="pk1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F04B19" /><stop offset=".55" stopColor="#5a2314" /><stop offset="1" stopColor="#1d1512" /></linearGradient>
              <linearGradient id="pk2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2c211d" /><stop offset="1" stopColor="#110d0b" /></linearGradient>
              <linearGradient id="pkT" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#F5F1E9" /><stop offset="1" stopColor="#FF7A45" /></linearGradient>
              <radialGradient id="pkS"><stop offset="0" stopColor="#FF7A45" stopOpacity=".9" /><stop offset="1" stopColor="#FF7A45" stopOpacity="0" /></radialGradient>
              <filter id="pkB"><feGaussianBlur stdDeviation="12" /></filter>
            </defs>
            <circle className="sunc" cx="1060" cy="70" r="230" fill="url(#pkS)" />
            {STARS.map(([x, y], i) => <circle key={i} className="star" cx={x} cy={y} r="1.8" style={{ animationDelay: `${i * 0.4}s` }} />)}
            <path className="far" d="M0,520 L0,360 L170,310 L360,380 L540,290 L740,360 L930,250 L1200,330 L1200,520Z" />
            <ellipse className="mist" cx="260" cy="400" rx="280" ry="30" />
            <path className="r1" d="M0,520 L0,420 L120,380 L230,430 L340,340 L460,400 L580,260 L700,330 L820,150 L940,240 L1060,36 L1200,190 L1200,520Z" fill="url(#pk1)" />
            {PEAKS.map(([x, y], i) => <path key={i} className="snow" d={`M${x - 34},${y + 30} L${x - 12},${y + 18} L${x},${y + 32} L${x + 14},${y + 18} L${x + 34},${y + 30} L${x},${y}Z`} />)}
            <ellipse className="mist m2" cx="900" cy="330" rx="300" ry="26" />
            <path className="r2" d="M0,520 L0,490 L150,450 L290,492 L440,440 L600,486 L760,400 L900,462 L1040,380 L1200,440 L1200,520Z" fill="url(#pk2)" />
            {PINES.map(([x, y], i) => <path key={i} className="pine" d={`M${x},${y} l-10,26 h20z M${x},${y + 12} l-13,26 h26z`} />)}
            <path ref={pathRef} className="climb" pathLength="1" d={CLIMB} />
            {[[120, 110, 0], [420, 70, 7]].map(([x, y, dl], i) => <path key={i} className="bird" style={{ animationDelay: `${dl}s` }} d={`M${x},${y} q7,-9 14,0 q7,-9 14,0`} />)}
          </svg>
          {PTS.map(([x, y], i) => (
            <span key={i} className={`pn2 ${i <= sel ? "lit" : ""} ${i === sel ? "cur" : ""}`} style={{ left: `${x / 12}%`, top: `${y / 5.2}%` }}>
              <Ic n={MILES[i][1]} s={16} />{i === sel && <span className={`plab ${i === 0 ? "up" : ""}`}>{MILES[i][0]}</span>}
            </span>
          ))}
          <span ref={runRef} className="runner2" />
          <svg className="pflag" viewBox="0 0 40 50" aria-hidden="true"><path d="M6 4v44" stroke="#fff" strokeWidth="3" strokeLinecap="round" /><path className="wave" d="M8 6H36L29 14L36 22H8Z" fill="#F04B19" /></svg>
        </div>
      </div>
      <div className="pchips">{MILES.map((x, i) => <button key={x[0]} className={i === cur && sel >= 0 ? "on" : ""} onClick={() => ctl.current.begin(i)}>{x[0]}</button>)}</div>
      <div className="ppanel" key={cur}>
        <div><small>0{cur + 1} · {m[0]}</small><h3>{m[2]}</h3></div>
        <ul>{m[3].map((b) => <li key={b}>{b}</li>)}</ul>
      </div>
    </div>
  );
}

/* ---- About: simple identity reel ---- */
function Identity() {
  const [ref, on] = useInView(0.3);
  const [a, setA] = useState(0);
  useEffect(() => { if (!on) return; const t = setInterval(() => setA((x) => (x + 1) % IDS.length), 3000); return () => clearInterval(t); }, [on]);
  return (
    <div ref={ref} className={`ident ${on ? "on" : ""}`}>
      <div className="isun" data-par="0.05" />
      <ul>
        {IDS.map(([t], i) => (
          <li key={t} className={a === i ? "on" : ""}>
            <button onClick={() => setA(i)}><span className="idn">0{i + 1}</span><span>{t.replace("The ", "")}</span></button>
          </li>
        ))}
      </ul>
      <div className="idesc" key={a}><Ic n={IDS[a][1]} s={18} /><span>{IDS[a][2]}</span></div>
    </div>
  );
}

/* ---- Journey: ID badge, present + past ---- */
function Career({ day }) {
  const [era, setEra] = useState("now");
  const now = era === "now";
  return (
    <Reveal className="career">
      <div className="era" role="tablist" aria-label="Career">
        <button role="tab" aria-selected={now} className={now ? "on" : ""} onClick={() => setEra("now")}>Present</button>
        <button role="tab" aria-selected={!now} className={!now ? "on" : ""} onClick={() => setEra("past")}>Past</button>
      </div>
      <div className="jhead">
        <div className="jcard" key={era}>
          {now ? (
            <>
              <small>Cognizant</small><h3>Analyst Trainee</h3>
              <p className="meta"><Ic n="cal" s={16} />September 17, 2026 – Present &nbsp;<Ic n="pin" s={16} />Bengaluru, India</p>
              <p>I began my professional journey at Cognizant on September 17, 2026, stepping into the corporate technology environment as an Analyst Trainee. It marks an important transition from academic learning to professional development.</p>
              <ul className="focus">{FOCUS.map((f) => <li key={f}>{f}</li>)}</ul>
            </>
          ) : (
            <>
              <small>ZoomInData</small><h3>Cloud Computing Intern</h3>
              <p className="meta"><Ic n="cloud" s={16} />Internship</p>
              <ul className="focus one">{MILES[1][3].map((f) => <li key={f}>{f}</li>)}</ul>
            </>
          )}
        </div>
        <div className="badgewrap">
          <div className="lanyard">
            <i className="strap" />
            <div className="idcard" key={era}>
              <span className="hole" />
              <div className="idtop"><b>{now ? "Cognizant" : "ZoomInData"}</b><small>{now ? "Bengaluru" : "Internship"}</small></div>
              <div className="idph" style={{ backgroundImage: `url(${HERO_IMG})` }} />
              <h4>SAGAR GOWDA</h4>
              <div className="idrole">{now ? "Analyst Trainee" : "Cloud Computing Intern"}</div>
              <div className="idrow"><span>{now ? "My professional day one" : "Cloud computing"}</span><strong>{now ? "17.09.2026" : "Intern"}</strong></div>
              <div className="bc" />
              {now && <em className="dc"><i />Day {day}</em>}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ---- Education: cinematic scene ---- */
function EduScene() {
  const [ref, on] = useInView(0.3);
  return (
    <div ref={ref} className={`edus ${on ? "on" : ""}`}>
      <div className="erays" />
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs><radialGradient id="eg"><stop offset="0" stopColor="#FF7A45" /><stop offset="1" stopColor="#FF7A45" stopOpacity="0" /></radialGradient></defs>
        <circle className="esun" cx="200" cy="190" r="140" fill="url(#eg)" />
        <path className="eh1" d="M0,300 L0,214 Q100,176 200,208 T400,192 L400,300Z" fill="#3a1d12" />
        <path className="eh2" d="M0,300 L0,250 Q120,220 220,244 T400,232 L400,300Z" fill="#130f0d" />
        <path className="eln" d="M110,98 C70,110 66,150 68,180" /><path className="eln" d="M290,98 C330,110 334,150 332,180" />
        <g className="ecap"><path d="M146,116 V146 Q200,176 254,146 V116 L200,138Z" fill="#cdbfb0" /><path d="M200,64 L290,98 L200,132 L110,98Z" fill="#F5F1E9" /><path d="M290,98 V142" stroke="#FF7A45" strokeWidth="3" /><circle cx="290" cy="146" r="5" fill="#FF7A45" /></g>
      </svg>
      <span className="echip" style={{ left: "17%", top: "64%" }}><Ic n="shield" s={15} />Cyber Security</span>
      <span className="echip" style={{ left: "83%", top: "64%" }}><Ic n="cloud" s={15} />Cloud Architecture</span>
      <div className="ecap2">Systems built · secured · deployed · managed</div>
    </div>
  );
}

/* ---- Projects: scroll-driven story ---- */
function ProjScene({ i }) {
  const sx = [70, 30, 55, 80, 45, 62][i];
  return (
    <div className="pscn" style={{ "--sx": `${sx}%` }}>
      <div className="psun" />
      <svg className="pmtn" viewBox="0 0 400 120" preserveAspectRatio="none" style={{ transform: i % 2 ? "scaleX(-1)" : "none" }} aria-hidden="true">
        <path d="M0,120 L0,70 L60,40 L110,75 L170,25 L230,70 L290,35 L350,72 L400,50 L400,120Z" fill="#0d0b0a" /><path d="M0,120 L0,95 L90,70 L160,98 L240,66 L320,98 L400,80 L400,120Z" fill="#060504" />
      </svg>
      <div className="pem">{Array.from({ length: 12 }, (_, k) => <i key={k} style={{ left: `${(k * 83 + i * 17) % 100}%`, animationDelay: `${(k * 0.6) % 6}s` }} />)}</div>
      <div className="pa2" key={i}><ProjArt i={i} /></div>
      <b className="pbig">0{i + 1}</b>
    </div>
  );
}
function ProjectsStory() {
  const outer = useRef(null), stick = useRef(null), wrap = useRef(null);
  const [act, setAct] = useState(0);
  const [pin, setPin] = useState(true);
  const [mob, setMob] = useState(0);
  useFit(stick, wrap);
  useEffect(() => {
    const mq = matchMedia("(min-width: 1001px)");
    const f = () => {
      setPin(mq.matches);
      if (!mq.matches) return;
      const r = outer.current.getBoundingClientRect();
      const p = Math.min(0.999, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)));
      setAct(Math.floor(p * PROJECTS.length));
    };
    f(); addEventListener("scroll", f, { passive: true }); addEventListener("resize", f);
    return () => { removeEventListener("scroll", f); removeEventListener("resize", f); };
  }, []);
  const cur = pin ? act : mob, pi = cur < 0 ? 0 : cur, P = PROJECTS[pi];
  const jump = (i) => {
    if (!pin) return setMob(mob === i ? -1 : i);
    const r = outer.current.getBoundingClientRect(), tot = r.height - innerHeight;
    const y = scrollY + r.top + tot * ((i + 0.5) / PROJECTS.length);
    window.__goto ? window.__goto(y) : scrollTo({ top: y, behavior: "smooth" });
  };
  return (
    <section id="work" ref={outer} className={`pstory dark ${pin ? "pin" : ""}`} aria-label="Projects">
      <div className="pstick" ref={stick}>
        <div className="gl" />
        <div className="wrap" ref={wrap}>
          <Reveal once className="sechead"><b>06</b><i />Projects<span className="pcount">0{pi + 1} / 0{PROJECTS.length}</span></Reveal>
          <div className="phd">
            <Split text="Ideas deserve to exist." className="disp sm" />
            <Reveal delay={80}><p className="lead">Every project starts with a question: what if something could be simpler, smarter or more useful? Concepts are marked as concepts.</p></Reveal>
          </div>
          <div className="pwrap">
            <div className="plist">
              {PROJECTS.map(([name, tags, status, ic, desc, focus, key], i) => {
                const url = key && LINKS[key], on = cur === i;
                return (
                  <div key={name} className={`prow ${on ? "on" : ""}`}>
                    <button className="phead" aria-expanded={on} aria-controls={`p${i}`} onClick={() => jump(i)}>
                      <span className="pn">{String(i + 1).padStart(2, "0")}</span><span className="pt">{name}</span><span className="pill">{status}</span><span className="pplus"><Ic n="plus" s={20} /></span>
                    </button>
                    <div className="pbody" id={`p${i}`}>
                      <div><div className="pin2">
                        <div className="t"><p>{desc}</p><p className="focus2"><b>Focus</b>{focus}</p></div>
                        {url && <Btn variant="pri sm" href={url} icon="arrow">Visit {name}</Btn>}
                      </div></div>
                    </div>
                  </div>
                );
              })}
            </div>
            <aside className="pprev" aria-hidden="true">
              <ProjScene i={pi} />
              <small>{P[2]} · {P[1]}</small><h3>{P[0]}</h3>
            </aside>
          </div>
          <Reveal className="quote q2">“An idea becomes valuable when you give it the effort to exist.”</Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---- cinematic section backdrops ---- */
const ContactBg = () => (
  <div className="bg" aria-hidden="true">
    <div className="csun" data-par="0.05" />
    <svg className="cflight" viewBox="0 0 1200 300" preserveAspectRatio="none"><path id="fly2" className="dash" d="M60,260 C300,60 520,270 760,120 S1060,40 1190,24" /><path d="M-16,-9 L18,0 L-16,9 L-9,0Z" fill="#fff"><animateMotion dur="9s" repeatCount="indefinite" rotate="auto"><mpath href="#fly2" /></animateMotion></path></svg>
    <svg className="cmtn" viewBox="0 0 1200 260" preserveAspectRatio="none"><path d="M0,260 L0,170 L140,120 L260,170 L420,70 L540,140 L700,50 L860,140 L1000,90 L1120,150 L1200,120 L1200,260Z" fill="#171514" /><path d="M0,260 L0,210 L180,170 L330,215 L500,160 L680,214 L860,170 L1040,216 L1200,190 L1200,260Z" fill="#0b0908" /></svg>
    <svg className="ctower" viewBox="0 0 80 150"><path d="M40,12 L10,146 M40,12 L70,146 M23,80H57M16,112H64M30,50H50" /><circle cx="40" cy="8" r="4" fill="#fff" stroke="none" /><circle className="sg" cx="40" cy="8" r="7" /><circle className="sg s2" cx="40" cy="8" r="7" /><circle className="sg s3" cx="40" cy="8" r="7" /></svg>
  </div>
);


function SkillArt({ i }) {
  const v = { viewBox: "0 0 100 100" };
  return (
    <div className="sart" aria-hidden="true">
      {i === 0 && <svg {...v}><path d="M34 30L14 50l20 20M66 30l20 20-20 20M56 24L44 76" /><rect className="caret" x="62" y="76" width="16" height="4" /></svg>}
      {i === 1 && <svg {...v}><path className="cl1" d="M26 62a12 12 0 0 1 1-24 16 16 0 0 1 31 3 11 11 0 0 1 2 21z" /><path className="up" d="M50 86V62m0 0l-8 8m8-8l8 8" /></svg>}
      {i === 2 && <svg {...v}><path id="inf" d="M50 50C50 30 20 30 20 50S50 70 50 50 80 30 80 50 50 70 50 50z" /><circle r="4" fill="currentColor" stroke="none"><animateMotion dur="3s" repeatCount="indefinite"><mpath href="#inf" /></animateMotion></circle></svg>}
      {i === 3 && <svg {...v}><path d="M20 25L50 40M20 50L50 18M20 50L50 62M20 75L50 84M50 40L80 38M50 62L80 62M50 18L80 38M50 84L80 62" opacity=".5" />{[[20, 25], [20, 50], [20, 75], [50, 18], [50, 40], [50, 62], [50, 84], [80, 38], [80, 62]].map(([x, y], k) => <circle key={k} className="nd" cx={x} cy={y} r="4.5" fill="currentColor" stroke="none" style={{ animationDelay: `${k * 0.25}s` }} />)}</svg>}
      {i === 4 && <svg {...v}><path className="ly" d="M50 22l36 18-36 18-36-18z" /><path className="ly l2" d="M14 54l36 18 36-18" /><path className="ly l3" d="M14 68l36 18 36-18" /></svg>}
    </div>
  );
}

function BeyondArt({ i }) {
  const v = { viewBox: "0 0 80 80", className: "bart" };
  if (i === 0) return (<svg {...v}><g className="g1"><circle cx="30" cy="36" r="14" strokeWidth="8" strokeDasharray="5.5 5.5" /><circle cx="30" cy="36" r="5" /></g><g className="g2"><circle cx="58" cy="56" r="10" strokeWidth="7" strokeDasharray="4.2 4.2" /><circle cx="58" cy="56" r="3.5" /></g></svg>);
  if (i === 1) return (<svg {...v}><path d="M40 40L16 18M40 40L66 22M40 40L72 58M40 40L50 72M40 40L12 62" opacity=".6" /><circle className="nd" cx="40" cy="40" r="8" fill="#fff" /><circle className="nd n2" cx="16" cy="18" r="4" fill="#fff" /><circle className="nd n3" cx="66" cy="22" r="4" fill="#fff" /><circle className="nd n4" cx="72" cy="58" r="4" fill="#fff" /><circle className="nd" cx="50" cy="72" r="4" fill="#fff" /><circle className="nd n2" cx="12" cy="62" r="4" fill="#fff" /></svg>);
  return (<svg {...v}><g className="rk"><path d="M40 8c10 10 14 24 10 40H30C26 32 30 18 40 8z" /><circle cx="40" cy="28" r="5" /><path d="M30 40l-10 12 12-2M50 40l10 12-12-2" /><path className="fl2" d="M34 52q6 22 12 0" /></g><circle className="star" cx="14" cy="18" r="1.6" fill="#fff" /><circle className="star" cx="68" cy="30" r="1.6" fill="#fff" style={{ animationDelay: ".8s" }} /><circle className="star" cx="62" cy="68" r="1.6" fill="#fff" style={{ animationDelay: "1.6s" }} /></svg>);
}

function LearnArt({ i }) {
  const v = { viewBox: "0 0 60 60", className: "lart" };
  if (i === 0) return (<svg {...v}><rect className="bk k1" x="8" y="40" width="20" height="12" /><rect className="bk k2" x="32" y="40" width="20" height="12" /><rect className="bk k3" x="20" y="24" width="20" height="12" /></svg>);
  if (i === 1) return (<svg {...v}><g className="lp"><path d="M50 30a20 20 0 0 1-34 14M10 30a20 20 0 0 1 34-14M44 8v10H34M16 52V42h10" /></g></svg>);
  if (i === 2) return (<svg {...v}><g className="ct"><rect x="6" y="22" width="30" height="18" /><path d="M14 22v18M22 22v18M30 22v18" /></g><path d="M4 46H56" opacity=".5" /></svg>);
  return (<svg {...v}><path className="sp" d="M30 8l5 15 15 5-15 5-5 15-5-15-15-5 15-5z" /></svg>);
}

function Finale({ lit, day }) {
  const embers = useMemo(() => Array.from({ length: 34 }, (_, i) => ({ l: (i * 29.7) % 100, d: (i * 0.37) % 6, t: 6 + ((i * 1.3) % 6), s: 2 + (i % 4) })), []);
  return (
    <section id="finale" className={`end ${lit ? "lit" : ""}`} aria-label="Finale">
      <div className="e-sun" />
      <div className="e-embers" aria-hidden="true">{embers.map((e, i) => <i key={i} style={{ left: `${e.l}%`, width: e.s, height: e.s, animationDelay: `${e.d}s`, animationDuration: `${e.t}s` }} />)}</div>
      <svg className="e-mtn" viewBox="0 0 1200 220" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,220 L0,150 L120,110 L230,150 L380,60 L480,120 L620,40 L760,120 L880,80 L1010,140 L1120,100 L1200,150 L1200,220Z" fill="#0d0b0a" />
        <path d="M0,220 L0,185 L160,150 L300,188 L450,130 L620,184 L780,140 L950,188 L1100,150 L1200,178 L1200,220Z" fill="#060504" />
      </svg>
      <div className="e-main">
        <p className="est">A personal reminder · Est. 17.09.2026 · Day {day}</p>
        <h2 aria-label="One day or day one."><span className="one">ONE DAY</span><span className="or">OR</span><span className="dayone">DAY ONE.</span></h2>
        <p className="chose">I chose to begin. I'm still becoming.</p>
      </div>
      <div className="e-foot">
        <div className="sig"><strong>SAGAR GOWDA.</strong><small>Building today. Engineering tomorrow.</small></div>
        <div className="soc">
          <a href={LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Ic n="linkedin" /></a>
          <a href={LINKS.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Ic n="github" /></a>
          <a href={LINKS.email} aria-label="Email"><Ic n="mail" /></a>
        </div>
        <Btn variant="glass sm top" href="#home" onClick={go("home")} icon="up">Back to top</Btn>
        <small className="copy">© 2026 Sagar Gowda. All rights reserved.</small>
      </div>
    </section>
  );
}


function SkillGrid() {
  return (
    <div className="sk">
      {SKILLS.map(([c, ic, items], i) => (
        <Reveal key={c} delay={i * 110} className={`skc s${i}`} onMouseMove={spot}>
          <div className="skh"><SkillArt i={i} /><Tile n={ic} /><span className="skn">{String(i + 1).padStart(2, "0")}</span></div>
          <h3>{c}</h3>
          <div className="techs">{items.map((x, j) => <span key={x} className="tech" style={{ animationDelay: `${450 + i * 110 + j * 80}ms` }}>{x}</span>)}</div>
        </Reveal>
      ))}
    </div>
  );
}

/* ================= APP ================= */
export default function App() {
  const [active, setActive] = useState("home");
  const [cur, setCur] = useState("home");
  const [solid] = useState(true);
  const [ready, setReady] = useState(false);
  const [lit, setLit] = useState(false);
  const day = Math.max(1, Math.floor((Date.now() - DAY_ONE) / 864e5) + 1);
  useSmoothScroll();
  useParallax();

  useEffect(() => {
    document.title = "Sagar Gowda — Analyst Trainee @ Cognizant | Developer · Cloud & DevOps";
    let m = document.querySelector('meta[name="description"]');
    if (!m) { m = document.createElement("meta"); m.name = "description"; document.head.appendChild(m); }
    m.content = "Portfolio of Sagar Gowda: Analyst Trainee at Cognizant, developer and builder exploring cloud, DevOps, automation and AI.";
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const bar = document.querySelector(".pbar");
    const onScroll = () => { bar.style.transform = `scaleX(${scrollY / Math.max(1, root.scrollHeight - innerHeight)})`; };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { setCur(e.target.id); setActive(NAV_OF[e.target.id] || e.target.id); } }), { rootMargin: "-45% 0px -50% 0px" });
    SECTIONS.forEach(([id]) => io.observe(document.getElementById(id)));
    const io2 = new IntersectionObserver(([e]) => setLit(e.isIntersecting), { threshold: 0.5 });
    io2.observe(document.getElementById("finale"));
    return () => { removeEventListener("scroll", onScroll); io.disconnect(); io2.disconnect(); };
  }, []);

  return (
    <div className={`app ${ready ? "ready" : ""}`}>
      <style>{CSS}</style>
      <a className="skip" href="#about" onClick={go("about")}>Skip to content</a>
      <div className="pbar" /><div className="grain" aria-hidden="true" /><CursorGlow />
      <Nav active={active} solid={solid} />
      <Intro onDone={() => setReady(true)} />
      <ul className="dots" aria-label="Sections">
        {SECTIONS.map(([id, l]) => (
          <li key={id}><a href={`#${id}`} className={cur === id ? "on" : ""} onClick={go(id)} aria-label={l}><span>{l}</span><i /></a></li>
        ))}
      </ul>

      <main>
        {/* 01 HERO */}
        <section id="home" className="hero" aria-label="Hero" style={{ "--bg": `url(${HERO_BG})` }}>
          <div className="tags a1"><b>01</b><span>Developer</span><em>×</em><span>Builder</span><em>×</em><span>Learner</span></div>
          <div className="hcopy">
            <small className="a2">©2026</small>
            <h1 className="a3"><span>SAGAR</span><span>GOWDA<i /></span></h1>
            <p className="role a4">Analyst Trainee @ Cognizant</p>
            <p className="sub a4">Developer &nbsp;|&nbsp; Cloud &amp; DevOps Enthusiast &nbsp;|&nbsp; Digital Builder</p>
            <div className="ctas a5">
              <Btn href="#work" onClick={go("work")} icon="arrow">View My Work</Btn>
              <Btn variant="glass" href="#journey" onClick={go("journey")} icon="down">Explore My Journey</Btn>
              <Btn variant="glass" href={LINKS.resume} icon="download" download>Resume</Btn>
            </div>
          </div>
          <a className="gcard c1 a5" href="#journey" onClick={go("journey")}>
            <div className="cp"><Tile n="flag" /><span className="live"><i />Day {day}</span></div>
            <small className="cpl">Current position</small>
            <strong className="cpt">Analyst Trainee</strong>
            <div className="gm"><div><small>Cognizant · Bengaluru</small><small>Since 17.09.2026</small></div><span className="go"><Ic n="arrow" s={16} /></span></div>
          </a>
          <div className="hfoot a5">
            <div className="soc">
              <a href={LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Ic n="linkedin" /></a>
              <a href={LINKS.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Ic n="github" /></a>
              <a href={LINKS.email} aria-label="Email"><Ic n="mail" /></a>
            </div>
            <span>Building today. Engineering tomorrow.</span>
          </div>
        </section>
        <div className="marq" aria-hidden="true"><div>{[0, 1].map((k) => <span key={k}>DEVELOPER ✦ BUILDER ✦ LEARNER ✦ DEVELOPER ✦ BUILDER ✦ LEARNER ✦ </span>)}</div></div>

        {/* 02 ABOUT */}
        <Sec id="about" idx={2} label="About" tone="warm">
          <div className="two">
            <div>
              <Split text="More than a job title." className="disp" />
              <Reveal delay={100}><p className="lead">I believe technology is most powerful when it creates something meaningful.</p></Reveal>
              <Reveal delay={150}><p>My journey began with curiosity about how digital experiences work, gradually growing into an interest in software development, cloud technologies, cybersecurity and artificial intelligence.</p></Reveal>
              <Reveal delay={200}><p>Beyond writing code, I enjoy experimenting with ideas, mentoring others, collaborating with people, and exploring how technology can solve everyday challenges.</p></Reveal>
              <Reveal delay={250}><p>I don't believe learning ends with a degree or a job title. Every project, challenge and experience is another opportunity to evolve.</p></Reveal>
            </div>
            <Identity />
          </div>
          <Reveal className="quote">“Stay curious. Stay humble. Keep building.”</Reveal>
        </Sec>

        {/* 03 JOURNEY */}
        <Sec id="journey" idx={3} label="Professional Journey" tone="fire">
          <Reveal><span className="chip-l"><Ic n="spark" s={14} />Current position</span></Reveal>
          <Split text="Where it all started." className="disp sm" />
          <Career day={day} />
          <Reveal className="quote">“Every meaningful journey begins with the decision to start.”</Reveal>
        </Sec>

        {/* 04 PROFESSIONAL OVERVIEW — the peak */}
        <Sec id="ascent" idx={4} label="Professional Overview" tone="dark">
          <Split text="The climb so far." className="disp sm" />
          <Peak />
          <Reveal className="quote q2">“The destination is a dream. The beginning is a decision.”</Reveal>
        </Sec>

        {/* 05 EDUCATION */}
        <Sec id="education" idx={5} label="Education" tone="warm">
          <div className="two">
            <div><Split text="Built on curiosity." className="disp" /><EduScene /></div>
            <Reveal delay={100} className="edu">
              <Tile n="cap" />
              <h3>Bachelor of Computer Applications</h3>
              <p className="meta2">Specialization: Cyber Security &amp; Cloud Architecture<br />Bengaluru City University · Completed</p>
              <p>My academic journey introduced me to the foundations of computing, programming, software development and emerging technologies.</p>
              <p>Through my specialization I became interested in how systems are built, secured, deployed and managed. More importantly, it taught me that knowledge becomes valuable when it is applied.</p>
            </Reveal>
          </div>
          <Reveal className="quote">“Education gave me the foundation. Curiosity gave me the direction.”</Reveal>
        </Sec>

        {/* 06 PROJECTS: scroll-driven */}
        <ProjectsStory />

        {/* 06 SKILLS */}
        <Sec id="skills" idx={7} label="Skills" tone="warm">
          <Split text="The technology I work with." className="disp sm" />
          <SkillGrid />
          <Reveal className="quote">“Tools change. The ability to learn never goes out of style.”</Reveal>
        </Sec>

        {/* 07 BEYOND */}
        <Sec id="beyond" idx={8} label="Beyond Code" tone="fire">
          <Split text="Not just about code." className="disp" />
          <Reveal delay={80}><p className="lead">Some of the most meaningful experiences happen outside a development environment. I enjoy working with people, sharing knowledge, taking initiative and contributing to communities.</p></Reveal>
          <div className="hgrid">
            {HUMAN.map(([t, r, ic, d], i) => <Reveal key={t} delay={i * 100} className="hc glow" onMouseMove={spot}><BeyondArt i={i} /><small>{r}</small><h3>{t}</h3><p>{d}</p></Reveal>)}
          </div>
          <Reveal><p className="lead">Technical skills help us build solutions; communication, empathy, ownership and collaboration help us build meaningful relationships.</p></Reveal>
          <Reveal className="quote">“Build things that work. Build relationships that last.”</Reveal>
        </Sec>

        {/* 08 LEARNING */}
        <Sec id="learning" idx={9} label="Learning" tone="dark">
          <Split text="Still under construction." className="disp" />
          <Reveal delay={80}><p className="lead">My professional journey has just begun, and every new technology is another opportunity to expand my perspective.</p></Reveal>
          <div className="tape" aria-hidden="true"><div>{[0, 1].map((k) => <span key={k}>UNDER CONSTRUCTION ✦ STILL LEARNING ✦ UNDER CONSTRUCTION ✦ STILL BUILDING ✦ UNDER CONSTRUCTION ✦ STILL BECOMING ✦ </span>)}</div></div>
          <div className="egrid">
            {LEARN.map(([t, ic, d], i) => <Reveal key={t} delay={i * 90} className="ec glow" onMouseMove={spot}><LearnArt i={i} /><h3>{t}</h3><p>{d}</p></Reveal>)}
          </div>
          <Reveal className="quote q2">“I don't need to know everything today. I just need to keep learning something every day.”</Reveal>
        </Sec>

        {/* 09 CONTACT */}
        <Sec id="contact" idx={10} label="Contact" tone="fire" bg={<ContactBg />}>
          <div className="two">
            <div className="cl">
              <Split text="Let's make something matter." className="disp" />
              <Reveal delay={80}><p className="lead">Whether it's a creative idea, a technical discussion, a collaboration, or simply someone who shares an interest in technology, I'd be happy to hear from you.</p></Reveal>
              <Reveal delay={200}><Btn href={LINKS.email} icon="send">Let's Connect</Btn></Reveal>
            </div>
            <Reveal delay={140} className="clist">
              {[["mail", "Email", EMAIL, LINKS.email], ["linkedin", "LinkedIn", "onlinewithsagar", LINKS.linkedin], ["github", "GitHub", "onlinewithsagar", LINKS.github], ["compass", "Portfolio", "sagargowdag.vercel.app", LINKS.site]].map(([ic, l, v, h]) => (
                <a key={l} href={h} {...(/^https?:/.test(h) ? { target: "_blank", rel: "noreferrer" } : {})}>
                  <Tile n={ic} tone="char" /><small>{l}</small><span>{v}</span><i><Ic n="arrow" s={22} /></i>
                </a>
              ))}
            </Reveal>
          </div>
          <Reveal className="quote">“The right conversation can become the beginning of something extraordinary.”</Reveal>
        </Sec>
      </main>

      {/* 11 FINALE */}
      <Finale lit={lit} day={day} />
    </div>
  );
}

/* ================= STYLES ================= */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&family=Space+Grotesk:wght@300..700&family=Inter:wght@300..700&display=swap');
:root{--or:#F04B19;--or2:#FF7A45;--red:#B3260A;--char:#171514;--warm:#F5F1E9;--stone:#B7A99C;--d:Anton,Impact,sans-serif;--g:'Space Grotesk',sans-serif;--hf:'Bricolage Grotesque','Space Grotesk',sans-serif;--spring:cubic-bezier(.22,1,.36,1);--ease:cubic-bezier(.16,1,.3,1)}
*{box-sizing:border-box;margin:0}
html{-webkit-text-size-adjust:100%}
body{font-family:Inter,sans-serif;background:var(--char);color:var(--warm);-webkit-font-smoothing:antialiased;overflow-x:hidden}
a{color:inherit;text-decoration:none}.app{overflow-x:clip}main{display:block}
:focus-visible{outline:2px solid var(--or2);outline-offset:3px}
.skip{position:fixed;left:16px;top:-60px;z-index:200;background:var(--or);color:#fff;padding:10px 18px;border-radius:99px;font:600 14px var(--g);transition:top .3s}.skip:focus{top:16px}
.pbar{position:fixed;inset:0 0 auto 0;height:3px;z-index:130;background:var(--or2);transform:scaleX(0);transform-origin:0 50%;will-change:transform}
.grain{position:fixed;inset:0;z-index:120;pointer-events:none;opacity:.05;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
@keyframes gr{20%{transform:translate(-3%,2%)}40%{transform:translate(2%,-3%)}60%{transform:translate(-2%,-1%)}80%{transform:translate(3%,3%)}}

.rv{opacity:0;transform:translateY(30px);transition:opacity .6s ease,transform .7s ease}.rv.in{opacity:1;transform:none;transition:opacity 1.2s var(--ease),transform 1.3s var(--ease)}
.sp .w{display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.08em}
.sp .w>span{display:inline-block;transform:translateY(115%) rotate(3deg);transition:transform .6s ease}.sp.in .w>span{transform:none;transition:transform 1.4s var(--ease)}

.tile{display:inline-grid;place-items:center;flex:none;width:44px;height:44px;border-radius:14px;color:#fff;background:linear-gradient(145deg,var(--or2),var(--red));box-shadow:inset 0 1px 0 rgba(255,255,255,.45),0 8px 20px rgba(179,38,10,.3);transition:transform 1s var(--spring)}
.tile.char{background:linear-gradient(145deg,#3b3531,#171514);box-shadow:inset 0 1px 0 rgba(255,255,255,.2),0 8px 20px rgba(0,0,0,.3)}
.tile.glass{background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.3);box-shadow:inset 0 1px 0 rgba(255,255,255,.4)}
*:hover>.tile{transform:scale(1.06)}

.btn{display:inline-flex;align-items:center;gap:10px;padding:7px 24px 7px 7px;border-radius:999px;font:600 15px var(--g);position:relative;overflow:hidden;cursor:pointer;white-space:nowrap;transition:transform .8s var(--spring),box-shadow .9s var(--ease),background .8s,color .8s;will-change:transform;-webkit-tap-highlight-color:transparent}
.btn:active{transform:scale(.96)!important;transition-duration:.2s}
.btn::after{content:"";position:absolute;inset:0;background:linear-gradient(110deg,transparent 35%,rgba(255,255,255,.4) 50%,transparent 65%);transform:translateX(-130%);transition:transform 1.5s var(--ease)}.btn:hover::after{transform:translateX(130%)}
.bi{width:40px;height:40px;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.2);transition:transform 1s var(--spring)}.btn:hover .bi{transform:rotate(45deg)}
.btn.pri{background:linear-gradient(135deg,var(--or2),var(--or) 55%,var(--red));color:#fff;box-shadow:inset 0 1px 0 rgba(255,255,255,.4),0 10px 30px rgba(240,75,25,.4)}.btn.pri:hover{box-shadow:inset 0 1px 0 rgba(255,255,255,.4),0 0 0 6px rgba(240,75,25,.18),0 14px 38px rgba(240,75,25,.5)}
.btn.glass{color:#fff;background:linear-gradient(135deg,rgba(255,255,255,.2),rgba(255,255,255,.05));backdrop-filter:blur(18px) saturate(160%);-webkit-backdrop-filter:blur(18px) saturate(160%);border:1px solid rgba(255,255,255,.3);box-shadow:inset 0 1px 0 rgba(255,255,255,.35)}.btn.glass:hover{background:var(--warm);color:var(--char)}
.btn.sm{padding:5px 18px 5px 5px;font-size:13px}.btn.sm .bi{width:32px;height:32px}

/* capsule nav (always in its compact, scrolled style) */
.nav{position:fixed;top:max(14px,env(safe-area-inset-top));left:50%;transform:translateX(-50%);z-index:110;display:flex;align-items:center;gap:12px;padding:6px 6px 6px 16px;border-radius:999px;background:linear-gradient(135deg,rgba(23,21,20,.74),rgba(23,21,20,.52));backdrop-filter:blur(24px) saturate(180%);-webkit-backdrop-filter:blur(24px) saturate(180%);border:1px solid rgba(255,255,255,.2);box-shadow:inset 0 1px 0 rgba(255,255,255,.3),0 14px 44px rgba(0,0,0,.3)}
.logo{display:flex;align-items:center;font:700 16px var(--g);letter-spacing:-.02em;white-space:nowrap}.logo .full{display:none}.logo i{width:8px;height:8px;border-radius:50%;background:var(--or2);margin-left:7px;box-shadow:0 0 12px var(--or2)}
.links{position:relative;display:flex;gap:2px}.links a{position:relative;z-index:1;padding:10px 16px;border-radius:99px;font:500 14px var(--g);opacity:.8;transition:opacity .6s}.links a:hover,.links a.act{opacity:1}
.ind{position:absolute;left:0;top:0;bottom:0;border-radius:99px;background:var(--or);box-shadow:0 6px 18px rgba(240,75,25,.45);transition:transform .9s var(--spring),width .9s var(--spring)}
.burger{display:none;width:44px;height:44px;border:0;background:none;position:relative;cursor:pointer}
.burger span{position:absolute;left:11px;right:11px;height:2px;border-radius:2px;background:#fff;transition:transform .8s var(--ease),top .8s var(--ease)}.burger span:first-child{top:16px}.burger span:last-child{top:26px}
.burger.x span:first-child{top:21px;transform:rotate(45deg)}.burger.x span:last-child{top:21px;transform:rotate(-45deg)}
.drop{position:fixed;z-index:105;top:calc(76px + env(safe-area-inset-top));left:16px;right:16px;border-radius:30px;padding:8px 22px;background:rgba(23,21,20,.86);backdrop-filter:blur(28px) saturate(180%);-webkit-backdrop-filter:blur(28px) saturate(180%);border:1px solid rgba(255,255,255,.16);opacity:0;transform:translateY(-14px) scale(.97);transform-origin:top center;pointer-events:none;transition:opacity .7s var(--ease),transform 1s var(--spring);display:none}
.drop.open{opacity:1;transform:none;pointer-events:auto}
.drop a{display:flex;align-items:center;gap:14px;padding:15px 0;border-bottom:1px solid rgba(255,255,255,.12);font:700 24px var(--g);letter-spacing:-.03em;opacity:0;transform:translateY(14px);transition:opacity .7s var(--ease),transform .9s var(--ease)}
.drop.open a{opacity:1;transform:none}.drop a:last-child{border:0}.drop a small{font:500 12px var(--g);opacity:.5}.drop a svg{margin-left:auto;color:var(--or2)}

.dots{position:fixed;right:16px;top:50%;transform:translateY(-50%);z-index:90;list-style:none;padding:0;display:flex;flex-direction:column;gap:14px}
.dots a{display:flex;align-items:center;justify-content:flex-end;gap:10px;height:14px}.dots span{font:500 11px var(--g);letter-spacing:.14em;text-transform:uppercase;opacity:0;transform:translateX(8px);transition:.7s var(--ease);background:rgba(23,21,20,.75);padding:4px 10px;border-radius:99px;backdrop-filter:blur(8px);color:#fff}
.dots i{width:7px;height:7px;border-radius:50%;background:rgba(150,140,130,.7);box-shadow:0 0 0 1px rgba(255,255,255,.5);transition:height .9s var(--spring),background .6s,border-radius .9s}
.dots a:hover span,.dots a:focus-visible span{opacity:1;transform:none}.dots a.on i{background:var(--or);height:22px;border-radius:6px}

.gl{position:absolute;inset:0;pointer-events:none;background:linear-gradient(90deg,rgba(255,255,255,.07) 1px,transparent 1px) 0 0/25% 100%;opacity:.7}
.warm .gl{background:linear-gradient(90deg,rgba(23,21,20,.07) 1px,transparent 1px) 0 0/25% 100%}

/* hero: bgpic.png as the background, no heavy overlay */
.hero{position:relative;min-height:100vh;min-height:100svh;padding:0 3vw;overflow:hidden;background:radial-gradient(110% 90% at 68% 25%,#ff6a2d,var(--or) 40%,#8f1f08 85%)}
.hero::before{content:"";position:absolute;inset:0;background:var(--bg) 68% center/cover no-repeat;animation:kb 26s ease-in-out infinite alternate}
@keyframes kb{to{transform:scale(1.05)}}
.hero::after{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(0deg,rgba(23,21,20,.5),transparent 32%)}
.hero>*{z-index:2}.hero>.gl{z-index:1;opacity:.35}
.tags{position:absolute;top:clamp(92px,13vh,128px);left:3vw;display:flex;gap:14px;align-items:center;font:500 11px var(--g);letter-spacing:.3em;text-transform:uppercase;color:#fff;text-shadow:0 1px 12px rgba(0,0,0,.35)}
.tagline{position:absolute;left:3vw;top:clamp(170px,30vh,300px);max-width:320px;padding-left:16px;border-left:3px solid var(--or2);font:600 14px/1.5 var(--g);letter-spacing:.06em;text-transform:uppercase;text-shadow:0 1px 14px rgba(0,0,0,.4)}.tagline span{display:block;margin-top:10px;font:400 14px/1.7 Inter;letter-spacing:0;text-transform:none}
.hcopy{position:absolute;left:3vw;bottom:clamp(84px,13vh,120px)}.hcopy small{display:block;font:500 16px var(--g);margin-bottom:6px;text-shadow:0 1px 12px rgba(0,0,0,.35)}
.hero h1{font:800 clamp(60px,min(13vw,21vh),230px)/.86 var(--hf);font-stretch:88%;letter-spacing:-.04em;color:#fff;text-shadow:0 8px 40px rgba(60,10,0,.35)}
.hero h1>span{display:block}.ltr{display:inline-block;will-change:transform}.hero h1 .ltr{font-variation-settings:"wght" 760,"wdth" 88}.hero h1 i{display:inline-block;width:.13em;height:.13em;border-radius:50%;background:var(--or2);margin-left:.04em;box-shadow:0 0 24px var(--or2);animation:pulse 2.8s infinite}
@keyframes pulse{50%{box-shadow:0 0 0 .1em rgba(255,122,69,.28),0 0 24px var(--or2)}}
.role{margin-top:clamp(12px,2.4vh,22px);font:600 13px var(--g);letter-spacing:.34em;text-transform:uppercase;text-shadow:0 1px 12px rgba(0,0,0,.4)}.sub{margin:6px 0 clamp(14px,2.6vh,24px);font-size:clamp(14px,1.6vh+.4vw,17px);color:rgba(255,255,255,.92);text-shadow:0 1px 12px rgba(0,0,0,.4)}
.ctas{display:flex;gap:12px;flex-wrap:wrap}
.gcard{position:absolute;display:block;padding:12px;border-radius:26px;background:linear-gradient(135deg,rgba(255,255,255,.26),rgba(255,255,255,.07));backdrop-filter:blur(18px) saturate(160%);-webkit-backdrop-filter:blur(18px) saturate(160%);border:1px solid rgba(255,255,255,.36);box-shadow:inset 0 1px 0 rgba(255,255,255,.45),0 20px 50px rgba(40,8,0,.3);transition:transform 1s var(--spring)}
.gcard:hover{transform:translateY(-5px)}.gcard strong{display:block;font:700 15px var(--g)}.gcard small{display:block;font-size:11px;opacity:.85;margin-top:2px}
.c1{right:3vw;top:clamp(150px,30vh,300px);width:250px;padding:16px;animation:fl 8s ease-in-out infinite}
.cp{display:flex;align-items:center;justify-content:space-between}.live{display:flex;align-items:center;gap:7px;padding:7px 13px;border-radius:99px;font:600 12px var(--g);background:rgba(23,21,20,.5)}.live i{width:7px;height:7px;border-radius:50%;background:var(--or2);box-shadow:0 0 10px var(--or2);animation:pulse 2.4s infinite}
.cpl{margin-top:20px!important;font:600 11px var(--g)!important;letter-spacing:.24em;text-transform:uppercase}.cpt{font:400 34px/1.05 var(--d)!important;text-transform:uppercase;margin-top:6px}
.gm{display:flex;align-items:center;justify-content:space-between;padding:14px 0 0}
.go{flex:none;width:38px;height:38px;border-radius:12px;background:var(--warm);color:var(--char);display:grid;place-items:center;transition:transform 1s var(--spring)}.gcard:hover .go{transform:rotate(45deg)}
.c2{right:3vw;bottom:clamp(84px,13vh,110px);width:320px;display:flex;align-items:center;gap:14px;background:rgba(23,21,20,.6);animation:fl 9s ease-in-out -3s infinite}
.av{flex:none;width:60px;height:60px;border-radius:18px;background:var(--or) center 22%/260% no-repeat}.c2 .go{margin-left:auto}
.c2 u{display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--or2);margin-left:60px;box-shadow:0 0 10px var(--or2)}
@keyframes fl{50%{translate:0 -8px}}
.hfoot{position:absolute;left:3vw;right:3vw;bottom:max(24px,env(safe-area-inset-bottom));display:flex;justify-content:space-between;align-items:center;font:500 11px var(--g);letter-spacing:.3em;text-transform:uppercase;color:rgba(255,255,255,.85);text-shadow:0 1px 10px rgba(0,0,0,.4)}
.soc{display:flex;gap:10px}.soc a{width:44px;height:44px;border-radius:14px;display:grid;place-items:center;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.24);backdrop-filter:blur(10px);transition:transform 1s var(--spring),background .8s}.soc a:hover{background:var(--or);transform:translateY(-4px)}
.a1,.a2,.a3,.a4,.a5{animation:in 1.5s var(--ease) both}.a1{animation-delay:.2s}.a2{animation-delay:.4s}.a3{animation-delay:.55s}.a4{animation-delay:.8s}.a5{animation-delay:1s}
@keyframes in{from{opacity:0;transform:translateY(50px);filter:blur(10px)}}
.marq{background:var(--char);color:var(--or2);overflow:hidden;white-space:nowrap;padding:14px 0;font:400 24px var(--d);letter-spacing:.04em;border-block:1px solid rgba(255,255,255,.1)}
.marq div{display:inline-flex;animation:mq 34s linear infinite}.marq span{padding-right:20px}@keyframes mq{to{transform:translateX(-50%)}}

/* sections: each fills one screen on desktop */
.sec{position:relative;min-height:100vh;min-height:100svh;padding:clamp(84px,12vh,118px) 3vw clamp(24px,4.5vh,52px);display:flex;flex-direction:column;justify-content:center;overflow:hidden}
.wrap{position:relative;width:100%;max-width:1200px;margin:0 auto}
.sec.warm{background:var(--warm);color:var(--char)}.sec.dark{background:var(--char)}.sec.fire{background:linear-gradient(160deg,var(--or),var(--red));color:#fff}
.sechead{display:flex;align-items:center;gap:14px;margin-bottom:clamp(8px,2.2vh,24px);font:500 12px var(--g);letter-spacing:.3em;text-transform:uppercase}.sechead b{font-weight:700}.sechead i{width:0;height:1px;background:currentColor;opacity:.5;transition:width .5s}.sechead.in i{width:60px;transition:width 1.6s var(--ease) .3s}
.two{display:grid;grid-template-columns:1.1fr .9fr;gap:clamp(24px,5vw,70px);align-items:center}
.disp{font:400 clamp(38px,min(7.4vw,11.5vh),118px)/.95 var(--d);text-transform:uppercase;margin-bottom:clamp(10px,2.6vh,28px)}.disp.sm{font-size:clamp(34px,min(6vw,9.5vh),92px)}
.sec p{line-height:1.65;font-size:clamp(14px,.9vw + .6vh,17px);margin-bottom:clamp(6px,1.3vh,14px);max-width:560px}.sec p.lead{font:400 clamp(15px,1.1vw + .6vh,20px)/1.55 var(--g);max-width:680px;margin-bottom:clamp(14px,3vh,32px)}
.quote{margin-top:clamp(14px,3vh,32px);padding-top:clamp(10px,2vh,18px);border-top:1px solid rgba(128,128,128,.35);font:400 clamp(16px,2.2vh + .5vw,30px)/1.15 var(--d);text-transform:uppercase;color:var(--or)}.dark .quote{color:var(--or2)}.fire .quote{color:#fff;border-color:rgba(255,255,255,.35)}
.chip-l,.meta{display:inline-flex;align-items:center;gap:8px;font:600 12px var(--g);letter-spacing:.14em;text-transform:uppercase}
.chip-l{padding:7px 14px;border-radius:99px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.3);margin-bottom:clamp(8px,2vh,20px)}
.ids{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.idc{padding:clamp(14px,2.4vh,24px);border-radius:26px;background:#fff;border:1px solid rgba(23,21,20,.08);transition:opacity 1.2s var(--ease),transform 1.3s var(--ease),background .9s,color .9s}
.idc:hover{transform:translateY(-4px);background:var(--char);color:#fff}.idc h3{font:700 clamp(16px,2.2vh,19px) var(--g);letter-spacing:-.02em;margin:clamp(14px,3vh,32px) 0 6px}.idc p{font-size:13px!important;margin:0!important;line-height:1.5!important}

.jhead{display:grid;grid-template-columns:1.25fr .75fr;gap:14px}
.jcard{padding:clamp(16px,3vh,30px);border-radius:30px;background:rgba(23,21,20,.32);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.26);box-shadow:inset 0 1px 0 rgba(255,255,255,.3)}
.jcard small,.mile small{font:600 12px var(--g);letter-spacing:.3em;text-transform:uppercase;opacity:.85}.jcard h3{font:400 clamp(34px,min(5vw,8vh),68px)/1 var(--d);text-transform:uppercase;margin:6px 0 clamp(6px,1.4vh,12px)}.meta{margin-bottom:clamp(6px,1.4vh,12px);flex-wrap:wrap}
.focus{list-style:none;padding:0;margin-top:clamp(8px,1.6vh,16px);display:grid;grid-template-columns:1fr 1fr;column-gap:20px}.focus li{position:relative;padding:clamp(6px,1.1vh,10px) 0 clamp(6px,1.1vh,10px) 26px;border-top:1px solid rgba(255,255,255,.25);font-size:13px;line-height:1.4}
.focus li::before{content:"";position:absolute;left:0;top:50%;width:12px;height:3px;border-radius:3px;background:var(--or2);transition:width .9s var(--ease)}.focus li:hover::before{width:20px}
.mile{position:relative;padding:clamp(16px,3vh,30px);border-radius:30px;background:var(--char);display:flex;flex-direction:column;justify-content:space-between;gap:10px;box-shadow:0 24px 60px rgba(0,0,0,.3)}.mile small{color:var(--or2)}
.mile strong{font:400 clamp(52px,min(7.4vw,13vh),118px)/.9 var(--d);color:var(--warm)}.mile span{font-size:14px;opacity:.8}
.dc{align-self:flex-start;display:flex;align-items:center;gap:8px;padding:8px 14px;border-radius:99px;font:600 12px var(--g);font-style:normal;background:rgba(255,122,69,.16);color:var(--or2)}.dc i{width:8px;height:8px;border-radius:50%;background:var(--or2);animation:pulse 2.4s infinite}
.tl{position:relative;list-style:none;padding:28px 0 0;margin:clamp(14px,3vh,28px) 0 0;display:grid;grid-template-columns:repeat(4,1fr);gap:22px}
.tline{position:absolute;left:0;right:0;top:10px;height:2px;background:rgba(255,255,255,.25);border-radius:2px}.tline span{position:absolute;inset:0;background:#fff;transform:scaleX(0);transform-origin:left;transition:transform 2.6s var(--ease) .2s;box-shadow:0 0 12px rgba(255,255,255,.6)}.tl.on .tline span{transform:scaleX(1)}
.tli{position:relative;opacity:0;transform:translateY(18px);transition:opacity 1.2s var(--ease),transform 1.3s var(--ease)}.tl.on .tli{opacity:1;transform:none}
.dot{position:absolute;left:0;top:-27px;width:18px;height:18px;border-radius:50%;background:var(--char);border:3px solid #fff;transition:background .8s,transform 1s var(--spring)}.tl.on .dot{background:var(--or2)}
.tli small{font:600 11px var(--g);letter-spacing:.26em;text-transform:uppercase;opacity:.85}.tli h3{font:400 clamp(20px,min(2.3vw,3.6vh),34px)/1.08 var(--d);text-transform:uppercase;margin:6px 0 6px}.tli p{font-size:13px!important;line-height:1.5!important;margin:0!important}

.edu .tile{margin-bottom:clamp(10px,2vh,20px)}.edu h3{font:700 clamp(20px,3.2vh,26px) var(--g);letter-spacing:-.03em;margin-bottom:8px}.meta2{font:600 13px/1.7 var(--g)!important;opacity:.65;letter-spacing:.04em;margin-bottom:clamp(8px,2vh,16px)!important}

.phd{display:grid;grid-template-columns:1.1fr .9fr;gap:30px;align-items:end;margin-bottom:clamp(8px,2vh,22px)}.phd .disp{margin-bottom:0}.phd .lead{margin-bottom:6px!important}
.plist{border-top:1px solid rgba(255,255,255,.18)}.prow{border-bottom:1px solid rgba(255,255,255,.18)}
.phead{width:100%;display:grid;grid-template-columns:44px minmax(0,1fr) auto 40px;align-items:center;gap:16px;padding:clamp(7px,1.5vh,16px) 0;background:none;border:0;color:inherit;text-align:left;cursor:pointer}
.pn{font:500 14px var(--g);opacity:.5}.pt{font:400 clamp(26px,min(4.4vw,5.8vh),62px)/1 var(--d);text-transform:uppercase;transition:color .9s,transform 1.1s var(--ease)}.ptag{font:500 13px var(--g);opacity:.6}
.pill{font:600 11px var(--g);padding:6px 13px;border-radius:99px;border:1px solid rgba(255,255,255,.3)}
.pplus{width:40px;height:40px;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.1);transition:transform 1s var(--spring),background .8s}
.prow.on .pt{color:var(--or2);transform:translateX(10px)}.prow.on .pplus{transform:rotate(135deg);background:var(--or)}.phead:hover .pt{color:var(--or2)}
.pbody{display:grid;grid-template-rows:0fr;transition:grid-template-rows 1s var(--ease)}.prow.on .pbody{grid-template-rows:1fr}.pbody>div{overflow:hidden}
.pin2{display:grid;grid-template-columns:44px minmax(0,640px) auto;gap:18px;padding:0 0 clamp(10px,2vh,18px);align-items:center;justify-content:start}.pin2 p{margin:0!important;font-size:14px!important;line-height:1.5!important}.pin2 .t{display:grid;gap:4px}.focus2{opacity:.7}.focus2 b{margin-right:10px;font:600 11px var(--g);letter-spacing:.2em;text-transform:uppercase;color:var(--or2)}

.sk{display:grid;grid-template-columns:repeat(6,1fr);gap:14px}
.skc{position:relative;grid-column:span 2;padding:clamp(16px,2.8vh,28px);border-radius:28px;background:var(--char);color:var(--warm);overflow:hidden;border:1px solid rgba(255,255,255,.08);transition:opacity 1.2s var(--ease),transform 1.3s var(--ease),border-color .9s}
.skc.s3,.skc.s4{grid-column:span 3}
.skc::before{content:"";position:absolute;inset:0;background:radial-gradient(360px circle at var(--mx,70%) var(--my,0),rgba(240,75,25,.38),transparent 70%);opacity:.55;transition:opacity 1s}
.skc:hover{transform:translateY(-4px);border-color:rgba(255,122,69,.6)}.skc:hover::before{opacity:1}.skc>*{position:relative}
.skh{display:flex;align-items:center;justify-content:space-between}.skn{font:400 clamp(34px,5.4vh,52px)/1 var(--d);color:transparent;-webkit-text-stroke:1px rgba(255,255,255,.3)}
.skc h3{font:400 clamp(24px,min(2.6vw,4.2vh),38px)/1 var(--d);text-transform:uppercase;margin:clamp(10px,2.2vh,20px) 0 clamp(10px,2vh,18px)}
.techs{display:flex;flex-wrap:wrap;gap:8px}
.tech{padding:clamp(7px,1.2vh,10px) 16px;border-radius:99px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.2);font:600 14px var(--g);transition:background .8s,transform 1s var(--spring),border-color .8s}
.rv:not(.in) .tech{opacity:0}.rv.in .tech{animation:pop 1.1s var(--ease) both}@keyframes pop{from{opacity:0;transform:scale(.8) translateY(10px)}}
.tech:hover{background:var(--or);border-color:var(--or);transform:translateY(-3px)}

.hgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.hc{padding:clamp(16px,3vh,30px);border-radius:30px;background:rgba(23,21,20,.3);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.26);box-shadow:inset 0 1px 0 rgba(255,255,255,.3);transition:opacity 1.2s var(--ease),transform 1.3s var(--ease),background .9s}
.hc:hover{background:var(--char);transform:translateY(-4px)}.hc small{display:block;margin-top:clamp(12px,3vh,32px);font:600 12px var(--g);letter-spacing:.2em;text-transform:uppercase;color:#ffd2bf}.hc h3{font:400 clamp(28px,4.6vh,40px)/1 var(--d);text-transform:uppercase;margin:8px 0 10px}.hc p{font-size:14px!important;margin:0!important}
.egrid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.ec{padding:clamp(16px,2.8vh,28px);border-radius:28px;background:#221f1d;border:1px solid rgba(255,255,255,.1);transition:opacity 1.2s var(--ease),transform 1.3s var(--ease),background .9s}.ec:hover{background:var(--or);transform:translateY(-4px)}.ec:hover .tile{background:var(--char)}
.ec h3{font:400 clamp(22px,3.6vh,30px)/1.05 var(--d);text-transform:uppercase;margin:clamp(16px,4vh,48px) 0 8px}.ec p{font-size:14px!important;margin:0!important}

.clist{border-top:1px solid rgba(23,21,20,.2)}
.clist a{display:grid;grid-template-columns:44px 100px 1fr 34px;gap:16px;align-items:center;padding:clamp(10px,2vh,20px) 0;border-bottom:1px solid rgba(23,21,20,.2);font:500 clamp(16px,2vw,26px) var(--g);letter-spacing:-.03em;transition:padding 1s var(--ease),color .8s}
.clist small{font:600 11px var(--g);letter-spacing:.22em;text-transform:uppercase;opacity:.6}.clist a:hover{padding-left:16px;color:var(--or)}.clist i{transition:transform 1s var(--spring)}.clist a:hover i{transform:rotate(45deg)}

/* extras: button ripple + label roll, spotlight, deco, cursor glow */
.btn::before{content:"";position:absolute;left:var(--rx,50%);top:var(--ry,50%);width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,.55);transform:translate(-50%,-50%) scale(0);opacity:0;pointer-events:none}
.btn.rip::before{animation:rip 1.1s var(--ease)}@keyframes rip{0%{opacity:.7;transform:translate(-50%,-50%) scale(0)}100%{opacity:0;transform:translate(-50%,-50%) scale(40)}}
.roll{display:block;overflow:hidden;height:1.35em;line-height:1.35em}.roll>span{display:block;transition:transform .9s var(--ease)}.btn:hover .roll>span{transform:translateY(-100%)}
.glow{position:relative;overflow:hidden}.glow::before{content:"";position:absolute;inset:0;background:radial-gradient(280px circle at var(--mx,50%) var(--my,0),rgba(255,122,69,.3),transparent 70%);opacity:0;transition:opacity 1s;pointer-events:none}.glow:hover::before{opacity:1}.glow>*{position:relative}
.cglow{position:fixed;left:0;top:0;width:500px;height:500px;border-radius:50%;pointer-events:none;z-index:80;background:radial-gradient(circle,rgba(255,122,69,.15),transparent 65%);will-change:transform}
.deco{position:absolute;inset:0;pointer-events:none;opacity:.22;color:var(--or2)}.warm .deco{color:var(--or);opacity:.28}.fire .deco{color:#fff;opacity:.2}
.deco svg{position:absolute;fill:none;stroke:currentColor;stroke-width:1}
.d-ring{width:clamp(180px,26vw,380px);right:-5%;top:4%;animation:spin 90s linear infinite}.d-ring circle:nth-child(2){stroke-dasharray:3 7}.d-ring circle:nth-child(3){stroke-dasharray:1 5}
.d-arc{width:clamp(120px,15vw,220px);left:-2%;bottom:6%;animation:fl 11s ease-in-out -2s infinite}
.d-cross{width:26px;left:7%;top:18%;animation:spin 20s linear infinite}
.d-dots{width:86px;right:6%;bottom:7%;fill:currentColor;stroke:none;animation:fl 8s ease-in-out infinite}
.deco.v1 .d-ring{right:auto;left:-6%;top:auto;bottom:2%}.deco.v1 .d-arc{left:auto;right:-2%;bottom:auto;top:12%;transform:scaleX(-1)}.deco.v1 .d-cross{left:auto;right:9%;top:22%}.deco.v1 .d-dots{right:auto;left:5%;bottom:9%}
@keyframes spin{to{transform:rotate(360deg)}}

/* peak (professional overview) */
.peak{margin-top:clamp(4px,1.2vh,12px)}
.pscene{position:relative;height:clamp(180px,36vh,380px);border-radius:28px;overflow:hidden;background:linear-gradient(180deg,#1b1310,#2a1912 55%,#40200f);border:1px solid rgba(255,255,255,.12)}
.pscene>svg:not(.pflag){position:absolute;inset:0;width:100%;height:100%}
.sunc{opacity:0;transition:opacity 2.4s ease .6s}.peak.on .sunc{opacity:1}
.r1,.r2{transform:translateY(14%);transition:transform 2.4s var(--ease)}.r2{transition-delay:.25s}.peak.on .r1,.peak.on .r2{transform:none}
.star{fill:#fff;animation:tw 3.4s ease-in-out infinite}@keyframes tw{50%{opacity:.15}}
.climb{fill:none;stroke:url(#pkT);stroke-width:3.2;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:1;filter:drop-shadow(0 0 6px #FF7A45);transition:stroke-dashoffset 3.4s var(--ease) .3s}.peak.on .climb{stroke-dashoffset:0}
.runner{fill:#fff;filter:drop-shadow(0 0 8px #FF7A45);opacity:0;transition:opacity 1s 3.6s}.peak.on .runner{opacity:1}
.pnode{position:absolute;width:22px;height:22px;transform:translate(-50%,-50%);border-radius:50%;background:var(--char);border:3px solid #fff;opacity:0;scale:.3;transition:opacity .8s,scale 1.1s var(--spring),background .8s,box-shadow .8s}.peak.on .pnode{opacity:1;scale:1}
.pnode::after{content:"";position:absolute;inset:-7px;border-radius:50%;border:2px solid var(--or2);opacity:0;animation:ping 3s ease-out infinite}.peak.on .pnode::after{opacity:1}@keyframes ping{0%{transform:scale(.6);opacity:.9}100%{transform:scale(1.8);opacity:0}}
.pnode.hot{background:var(--or);box-shadow:0 0 0 8px rgba(240,75,25,.3),0 0 26px var(--or2)}
.pflag{position:absolute;left:87.5%;top:11.5%;width:40px;transform:translate(-6px,-96%);opacity:0;transition:opacity 1s 3.6s}.peak.on .pflag{opacity:1}.wave{transform-origin:8px 14px;animation:wv 2.6s ease-in-out infinite}@keyframes wv{50%{transform:skewY(-8deg) scaleX(.92)}}
.pcards{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:clamp(8px,1.8vh,16px)}
.pcard{padding:clamp(12px,2vh,18px);border-radius:22px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);outline-offset:2px;transition:opacity 1.2s var(--ease),transform 1.3s var(--ease),background .9s,border-color .9s}
.pcard:hover,.pcard:focus-visible{transform:translateY(-4px);background:rgba(240,75,25,.14);border-color:rgba(255,122,69,.6)}
.pcard small{font:600 11px var(--g);letter-spacing:.2em;text-transform:uppercase;color:var(--or2)}.pcard h3{font:400 clamp(18px,2.8vh,26px)/1.1 var(--d);text-transform:uppercase;margin:6px 0}.pcard p{font-size:13px!important;line-height:1.5!important;margin:0!important}

/* finale */
.end{position:relative;height:100vh;height:100svh;min-height:560px;background:#0b0908;display:flex;flex-direction:column;text-align:center;overflow:hidden}
.end::before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px) 0 0/25% 100%}
.e-sun{position:absolute;left:50%;bottom:6%;width:min(82vw,82vh);aspect-ratio:1;border-radius:50%;z-index:1;background:radial-gradient(circle,#ffb27a 0,var(--or2) 14%,var(--or) 34%,rgba(179,38,10,.35) 52%,transparent 70%);transform:translate(-50%,62%) scale(.7);opacity:.12;transition:transform 3.2s var(--ease),opacity 2.6s var(--ease)}
.end.lit .e-sun{transform:translate(-50%,30%) scale(1);opacity:1}
.e-mtn{position:absolute;left:0;right:0;bottom:0;width:100%;height:clamp(110px,24vh,220px);z-index:2}
.e-embers{position:absolute;inset:0;z-index:2;overflow:hidden;pointer-events:none;opacity:0;transition:opacity 2s}.end.lit .e-embers{opacity:1}
.e-embers i{position:absolute;bottom:-10px;border-radius:50%;background:var(--or2);box-shadow:0 0 10px var(--or2);animation:rise linear infinite}
@keyframes rise{0%{transform:translate(0,0);opacity:0}10%{opacity:.9}100%{transform:translate(40px,-95vh);opacity:0}}
.e-main{position:relative;z-index:3;flex:1;display:grid;place-content:center;padding:clamp(70px,10vh,100px) 3vw 0}
.est{font:500 12px var(--g);letter-spacing:.34em;text-transform:uppercase;opacity:.65;margin-bottom:clamp(8px,2.4vh,26px)}
.end h2{display:grid;font:400 clamp(64px,min(20vw,24vh),300px)/.88 var(--d);letter-spacing:-.005em}.end h2 span{display:block;transition:all 1.8s var(--ease)}
.one{color:rgba(245,241,233,.16);transform:translateY(30px)}.or{font:500 clamp(13px,2vh,24px) var(--g);letter-spacing:.7em;margin:.7em 0;opacity:0;color:var(--or2)}
.dayone{background:linear-gradient(180deg,#fff 0,#ffd2bf 45%,var(--or2) 100%);-webkit-background-clip:text;background-clip:text;color:transparent;opacity:.12;transform:scale(.94);filter:drop-shadow(0 8px 34px rgba(240,75,25,.55))}
.end.lit .one{transform:none;color:rgba(245,241,233,.3);text-decoration:line-through;text-decoration-thickness:.03em;text-decoration-color:var(--or)}
.end.lit .or{opacity:1}.end.lit .dayone{opacity:1;transform:none}
.chose{margin:clamp(12px,3vh,32px) auto 0;font:400 clamp(16px,2.2vh + .4vw,28px) var(--g);opacity:0;transition:opacity 1.8s 1s}.end.lit .chose{opacity:.95}
.e-foot{position:relative;z-index:4;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:10px 16px;padding:0 3vw clamp(14px,2.6vh,26px);text-align:left}
.sig strong{display:block;font:400 clamp(20px,3vh,28px) var(--d);letter-spacing:.04em}.sig small{font:600 10px var(--g);letter-spacing:.3em;text-transform:uppercase;opacity:.6}
.e-foot .soc{justify-content:center}.e-foot .top{justify-self:end}.copy{grid-column:1/-1;text-align:center;opacity:.4;font-size:12px}

/* ===== round 5: unique per-section graphics ===== */
.app:not(.ready) :is(.a1,.a2,.a3,.a4,.a5){animation-play-state:paused}
.hero{--px:0;--py:0}
.hero::before{translate:calc(var(--px) * -16px) calc(var(--py) * -10px);transition:translate 1.2s var(--ease)}
.spinbadge{position:absolute;right:calc(3vw + 96px);bottom:calc(clamp(84px,13vh,110px) + 108px);width:clamp(104px,9.5vw,146px);aspect-ratio:1;display:grid;place-items:center}
.spinbadge svg{position:absolute;inset:0;width:100%;height:100%;animation:spin 26s linear infinite}
.spinbadge text{font:600 13px var(--g);letter-spacing:.2em;fill:#fff}
.spinbadge b{position:relative;display:grid;place-items:center;width:44%;aspect-ratio:1;border-radius:50%;background:var(--warm);color:var(--char);font:400 clamp(20px,2.2vw,28px)/1 var(--d);text-align:center;box-shadow:0 10px 30px rgba(0,0,0,.25)}
.spinbadge b small{display:block;font:600 8px var(--g);letter-spacing:.2em;margin-bottom:2px}
.intro{position:fixed;inset:0;z-index:300;background:#0b0908;display:grid;place-content:center;text-align:center;transition:transform 1.2s var(--ease)}.intro.out{transform:translateY(-101%);pointer-events:none}
.inum{font:400 clamp(110px,26vw,300px)/.9 var(--d);color:var(--warm)}.ibar{height:2px;background:rgba(255,255,255,.15);margin:18px auto 14px;width:min(320px,60vw)}.ibar i{display:block;height:100%;background:var(--or2);transform-origin:left;box-shadow:0 0 12px var(--or2)}
.intro small{font:600 11px var(--g);letter-spacing:.34em;text-transform:uppercase;opacity:.6}

/* peak v2 */
.pscene{background:linear-gradient(180deg,#120d0b 0,#24150f 45%,#3f1f10 100%)}
.far{fill:#6b2a16;opacity:.5}
.snow{fill:#fff1e6;opacity:0;transition:opacity 1.6s ease 1.2s}.peak.on .snow{opacity:.92}
.pine{fill:#080605}
.mist{fill:#fff;opacity:.08;filter:url(#pkB);animation:drift 22s ease-in-out infinite alternate}.mist.m2{animation-duration:30s;animation-direction:alternate-reverse}
@keyframes drift{to{transform:translateX(170px)}}
.bird{fill:none;stroke:#fff;stroke-width:1.6;opacity:.7;animation:fly 22s linear infinite}@keyframes fly{from{transform:translate(-100px,0)}to{transform:translate(1300px,-70px)}}
.pnode{width:42px;height:42px;display:grid;place-items:center;color:#fff;cursor:pointer;padding:0}
.pnode.sel,.pnode:hover{background:var(--or);box-shadow:0 0 0 8px rgba(240,75,25,.28),0 0 26px var(--or2)}
.plab{position:absolute;top:calc(100% + 10px);left:50%;transform:translateX(-50%);padding:5px 12px;border-radius:99px;font:600 11px var(--g);letter-spacing:.06em;white-space:nowrap;background:rgba(23,21,20,.78);border:1px solid rgba(255,255,255,.2);color:#fff;pointer-events:none}.plab.up{top:auto;bottom:calc(100% + 10px)}
.pnode.sel .plab{background:var(--or);border-color:var(--or)}
.ppanel{margin-top:clamp(8px,1.8vh,16px);display:grid;grid-template-columns:.9fr 1.6fr;gap:clamp(14px,3vw,40px);align-items:center;padding:clamp(14px,2.4vh,24px) clamp(18px,2.6vw,30px);border-radius:26px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.14);animation:pan .9s var(--ease)}
@keyframes pan{from{opacity:0;transform:translateY(16px)}}
.ppanel small{font:600 11px var(--g);letter-spacing:.22em;text-transform:uppercase;color:var(--or2)}.ppanel h3{font:400 clamp(22px,3.6vh,36px)/1.05 var(--d);text-transform:uppercase;margin-top:6px}
.ppanel ul{list-style:none;padding:0;display:grid;gap:8px}.ppanel li{position:relative;padding-left:22px;font-size:clamp(12.5px,1.6vh,14.5px);line-height:1.5}.ppanel li::before{content:"";position:absolute;left:0;top:.6em;width:10px;height:3px;border-radius:3px;background:var(--or2)}

/* about: identity orbit */
.orbit{position:relative;width:min(100%,clamp(260px,50vh,480px));aspect-ratio:1;margin:0 auto}
.ring{position:absolute;border-radius:50%;border:1px dashed rgba(23,21,20,.28)}
.ring.ra{left:15%;top:15%;width:70%;height:70%;animation:spin 46s linear infinite}.ring.rb{left:0;top:0;width:100%;height:100%;animation:spin 70s linear infinite reverse}
.onode{position:absolute;left:50%;translate:-50% -50%;width:clamp(46px,8.4vh,62px);aspect-ratio:1;padding:0;border:0;background:none;cursor:pointer}
.onode span{display:grid;place-items:center;width:100%;height:100%;border-radius:18px;background:#fff;color:var(--or);border:1px solid rgba(23,21,20,.1);box-shadow:0 10px 24px rgba(23,21,20,.16);transition:background .8s,color .8s,scale .9s var(--spring)}
.ra .onode span{animation:spin 46s linear infinite reverse}.rb .onode span{animation:spin 70s linear infinite}
.onode:hover span,.onode.on span{background:var(--char);color:#fff;scale:1.12}
.orbit:hover .ring,.orbit:hover .onode span{animation-play-state:paused}
.o-core{position:absolute;left:30%;top:30%;width:40%;height:40%;border-radius:50%;display:grid;place-items:center;text-align:center;padding:8%;background:radial-gradient(circle at 30% 25%,#ff8a55,var(--or) 50%,var(--red));color:#fff;box-shadow:0 20px 60px rgba(240,75,25,.4),inset 0 1px 0 rgba(255,255,255,.4);animation:breathe 6s ease-in-out infinite}
@keyframes breathe{50%{transform:scale(1.04)}}
.oc{display:grid;gap:4px;justify-items:center;animation:pan .8s var(--ease)}.oc b{font:400 clamp(15px,2.6vh,24px)/1 var(--d);text-transform:uppercase}.oc small{font:500 clamp(9.5px,1.4vh,12px)/1.35 Inter;opacity:.92}

/* journey: id badge */
.badgewrap{display:grid;place-items:center}
.lanyard{display:flex;flex-direction:column;align-items:center;transform-origin:50% 0;animation:swing 7s ease-in-out infinite}.lanyard:hover{animation-play-state:paused}
@keyframes swing{0%,100%{transform:rotate(-2.5deg)}50%{transform:rotate(2.5deg)}}
.strap{width:26px;height:clamp(34px,7vh,66px);background:repeating-linear-gradient(135deg,var(--char) 0 7px,#3b3531 7px 14px);border-radius:3px 3px 0 0}
.idcard{position:relative;width:clamp(200px,17vw,250px);padding:clamp(14px,2.2vh,20px);border-radius:22px;background:linear-gradient(160deg,#fff,#f1e4d6);color:var(--char);display:grid;gap:clamp(5px,.9vh,9px);box-shadow:0 26px 60px rgba(0,0,0,.35)}
.hole{position:absolute;left:50%;top:9px;width:38px;height:7px;border-radius:7px;background:var(--red);translate:-50% 0;opacity:.45}
.idtop{display:flex;justify-content:space-between;align-items:center;margin-top:10px}.idtop b{font:700 15px var(--g);letter-spacing:-.02em}.idtop small{font:600 10px var(--g);letter-spacing:.2em;text-transform:uppercase;color:var(--or)}
.idph{height:clamp(86px,15vh,150px);border-radius:16px;background:var(--or) center 20%/cover no-repeat}
.idcard h4{font:400 clamp(20px,3vh,26px)/1 var(--d);letter-spacing:.02em}.idrole{font:600 12px var(--g);letter-spacing:.14em;text-transform:uppercase;color:var(--or)}
.idrow{display:flex;justify-content:space-between;align-items:center;gap:8px;font:600 9px var(--g);letter-spacing:.14em;text-transform:uppercase}.idrow strong{font:700 13px var(--g);letter-spacing:.02em}
.bc{height:clamp(22px,3.6vh,32px);background:repeating-linear-gradient(90deg,#171514 0 2px,transparent 2px 4px,#171514 4px 5px,transparent 5px 8px,#171514 8px 11px,transparent 11px 13px)}
.idcard .dc{position:absolute;right:12px;top:30px;padding:5px 10px;font-size:10px;background:rgba(23,21,20,.85);color:var(--or2)}

/* education: venn */
.venn{--d:clamp(140px,25vh,230px);position:relative;width:calc(var(--d) * 1.62);max-width:100%;height:calc(var(--d) + 40px);margin-top:clamp(6px,1.6vh,16px)}
.vc{position:absolute;top:0;width:var(--d);height:var(--d);border-radius:50%;display:grid;place-items:center;font:400 clamp(16px,2.6vh,24px)/1.05 var(--d);text-transform:uppercase;text-align:center;opacity:0;transition:transform 1.8s var(--ease),opacity 1.4s var(--ease)}
.vc.a{left:0;border:2px solid var(--char);background:rgba(23,21,20,.07);transform:translateX(-50px)}.vc.b{left:calc(var(--d) * .62);border:2px solid var(--or);background:rgba(240,75,25,.16);transform:translateX(50px)}
.vc.a span{margin-right:30%}.vc.b span{margin-left:30%;color:var(--red)}
.venn.on .vc{opacity:1;transform:none}
.vx{position:absolute;left:calc(var(--d) * .81);top:calc(var(--d) / 2);translate:-50% -50%;display:grid;place-items:center;gap:2px;width:clamp(48px,8vh,64px);aspect-ratio:1;border-radius:50%;background:var(--char);color:#fff;opacity:0;scale:.4;transition:opacity 1s 1.2s,scale 1.2s var(--spring) 1.2s;box-shadow:0 0 0 8px rgba(240,75,25,.2);animation:breathe 4s ease-in-out infinite}.vx small{font:600 9px var(--g);letter-spacing:.14em}.venn.on .vx{opacity:1;scale:1}
.vcap{position:absolute;left:0;bottom:0;margin:0!important;font:600 12px var(--g)!important;letter-spacing:.04em;opacity:.65}

/* projects: list + live preview */
.pwrap{display:grid;grid-template-columns:minmax(0,1fr) clamp(230px,27vw,340px);gap:clamp(16px,2.4vw,30px);align-items:start}
.pin2{grid-template-columns:minmax(0,1fr) auto;padding:0 0 clamp(8px,1.6vh,14px) 60px}
.pprev{position:relative;border-radius:30px;padding:clamp(14px,2.4vh,24px);background:linear-gradient(160deg,#241915,#171514);border:1px solid rgba(255,255,255,.12);color:var(--warm);box-shadow:0 24px 60px rgba(0,0,0,.35)}
.pa{animation:pan .8s var(--ease);color:#fff}.art{display:block;width:100%;height:auto;max-height:30vh}
.pprev small{display:block;margin-top:10px;font:600 10px var(--g);letter-spacing:.18em;text-transform:uppercase;color:var(--or2)}.pprev h3{font:400 clamp(24px,3.8vh,36px)/1.05 var(--d);text-transform:uppercase;margin-top:4px}
.gr{fill:none;stroke:currentColor;opacity:.2;stroke-width:1.4}.stk{fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
.dash{fill:none;stroke:var(--or2);stroke-width:3;stroke-linecap:round;stroke-dasharray:6 9;animation:dsh 2s linear infinite}@keyframes dsh{to{stroke-dashoffset:-30}}
.pulse{fill:none;stroke:var(--or2);stroke-width:2;transform-box:fill-box;transform-origin:center;animation:pl 2.2s ease-out infinite}@keyframes pl{from{transform:scale(1);opacity:1}to{transform:scale(3);opacity:0}}
.chat rect{fill:var(--or2);opacity:.85;animation:ch 2.4s ease-in-out infinite alternate}.chat rect+rect{animation-delay:1s}@keyframes ch{from{opacity:.2}to{opacity:.9}}
.blk{fill:var(--or2);transform-origin:left;transform-box:fill-box;animation:bl 2.8s var(--ease) infinite alternate}.blk.b2{animation-delay:.3s}.blk.b3{animation-delay:.6s}@keyframes bl{from{transform:scaleX(.15);opacity:.4}to{transform:scaleX(1);opacity:1}}
.cur{fill:#fff;animation:cm 3.4s ease-in-out infinite alternate}@keyframes cm{from{transform:translate(-90px,-34px)}to{transform:translate(0,0)}}
.eq{fill:var(--or2);transform-origin:bottom;transform-box:fill-box;animation:eq 1.1s ease-in-out infinite alternate}@keyframes eq{from{transform:scaleY(.15)}to{transform:scaleY(1)}}
.nd{fill:var(--or2);transform-box:fill-box;transform-origin:center;animation:nd 2.6s ease-in-out infinite}.nd.n2{animation-delay:.5s}.nd.n3{animation-delay:1s}.nd.n4{animation-delay:1.5s}@keyframes nd{50%{opacity:.4}}
.bub{animation:fl 5s ease-in-out infinite}
.kw{fill:var(--or2);animation:kw 2.6s ease-in-out infinite alternate}.kw.k2{animation-delay:1.1s}@keyframes kw{from{opacity:.25}to{opacity:1}}
.scan{fill:var(--or2);filter:drop-shadow(0 0 6px var(--or2));animation:sc 2.6s ease-in-out infinite alternate}@keyframes sc{to{transform:translateY(140px)}}

/* skills: animated corner art */
.sart{position:absolute!important;right:clamp(10px,1.4vw,18px);top:clamp(8px,1.4vh,16px);width:clamp(64px,8.4vw,104px);aspect-ratio:1;opacity:.55;color:var(--or2);pointer-events:none}
.sart svg{width:100%;height:100%;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.caret{fill:currentColor!important;stroke:none!important;animation:bk 1s steps(2) infinite}@keyframes bk{50%{opacity:0}}
.cl1{animation:fl 6s ease-in-out infinite}.up{animation:up 2.4s ease-in-out infinite}@keyframes up{0%{transform:translateY(8px);opacity:0}50%{opacity:1}100%{transform:translateY(-8px);opacity:0}}
.ly{animation:ly 3s ease-in-out infinite alternate}.ly.l2{animation-delay:.3s}.ly.l3{animation-delay:.6s}@keyframes ly{to{transform:translateY(-5px)}}
.skh{justify-content:flex-start;gap:12px}.skh .skn{margin-left:0}

/* beyond code: animated icons */
.bart{width:clamp(54px,9vh,76px);height:auto;fill:none;stroke:#fff;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;display:block}
.g1,.g2{transform-box:fill-box;transform-origin:center}.g1{animation:spin 9s linear infinite}.g2{animation:spin 6s linear infinite reverse}
.rk{animation:none}.fl2{stroke:var(--or2)!important;transform-box:fill-box;transform-origin:top;animation:flm .5s ease-in-out infinite alternate}@keyframes flm{to{transform:scaleY(1.4)}}
.bart .star{animation:tw 3s ease-in-out infinite}.bart .nd{fill:#fff}

/* learning: blueprint + hazard tape */
#learning.sec{background-image:linear-gradient(rgba(255,122,69,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,122,69,.08) 1px,transparent 1px);background-size:44px 44px}
.tape{overflow:hidden;white-space:nowrap;width:108%;margin:0 0 clamp(12px,2.6vh,26px) -4%;transform:rotate(-1.3deg);background:repeating-linear-gradient(135deg,var(--or) 0 22px,#171514 22px 44px);padding:9px 0;border-block:2px solid #0b0908}
.tape div{display:inline-flex;animation:mq 28s linear infinite}.tape span{padding-right:30px;font:400 19px var(--d);letter-spacing:.08em;color:#fff;text-shadow:0 0 3px #000,0 0 8px #000}
.ec{border:1px dashed rgba(255,122,69,.5)}.ec:hover{border-style:solid}
.lart{width:clamp(44px,7.4vh,60px);height:auto;fill:none;stroke:var(--or2);stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;display:block;transition:stroke .8s}.ec:hover .lart{stroke:#fff}
.bk{fill:var(--or2);stroke:none;animation:dr 3.2s var(--ease) infinite}.bk.k2{animation-delay:.3s}.bk.k3{animation-delay:.6s}@keyframes dr{0%{transform:translateY(-26px);opacity:0}30%,80%{transform:none;opacity:1}100%{opacity:0}}
.lp{transform-box:fill-box;transform-origin:center;animation:spin 8s linear infinite}
.ct{animation:sl 3.4s ease-in-out infinite alternate}@keyframes sl{to{transform:translateX(18px)}}
.sp{fill:var(--or2);stroke:none;transform-box:fill-box;transform-origin:center;animation:nd 2.4s ease-in-out infinite}

/* contact: paper plane route */
.cl{position:relative}.cl>*{position:relative;z-index:1}.cl>.cplane{position:absolute;z-index:0;left:-6%;bottom:-18%;width:112%;height:78%;color:var(--or);opacity:.55;pointer-events:none}
.cplane .dash{stroke:var(--or)}

/* ===== round 6: calm, cinematic ===== */
.btn:hover .bi{transform:none}
*:hover>.tile{transform:none}
.gcard:hover,.idc:hover,.hc:hover,.ec:hover,.skc:hover,.pcard:hover{transform:none}
.gcard:hover .go{transform:none}.soc a:hover{transform:none}.tech:hover{transform:none}.clist a:hover i{transform:none}
.lanyard{animation:none}
.c1{top:auto;right:3vw;bottom:clamp(84px,13vh,110px);animation:none}
.hero::before{translate:none}

/* about: identity reel */
.ident{position:relative;padding:clamp(6px,1.6vh,18px) 0}
.isun{position:absolute;right:-8%;top:50%;width:min(86%,54vh);aspect-ratio:1;translate:0 -50%;border-radius:50%;background:radial-gradient(circle,rgba(240,75,25,.4),rgba(240,75,25,.12) 45%,transparent 70%);opacity:0;transition:opacity 1.8s var(--ease)}.ident.on .isun{opacity:1}
.ident ul{position:relative;list-style:none;padding:0}
.ident li button{display:flex;align-items:baseline;gap:16px;width:100%;padding:clamp(2px,.7vh,8px) 0;background:none;border:0;cursor:pointer;text-align:left;color:transparent;-webkit-text-stroke:1.5px var(--char);font:400 clamp(42px,min(8vw,11.5vh),112px)/1 var(--d);text-transform:uppercase;transition:color 1s var(--ease),-webkit-text-stroke-color 1s var(--ease),padding-left 1.2s var(--ease)}
.ident li.on button{color:var(--or);-webkit-text-stroke-color:var(--or);padding-left:clamp(14px,2vw,28px)}
.idn{font:600 12px var(--g);-webkit-text-stroke:0;color:var(--char);opacity:.45;letter-spacing:.1em}
.idesc{position:relative;display:flex;align-items:center;gap:10px;margin-top:clamp(8px,2vh,18px);padding-top:clamp(8px,1.6vh,14px);border-top:1px solid rgba(23,21,20,.2);font:500 clamp(14px,1.9vh,18px) var(--g);animation:pan .9s var(--ease)}.idesc svg{color:var(--or);flex:none}

/* journey: present / past */
.era{display:inline-flex;gap:4px;padding:4px;border-radius:99px;background:rgba(23,21,20,.35);margin-bottom:clamp(8px,1.8vh,16px)}
.era button{padding:8px 22px;border-radius:99px;border:0;background:none;color:#fff;font:600 13px var(--g);cursor:pointer;transition:background .9s var(--ease),color .9s var(--ease)}.era .on{background:var(--warm);color:var(--char)}
.jcard,.idcard{animation:pan .9s var(--ease)}.focus.one{grid-template-columns:1fr}

/* climb v3: self-playing, cinematic camera */
.pscene{height:clamp(170px,32vh,340px)}
.pcam{position:absolute;inset:0;transition:transform 2.6s var(--ease),transform-origin 2.6s var(--ease)}.peak.on .pcam{transform:scale(1.14)}
.pcam>svg:not(.pflag){position:absolute;inset:0;width:100%;height:100%}
.peak .climb{transition:none;stroke-dashoffset:1}
.pn2{position:absolute;width:34px;height:34px;transform:translate(-50%,-50%);border-radius:50%;display:grid;place-items:center;background:var(--char);border:3px solid rgba(255,255,255,.7);color:#fff;transition:background 1s var(--ease),border-color 1s,box-shadow 1s}
.pn2.lit{background:var(--or);border-color:#fff}.pn2.cur{box-shadow:0 0 0 8px rgba(240,75,25,.25),0 0 24px var(--or2)}
.runner2{position:absolute;width:12px;height:12px;margin:-6px 0 0 -6px;border-radius:50%;background:#fff;box-shadow:0 0 14px 4px rgba(255,122,69,.8)}
.pchips{display:flex;flex-wrap:wrap;gap:6px;margin-top:clamp(8px,1.6vh,14px)}
.pchips button{padding:7px 14px;border-radius:99px;border:1px solid rgba(255,255,255,.22);background:none;color:rgba(255,255,255,.7);font:600 11px var(--g);letter-spacing:.08em;text-transform:uppercase;cursor:pointer;transition:background .9s var(--ease),color .9s,border-color .9s}.pchips .on{background:var(--or);border-color:var(--or);color:#fff}

/* education scene */
.edus{position:relative;width:min(100%,calc(clamp(220px,40vh,400px) * 1.3333));aspect-ratio:4/3;border-radius:30px;overflow:hidden;background:linear-gradient(180deg,#120d0b,#2a160e 58%,#5a2a14);box-shadow:0 24px 60px rgba(23,21,20,.28);margin-top:clamp(6px,1.6vh,16px)}
.edus svg{position:absolute;inset:0;width:100%;height:100%}
.erays{position:absolute;left:50%;top:63%;width:150%;aspect-ratio:1;translate:-50% -50%;background:repeating-conic-gradient(from 0deg,rgba(255,122,69,.2) 0 5deg,transparent 5deg 14deg);-webkit-mask-image:radial-gradient(circle,#000,transparent 62%);mask-image:radial-gradient(circle,#000,transparent 62%);animation:spin 90s linear infinite;opacity:0;transition:opacity 2s}.edus.on .erays{opacity:1}
.esun{opacity:0;transition:opacity 2s .3s}.edus.on .esun{opacity:1}
.eh1,.eh2{transform:translateY(24px);transition:transform 2s var(--ease)}.edus.on .eh1,.edus.on .eh2{transform:none}
.ecap{opacity:0;transform:translateY(-26px);transition:opacity 1.4s .8s,transform 1.9s var(--ease) .8s}.edus.on .ecap{opacity:1;transform:none}
.eln{fill:none;stroke:var(--or2);stroke-width:1.6;stroke-dasharray:4 6;animation:dsh 2.4s linear infinite;opacity:0;transition:opacity 1.2s 1.6s}.edus.on .eln{opacity:.9}
.echip{position:absolute;display:flex;align-items:center;gap:8px;padding:8px 14px;border-radius:99px;font:600 clamp(9px,1.3vh,12px) var(--g);letter-spacing:.1em;text-transform:uppercase;white-space:nowrap;color:#fff;background:rgba(23,21,20,.6);border:1px solid rgba(255,255,255,.25);backdrop-filter:blur(10px);translate:-50% -50%;opacity:0;transition:opacity 1.2s 1.8s}.edus.on .echip{opacity:1}
.ecap2{position:absolute;left:0;right:0;bottom:10px;text-align:center;font:600 10px var(--g);letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.7)}

/* projects: pinned scroll story */
.pstory{position:relative;background:var(--char);color:var(--warm)}.pstory.pin{height:460vh;height:460svh}
.pstick{position:relative;padding:clamp(84px,12vh,118px) 3vw clamp(24px,4.5vh,52px);display:flex;flex-direction:column;justify-content:center;min-height:100vh;min-height:100svh;overflow:hidden}
.pin .pstick{position:sticky;top:0;height:100vh;height:100svh;min-height:0}
.pstory .quote{color:var(--or2)}.pcount{margin-left:auto;font-variant-numeric:tabular-nums}
.pwrap{grid-template-columns:minmax(0,1fr) clamp(260px,34vw,460px)}
.pscn{position:relative;aspect-ratio:4/3.1;border-radius:24px;overflow:hidden;background:linear-gradient(180deg,#120d0b,#26150e 55%,#4a2412)}
.psun{position:absolute;left:var(--sx);bottom:14%;width:70%;aspect-ratio:1;translate:-50% 50%;border-radius:50%;background:radial-gradient(circle,#ffb27a 0,var(--or2) 16%,var(--or) 36%,rgba(179,38,10,.35) 54%,transparent 70%);transition:left 1.6s var(--ease)}
.pmtn{position:absolute;left:0;right:0;bottom:0;width:100%;height:34%}
.pa2{position:absolute;inset:6% 8% 18%;display:grid;place-items:center;animation:pan .9s var(--ease)}.pa2 .art{width:100%;height:100%;max-height:none}
.pbig{position:absolute;left:14px;top:6px;font:400 clamp(56px,11vh,100px)/1 var(--d);color:transparent;-webkit-text-stroke:1px rgba(255,255,255,.28)}
.pem{position:absolute;inset:0;overflow:hidden;pointer-events:none}.pem i{position:absolute;bottom:-6px;width:3px;height:3px;border-radius:50%;background:var(--or2);box-shadow:0 0 8px var(--or2);animation:rise2 7s linear infinite}@keyframes rise2{0%{transform:translateY(0);opacity:0}15%{opacity:.9}100%{transform:translateY(-280px);opacity:0}}

/* cinematic section backdrops */
.bg{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.gsun{position:absolute;left:50%;bottom:30%;width:min(62vw,74vh);aspect-ratio:1;translate:-50% 50%;border-radius:50%;background:linear-gradient(180deg,#FFD9B0,var(--or2) 42%,var(--red));-webkit-mask-image:linear-gradient(180deg,#000 50%,transparent 50%);mask-image:linear-gradient(180deg,#000 50%,transparent 50%);opacity:.75}
.gfloor{position:absolute;left:-60%;right:-60%;bottom:-8%;height:46%;background-image:linear-gradient(rgba(255,255,255,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.4) 1px,transparent 1px);background-size:64px 64px;transform:perspective(420px) rotateX(64deg);transform-origin:50% 100%;animation:gf 4s linear infinite;-webkit-mask-image:linear-gradient(180deg,transparent,#000 40%);mask-image:linear-gradient(180deg,transparent,#000 40%)}@keyframes gf{to{background-position:0 64px}}
.wsun{position:absolute;right:6%;bottom:12%;width:min(34vw,44vh);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,rgba(240,75,25,.35),rgba(240,75,25,.1) 50%,transparent 70%)}
.whills{position:absolute;left:0;right:0;bottom:0;width:100%;height:34%}
.crane{position:absolute;right:3%;bottom:0;height:80%;color:var(--or2);opacity:.42;fill:none;stroke:currentColor;stroke-width:2}.crane rect{fill:currentColor}
.bldg{position:absolute;right:20%;bottom:0;height:34%;color:var(--or2);opacity:.3;fill:none;stroke:currentColor;stroke-width:1.5}
.csun{position:absolute;left:50%;bottom:8%;width:min(80vw,90vh);aspect-ratio:1;translate:-50% 45%;border-radius:50%;background:radial-gradient(circle,#ffe0c2 0,#ffb27a 12%,rgba(255,122,69,.5) 36%,transparent 66%)}
.cmtn{position:absolute;left:0;right:0;bottom:0;width:100%;height:clamp(110px,26vh,240px)}
.cflight{position:absolute;left:0;right:0;top:6%;width:100%;height:36%;opacity:.65}.cflight .dash{stroke:#fff}
.ctower{position:absolute;left:5%;bottom:calc(clamp(110px,26vh,240px) - 40px);height:clamp(90px,18vh,150px);fill:none;stroke:#fff;stroke-width:2;overflow:visible}
.sg{fill:none;stroke:#fff;transform-box:fill-box;transform-origin:center;opacity:0;animation:sgr 3.6s ease-out infinite}.sg.s2{animation-delay:1.2s}.sg.s3{animation-delay:2.4s}@keyframes sgr{0%{transform:scale(.4);opacity:.9}100%{transform:scale(3.6);opacity:0}}
.fire .clist{border-top-color:rgba(255,255,255,.35)}.fire .clist a{border-bottom-color:rgba(255,255,255,.3);color:#fff}.fire .clist a:hover{color:var(--char)}

/* stable heights for self-updating content */
.idesc{min-height:clamp(52px,8.4vh,72px)}
.ppanel{min-height:clamp(150px,24vh,210px)}
.career .jhead{min-height:clamp(260px,46vh,420px)}
.pin2{min-height:clamp(64px,10.5vh,104px)}

/* responsive */
@media(max-width:1100px){.dots{display:none}}
@media(min-width:1001px){.sec{height:100vh;height:100svh;min-height:0}.wrap{will-change:transform}}
@media(min-width:1001px) and (max-height:780px){.sechead{display:none}.sec{padding-top:80px}}
@media(max-width:1000px){
.nav{width:calc(100% - 28px);justify-content:space-between;gap:10px;padding:6px 6px 6px 18px}.links,.nav .btn{display:none}.burger{display:block}.drop{display:block}
.logo .full{display:inline!important}.logo .sg{display:none!important}
.two,.jhead,.phd,.hgrid{grid-template-columns:1fr}.egrid,.ids{grid-template-columns:1fr 1fr}.focus{grid-template-columns:1fr}
.hero::before{background-position:62% top}.c1,.tagline,.hfoot>span{display:none}.c2{display:none}.tags{top:92px}.hcopy{bottom:96px}
.sk{grid-template-columns:1fr 1fr}.skc,.skc.s3{grid-column:auto}.ident li button{font-size:clamp(40px,13vw,72px)}.edus{width:100%}.crane,.ctower,.cflight{opacity:.3}.pwrap{grid-template-columns:1fr}.pprev,.spinbadge,.cplane{display:none}.ppanel{grid-template-columns:1fr}.orbit{width:min(100%,360px)}.badgewrap{margin-top:14px}.pin2{padding-left:0;grid-template-columns:1fr}.skc.s4{grid-column:span 2}
.tl{grid-template-columns:1fr 1fr;row-gap:26px}.tline{display:none}.tl{padding-top:0}.dot{position:static;display:block;margin-bottom:10px}
.phead{grid-template-columns:34px 1fr 40px;gap:12px}.ptag,.pill{display:none}.pin2{grid-template-columns:44px 1fr}.pin2 .btn{grid-column:1/-1;justify-self:start}
.clist a{grid-template-columns:44px 1fr 30px}.clist small{display:none}.sec{justify-content:flex-start}.pcards{grid-template-columns:1fr 1fr}.e-foot{grid-template-columns:1fr;text-align:center;justify-items:center}.e-foot .top{justify-self:center}.deco{display:none}}
@media(max-width:560px){.pcards{grid-template-columns:1fr}.pscene{height:200px}.egrid,.ids,.sk,.tl{grid-template-columns:1fr}.skc.s4{grid-column:auto}.btn{font-size:14px}.hero h1{font-size:clamp(56px,19vw,120px)}.disp{font-size:clamp(36px,12vw,64px)}.ctas .btn{padding-right:20px}.mile strong{font-size:64px}.end h2{font-size:clamp(60px,24vw,150px)}}
@media(hover:none){.gcard:hover,.skc:hover,.idc:hover,.hc:hover,.ec:hover{transform:none}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}.rv,.sp .w>span,.tli{opacity:1;transform:none}.rv:not(.in) .tech{opacity:1}.tline span{transform:none}.grain{display:none}}
`;