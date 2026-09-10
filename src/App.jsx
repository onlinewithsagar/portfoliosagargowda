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

// --- ACCURATE BRAND LOGOS ---
const BrandLogos = {
  python: ({ size = 32 }) => <svg viewBox="0 0 110 110" width={size} height={size}><path fill="#3776AB" d="M53.8 3.5C25.5 3.5 21.6 15.8 21.6 15.8l-.1 12.2h33v4.6H17.8s-15.3-2-15.3 22.8c0 24.1 13.5 23.3 13.5 23.3h7.2v-11s-.2-12.8 12.6-12.8h21.1s11.5-.4 11.5-11.2V20.5s1.2-17-14.6-17zm-14.7 7.7c2.6 0 4.7 2.1 4.7 4.7 0 2.6-2.1 4.7-4.7 4.7-2.6 0-4.7-2.1-4.7-4.7 0-2.6 2.1-4.7 4.7-4.7z"/><path fill="#FFD43B" d="M55.8 106.5c28.3 0 32.2-12.3 32.2-12.3l.1-12.2H55.1v-4.6h36.7s15.3 2 15.3-22.8c0-24.1-13.5-23.3-13.5-23.3h-7.2v11s.2 12.8-12.6 12.8H52.7s-11.5.4-11.5 11.2v23.2s-1.2 17 14.6 17zm14.7-7.7c-2.6 0-4.7-2.1-4.7-4.7 0-2.6 2.1-4.7 4.7-4.7 2.6 0 4.7 2.1 4.7 4.7 0 2.6-2.1 4.7-4.7 4.7z"/></svg>,
  javascript: ({ size = 32 }) => <div style={{ backgroundColor: '#F7DF1E', color: '#000', fontWeight: 900, width: size, height: size, borderRadius: 4, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', padding: '10%', fontSize: size * 0.45, lineHeight: 1 }}>JS</div>,
  react: ({ size = 32 }) => <svg viewBox="0 0 32 32" width={size} height={size}><circle cx="16" cy="16" r="2.8" fill="#61DAFB" /><g stroke="#61DAFB" strokeWidth="1.5" fill="none"><ellipse cx="16" cy="16" rx="13" ry="5" /><ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(60 16 16)" /><ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(120 16 16)" /></g></svg>,
  nodejs: ({ size = 32 }) => <svg viewBox="0 0 32 32" width={size} height={size} fill="#339933"><path d="M16 2l12 6.9v14.2L16 30 4 23.1V8.9L16 2zm0 3.2L6.8 9.5v11.8L16 26.6l9.2-5.3V9.5L16 5.2z"/><path d="M15 11h2v10h-2z" fill="#FFF"/></svg>,
  
  // Sleek CurrentColor mapped AWS Logo
  aws: ({ size = 32 }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M13.25 15.65c-2.61.9-5.74 1.42-8.91 1.42-1.54 0-3.04-.1-4.34-.28.18 1.15 1.25 1.95 2.66 1.95 3.32 0 6.64-.6 9.49-1.68l1.1-1.41zM24 15.82c-1.32.99-2.91 1.4-4.52 1.4-.76 0-1.5-.13-2.23-.37l.79-1.28c.61.18 1.25.28 1.89.28 1.07 0 2.05-.28 2.87-.78L24 15.82zm-9.05-1.5c.59-1.28 1.1-2.63 1.49-4l1.46-.43c-.43 1.51-.99 2.99-1.66 4.42l-1.29.01zm-8.83-6.68L4.54 2.83H2.84L1.26 7.64 0 2.83H-1.55l2.06 6.78h1.72l1.49-4.34 1.49 4.34h1.72l2.06-6.78H7.4l-1.23 4.81zm6.06-4.81h-3.66v1.38h2.25v1.27h-2.25v1.44h3.77v1.31h-5.31V2.83h5.19v1.38z" />
    </svg>
  ),
  
  mongodb: ({ size = 32 }) => <svg viewBox="0 0 32 32" width={size} height={size} fill="#47A248"><path d="M16 2s-7 6.5-7 14.5c0 6.2 5 9.7 7 13.5 2-3.8 7-7.3 7-13.5C23 8.5 16 2 16 2zm.3 23.5v-9.2c0-.5.4-.9.9-.9.4 0 .8.3.9.7.2 2 1.3 4.8 1.9 6.2-1.2 1.3-2.5 2.5-3.7 3.2z"/></svg>,
  html: ({ size = 32 }) => <svg viewBox="0 0 32 32" width={size} height={size}><path fill="#E34F26" d="M6 3l2.2 24.3L16 30l7.8-2.7L26 3H6z"/><path fill="#EF652A" d="M16 27.9l6.3-2.2 1.8-20.2H16v22.4z"/><path fill="#ECECEC" d="M16 8.3h-5.4l.4 4.5H16V8.3zm0 7.8h-3.2l-.2-2.5h-2.4l.5 5.8H16v-3.3zm0 7.2l-.1.1-2.8-.8-.2-2h-2.5l.3 3.6 5.3 1.5v-2.4z"/><path fill="#FFFFFF" d="M16 8.3v4.5h5.1l-.4 4.5H16v3.3h3.2l-.3 3.4-2.9.8v2.4l5.3-1.5.7-8h-6z"/></svg>,
  css: ({ size = 32 }) => <svg viewBox="0 0 32 32" width={size} height={size}><path fill="#1572B6" d="M6 3l2.2 24.3L16 30l7.8-2.7L26 3H6z"/><path fill="#33A9DC" d="M16 27.9l6.3-2.2 1.8-20.2H16v22.4z"/><path fill="#ECECEC" d="M16 8.3h-5.4l.4 4.5H16V8.3zm0 7.8h-3.2l-.2-2.5h-2.4l.5 5.8H16v-3.3zm0 7.2l-.1.1-2.8-.8-.2-2h-2.5l.3 3.6 5.3 1.5v-2.4z"/><path fill="#FFFFFF" d="M16 8.3v4.5h5.1l-.4 4.5H16v3.3h3.2l-.3 3.4-2.9.8v2.4l5.3-1.5.7-8h-6z"/></svg>,
  tailwind: ({ size = 32 }) => <svg viewBox="0 0 32 32" width={size} height={size} fill="#38BDF8"><path d="M16 9c-4.4 0-6.9 2.2-7.5 6.6 1.6-2.2 3.5-3 5.7-2.4 1.3.3 2.1 1.2 3.1 2.2C19 17 21 19 25 19c4.4 0 6.9-2.2 7.5-6.6-1.6 2.2-3.5 3-5.7 2.4-1.3-.3-2.1-1.2-3.1-2.2C22 11 20 9 16 9zm-9 10c-4.4 0-6.9 2.2-7.5 6.6 1.6-2.2 3.5-3 5.7-2.4 1.3.3 2.1 1.2 3.1 2.2C10 27 12 29 16 29c4.4 0 6.9-2.2 7.5-6.6-1.6 2.2-3.5 3-5.7 2.4-1.3-.3-2.1-1.2-3.1-2.2C13 21 11 19 7 19z"/></svg>,
  firebase: ({ size = 32 }) => <svg viewBox="0 0 24 24" width={size} height={size}><path fill="#FFA000" d="M3.26 16.33L1 12l9.64-9.64z"/><path fill="#F57C00" d="M1 12l2.26 4.33L11.5 5.5z"/><path fill="#FFCA28" d="M11.5 5.5l11.4 11.4-8.8 8.8c-.8.8-2 .8-2.8 0l-8.06-9.37z"/><path fill="#FFF" d="M11.5 5.5L14 8l-2.5 2.5-2.5-2.5z" opacity=".2"/></svg>,
  supabase: ({ size = 32 }) => <svg viewBox="0 0 24 24" width={size} height={size} fill="#3ECF8E"><path d="M12 22.8c-1.3 0-2.4-1.1-2.4-2.4v-7.2H4.8C3.5 13.2 2.4 12.1 2.4 10.8c0-.6.2-1.2.6-1.7l7.2-7.2c.9-.9 2.4-.9 3.3 0 .4.5.6 1.1.6 1.7v7.2h4.8c1.3 0 2.4 1.1 2.4 2.4 0 .6-.2 1.2-.6 1.7l-7.2 7.2c-.5.4-1.1.7-1.5.7zM7.2 10.8h4.8V4.8L4.8 10.8h2.4zm9.6 2.4h-4.8v6l7.2-6h-2.4z"/></svg>,
  fastapi: ({ size = 32 }) => <svg viewBox="0 0 24 24" width={size} height={size} fill="#009688"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>,
  ollama: ({ size = 32 }) => <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/></svg>,
  nextjs: ({ size = 32 }) => <svg viewBox="0 0 24 24" width={size} height={size} fill="#FFF"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-1.07-6.857V9.43l5.59 7.72c-.445.318-.934.58-1.455.776l-4.135-5.714v5.405h-1.396V9.43h1.396z"/></svg>,
  sqlite: ({ size = 32 }) => <svg viewBox="0 0 24 24" width={size} height={size} fill="#003B57"><path d="M12 2C6.48 2 2 4.24 2 7v10c0 2.76 4.48 5 10 5s10-2.24 10-5V7c0-2.76-4.48-5-10-5zm0 3c4.42 0 8 1.34 8 3s-3.58 3-8 3-8-1.34-8-3 3.58-3 8-3zm0 15c-4.42 0-8-1.34-8-3v-2.3c2.05 1.44 5 2.3 8 2.3s5.95-.86 8-2.3V17c0 1.66-3.58 3-8 3zm0-5c-4.42 0-8-1.34-8-3v-2.3c2.05 1.44 5 2.3 8 2.3s5.95-.86 8-2.3V12c0 1.66-3.58 3-8 3z" fill="#003B57"/></svg>,
  mysql: ({ size = 32 }) => <svg viewBox="0 0 24 24" width={size} height={size} fill="#4479A1"><path d="M12 2C6.48 2 2 4.24 2 7v10c0 2.76 4.48 5 10 5s10-2.24 10-5V7c0-2.76-4.48-5-10-5zm0 3c4.42 0 8 1.34 8 3s-3.58 3-8 3-8-1.34-8-3 3.58-3 8-3zm0 15c-4.42 0-8-1.34-8-3v-2.3c2.05 1.44 5 2.3 8 2.3s5.95-.86 8-2.3V17c0 1.66-3.58 3-8 3z"/></svg>,
  stripe: ({ size = 32 }) => <svg viewBox="0 0 24 24" width={size} height={size} fill="#635BFF"><path d="M11.988 2C6.47 2 2 6.47 2 11.988 2 17.505 6.47 21.975 11.988 21.975c5.518 0 9.988-4.47 9.988-9.987C21.975 6.47 17.505 2 11.988 2zm4.512 14.542c-1.373.916-3.418 1.055-5.076 1.055-3.348 0-5.83-1.688-5.83-5.26 0-3.467 2.724-5.364 6.27-5.364 1.776 0 3.327.382 4.544 1.026l-1.025 2.915c-1.025-.563-2.193-.844-3.468-.844-1.307 0-2.272.563-2.272 1.628 0 1.025 1.005 1.306 2.392 1.688 2.754.743 5.488 1.386 5.488 4.633 0 1.628-.864 3.195-2.613 3.92z"/></svg>,
  openrouter: ({ size = 32 }) => <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="#fff" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
};

const getTagLogo = (tagName) => {
  const key = tagName.toLowerCase().replace('.', '').replace(' ', '');
  return BrandLogos[key] || null;
};

// --- DATA SOURCE ---
const RESUME_DATA = {
  name: "SAGAR GOWDA",
  email: "onlinewithsagar@gmail.com",
  socials: {
    linkedin: "www.linkedin.com/in/onlinewithsagar",
    github: "https://github.com/onlinewithsagar"
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
        "Working across frontend interfaces, APIs, databases, and deployment workflows."
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
  leadership: [
    {
      title: "StemX Mentorship Program",
      desc: "Contributed to planning and coordination discussions for upcoming mentorship initiatives, including session structure and execution planning."
    },
    {
      title: "Client Collaboration",
      desc: "Experienced in requirement gathering, scope discussions, pricing considerations, and translating business needs into technical solutions."
    },
    {
      title: "Project Strategy",
      desc: "Worked on academic and independent software projects involving architecture planning, implementation, testing, and iterative development."
    }
  ],
  education: [
    {
      degree: "Bachelor of Computer Applications",
      institution: "SSMRV College",
      date: "2023 - 2026",
      details: "CGPA: 7.47/10. Academic focus on software development, databases, cloud computing, and artificial intelligence."
    },
    {
      degree: "Cloud & Systems Certifications",
      institution: "ZoomInData & Professional Training",
      date: "Completed",
      details: "Implementation of Cloud Solution • Data Center & Cloud Technology • SDLC."
    }
  ],
  projects: [
    {
      title: "SmartAttend",
      tagline: "A free digital attendance system automating modern institutional workflows.",
      tags: ["React", "Nodejs", "MongoDB"],
      link: "#",
      size: "large" 
    },
    {
      title: "HandsFreeStudio",
      tagline: "A creative digital studio platform for brands to grow their digital footprint.",
      tags: ["Nextjs", "Tailwind", "Firebase"],
      link: "#",
      size: "medium" 
    },
    {
      title: "StemX",
      tagline: "An interactive platform designed to connect, learn and grow with industry mentors.",
      tags: ["React", "Firebase", "Stripe"],
      link: "#",
      size: "medium"
    },
    {
      title: "EVE Intelligent AI",
      tagline: "Privacy-first local AI assistant with voice recognition & dynamic LLM routing.",
      tags: ["Python", "FastAPI", "Ollama", "SQLite"],
      link: "#",
      size: "large"
    },
    {
      title: "AI Code Review Tool",
      tagline: "Source code analysis pipeline generating automated quality recommendations.",
      tags: ["Python", "Supabase", "OpenRouter"],
      link: "#",
      size: "medium"
    },
    {
      title: "Emergency Vehicle Assist",
      tagline: "Location-based web platform connecting users with nearby mechanics instantly.",
      tags: ["MySQL", "Javascript", "HTML"],
      link: "#",
      size: "medium"
    }
  ],
  skills: [
    { name: "Python", key: "python" },
    { name: "JavaScript", key: "javascript" },
    { name: "React", key: "react" },
    { name: "Node.js", key: "nodejs" },
    { name: "AWS", key: "aws" },
    { name: "MongoDB", key: "mongodb" },
    { name: "HTML5", key: "html" },
    { name: "CSS3", key: "css" },
    { name: "Tailwind", key: "tailwind" },
    { name: "Firebase", key: "firebase" },
    { name: "Supabase", key: "supabase" },
    { name: "FastAPI", key: "fastapi" },
  ]
};

const createMailto = () => {
  const subject = encodeURIComponent("Project Inquiry / Collaboration Request");
  const body = encodeURIComponent(
    "Hi Sagar,\n\nI recently came across your portfolio and was impressed by your work and technical approach. I am reaching out because I would love to connect and discuss a potential opportunity or collaboration.\n\nLooking forward to hearing from you!\n\nBest regards,\n[Your Name/Company]"
  );
  return `mailto:${RESUME_DATA.email}?subject=${subject}&body=${body}`;
};

// Intersection Observer Hook for Scroll Animations
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

// Highly customized slow, resetting counter
const AnimatedCounter = ({ value, label }) => {
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: false });
  const [count, setCount] = useState(0);
  
  const isInfinity = value === "∞";
  const numericTarget = parseInt(value.replace(/\D/g, '')) || 0; 
  const suffix = value.replace(/\d/g, '');

  useEffect(() => {
    let animId;
    if (inView && !isInfinity && numericTarget > 0) {
      let startTime = null;
      const duration = 3000; // Slower, dramatic 3-second build

      const updateCount = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const easeProgress = progress === duration ? 1 : 1 - Math.pow(2, -10 * (progress / duration));
        
        if (progress < duration) {
          setCount(Math.floor(easeProgress * numericTarget));
          animId = requestAnimationFrame(updateCount);
        } else {
          setCount(numericTarget);
        }
      };
      animId = requestAnimationFrame(updateCount);
    } else if (!inView) {
      // Instantly resets to zero when scrolled away so it triggers perfectly again
      setCount(0);
    }
    
    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [inView, isInfinity, numericTarget]);

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span className="font-outfit text-neon" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 900, lineHeight: 1 }}>
        {isInfinity ? '∞' : `${count}${suffix}`}
      </span>
      <span style={{ fontSize: 12, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: 2 }}>{label}</span>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorTrailing, setCursorTrailing] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loaderVisible, setLoaderVisible] = useState(true);

  useEffect(() => {
    if (loaderVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    let progressTimer;
    if (isAppLoading) {
      if (loadingProgress < 100) {
        progressTimer = setTimeout(() => {
          const increment = Math.floor(Math.random() * 25) + 15;
          const next = prev => (prev + increment > 100 ? 100 : prev + increment);
          setLoadingProgress(next);
        }, 80);
      } else {
        setTimeout(() => setIsAppLoading(false), 300);
        setTimeout(() => setLoaderVisible(false), 900);
      }
    }
    return () => clearTimeout(progressTimer);
  }, [loadingProgress, isAppLoading, loaderVisible]);

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
        return { x: prev.x + dx * 0.15, y: prev.y + dy * 0.15 };
      });
      if (isMoving) animId = requestAnimationFrame(updateTrailingCursor);
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [cursorPos]);

  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [quoteRef, quoteInView] = useInView({ threshold: 0.15, triggerOnce: true });
  const [skillsRef, skillsInView] = useInView({ threshold: 0.15, triggerOnce: true });
  const [servicesRef, servicesInView] = useInView({ threshold: 0.15, triggerOnce: true });
  const [experienceRef, experienceInView] = useInView({ threshold: 0.15, triggerOnce: true });
  const [leadershipRef, leadershipInView] = useInView({ threshold: 0.15, triggerOnce: true });
  const [educationRef, educationInView] = useInView({ threshold: 0.15, triggerOnce: true });
  const [projectsRef, projectsInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [contactRef, contactInView] = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <div style={{ backgroundColor: '#050505', color: '#ffffff', minHeight: '100vh', overflowX: 'hidden' }}>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;600;700;800;900&display=swap');

        :root {
          --neon-yellow: #ccff00;
          --bg-dark: #050505;
          --text-muted: #888888;
          --border-subtle: rgba(255, 255, 255, 0.08);
          --glass-bg: rgba(20, 20, 20, 0.4);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        html { 
          scroll-behavior: smooth; 
        }
        body { 
          font-family: 'Inter', -apple-system, sans-serif; cursor: none; background: var(--bg-dark); 
        }
        
        /* Ultra-Premium Thin Glowing Scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #020202; border-left: 1px solid rgba(255,255,255,0.02); }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 20px; transition: background 0.3s; }
        ::-webkit-scrollbar-thumb:hover { background: var(--neon-yellow); box-shadow: 0 0 10px var(--neon-yellow); }

        .font-outfit { font-family: 'Outfit', sans-serif; }
        .font-script { font-family: 'Caveat', cursive; }
        .text-neon { color: var(--neon-yellow); text-shadow: 0 0 15px rgba(204,255,0,0.25); }

        /* Custom Cursor */
        .cursor-dot { position: fixed; width: 6px; height: 6px; background-color: var(--neon-yellow); border-radius: 50%; pointer-events: none; z-index: 99999; transform: translate(-50%, -50%); }
        .cursor-ring { position: fixed; width: 28px; height: 28px; border: 1px solid rgba(204, 255, 0, 0.4); border-radius: 50%; pointer-events: none; z-index: 99998; transform: translate(-50%, -50%); transition: width 0.2s, height 0.2s, background-color 0.2s; }
        .cursor-hovered { width: 44px; height: 44px; background-color: rgba(204, 255, 0, 0.1); border-color: var(--neon-yellow); }

        .hero-img-container { position: absolute; top: 0; right: 0; width: 65vw; height: 100vh; z-index: 0; overflow: hidden; }
        .hero-cinematic-img { width: 100%; height: 100%; object-fit: cover; object-position: 70% center; opacity: 0.95; filter: contrast(1.1) brightness(0.9); }
        .hero-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(90deg, var(--bg-dark) 0%, rgba(5,5,5,0.95) 25%, rgba(5,5,5,0.2) 65%, transparent 100%),
                      linear-gradient(0deg, var(--bg-dark) 0%, rgba(5,5,5,0.8) 15%, transparent 40%);
        }

        .nav-pill { background: rgba(15, 15, 15, 0.6); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid var(--border-subtle); border-radius: 40px; }

        .btn-primary {
          background-color: var(--neon-yellow); color: #000; padding: 14px 32px; border-radius: 40px; font-size: 14px; font-weight: 700; display: inline-flex; align-items: center; gap: 8px; transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, background-color 0.3s ease; text-decoration: none; cursor: none;
        }
        .btn-primary:hover { transform: translateY(-3px) scale(1.02); background-color: #fff; box-shadow: 0 15px 30px rgba(204, 255, 0, 0.25); }
        
        .expertise-row {
          border-bottom: 1px solid var(--border-subtle);
          padding: 40px 0; display: grid; grid-template-columns: 60px 1fr 2fr 60px;
          align-items: center; transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: none; position: relative;
        }
        .expertise-row::before {
          content: ''; position: absolute; left: -20px; top: 0; bottom: 0; width: 0;
          background: linear-gradient(90deg, rgba(204,255,0,0.05), transparent); transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1); z-index: -1;
        }
        .expertise-row:hover { padding-left: 20px; border-bottom-color: var(--neon-yellow); }
        .expertise-row:hover::before { width: calc(100% + 40px); }
        .expertise-row:hover .exp-title { color: var(--neon-yellow); }
        .expertise-row:hover .exp-icon { transform: scale(1.15) rotate(5deg); color: var(--neon-yellow); }

        .timeline-container { position: relative; padding-left: 32px; }
        .timeline-container::before { content: ''; position: absolute; left: 6px; top: 8px; bottom: 0; width: 1px; background: var(--border-subtle); }
        .timeline-item { position: relative; margin-bottom: 56px; }
        .timeline-node { position: absolute; left: -32px; top: 6px; width: 13px; height: 13px; border-radius: 50%; background: var(--bg-dark); border: 2px solid #444; transition: all 0.4s ease; z-index: 2; }
        .timeline-item:hover .timeline-node { background: var(--neon-yellow); border-color: var(--neon-yellow); box-shadow: 0 0 20px rgba(204,255,0,0.5); }
        .timeline-content { transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .timeline-item:hover .timeline-content { transform: translateX(12px); }

        /* Pure Text / Ribbon Marquee with Peak Tilt */
        @keyframes scrollMarquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .marquee-container {
          transform: rotate(-2.5deg) scale(1.05); /* Peak Design Tilt */
          background: #000;
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
          padding: 24px 0;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0,0,0,0.8);
          z-index: 20;
          position: relative;
        }
        .marquee-wrapper { 
          white-space: nowrap; width: 100%; display: flex; 
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent); 
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent); 
        }
        .marquee-content { display: inline-flex; animation: scrollMarquee 25s linear infinite; gap: 60px; align-items: center; }
        .marquee-content:hover { animation-play-state: paused; }
        .skill-item {
          display: flex; align-items: center; gap: 16px;
          font-family: 'Inter', sans-serif;
          font-size: 22px;
          font-weight: 600;
          color: #fff;
          transition: all 0.3s ease;
        }
        .skill-item:hover { color: var(--neon-yellow); }
        .skill-item:hover .skill-logo-wrapper {
          transform: scale(1.15) rotate(5deg);
          filter: drop-shadow(0 0 10px rgba(204,255,0,0.4));
        }

        /* Senior Editorial Leadership Cards */
        .leadership-card {
          display: flex; gap: 24px; padding: 40px; 
          background: #070707; border: 1px solid var(--border-subtle);
          border-radius: 24px; transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .leadership-card:hover {
          border-color: rgba(204,255,0,0.4); background: #0a0a0a;
          box-shadow: 0 20px 40px rgba(0,0,0,0.8);
          transform: translateY(-5px);
        }
        .leadership-number {
          font-size: 3rem; font-weight: 900; color: rgba(255,255,255,0.05);
          line-height: 1; font-family: 'Outfit', sans-serif;
          transition: color 0.4s ease; margin-top: -4px;
        }
        .leadership-card:hover .leadership-number { color: var(--neon-yellow); }

        /* Premium Academics Architecture */
        .academics-card {
          background: rgba(10, 10, 10, 0.8); border: 1px solid rgba(255,255,255,0.05);
          border-radius: 24px; padding: 40px; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between;
        }
        .academics-card:hover {
          background: rgba(15, 15, 15, 1); border-color: rgba(204,255,0,0.4);
          transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.8);
        }
        .academics-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, var(--neon-yellow), transparent);
          opacity: 0; transition: opacity 0.4s ease;
        }
        .academics-card:hover::before { opacity: 1; }

        .project-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 24px; }
        .project-card {
          background: #090909; border: 1px solid var(--border-subtle); border-radius: 28px; padding: 40px;
          display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden; transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.5s ease;
        }
        .project-card:hover { transform: translateY(-6px); border-color: rgba(204,255,0,0.4); box-shadow: 0 20px 40px rgba(0,0,0,0.8), inset 0 0 40px rgba(204,255,0,0.02); }
        .project-card::before {
          content: ''; position: absolute; top: 0; right: 0; width: 250px; height: 250px;
          background: radial-gradient(circle at top right, rgba(204,255,0,0.06), transparent 70%); pointer-events: none;
        }

        /* Butter Smooth Fade-Up Animations */
        .fade-up { opacity: 0; transform: translateY(50px); transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1); }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
        
        @media (max-width: 1024px) {
          .hero-img-container { width: 100%; }
          .hero-img-overlay {
            background: linear-gradient(90deg, var(--bg-dark) 0%, rgba(5,5,5,0.9) 40%, rgba(5,5,5,0.6) 80%, transparent 100%),
                        linear-gradient(0deg, var(--bg-dark) 0%, rgba(5,5,5,0.8) 20%, transparent 40%);
          }
          .hide-on-mobile { display: none !important; }
          .project-grid { display: flex; flex-direction: column; }
          .expertise-row { grid-template-columns: 1fr; gap: 16px; padding: 32px 0; }
          .expertise-row .exp-icon { display: none; }
          .marquee-container { transform: rotate(-1.5deg) scale(1.05); }
          .leadership-card { flex-direction: column; gap: 16px; padding: 32px; }
          .leadership-number { font-size: 2.5rem; }
        }
      `}</style>

      {/* Custom Trailing Cursor Render */}
      <div className="cursor-dot" style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }} />
      <div className={`cursor-ring ${isHovered ? 'cursor-hovered' : ''}`} style={{ left: `${cursorTrailing.x}px`, top: `${cursorTrailing.y}px` }} />

      {}
      {loaderVisible && (
        <div style={{
          position: 'fixed', inset: 0, backgroundColor: 'var(--bg-dark)', zIndex: 99990,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          opacity: isAppLoading ? 1 : 0, transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none'
        }}>
          <div className="font-outfit" style={{ fontSize: 'clamp(4rem, 8vw, 7rem)', fontWeight: 900, color: '#fff', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            {loadingProgress}<span style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--neon-yellow)' }}>%</span>
          </div>
          <div style={{ width: '240px', height: '2px', backgroundColor: '#222', marginTop: '24px', overflow: 'hidden', borderRadius: '2px' }}>
            <div style={{ width: `${loadingProgress}%`, height: '100%', backgroundColor: 'var(--neon-yellow)', transition: 'width 0.1s ease-out' }} />
          </div>
          <div className="font-outfit" style={{ marginTop: '28px', fontSize: '12px', letterSpacing: '0.4em', color: '#666', textTransform: 'uppercase', fontWeight: 700 }}>
            {loadingProgress === 100 ? 'System Ready' : 'Initializing Core Protocols'}
          </div>
        </div>
      )}

      {}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999, padding: '24px 6vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between', pointerEvents: 'none' }}>
        <a href="#home" style={{ textDecoration: 'none', color: '#fff', display: 'flex', alignItems: 'center', gap: 8, cursor: 'none', pointerEvents: 'auto' }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <span className="font-outfit" style={{ fontSize: 24, fontWeight: 900, letterSpacing: 2 }}>SAGAR GOWDA</span>
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
          <img src="profilepic.png" alt="Sagar Gowda" className="hero-cinematic-img" 
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=2000&auto=format&fit=crop"; }} 
          />
          <div className="hero-img-overlay"></div>
        </div>

        <div className={`fade-up ${heroInView ? 'visible' : ''}`} style={{ position: 'relative', zIndex: 10, width: '100%', padding: '140px 6vw 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transitionDelay: '0.1s' }}>
          
          <div style={{ maxWidth: 700 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.3em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span>BUILD</span><span className="text-neon">/</span><span>CREATE</span><span className="text-neon">/</span><span>SOLVE</span>
            </div>

            <h1 className="font-outfit" style={{ fontSize: 'clamp(3.8rem, 7vw, 7rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 28, textShadow: '0 10px 30px rgba(0,0,0,0.8)' }}>
              Turning Ideas<br />Into Digital<br /><span className="text-neon">Experiences.</span>
            </h1>

            <p style={{ fontSize: 17, lineHeight: 1.7, color: '#aaa', maxWidth: 520, marginBottom: 44, fontWeight: 400, textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
              I'm <strong style={{ color: '#fff', fontWeight: 600 }}>Sagar Gowda</strong>, a Developer & Cloud Engineer passionate about building impactful applications that blend robust backend logic with sleek interfaces.
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
              <a href={`https://${RESUME_DATA.socials.linkedin.replace(/^(https?:\/\/)?(www\.)?/, '')}`} target="_blank" rel="noreferrer" style={{ color: '#888', transition: 'all 0.3s ease', cursor: 'none' }} onMouseEnter={(e) => { setIsHovered(true); e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'scale(1.1)'; }} onMouseLeave={(e) => { setIsHovered(false); e.currentTarget.style.color = '#888'; e.currentTarget.style.transform = 'scale(1)'; }}><LinkedinIcon size={24} /></a>
              <a href={RESUME_DATA.socials.github} target="_blank" rel="noreferrer" style={{ color: '#888', transition: 'all 0.3s ease', cursor: 'none' }} onMouseEnter={(e) => { setIsHovered(true); e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'scale(1.1)'; }} onMouseLeave={(e) => { setIsHovered(false); e.currentTarget.style.color = '#888'; e.currentTarget.style.transform = 'scale(1)'; }}><GithubIcon size={24} /></a>
            </div>
          </div>
        </div>
      </section>

      {}
      <section style={{ borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'rgba(5,5,5,1)', padding: '50px 6vw', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, alignItems: 'center' }}>
          {RESUME_DATA.stats.map((stat, idx) => (
            <AnimatedCounter key={idx} value={stat.number} label={stat.label} />
          ))}
        </div>
      </section>

      {}
      <section id="quote" ref={quoteRef} className={`fade-up ${quoteInView ? 'visible' : ''}`} style={{ padding: '140px 6vw', display: 'flex', justifyContent: 'center', textAlign: 'center', backgroundColor: '#070707' }}>
        <div style={{ maxWidth: 900 }}>
          <div className="font-script" style={{ fontSize: 'clamp(3.5rem, 6.5vw, 5.5rem)', color: '#fff', transform: 'rotate(-2deg)', lineHeight: 1.1 }}>
            "Consistency Creates Freedom."<br/>
            <span style={{ color: 'var(--neon-yellow)' }}>Execution Creates Impact.</span>
          </div>
          <div style={{ marginTop: 40, fontSize: 12, letterSpacing: 4, color: '#555', textTransform: 'uppercase', fontWeight: 700, fontFamily: 'Inter' }}>— Operating Principle</div>
        </div>
      </section>

      {}
      <section id="skills" ref={skillsRef} className={`fade-up ${skillsInView ? 'visible' : ''}`} style={{ backgroundColor: '#070707', paddingBottom: '120px' }}>
        <div className="marquee-container">
          <div className="marquee-wrapper">
            <div className="marquee-content">
              {[...RESUME_DATA.skills, ...RESUME_DATA.skills, ...RESUME_DATA.skills].map((skill, idx) => {
                const LogoComp = BrandLogos[skill.key];
                return (
                  <div key={idx} className="skill-item" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                    {LogoComp && (
                      <span className="skill-logo-wrapper" style={{ color: '#aaa', transition: 'all 0.4s ease', display: 'flex', alignItems: 'center' }}>
                        <LogoComp size={36} />
                      </span>
                    )}
                    {skill.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {}
      <section id="expertise" ref={servicesRef} className={`fade-up ${servicesInView ? 'visible' : ''}`} style={{ padding: '120px 6vw', backgroundColor: '#050505', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ marginBottom: 80 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.25em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 16 }}>DOMAINS OF EXPERTISE</div>
          <h2 className="font-outfit" style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', fontWeight: 800 }}>What I <span className="text-neon">Do.</span></h2>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {RESUME_DATA.services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div key={idx} className="expertise-row" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <div className="font-outfit text-neon" style={{ fontSize: 24, fontWeight: 700, opacity: 0.8 }}>0{idx+1}</div>
                <h3 className="font-outfit exp-title" style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 700, color: '#fff', transition: 'color 0.4s ease' }}>{service.title}</h3>
                <p style={{ fontSize: 16, color: '#888', lineHeight: 1.7, maxWidth: 650 }}>{service.description}</p>
                <div className="exp-icon" style={{ color: '#444', textAlign: 'right', transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}><Icon size={38} /></div>
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
        <h2 className="font-outfit" style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', fontWeight: 800, marginBottom: 80 }}>
          Where I've <span className="text-neon">Worked.</span>
        </h2>

        <div className="timeline-container">
          {RESUME_DATA.experience.map((exp, idx) => (
            <div key={idx} className="timeline-item" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              <div className="timeline-node"></div>
              <div className="timeline-content">
                <div style={{ fontSize: 14, color: 'var(--neon-yellow)', fontWeight: 700, letterSpacing: 1, marginBottom: 12 }}>{exp.date}</div>
                <h3 className="font-outfit" style={{ fontSize: 'clamp(24px, 3.5vw, 32px)', fontWeight: 800, color: '#fff', marginBottom: 6 }}>{exp.role}</h3>
                <div style={{ fontSize: 18, color: '#777', fontWeight: 500, marginBottom: 24 }}>{exp.company}</div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {exp.workflows.map((flow, i) => (
                    <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <span style={{ color: '#444', marginTop: 2 }}>▹</span>
                      <span style={{ fontSize: 16, color: '#aaa', lineHeight: 1.6, maxWidth: 800 }}>{flow}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {}
      <section id="leadership" ref={leadershipRef} className={`fade-up ${leadershipInView ? 'visible' : ''}`} style={{ padding: '120px 6vw', backgroundColor: '#050505', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.25em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
          BEYOND THE CODE <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--neon-yellow)' }}></span>
        </div>
        <h2 className="font-outfit" style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', fontWeight: 800, marginBottom: 70 }}>
          Leadership & <span className="text-neon">Impact.</span>
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 32 }}>
          {RESUME_DATA.leadership.map((item, idx) => (
            <div key={idx} className="leadership-card" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              <div className="leadership-number">0{idx + 1}</div>
              <div>
                <div style={{ color: 'var(--neon-yellow)', marginBottom: 20, opacity: 0.8 }}><CodeIcon size={32} /></div>
                <h3 className="font-outfit" style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 16 }}>{item.title}</h3>
                <p style={{ fontSize: 16, color: '#888', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {}
      <section id="education" ref={educationRef} className={`fade-up ${educationInView ? 'visible' : ''}`} style={{ padding: '120px 6vw', backgroundColor: '#080808' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.25em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
          ACADEMIC QUALIFICATIONS <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--neon-yellow)' }}></span>
        </div>
        <h2 className="font-outfit" style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', fontWeight: 800, marginBottom: 70, color: '#fff' }}>
          Education & <span className="text-neon">Certifications.</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 32 }}>
          {RESUME_DATA.education.map((edu, idx) => (
            <div key={idx} className="academics-card" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
                  <div style={{ color: 'var(--neon-yellow)', opacity: 0.9 }}><BookIcon size={36} /></div>
                  <div className="font-outfit" style={{ fontSize: 14, fontWeight: 700, color: '#000', backgroundColor: 'var(--neon-yellow)', padding: '6px 14px', borderRadius: 20 }}>{edu.date}</div>
                </div>
                <h3 className="font-outfit" style={{ fontSize: 28, fontWeight: 800, color: '#fff', marginBottom: 12 }}>{edu.degree}</h3>
                <div style={{ color: '#aaa', fontSize: 16, fontWeight: 600, marginBottom: 24 }}>{edu.institution}</div>
              </div>
              <p style={{ fontSize: 15, color: '#777', lineHeight: 1.7 }}>{edu.details}</p>
            </div>
          ))}
        </div>
      </section>

      {}
      <section id="projects" ref={projectsRef} className={`fade-up ${projectsInView ? 'visible' : ''}`} style={{ padding: '140px 6vw', backgroundColor: '#050505', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 70, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.25em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              FEATURED WORK <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--neon-yellow)' }}></span>
            </div>
            <h2 className="font-outfit" style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', fontWeight: 800, lineHeight: 1.1 }}>
              Ideas In <span className="text-neon">Action.</span>
            </h2>
          </div>
          <a href={RESUME_DATA.socials.github} target="_blank" rel="noreferrer" className="nav-pill" style={{ color: '#fff', textDecoration: 'none', padding: '12px 28px', fontSize: 14, fontWeight: 600, display: 'flex', gap: 10, cursor: 'none' }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            View GitHub <GithubIcon size={18} />
          </a>
        </div>

        <div className="project-grid">
          {RESUME_DATA.projects.map((project, idx) => {
            return (
              <div key={idx} className="project-card" style={project.size === 'medium' ? { gridColumn: 'span 6' } : { gridColumn: 'span 12' }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                    <div className="font-outfit" style={{ fontSize: project.size === 'medium' ? 28 : 38, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>{project.title}</div>
                    <a href={project.link} style={{ color: '#666', cursor: 'none', transition: 'color 0.3s, transform 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--neon-yellow)'; e.currentTarget.style.transform = 'scale(1.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.color = '#666'; e.currentTarget.style.transform = 'scale(1)'; }}><ExternalLinkIcon size={24} /></a>
                  </div>
                  <p style={{ fontSize: 16, color: '#999', lineHeight: 1.7, maxWidth: project.size === 'medium' ? '100%' : '65%' }}>{project.tagline}</p>
                </div>
                
                {/* Dynamically Injected Project Logos via Tags */}
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 48 }}>
                  {project.tags.map((tag, tIdx) => {
                    const TagLogo = getTagLogo(tag);
                    return (
                      <span key={tIdx} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', padding: '8px 16px', borderRadius: 24, color: '#bbb', letterSpacing: 0.5, transition: 'all 0.3s ease' }} className="project-tag">
                        {TagLogo && <span style={{ opacity: 0.7 }}><TagLogo size={16} /></span>}
                        {tag}
                      </span>
                    )
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {}
      <section id="contact" ref={contactRef} className={`fade-up ${contactInView ? 'visible' : ''}`} style={{ padding: '160px 6vw 120px', textAlign: 'center', backgroundColor: '#070707' }}>
        <h2 className="font-outfit" style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', fontWeight: 900, lineHeight: 1.05, marginBottom: 48, textShadow: '0 10px 40px rgba(0,0,0,0.8)' }}>
          Have an Idea?<br /><span className="text-neon">Let's Make It Happen.</span>
        </h2>
        <a href={createMailto()} className="btn-primary" style={{ padding: '20px 48px', fontSize: 16 }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          Start a Conversation <SendIcon size={20} />
        </a>
      </section>

      <footer style={{ borderTop: '1px solid var(--border-subtle)', padding: '48px 6vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24, backgroundColor: '#020202', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a href="#home" style={{ textDecoration: 'none', color: '#fff', display: 'flex', alignItems: 'center', gap: 6, cursor: 'none' }}>
            <span className="font-outfit" style={{ fontSize: 20, fontWeight: 900, letterSpacing: 2 }}>SAGAR GOWDA</span>
            <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: 'var(--neon-yellow)' }}></span>
          </a>
          <span style={{ color: '#333' }}>|</span><span style={{ fontSize: 14, color: '#777', fontWeight: 500 }}>Developer &nbsp;|&nbsp; Creator</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28, color: '#888' }}>
          <a href={`https://${RESUME_DATA.socials.linkedin.replace(/^(https?:\/\/)?(www\.)?/, '')}`} target="_blank" rel="noreferrer" style={{ color: 'inherit', transition: 'color 0.2s', cursor: 'none' }} onMouseEnter={(e) => { setIsHovered(true); e.currentTarget.style.color = '#fff'; }} onMouseLeave={(e) => { setIsHovered(false); e.currentTarget.style.color = '#888'; }}><LinkedinIcon size={22} /></a>
          <a href={RESUME_DATA.socials.github} target="_blank" rel="noreferrer" style={{ color: 'inherit', transition: 'color 0.2s', cursor: 'none' }} onMouseEnter={(e) => { setIsHovered(true); e.currentTarget.style.color = '#fff'; }} onMouseLeave={(e) => { setIsHovered(false); e.currentTarget.style.color = '#888'; }}><GithubIcon size={22} /></a>
        </div>
      </footer>

      {showVideoModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(5,5,5,0.95)', backdropFilter: 'blur(16px)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, opacity: showVideoModal ? 1 : 0, transition: 'opacity 0.4s ease' }} onClick={() => setShowVideoModal(false)}>
          <div style={{ maxWidth: 600, width: '100%', padding: '48px', backgroundColor: '#090909', border: '1px solid rgba(204,255,0,0.2)', borderRadius: 32, textAlign: 'center', boxShadow: '0 30px 60px rgba(0,0,0,0.8)' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ color: 'var(--neon-yellow)', marginBottom: 20, display: 'flex', justifyContent: 'center' }}><PlayIcon size={42} /></div>
            <h3 className="font-outfit" style={{ fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 20 }}>About Sagar Gowda</h3>
            <p style={{ color: '#aaa', fontSize: 16, lineHeight: 1.7, marginBottom: 40 }}>"I build scalable cloud architectures, full-stack applications, and specialized local AI solutions. Driven by robust engineering and solving real-world challenges."</p>
            <button onClick={() => setShowVideoModal(false)} className="btn-primary" style={{ padding: '14px 40px', fontSize: 15 }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>Close Overview</button>
          </div>
        </div>
      )}
    </div>
  );
}