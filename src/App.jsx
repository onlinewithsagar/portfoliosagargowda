import React, { useState, useEffect, useRef } from 'react';

// --- INLINE SVG ICONS (Zero external package dependencies required) ---
const ArrowUpRightIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

const PlayIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <polygon points="6 3 20 12 6 21 6 3"></polygon>
  </svg>
);

const SendIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

const ExternalLinkIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const GithubIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const LinkedinIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.94 0 1.7-.76 1.7-1.7s-.76-1.7-1.7-1.7a1.7 1.7 0 0 0-1.7 1.7c0 .94.76 1.7 1.7 1.7m1.39 9.74v-8.37H5.07v8.37h2.78z"/>
  </svg>
);

const CodeIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
);

const CpuIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
);

const CloudIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>
);

const BookIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
);

const AwardIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
);

const BrandLogos = {
  python: () => <svg viewBox="0 0 110 110" width="32" height="32"><path fill="#3776AB" d="M53.8 3.5C25.5 3.5 21.6 15.8 21.6 15.8l-.1 12.2h33v4.6H17.8s-15.3-2-15.3 22.8c0 24.1 13.5 23.3 13.5 23.3h7.2v-11s-.2-12.8 12.6-12.8h21.1s11.5-.4 11.5-11.2V20.5s1.2-17-14.6-17zm-14.7 7.7c2.6 0 4.7 2.1 4.7 4.7 0 2.6-2.1 4.7-4.7 4.7-2.6 0-4.7-2.1-4.7-4.7 0-2.6 2.1-4.7 4.7-4.7z"/><path fill="#FFD43B" d="M55.8 106.5c28.3 0 32.2-12.3 32.2-12.3l.1-12.2H55.1v-4.6h36.7s15.3 2 15.3-22.8c0-24.1-13.5-23.3-13.5-23.3h-7.2v11s.2 12.8-12.6 12.8H52.7s-11.5.4-11.5 11.2v23.2s-1.2 17 14.6 17zm14.7-7.7c-2.6 0-4.7-2.1-4.7-4.7 0-2.6 2.1-4.7 4.7-4.7 2.6 0 4.7 2.1 4.7 4.7 0 2.6-2.1 4.7-4.7 4.7z"/></svg>,
  javascript: () => <div style={{ backgroundColor: '#F7DF1E', color: '#000', fontWeight: 900, width: 32, height: 32, borderRadius: 4, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', padding: '2px 4px', fontSize: 16 }}>JS</div>,
  react: () => <svg viewBox="0 0 32 32" width="34" height="34"><circle cx="16" cy="16" r="2.8" fill="#61DAFB" /><g stroke="#61DAFB" strokeWidth="1.5" fill="none"><ellipse cx="16" cy="16" rx="13" ry="5" /><ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(60 16 16)" /><ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(120 16 16)" /></g></svg>,
  nodejs: () => <svg viewBox="0 0 32 32" width="32" height="32" fill="#339933"><path d="M16 2l12 6.9v14.2L16 30 4 23.1V8.9L16 2zm0 3.2L6.8 9.5v11.8L16 26.6l9.2-5.3V9.5L16 5.2z"/><path d="M15 11h2v10h-2z" fill="#FFF"/></svg>,
  aws: () => <svg viewBox="0 0 256 256" width="36" height="36" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M165.753 147.25c-8.98 12.339-29.213 22.096-54.774 22.096-33.007 0-59.083-16.143-59.083-16.143-2.613-1.637-2.61-4.707.133-6.536l8.802-5.719c2.316-1.503 5.485-1.144 7.625.688 0 0 20.89 16.921 44.536 16.921 16.793 0 30.596-5.834 38.303-12.883 2.196-2.007 6.47-.942 8.358 1.341l6.1 7.235zM224 163.644c-2.127-1.127-5.59-1.258-10.233-.03l-26.657 7.042c-5.86 1.547-7.799 4.314-5.368 9.24 3.011 6.101 10.457 18.064 10.457 18.064 2.805 4.542 7.747 5.093 11.238 2.05l21.282-18.529c3.08-2.68 1.408-6.71-1.397-8.192l.678.355z" fill="#FF9900"/><path d="M123.635 125.138h17.904c1.11 0 1.948-.823 2.062-1.921l1.524-15.021c.148-1.46.22-3.14.22-4.908 0-1.87-.042-3.414-.148-4.73l-1.678-15.228c-.126-1.157-1.042-1.979-2.208-1.979h-17.65c-1.066 0-1.895.805-1.986 1.861l-.396 4.705a30.825 30.825 0 0 0-8.915-5.362c-3.69-1.278-7.797-1.908-12.302-1.908-8.825 0-15.918 2.767-21.258 8.293-5.353 5.518-8.031 13.064-8.031 22.617 0 9.227 2.457 16.517 7.378 21.848 4.908 5.342 11.666 8.01 20.252 8.01 5.32 0 10.027-.89 14.108-2.671 4.093-1.782 7.6-4.526 10.536-8.232v4.757c0 1.076.853 1.95 1.93 1.95l18.658-.081zM113.882 101.4c0 3.738-1.134 6.744-3.407 9.02-2.274 2.274-5.397 3.408-9.356 3.408-3.921 0-7.03-.984-9.317-2.955-2.288-1.97-3.435-4.996-3.435-9.066 0-4.043 1.185-7.108 3.557-9.198 2.37-2.091 5.532-3.138 9.47-3.138 3.766 0 6.792 1.085 9.066 3.255 2.288 2.172 3.422 5.066 3.422 8.674m66.685.22c0-5.748-1.228-10.457-3.684-14.127-2.457-3.666-6.096-6.425-10.906-8.272-4.81-1.845-10.584-2.77-17.309-2.77-6.52 0-12.164.885-16.924 2.656-4.755 1.774-8.32 4.47-10.686 8.083-2.37 3.615-3.553 8.088-3.553 13.43 0 5.418 1.157 9.948 3.473 13.585 2.308 3.642 5.766 6.417 10.373 8.328 4.601 1.912 10.165 2.863 16.697 2.863 8.163 0 14.808-1.39 19.92-4.17 5.111-2.779 8.784-6.852 11.002-12.213l-13.623-6.57c-1.332 2.355-3.23 4.14-5.69 5.357-2.46 1.22-5.462 1.823-9.006 1.823-3.67 0-6.732-.71-9.18-2.126-2.448-1.423-4.135-3.414-5.07-5.967h42.753c.961 0 1.637-.932 1.543-1.884-.11-1.127-.13-3.135-.13-6.026m-45.747-5.426c.725-2.274 2.146-4.04 4.267-5.305 2.12-1.265 4.862-1.9 8.212-1.9 3.167 0 5.772.583 7.828 1.745 2.052 1.161 3.424 2.84 4.116 5.035.695 2.195 1.05 4.417 1.076 6.666h-26.68c.205-2.368.595-4.453 1.181-6.241M254.912 76.54h-17.653c-.947 0-1.747.7-1.9 1.634l-8.067 49.336h-17.84c-1.045 0-1.895-.83-2-1.874l-6.236-47.531a2.007 2.007 0 0 0-1.996-1.744h-16.14a2.003 2.003 0 0 0-1.993 1.758l-6.012 47.747c-.126 1.007-.978 1.79-1.991 1.79h-17.432l-7.85-49.48a1.92 1.92 0 0 0-1.897-1.636h-17.703c-1.164 0-2.062 1.033-1.882 2.185l13.12 84.143c.148 1.134 1.108 1.99 2.25 1.99h17.986c1.026 0 1.886-.77 2.003-1.79l6.596-48.472 6.664 48.468c.123 1.022.981 1.794 2.011 1.794h17.886c1.136 0 2.096-.848 2.247-1.974l13.72-84.152c.18-1.144-.712-2.19-1.892-2.19z" fill="#FFF"/></svg>,
  mongodb: () => <svg viewBox="0 0 32 32" width="32" height="32" fill="#47A248"><path d="M16 2s-7 6.5-7 14.5c0 6.2 5 9.7 7 13.5 2-3.8 7-7.3 7-13.5C23 8.5 16 2 16 2zm.3 23.5v-9.2c0-.5.4-.9.9-.9.4 0 .8.3.9.7.2 2 1.3 4.8 1.9 6.2-1.2 1.3-2.5 2.5-3.7 3.2z"/></svg>,
  database: () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>,
  html: () => <svg viewBox="0 0 32 32" width="32" height="32"><path fill="#E34F26" d="M6 3l2.2 24.3L16 30l7.8-2.7L26 3H6z"/><path fill="#EF652A" d="M16 27.9l6.3-2.2 1.8-20.2H16v22.4z"/><path fill="#ECECEC" d="M16 8.3h-5.4l.4 4.5H16V8.3zm0 7.8h-3.2l-.2-2.5h-2.4l.5 5.8H16v-3.3zm0 7.2l-.1.1-2.8-.8-.2-2h-2.5l.3 3.6 5.3 1.5v-2.4z"/><path fill="#FFFFFF" d="M16 8.3v4.5h5.1l-.4 4.5H16v3.3h3.2l-.3 3.4-2.9.8v2.4l5.3-1.5.7-8h-6z"/></svg>,
  css: () => <svg viewBox="0 0 32 32" width="32" height="32"><path fill="#1572B6" d="M6 3l2.2 24.3L16 30l7.8-2.7L26 3H6z"/><path fill="#33A9DC" d="M16 27.9l6.3-2.2 1.8-20.2H16v22.4z"/><path fill="#ECECEC" d="M16 8.3h-5.4l.4 4.5H16V8.3zm0 7.8h-3.2l-.2-2.5h-2.4l.5 5.8H16v-3.3zm0 7.2l-.1.1-2.8-.8-.2-2h-2.5l.3 3.6 5.3 1.5v-2.4z"/><path fill="#FFFFFF" d="M16 8.3v4.5h5.1l-.4 4.5H16v3.3h3.2l-.3 3.4-2.9.8v2.4l5.3-1.5.7-8h-6z"/></svg>,
  tailwind: () => <svg viewBox="0 0 32 32" width="34" height="34" fill="#38BDF8"><path d="M16 9c-4.4 0-6.9 2.2-7.5 6.6 1.6-2.2 3.5-3 5.7-2.4 1.3.3 2.1 1.2 3.1 2.2C19 17 21 19 25 19c4.4 0 6.9-2.2 7.5-6.6-1.6 2.2-3.5 3-5.7 2.4-1.3-.3-2.1-1.2-3.1-2.2C22 11 20 9 16 9zm-9 10c-4.4 0-6.9 2.2-7.5 6.6 1.6-2.2 3.5-3 5.7-2.4 1.3.3 2.1 1.2 3.1 2.2C10 27 12 29 16 29c4.4 0 6.9-2.2 7.5-6.6-1.6 2.2-3.5 3-5.7 2.4-1.3-.3-2.1-1.2-3.1-2.2C13 21 11 19 7 19z"/></svg>,
};

const RESUME_DATA = {
  name: "SAGAR GOWDA G",
  email: "onlinewithsagar@gmail.com",
  socials: {
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  stats: [
    { number: "10+", label: "Projects Built" },
    { number: "3+", label: "Years Learning" },
    { number: "100%", label: "Passion Driven" },
    { number: "∞", label: "Growth Mindset" }
  ],
  services: [
    {
      title: "Full-Stack Web Apps",
      description: "Building responsive, highly-performant web applications using React, Node.js, and modern databases. I focus on clean code and robust user experiences.",
      icon: CodeIcon
    },
    {
      title: "AI & LLM Integration",
      description: "Developing intelligent pipelines, local LLM routing, and privacy-first AI voice assistants using Python, FastAPI, and specialized AI frameworks.",
      icon: CpuIcon
    },
    {
      title: "Cloud Infrastructure",
      description: "Designing scalable serverless architectures utilizing AWS Lambda, API Gateway, DynamoDB, and building automated, event-driven workflows.",
      icon: CloudIcon
    }
  ],
  experience: [
    {
      role: "Independent Full-Stack Developer",
      company: "Hands Free Studio",
      date: "2026 - Present",
      workflows: [
        "Designing requirement-driven digital solutions spanning web development, UI/UX, and branding.",
        "Translating client requirements into practical, product-oriented digital experiences.",
        "Working across frontend interfaces, APIs, databases, and deployment workflows.",
        "Developing internal systems with an emphasis on maintainability and clean architecture."
      ]
    },
    {
      role: "Cloud Computing Intern",
      company: "ZoomInData",
      date: "Feb 2026 - Mar 2026",
      workflows: [
        "Worked with AWS serverless infrastructure using Lambda, SQS, API Gateway, and DynamoDB.",
        "Developed event-driven workflows for asynchronous backend processing.",
        "Implemented secure integrations using IAM policies and Secrets Manager."
      ]
    }
  ],
  education: [
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "SSMRV College",
      date: "2023 - 2026",
      details: "CGPA: 7.47/10. Academic focus on software development, cloud computing, artificial intelligence, and system architecture."
    },
    {
      degree: "Cloud & Systems Certifications",
      institution: "Professional Training",
      date: "Completed",
      details: "Implementation of Cloud Solution • Data Center & Cloud Technology • Software Development Life Cycle (SDLC)."
    }
  ],
  projects: [
    {
      title: "EVE Intelligent AI",
      tagline: "Privacy-first local AI assistant with voice recognition & dynamic LLM routing.",
      tags: ["Python", "FastAPI", "Ollama", "Node.js"],
      link: "#",
      size: "large"
    },
    {
      title: "SmartAttend",
      tagline: "A zero-cost digital attendance system automating workflows for modern institutions.",
      tags: ["React", "Node.js", "MongoDB"],
      link: "#",
      size: "medium"
    },
    {
      title: "AI Code Review Tool",
      tagline: "Source code analysis generating automated recommendations via LLM APIs.",
      tags: ["Python", "Supabase", "OpenRouter"],
      link: "#",
      size: "medium"
    },
    {
      title: "VYBE Platform",
      tagline: "A full-stack social interaction platform with secure authentication and real-time features.",
      tags: ["Firebase", "JavaScript", "HTML/CSS"],
      link: "#",
      size: "wide"
    }
  ],
  skills: [
    { name: "Python", logo: BrandLogos.python },
    { name: "JavaScript", logo: BrandLogos.javascript },
    { name: "React", logo: BrandLogos.react },
    { name: "Node.js", logo: BrandLogos.nodejs },
    { name: "AWS", logo: BrandLogos.aws },
    { name: "MongoDB", logo: BrandLogos.mongodb },
    { name: "SQL/NoSQL", logo: BrandLogos.database },
    { name: "Tailwind", logo: BrandLogos.tailwind },
    { name: "HTML5", logo: BrandLogos.html },
    { name: "CSS3", logo: BrandLogos.css }
  ]
};

// Advanced Mailto generator
const createMailto = () => {
  const subject = encodeURIComponent("Project Inquiry / Collaboration Request");
  const body = encodeURIComponent(
    "Hi Sagar,\n\nI recently came across your portfolio and was impressed by your work and technical approach. I am reaching out because I would love to connect and discuss a potential opportunity or collaboration.\n\nLooking forward to hearing from you!\n\nBest regards,\n[Your Name/Company]"
  );
  return `mailto:${RESUME_DATA.email}?subject=${subject}&body=${body}`;
};

function useInView(options = { threshold: 0.15, triggerOnce: true }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (options.triggerOnce) observer.unobserve(el);
      } else if (!options.triggerOnce) {
        setInView(false);
      }
    }, options);
    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return [ref, inView];
}

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorTrailing, setCursorTrailing] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // High-performance custom cursor
  useEffect(() => {
    let animId;
    let isMoving = false;
    const onMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      if (!isMoving) {
        isMoving = true;
        animId = requestAnimationFrame(updateTrailingCursor);
      }
    };

    const updateTrailingCursor = () => {
      setCursorTrailing((prev) => {
        const dx = cursorPos.x - prev.x;
        const dy = cursorPos.y - prev.y;
        if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
          isMoving = false;
          return prev;
        }
        return { x: prev.x + dx * 0.25, y: prev.y + dy * 0.25 };
      });
      if (isMoving) animId = requestAnimationFrame(updateTrailingCursor);
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [cursorPos]);

  // Section Refs for Scroll Animations
  const [heroRef, heroInView] = useInView();
  const [quoteRef, quoteInView] = useInView();
  const [skillsRef, skillsInView] = useInView();
  const [servicesRef, servicesInView] = useInView();
  const [experienceRef, experienceInView] = useInView();
  const [educationRef, educationInView] = useInView();
  const [projectsRef, projectsInView] = useInView();
  const [contactRef, contactInView] = useInView();

  return (
    <div style={{ backgroundColor: '#050505', color: '#ffffff', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;600;700;800;900&display=swap');

        :root {
          --neon-yellow: #ccff00;
          --bg-dark: #050505;
          --text-muted: #888888;
          --border-subtle: rgba(255, 255, 255, 0.08);
          --glass-bg: rgba(20, 20, 20, 0.4);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Inter', -apple-system, sans-serif; cursor: none; background: var(--bg-dark); }
        
        .font-outfit { font-family: 'Outfit', sans-serif; }
        .text-neon { color: var(--neon-yellow); text-shadow: 0 0 15px rgba(204,255,0,0.3); }

        /* Custom Cursor */
        .cursor-dot {
          position: fixed; width: 6px; height: 6px; background-color: var(--neon-yellow); border-radius: 50%; pointer-events: none; z-index: 9999; transform: translate(-50%, -50%); transition: opacity 0.2s;
        }
        .cursor-ring {
          position: fixed; width: 28px; height: 28px; border: 1.5px solid rgba(204, 255, 0, 0.6); border-radius: 50%; pointer-events: none; z-index: 9998; transform: translate(-50%, -50%); transition: width 0.2s, height 0.2s, background-color 0.2s;
        }
        .cursor-hovered { width: 44px; height: 44px; background-color: rgba(204, 255, 0, 0.1); }

        /* Cinematic Hero Gradient for Ultra-Wide Image */
        .hero-img-container {
          position: absolute; top: 0; right: 0; width: 65vw; height: 100vh; z-index: 0; overflow: hidden;
        }
        .hero-cinematic-img {
          width: 100%; height: 100%; object-fit: cover; object-position: center; opacity: 0.85; animation: slowPan 25s ease-in-out infinite alternate;
        }
        .hero-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(90deg, var(--bg-dark) 0%, rgba(5,5,5,0.95) 20%, rgba(5,5,5,0.4) 55%, transparent 100%),
                      linear-gradient(0deg, var(--bg-dark) 0%, rgba(5,5,5,0.7) 15%, transparent 40%);
        }
        @keyframes slowPan { 0% { transform: scale(1.05) translateX(0); } 100% { transform: scale(1.05) translateX(-2%); } }

        /* Targeted Nav Pill - No grain, just clean blur */
        .nav-pill {
          background: rgba(15, 15, 15, 0.7); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--border-subtle); border-radius: 40px;
        }

        /* Smooth Interactive Buttons */
        .btn-primary {
          background-color: var(--neon-yellow); color: #000; padding: 14px 32px; border-radius: 40px; font-size: 14px; font-weight: 700; display: inline-flex; align-items: center; gap: 8px; transition: transform 0.3s ease, box-shadow 0.3s ease; text-decoration: none; cursor: none;
        }
        .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 10px 25px rgba(204, 255, 0, 0.25); }
        
        /* Redesigned Services Cards (Hover Reveal) */
        .service-card {
          background: var(--glass-bg); border: 1px solid var(--border-subtle); border-radius: 20px; padding: 40px; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); position: relative; overflow: hidden;
        }
        .service-card::before {
          content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: var(--neon-yellow); transform: scaleX(0); transform-origin: left; transition: transform 0.4s ease;
        }
        .service-card:hover { transform: translateY(-8px); border-color: rgba(204,255,0,0.3); background: rgba(20,20,20,0.8); }
        .service-card:hover::before { transform: scaleX(1); }
        .service-card .icon-wrapper { color: #555; transition: color 0.4s ease; }
        .service-card:hover .icon-wrapper { color: var(--neon-yellow); }

        /* Work Experience Flow Timeline */
        .timeline-container { position: relative; padding-left: 32px; }
        .timeline-container::before {
          content: ''; position: absolute; left: 6px; top: 8px; bottom: 0; width: 1px; background: var(--border-subtle);
        }
        .timeline-item { position: relative; margin-bottom: 48px; }
        .timeline-node {
          position: absolute; left: -32px; top: 6px; width: 12px; height: 12px; border-radius: 50%; background: #222; border: 2px solid #555; transition: all 0.4s ease; z-index: 2;
        }
        .timeline-item:hover .timeline-node { background: var(--neon-yellow); border-color: var(--neon-yellow); box-shadow: 0 0 15px rgba(204,255,0,0.5); }
        .timeline-content { transition: transform 0.4s ease; }
        .timeline-item:hover .timeline-content { transform: translateX(8px); }

        /* Project Bento Grid */
        .project-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 24px; }
        .project-card {
          background: #0a0a0a; border: 1px solid var(--border-subtle); border-radius: 24px; padding: 36px;
          display: flex; flexDirection: column; justify-content: space-between; position: relative; overflow: hidden; transition: transform 0.4s ease, border-color 0.4s ease;
        }
        .project-card:hover { transform: translateY(-6px); border-color: rgba(204,255,0,0.3); }
        .project-card::before {
          content: ''; position: absolute; top: 0; right: 0; width: 150px; height: 150px;
          background: radial-gradient(circle at top right, rgba(204,255,0,0.08), transparent 70%); pointer-events: none;
        }

        /* Animations */
        .fade-up { opacity: 0; transform: translateY(40px); transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
        
        @media (max-width: 1024px) {
          .hero-img-container { width: 100%; }
          .hero-img-overlay {
            background: linear-gradient(90deg, var(--bg-dark) 0%, rgba(5,5,5,0.9) 40%, rgba(5,5,5,0.6) 80%, transparent 100%),
                        linear-gradient(0deg, var(--bg-dark) 0%, rgba(5,5,5,0.8) 20%, transparent 40%);
          }
          .hide-on-mobile { display: none !important; }
          .project-grid { display: flex; flex-direction: column; }
          .font-hero-quote { font-size: 3rem !important; }
        }
      `}</style>

      {/* Custom Trailing Cursor */}
      <div className="cursor-dot" style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }} />
      <div className={`cursor-ring ${isHovered ? 'cursor-hovered' : ''}`} style={{ left: `${cursorTrailing.x}px`, top: `${cursorTrailing.y}px` }} />

      {}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999, padding: '24px 6vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between', pointerEvents: 'none' }}>
        <a href="#home" style={{ textDecoration: 'none', color: '#fff', display: 'flex', alignItems: 'center', gap: 6, cursor: 'none', pointerEvents: 'auto' }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <span className="font-outfit" style={{ fontSize: 24, fontWeight: 900, letterSpacing: 2 }}>SAGAR</span>
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--neon-yellow)', display: 'inline-block', marginBottom: 2 }}></span>
        </a>

        <nav className="hide-on-mobile nav-pill" style={{ display: 'flex', alignItems: 'center', gap: 36, padding: '12px 32px', pointerEvents: 'auto' }}>
          {['Home', 'Expertise', 'Experience', 'Projects'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setActiveTab(item)}
              style={{ textDecoration: 'none', fontSize: 13, fontWeight: 500, color: activeTab === item ? 'var(--neon-yellow)' : '#aaa', transition: 'color 0.2s', letterSpacing: 0.5, cursor: 'none' }}
              onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
            >
              {item}
            </a>
          ))}
        </nav>

        <a href={createMailto()} className="nav-pill" style={{ pointerEvents: 'auto', padding: '10px 24px', fontSize: 13, color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, cursor: 'none', transition: 'all 0.3s border-color' }} onMouseEnter={(e) => { setIsHovered(true); e.currentTarget.style.color = 'var(--neon-yellow)'; e.currentTarget.style.borderColor = 'rgba(204,255,0,0.3)'; }} onMouseLeave={(e) => { setIsHovered(false); e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}>
          Let's Connect <ArrowUpRightIcon size={16} />
        </a>
      </header>

      {}
      <section id="home" ref={heroRef} style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center' }}>
        <div className={`hero-img-container fade-up ${heroInView ? 'visible' : ''}`} style={{ transitionDuration: '1.5s' }}>
          <img src="profilepic.png" alt="Sagar Gowda G" className="hero-cinematic-img" 
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=2000&auto=format&fit=crop"; }} 
          />
          <div className="hero-img-overlay"></div>
        </div>

        <div className={`fade-up ${heroInView ? 'visible' : ''}`} style={{ position: 'relative', zIndex: 10, width: '100%', padding: '140px 6vw 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transitionDelay: '0.1s' }}>
          
          <div style={{ maxWidth: 700 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.3em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span>BUILD</span><span className="text-neon">/</span><span>CREATE</span><span className="text-neon">/</span><span>SOLVE</span>
            </div>

            <h1 className="font-outfit" style={{ fontSize: 'clamp(3.5rem, 6.5vw, 6.5rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 28, textShadow: '0 10px 30px rgba(0,0,0,0.8)' }}>
              Turning Ideas<br />Into Digital<br /><span className="text-neon">Experiences.</span>
            </h1>

            <p style={{ fontSize: 17, lineHeight: 1.7, color: '#aaa', maxWidth: 520, marginBottom: 44, fontWeight: 400, textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
              I'm <strong style={{ color: '#fff', fontWeight: 600 }}>Sagar</strong>, a Developer & Cloud Engineer passionate about building impactful applications that blend robust backend logic with sleek interfaces.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
              <a href="#projects" className="btn-primary" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                View My Work <ArrowUpRightIcon size={18} />
              </a>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, cursor: 'none' }} onClick={() => setShowVideoModal(true)} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: 'rgba(20,20,20,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transition: 'all 0.3s', backdropFilter: 'blur(8px)' }}>
                  <PlayIcon size={16} className="text-neon" />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>Watch Intro</div>
                  <div style={{ fontSize: 12, color: '#888' }}>( 1 min )</div>
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 80 }}>
              <a href={RESUME_DATA.socials.linkedin} target="_blank" rel="noreferrer" style={{ color: '#888', transition: 'color 0.2s', cursor: 'none' }} onMouseEnter={(e) => { setIsHovered(true); e.currentTarget.style.color = '#fff'; }} onMouseLeave={(e) => { setIsHovered(false); e.currentTarget.style.color = '#888'; }}><LinkedinIcon size={22} /></a>
              <a href={RESUME_DATA.socials.github} target="_blank" rel="noreferrer" style={{ color: '#888', transition: 'color 0.2s', cursor: 'none' }} onMouseEnter={(e) => { setIsHovered(true); e.currentTarget.style.color = '#fff'; }} onMouseLeave={(e) => { setIsHovered(false); e.currentTarget.style.color = '#888'; }}><GithubIcon size={22} /></a>
            </div>
          </div>
        </div>
      </section>

      {}
      <section style={{ borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'rgba(5,5,5,0.9)', padding: '40px 6vw', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 32, alignItems: 'center' }}>
          {RESUME_DATA.stats.map((stat, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span className="font-outfit text-neon" style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontWeight: 800 }}>{stat.number}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#777', textTransform: 'uppercase', letterSpacing: 1.5 }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {}
      <section id="quote" ref={quoteRef} className={`fade-up ${quoteInView ? 'visible' : ''}`} style={{ padding: '140px 6vw', display: 'flex', justifyContent: 'center', textAlign: 'center', backgroundColor: '#070707' }}>
        <div style={{ maxWidth: 1000 }}>
          <h2 className="font-outfit font-hero-quote" style={{ fontSize: 'clamp(3rem, 6.5vw, 6.5rem)', color: '#fff', lineHeight: 1.05, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
            Consistency Creates <span className="text-neon" style={{ WebkitTextStroke: '1px var(--neon-yellow)' }}>Freedom.</span><br/>
            Execution Creates <span className="text-neon">Impact.</span>
          </h2>
          <div style={{ marginTop: 40, fontSize: 12, letterSpacing: 3, color: '#555', textTransform: 'uppercase', fontWeight: 700 }}>— Operating Principle</div>
        </div>
      </section>

      {}
      <section id="skills" ref={skillsRef} className={`fade-up ${skillsInView ? 'visible' : ''}`} style={{ padding: '80px 6vw 120px', backgroundColor: '#070707' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.25em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 40, display: 'flex', alignItems: 'center', gap: 8 }}>
          TECHNOLOGY STACK <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--neon-yellow)' }}></span>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 16 }}>
          {RESUME_DATA.skills.map((skill, idx) => {
            const Logo = skill.logo;
            return (
              <div key={idx} style={{ padding: '24px 16px', backgroundColor: '#0c0c0c', border: '1px solid var(--border-subtle)', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, transition: 'all 0.4s ease' }} onMouseEnter={(e) => { setIsHovered(true); e.currentTarget.style.borderColor = 'rgba(204,255,0,0.3)'; e.currentTarget.style.backgroundColor = '#111'; e.currentTarget.style.transform = 'translateY(-4px)'; }} onMouseLeave={(e) => { setIsHovered(false); e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.backgroundColor = '#0c0c0c'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <Logo />
                <span style={{ fontSize: 13, fontWeight: 600, color: '#aaa' }}>{skill.name}</span>
              </div>
            );
          })}
        </div>
      </section>

      {}
      <section id="expertise" ref={servicesRef} className={`fade-up ${servicesInView ? 'visible' : ''}`} style={{ padding: '120px 6vw', backgroundColor: '#050505', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ marginBottom: 60 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.25em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 16 }}>DOMAINS OF EXPERTISE</div>
          <h2 className="font-outfit" style={{ fontSize: 'clamp(2.4rem, 4vw, 3.8rem)', fontWeight: 800 }}>What I <span className="text-neon">Do.</span></h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {RESUME_DATA.services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div key={idx} className="service-card" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <div className="icon-wrapper" style={{ marginBottom: 24 }}><Icon size={32} /></div>
                <h3 className="font-outfit" style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 16 }}>{service.title}</h3>
                <p style={{ fontSize: 15, color: '#888', lineHeight: 1.7 }}>{service.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {}
      <section id="experience" ref={experienceRef} className={`fade-up ${experienceInView ? 'visible' : ''}`} style={{ padding: '120px 6vw', backgroundColor: '#080808', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.25em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          PROFESSIONAL JOURNEY <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--neon-yellow)' }}></span>
        </div>
        <h2 className="font-outfit" style={{ fontSize: 'clamp(2.4rem, 4vw, 3.8rem)', fontWeight: 800, marginBottom: 80 }}>
          Where I've <span className="text-neon">Worked.</span>
        </h2>

        <div className="timeline-container">
          {RESUME_DATA.experience.map((exp, idx) => (
            <div key={idx} className="timeline-item" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              <div className="timeline-node"></div>
              <div className="timeline-content">
                <div style={{ fontSize: 13, color: 'var(--neon-yellow)', fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>{exp.date}</div>
                <h3 className="font-outfit" style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 800, color: '#fff', marginBottom: 4 }}>{exp.role}</h3>
                <div style={{ fontSize: 16, color: '#666', fontWeight: 500, marginBottom: 20 }}>{exp.company}</div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {exp.workflows.map((flow, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <span style={{ color: '#555', marginTop: 2 }}>▹</span>
                      <span style={{ fontSize: 15, color: '#aaa', lineHeight: 1.6 }}>{flow}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {}
      <section id="education" ref={educationRef} className={`fade-up ${educationInView ? 'visible' : ''}`} style={{ padding: '100px 6vw 120px', backgroundColor: '#080808' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.25em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 40, display: 'flex', alignItems: 'center', gap: 8 }}>
          ACADEMIC & CERTIFICATIONS <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--neon-yellow)' }}></span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {RESUME_DATA.education.map((edu, idx) => (
            <div key={idx} style={{ padding: '32px', backgroundColor: '#0c0c0c', border: '1px solid var(--border-subtle)', borderRadius: 20 }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              <div style={{ color: 'var(--neon-yellow)', marginBottom: 20 }}><BookIcon size={28} /></div>
              <h3 className="font-outfit" style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{edu.degree}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#777', fontSize: 14, fontWeight: 600, marginBottom: 16 }}>
                <span>{edu.institution}</span>
                <span>{edu.date}</span>
              </div>
              <p style={{ fontSize: 14, color: '#999', lineHeight: 1.6 }}>{edu.details}</p>
            </div>
          ))}
        </div>
      </section>

      {}
      <section id="projects" ref={projectsRef} className={`fade-up ${projectsInView ? 'visible' : ''}`} style={{ padding: '120px 6vw', backgroundColor: '#050505', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 60, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.25em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              FEATURED WORK <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--neon-yellow)' }}></span>
            </div>
            <h2 className="font-outfit" style={{ fontSize: 'clamp(2.4rem, 4vw, 4rem)', fontWeight: 800, lineHeight: 1.1 }}>
              Ideas In <span className="text-neon">Action.</span>
            </h2>
          </div>
          <a href={RESUME_DATA.socials.github} target="_blank" rel="noreferrer" className="nav-pill" style={{ color: '#fff', textDecoration: 'none', padding: '10px 24px', fontSize: 13, fontWeight: 600, display: 'flex', gap: 8, cursor: 'none' }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            View GitHub <GithubIcon size={16} />
          </a>
        </div>

        <div className="project-grid">
          {RESUME_DATA.projects.map((project, idx) => {
            return (
              <div key={idx} className="project-card" style={project.size === 'medium' ? { gridColumn: 'span 6' } : { gridColumn: 'span 12' }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                    <div className="font-outfit" style={{ fontSize: project.size === 'medium' ? 26 : 34, fontWeight: 800, color: '#fff' }}>{project.title}</div>
                    <a href={project.link} style={{ color: 'var(--text-muted)', cursor: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--neon-yellow)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}><ExternalLinkIcon size={22} /></a>
                  </div>
                  <p style={{ fontSize: 15, color: '#888', lineHeight: 1.6, maxWidth: project.size === 'medium' ? '100%' : '60%' }}>{project.tagline}</p>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 40 }}>
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} style={{ fontSize: 11, fontWeight: 600, backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '6px 14px', borderRadius: 20, color: '#bbb', letterSpacing: 0.5 }}>{tag}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {}
      <section id="contact" ref={contactRef} className={`fade-up ${contactInView ? 'visible' : ''}`} style={{ padding: '140px 6vw 100px', textAlign: 'center', backgroundColor: '#070707' }}>
        <h2 className="font-outfit" style={{ fontSize: 'clamp(2.6rem, 5.5vw, 5.2rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: 40 }}>
          Have an Idea?<br /><span className="text-neon">Let's Make It Happen.</span>
        </h2>
        <a href={createMailto()} className="btn-primary" style={{ padding: '18px 44px', fontSize: 16 }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          Start a Conversation <SendIcon size={18} />
        </a>
      </section>

      {}
      <footer style={{ borderTop: '1px solid var(--border-subtle)', padding: '40px 6vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24, backgroundColor: '#050505', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a href="#home" style={{ textDecoration: 'none', color: '#fff', display: 'flex', alignItems: 'center', gap: 6, cursor: 'none' }}>
            <span className="font-outfit" style={{ fontSize: 20, fontWeight: 900, letterSpacing: 2 }}>SAGAR</span>
            <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: 'var(--neon-yellow)' }}></span>
          </a>
          <span style={{ color: '#333' }}>|</span><span style={{ fontSize: 13, color: '#777', fontWeight: 500 }}>Developer &nbsp;|&nbsp; Creator</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, color: '#888' }}>
          <a href={RESUME_DATA.socials.linkedin} target="_blank" rel="noreferrer" style={{ color: 'inherit', transition: 'color 0.2s', cursor: 'none' }} onMouseEnter={(e) => { setIsHovered(true); e.currentTarget.style.color = '#fff'; }} onMouseLeave={(e) => { setIsHovered(false); e.currentTarget.style.color = '#888'; }}><LinkedinIcon size={20} /></a>
          <a href={RESUME_DATA.socials.github} target="_blank" rel="noreferrer" style={{ color: 'inherit', transition: 'color 0.2s', cursor: 'none' }} onMouseEnter={(e) => { setIsHovered(true); e.currentTarget.style.color = '#fff'; }} onMouseLeave={(e) => { setIsHovered(false); e.currentTarget.style.color = '#888'; }}><GithubIcon size={20} /></a>
        </div>
      </footer>

      {}
      {showVideoModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(5,5,5,0.9)', backdropFilter: 'blur(12px)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }} onClick={() => setShowVideoModal(false)}>
          <div style={{ maxWidth: 580, width: '100%', padding: '40px', backgroundColor: '#111', border: '1px solid var(--border-subtle)', borderRadius: 28, textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ color: 'var(--neon-yellow)', marginBottom: 16, display: 'flex', justifyContent: 'center' }}><PlayIcon size={36} /></div>
            <h3 className="font-outfit" style={{ fontSize: 28, fontWeight: 800, color: '#fff', marginBottom: 16 }}>About Sagar Gowda G</h3>
            <p style={{ color: '#aaa', fontSize: 15, lineHeight: 1.7, marginBottom: 32 }}>"I build scalable cloud architectures, full-stack applications, and specialized local AI solutions. Driven by robust engineering and solving real-world challenges."</p>
            <button onClick={() => setShowVideoModal(false)} className="btn-primary" style={{ padding: '12px 32px' }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>Close Overview</button>
          </div>
        </div>
      )}
    </div>
  );
}