import { useEffect, useLayoutEffect, useRef, useState } from "react";

/* ================= EDIT THESE ================= */
const LINKS = {
  email: "mailto:you@example.com", // TODO: your professional email
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
const SECTIONS = [["home", "Hero"], ["about", "About"], ["journey", "Journey"], ["education", "Education"], ["work", "Projects"], ["skills", "Skills"], ["beyond", "Beyond Code"], ["learning", "Learning"], ["contact", "Contact"], ["finale", "Finale"]];
const NAV_OF = { education: "journey", beyond: "skills", learning: "skills", finale: "contact" };

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
  ["BCA Forum", "Leadership", "flag", "Participated in the BCA Forum journey, contributing to student engagement and community activities."],
  ["HandsFreeStudio", "Entrepreneurship", "spark", "Exploring the intersection of technology and business through affordable websites, automation and digital growth solutions."],
];
const LEARN = [["Cloud Architecture", "cloud", "Understanding scalable infrastructure and cloud-native systems."], ["DevOps Engineering", "loop", "Exploring automation, CI/CD, infrastructure and deployment workflows."], ["Containerization", "box", "Building knowledge of Docker and container-based environments."], ["AI & Automation", "spark", "Exploring intelligent applications and practical automation."]];
const FOCUS = ["Building a strong corporate and technical foundation.", "Understanding enterprise technology environments.", "Developing problem-solving and collaboration skills.", "Continuously expanding my technical knowledge.", "Preparing for future opportunities in cloud and DevOps."];
const TIMELINE = [
  ["Foundation", "BCA · Cyber Security & Cloud Architecture", "Completed at Bengaluru City University, specializing in cloud and security."],
  ["Ideas into experiences", "Projects & initiatives", "Concepts and builds across web, AI, location and social, from Ride Sync to AURA Resume."],
  ["Day One", "Analyst Trainee · Cognizant", "17.09.2026. Stepping into the corporate technology environment in Bengaluru."],
  ["Direction", "Cloud · DevOps · Automation", "Building a deeper understanding of cloud infrastructure and modern software delivery."],
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
  cap: "M2 9l10-5 10 5-10 5zM6 11v5c3 2.5 9 2.5 12 0v-5", cal: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4", plus: "M12 5v14M5 12h14",
};
const Ic = ({ n, s = 20 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={P[n]} /></svg>
);
const Tile = ({ n, tone = "or" }) => <span className={`tile ${tone}`}><Ic n={n} s={22} /></span>;

/* ================= REUSABLE PIECES ================= */
function useInView(t = 0.2) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setOn(true), io.disconnect()), { threshold: t });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [t]);
  return [ref, on];
}
function Reveal({ children, delay = 0, className = "", ...r }) {
  const [ref, on] = useInView(0.12);
  return <div ref={ref} className={`rv ${on ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }} {...r}>{children}</div>;
}
function Split({ text, className = "", delay = 0, as: Tag = "h2" }) {
  const [ref, on] = useInView(0.3);
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
  const move = (e) => {
    const b = ref.current.getBoundingClientRect();
    ref.current.style.transform = `translate(${(e.clientX - b.left - b.width / 2) * 0.1}px,${(e.clientY - b.top - b.height / 2) * 0.16}px)`;
  };
  return (
    <a ref={ref} href={href} onClick={onClick} onMouseMove={move} onMouseLeave={() => (ref.current.style.transform = "")}
      className={`btn ${variant}`} {...(ext ? { target: "_blank", rel: "noreferrer" } : {})} {...r}>
      {icon && <span className="bi"><Ic n={icon} s={18} /></span>}{children}
    </a>
  );
}
function Sec({ id, idx, label, tone = "dark", children, className = "" }) {
  return (
    <section id={id} className={`sec ${tone} ${className}`} aria-label={label}>
      <div className="gl" />
      <div className="wrap">
        <Reveal className="sechead"><b>{String(idx).padStart(2, "0")}</b><i />{label}</Reveal>
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

/* lerped wheel scrolling, no library; respects reduced motion */
function useSmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cur = scrollY, target = cur, run = false;
    const max = () => document.documentElement.scrollHeight - innerHeight;
    const tick = () => {
      cur += (target - cur) * 0.085;
      if (Math.abs(target - cur) < 0.4) { cur = target; run = false; }
      scrollTo(0, cur);
      run && requestAnimationFrame(tick);
    };
    const start = () => { if (!run) { run = true; requestAnimationFrame(tick); } };
    const wheel = (e) => {
      if (e.ctrlKey) return;
      e.preventDefault();
      if (!run) { cur = scrollY; target = cur; }
      target = Math.max(0, Math.min(max(), target + e.deltaY));
      start();
    };
    const sync = () => { if (!run) { cur = scrollY; target = cur; } };
    window.__goto = (y) => { if (!run) cur = scrollY; target = Math.max(0, Math.min(max(), y)); start(); };
    addEventListener("wheel", wheel, { passive: false });
    addEventListener("scroll", sync, { passive: true });
    return () => { removeEventListener("wheel", wheel); removeEventListener("scroll", sync); delete window.__goto; };
  }, []);
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
function Projects() {
  const [o, setO] = useState(0);
  return (
    <div className="plist">
      {PROJECTS.map(([name, tags, status, ic, desc, focus, key], i) => {
        const url = key && LINKS[key];
        const on = o === i;
        return (
          <Reveal key={name} delay={i * 60} className={`prow ${on ? "on" : ""}`}>
            <button className="phead" aria-expanded={on} aria-controls={`p${i}`} onClick={() => setO(on ? -1 : i)} onMouseEnter={() => matchMedia("(hover:hover)").matches && setO(i)}>
              <span className="pn">{String(i + 1).padStart(2, "0")}</span>
              <span className="pt">{name}</span>
              <span className="ptag">{tags}</span>
              <span className="pill">{status}</span>
              <span className="pplus"><Ic n="plus" s={20} /></span>
            </button>
            <div className="pbody" id={`p${i}`}>
              <div>
                <div className="pin2">
                  <Tile n={ic} />
                  <div className="t"><p>{desc}</p><p className="focus2"><b>Focus</b>{focus}</p></div>
                  {url && <Btn variant="pri sm" href={url} icon="arrow">Visit {name}</Btn>}
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

function Timeline() {
  const [ref, on] = useInView(0.3);
  return (
    <ol className={`tl ${on ? "on" : ""}`} ref={ref}>
      <span className="tline"><span /></span>
      {TIMELINE.map(([t, s, d], i) => (
        <li key={t} className="tli" style={{ transitionDelay: `${300 + i * 380}ms` }}>
          <span className="dot" style={{ transitionDelay: `${300 + i * 380}ms` }} /><small>{t}</small><h3>{s}</h3><p>{d}</p>
        </li>
      ))}
    </ol>
  );
}

function SkillGrid() {
  return (
    <div className="sk">
      {SKILLS.map(([c, ic, items], i) => (
        <Reveal key={c} delay={i * 110} className={`skc s${i}`} onMouseMove={spot}>
          <div className="skh"><Tile n={ic} /><span className="skn">{String(i + 1).padStart(2, "0")}</span></div>
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
  const [lit, setLit] = useState(false);
  const day = Math.max(1, Math.floor((Date.now() - DAY_ONE) / 864e5) + 1);
  useSmoothScroll();

  useEffect(() => {
    document.title = "Sagar Gowda — Analyst Trainee @ Cognizant | Developer · Cloud & DevOps";
    let m = document.querySelector('meta[name="description"]');
    if (!m) { m = document.createElement("meta"); m.name = "description"; document.head.appendChild(m); }
    m.content = "Portfolio of Sagar Gowda: Analyst Trainee at Cognizant, developer and builder exploring cloud, DevOps, automation and AI.";
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const onScroll = () => {
      root.style.setProperty("--sy", scrollY);
      root.style.setProperty("--p", scrollY / Math.max(1, root.scrollHeight - innerHeight));
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { setCur(e.target.id); setActive(NAV_OF[e.target.id] || e.target.id); } }), { rootMargin: "-45% 0px -50% 0px" });
    SECTIONS.forEach(([id]) => io.observe(document.getElementById(id)));
    const io2 = new IntersectionObserver(([e]) => setLit(e.isIntersecting), { threshold: 0.5 });
    io2.observe(document.getElementById("finale"));
    return () => { removeEventListener("scroll", onScroll); io.disconnect(); io2.disconnect(); };
  }, []);

  return (
    <div className="app">
      <style>{CSS}</style>
      <a className="skip" href="#about" onClick={go("about")}>Skip to content</a>
      <div className="pbar" /><div className="grain" aria-hidden="true" />
      <Nav active={active} solid={solid} />
      <ul className="dots" aria-label="Sections">
        {SECTIONS.map(([id, l]) => (
          <li key={id}><a href={`#${id}`} className={cur === id ? "on" : ""} onClick={go(id)} aria-label={l}><span>{l}</span><i /></a></li>
        ))}
      </ul>

      <main>
        {/* 01 HERO */}
        <section id="home" className="hero" aria-label="Hero" style={{ "--bg": `url(${HERO_BG})` }}>
          <div className="gl" />
          <div className="tags a1"><b>01</b><span>Developer</span><em>×</em><span>Builder</span><em>×</em><span>Learner</span></div>
          <p className="tagline a2">A face. A name. A direction.<br /><span>I'm a technology enthusiast who builds meaningful digital experiences.</span></p>
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
          <a className="gcard c2 a5" href="#contact" onClick={go("contact")}>
            <div className="av" style={{ backgroundImage: `url(${HERO_IMG})` }} aria-hidden="true" />
            <div><small>Let's Talk <u /></small><strong>Sagar Gowda</strong><small>Analyst Trainee @ Cognizant</small></div>
            <span className="go"><Ic n="arrow" s={16} /></span>
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
            <div className="ids">
              {IDS.map(([t, ic, d], i) => <Reveal key={t} delay={i * 90} className="idc"><Tile n={ic} /><h3>{t}</h3><p>{d}</p></Reveal>)}
            </div>
          </div>
          <Reveal className="quote">“Stay curious. Stay humble. Keep building.”</Reveal>
        </Sec>

        {/* 03 JOURNEY */}
        <Sec id="journey" idx={3} label="Professional Journey" tone="fire">
          <Reveal><span className="chip-l"><Ic n="spark" s={14} />Current position</span></Reveal>
          <Split text="Where it all started." className="disp sm" />
          <div className="jhead">
            <Reveal delay={80} className="jcard">
              <small>Cognizant</small>
              <h3>Analyst Trainee</h3>
              <p className="meta"><Ic n="cal" s={16} />September 17, 2026 – Present &nbsp;<Ic n="pin" s={16} />Bengaluru, India</p>
              <p>I began my professional journey at Cognizant on September 17, 2026, stepping into the corporate technology environment as an Analyst Trainee. It marks an important transition from academic learning to professional development.</p>
              <ul className="focus">{FOCUS.map((f) => <li key={f}>{f}</li>)}</ul>
            </Reveal>
            <Reveal delay={160} className="mile">
              <small>My professional day one</small>
              <strong>17.09<br />2026</strong>
              <span>The beginning of my corporate journey.</span>
              <em className="dc"><i />Day {day}</em>
            </Reveal>
          </div>
          <Timeline />
        </Sec>

        {/* 04 EDUCATION */}
        <Sec id="education" idx={4} label="Education" tone="warm">
          <div className="two">
            <Split text="Built on curiosity." className="disp" />
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

        {/* 05 PROJECTS */}
        <Sec id="work" idx={5} label="Projects" tone="dark">
          <div className="phd"><Split text="Ideas deserve to exist." className="disp sm" />
          <Reveal delay={80}><p className="lead">Every project starts with a question: what if something could be simpler, smarter or more useful? Concepts are marked as concepts.</p></Reveal></div>
          <Projects />
          <Reveal className="quote q2">“An idea becomes valuable when you give it the effort to exist.”</Reveal>
        </Sec>

        {/* 06 SKILLS */}
        <Sec id="skills" idx={6} label="Skills" tone="warm">
          <Split text="The technology I work with." className="disp sm" />
          <SkillGrid />
          <Reveal className="quote">“Tools change. The ability to learn never goes out of style.”</Reveal>
        </Sec>

        {/* 07 BEYOND */}
        <Sec id="beyond" idx={7} label="Beyond Code" tone="fire">
          <Split text="Not just about code." className="disp" />
          <Reveal delay={80}><p className="lead">Some of the most meaningful experiences happen outside a development environment. I enjoy working with people, sharing knowledge, taking initiative and contributing to communities.</p></Reveal>
          <div className="hgrid">
            {HUMAN.map(([t, r, ic, d], i) => <Reveal key={t} delay={i * 100} className="hc"><Tile n={ic} tone="glass" /><small>{r}</small><h3>{t}</h3><p>{d}</p></Reveal>)}
          </div>
          <Reveal className="lead">Technical skills help us build solutions; communication, empathy, ownership and collaboration help us build meaningful relationships.</Reveal>
        </Sec>

        {/* 08 LEARNING */}
        <Sec id="learning" idx={8} label="Learning" tone="dark">
          <Split text="Still under construction." className="disp" />
          <Reveal delay={80}><p className="lead">My professional journey has just begun, and every new technology is another opportunity to expand my perspective.</p></Reveal>
          <div className="egrid">
            {LEARN.map(([t, ic, d], i) => <Reveal key={t} delay={i * 90} className="ec"><Tile n={ic} /><h3>{t}</h3><p>{d}</p></Reveal>)}
          </div>
          <Reveal className="quote q2">“I don't need to know everything today. I just need to keep learning something every day.”</Reveal>
        </Sec>

        {/* 09 CONTACT */}
        <Sec id="contact" idx={9} label="Contact" tone="warm">
          <div className="two">
            <div>
              <Split text="Let's make something matter." className="disp" />
              <Reveal delay={80}><p className="lead">Whether it's a creative idea, a technical discussion, a collaboration, or simply someone who shares an interest in technology, I'd be happy to hear from you.</p></Reveal>
              <Reveal delay={200}><Btn href={LINKS.email} icon="send">Let's Connect</Btn></Reveal>
            </div>
            <Reveal delay={140} className="clist">
              {[["mail", "Email", "Send me a message", LINKS.email], ["linkedin", "LinkedIn", "onlinewithsagar", LINKS.linkedin], ["github", "GitHub", "onlinewithsagar", LINKS.github], ["compass", "Portfolio", "sagargowdag.vercel.app", LINKS.site]].map(([ic, l, v, h]) => (
                <a key={l} href={h} {...(/^https?:/.test(h) ? { target: "_blank", rel: "noreferrer" } : {})}>
                  <Tile n={ic} tone="char" /><small>{l}</small><span>{v}</span><i><Ic n="arrow" s={22} /></i>
                </a>
              ))}
            </Reveal>
          </div>
        </Sec>
      </main>

      {/* 10 FINALE */}
      <section id="finale" className={`end ${lit ? "lit" : ""}`} aria-label="Finale">
        <div className="eg" />
        <p className="est">A personal reminder · Est. 17.09.2026</p>
        <h2 aria-label="One day or day one."><span className="one">ONE DAY</span><span className="or">OR</span><span className="dayone">DAY ONE.</span></h2>
        <p className="chose">I chose to begin. I'm still becoming.</p>
        <div className="sig"><strong>SAGAR GOWDA.</strong><small>Building today. Engineering tomorrow.</small></div>
        <small className="copy">© 2026 Sagar Gowda. All rights reserved.</small>
      </section>
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
.pbar{position:fixed;inset:0 0 auto 0;height:3px;z-index:130;background:var(--or2);transform:scaleX(var(--p,0));transform-origin:0 50%}
.grain{position:fixed;inset:-50%;z-index:120;pointer-events:none;opacity:.07;mix-blend-mode:overlay;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");animation:gr 1.6s steps(6) infinite}
@keyframes gr{20%{transform:translate(-3%,2%)}40%{transform:translate(2%,-3%)}60%{transform:translate(-2%,-1%)}80%{transform:translate(3%,3%)}}

.rv{opacity:0;transform:translateY(36px);transition:opacity 1.2s var(--ease),transform 1.3s var(--ease)}.rv.in{opacity:1;transform:none}
.sp .w{display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.08em}
.sp .w>span{display:inline-block;transform:translateY(115%) rotate(3deg);transition:transform 1.4s var(--ease)}.sp.in .w>span{transform:none}

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
.hero h1 span{display:block}.hero h1 i{display:inline-block;width:.13em;height:.13em;border-radius:50%;background:var(--or2);margin-left:.04em;box-shadow:0 0 24px var(--or2);animation:pulse 2.8s infinite}
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
.sechead{display:flex;align-items:center;gap:14px;margin-bottom:clamp(8px,2.2vh,24px);font:500 12px var(--g);letter-spacing:.3em;text-transform:uppercase}.sechead b{font-weight:700}.sechead i{width:60px;height:1px;background:currentColor;opacity:.5}
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
.phead{width:100%;display:grid;grid-template-columns:50px minmax(0,1.1fr) minmax(0,1fr) auto 44px;align-items:center;gap:16px;padding:clamp(7px,1.5vh,16px) 0;background:none;border:0;color:inherit;text-align:left;cursor:pointer}
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

/* finale */
.end{position:relative;min-height:100vh;min-height:100svh;background:#0d0b0a;display:grid;place-content:center;text-align:center;padding:clamp(70px,10vh,110px) 3vw clamp(22px,4vh,48px);overflow:hidden}
.end::before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px) 0 0/25% 100%}
.eg{position:absolute;width:110vmin;height:110vmin;left:50%;top:55%;background:radial-gradient(circle,rgba(240,75,25,.6),rgba(179,38,10,.25) 40%,transparent 68%);opacity:0;transform:translate(-50%,-50%) scale(.3);transition:opacity 2.2s var(--ease),transform 2.8s var(--ease)}.end.lit .eg{opacity:1;transform:translate(-50%,-50%) scale(1)}
.end>*{position:relative}.est{font:500 12px var(--g);letter-spacing:.4em;text-transform:uppercase;opacity:.6;margin-bottom:clamp(10px,3vh,30px)}
.end h2{display:grid;font:400 clamp(64px,min(21vw,25vh),320px)/.88 var(--d);letter-spacing:-.005em}.end h2 span{display:block;transition:all 1.8s var(--ease)}
.one{color:rgba(245,241,233,.14);transform:translateY(30px)}.or{font:500 clamp(13px,2vh,24px) var(--g);letter-spacing:.7em;margin:.8em 0;opacity:0;color:var(--or2)}
.dayone{background:linear-gradient(90deg,var(--or),#ff9a6a,var(--or));background-size:200%;-webkit-background-clip:text;background-clip:text;color:transparent;opacity:.1;transform:scale(.94)}
.end.lit .one{transform:none;color:rgba(245,241,233,.26);text-decoration:line-through;text-decoration-thickness:.03em;text-decoration-color:var(--or)}
.end.lit .or{opacity:1}.end.lit .dayone{opacity:1;transform:none;animation:sheen 6s linear infinite}@keyframes sheen{to{background-position:200%}}
.chose{margin:clamp(16px,4vh,44px) auto clamp(18px,4vh,44px);font:400 clamp(16px,2.2vh + .4vw,28px) var(--g);opacity:0;transition:opacity 1.8s 1s}.end.lit .chose{opacity:.92}
.sig strong{display:block;font:400 clamp(22px,3.4vh,30px) var(--d);letter-spacing:.04em}.sig small{font:600 11px var(--g);letter-spacing:.35em;text-transform:uppercase;opacity:.5}
.copy{display:block;margin-top:clamp(14px,3vh,40px);opacity:.35;font-size:12px}

/* responsive */
@media(max-width:1100px){.dots{display:none}}
@media(min-width:1001px) and (max-height:780px){.sechead{display:none}.sec{padding-top:80px}}
@media(max-width:1000px){
.nav{width:calc(100% - 28px);justify-content:space-between;gap:10px;padding:6px 6px 6px 18px}.links,.nav .btn{display:none}.burger{display:block}.drop{display:block}
.logo .full{display:inline!important}.logo .sg{display:none!important}
.two,.jhead,.phd,.hgrid{grid-template-columns:1fr}.egrid,.ids{grid-template-columns:1fr 1fr}.focus{grid-template-columns:1fr}
.hero::before{background-position:62% top}.c1,.tagline,.hfoot>span{display:none}.c2{display:none}.tags{top:92px}.hcopy{bottom:96px}
.sk{grid-template-columns:1fr 1fr}.skc,.skc.s3{grid-column:auto}.skc.s4{grid-column:span 2}
.tl{grid-template-columns:1fr 1fr;row-gap:26px}.tline{display:none}.tl{padding-top:0}.dot{position:static;display:block;margin-bottom:10px}
.phead{grid-template-columns:34px 1fr 40px;gap:12px}.ptag,.pill{display:none}.pin2{grid-template-columns:44px 1fr}.pin2 .btn{grid-column:1/-1;justify-self:start}
.clist a{grid-template-columns:44px 1fr 30px}.clist small{display:none}.sec{justify-content:flex-start}}
@media(max-width:560px){.egrid,.ids,.sk,.tl{grid-template-columns:1fr}.skc.s4{grid-column:auto}.btn{font-size:14px}.hero h1{font-size:clamp(56px,19vw,120px)}.disp{font-size:clamp(36px,12vw,64px)}.ctas .btn{padding-right:20px}.mile strong{font-size:64px}.end h2{font-size:clamp(60px,24vw,150px)}}
@media(hover:none){.gcard:hover,.skc:hover,.idc:hover,.hc:hover,.ec:hover{transform:none}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}.rv,.sp .w>span,.tli{opacity:1;transform:none}.rv:not(.in) .tech{opacity:1}.tline span{transform:none}.grain{display:none}}
`;