import React, { useState, useEffect, useRef } from "react";
import { PROJECTS } from "./projects.js";

const IconSun = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);
const IconMoon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);
const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
  </svg>
);
const IconMenu = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></svg>
);
const IconX = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
);
const IconSend = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
);

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView(0.12);
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "revealed" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

function Nav({ dark, toggle }) {
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      const sections = NAV_ITEMS.map((n) => document.getElementById(n.id));
      let cur = "";
      for (const s of sections) {
        if (s && s.getBoundingClientRect().top < 200) cur = s.id;
      }
      setActive(cur);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <a href="#" className="logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <span className="logo-mark">TR</span>
          <span className="logo-text">Trishley<span className="logo-accent">.</span></span>
        </a>

        <div className={`nav-links ${mobileOpen ? "open" : ""}`}>
          {NAV_ITEMS.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={active === n.id ? "active" : ""}
              onClick={() => setMobileOpen(false)}
            >
              {n.label}
            </a>
          ))}
        </div>

        <div className="nav-right">
          <button className="icon-btn" onClick={toggle} aria-label="Toggle theme">
            {dark ? <IconSun /> : <IconMoon />}
          </button>
          <button className="icon-btn mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            {mobileOpen ? <IconX /> : <IconMenu />}
          </button>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-layout">
          <div className="hero-content">
            <Reveal>
              <span className="hero-badge">✦ Available for opportunities</span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="hero-title">
                Hi, I'm <span className="gradient-text">Trishley</span><br />
                Rosalita
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="hero-sub">
                Aspiring Full-Stack Developer · UI Designer · Student Programmer
              </p>
            </Reveal>
            <Reveal delay={240}>
              <p className="hero-desc">
                I create modern, functional, and user-friendly web applications
                focused on solving real-world problems through clean design and
                efficient development.
              </p>
            </Reveal>
            <Reveal delay={320}>
              <div className="hero-actions">
                <a href="#projects" className="btn-accent">
                  View Projects <IconArrow />
                </a>
                <a href="#contact" className="btn-outline">Contact Me</a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} className="hero-visual-wrap">
            <div className="hero-visual">
              <div className="hero-card glass">
                <div className="hero-avatar">TR</div>
                <div>
                  <div className="hero-card-name">Trishley Rosalita</div>
                  <div className="hero-card-role">Student Developer</div>
                </div>
              </div>
              <div className="hero-stats">
                <div className="stat-item glass">
                  <span className="stat-num">5+</span>
                  <span className="stat-label">Projects</span>
                </div>
                <div className="stat-item glass">
                  <span className="stat-num">10+</span>
                  <span className="stat-label">Technologies</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function About() {
  const focuses = [
    "Full-Stack Web Development",
    "UI/UX Design",
    "Database Management",
    "System Development",
    "Responsive Web Design",
    "Problem Solving",
  ];
  return (
    <section id="about" className="section">
      <div className="wrap">
        <Reveal><span className="section-tag">About me</span></Reveal>
        <Reveal delay={60}>
          <h2 className="section-title">
            Building the web, <span className="gradient-text">one line at a time.</span>
          </h2>
        </Reveal>
        <div className="about-grid">
          <Reveal delay={120}>
            <p className="about-text">
              I'm a passionate student developer who enjoys building creative and
              functional web systems. I love designing modern interfaces, developing
              backend systems, and learning new technologies that improve both user
              experience and performance.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div className="focus-chips">
              {focuses.map((f) => (
                <span key={f} className="focus-chip">{f}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const SKILL_GROUPS = [
  {
    icon: "🎨",
    title: "Frontend Development",
    items: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "EJS"],
  },
  {
    icon: "⚙️",
    title: "Backend Development",
    items: ["Node.js", "Express.js", "REST APIs", "Authentication"],
  },
  {
    icon: "🗄️",
    title: "Database Management",
    items: ["SQLite", "MySQL", "Schema Design", "CRUD"],
  },
  {
    icon: "🛠️",
    title: "Tools & Design",
    items: ["Git & GitHub", "VS Code", "XAMPP", "Figma"],
  },
];

function Skills() {
  return (
    <section id="skills" className="section">
      <div className="wrap">
        <Reveal><span className="section-tag">Technical Skills</span></Reveal>
        <Reveal delay={60}>
          <h2 className="section-title">
            Tools & <span className="gradient-text">Technologies</span>
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="section-sub">
            A curated set of tools and technologies I use to bring ideas from concept to deployment.
          </p>
        </Reveal>
        <div className="skills-grid">
          {SKILL_GROUPS.map((g, i) => (
            <Reveal key={g.title} delay={120 + i * 80}>
              <div className="skill-card glass">
                <span className="skill-icon">{g.icon}</span>
                <h3 className="skill-card-title">{g.title}</h3>
                <div className="skill-tags">
                  {g.items.map((t) => (
                    <span key={t} className="skill-tag">{t}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  return (
    <Reveal delay={index * 100}>
      <div className={`proj-card glass ${project.featured ? "featured" : ""}`}>
        <div className="proj-header">
          <span className="proj-emoji">{project.emoji}</span>
          <div className="proj-meta">
            <span className="proj-num">{String(index + 1).padStart(2, "0")} / {project.featured ? "Platform" : project.tags.includes("capstone") ? "Capstone" : "Project"}</span>
          </div>
        </div>
        <h3 className="proj-title">{project.title}</h3>
        <p className="proj-desc">{project.description}</p>
        {project.highlights && (
          <ul className="proj-highlights">
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        )}
        <div className="proj-chips">
          {project.chips.map((c) => (
            <span key={c} className="proj-chip">{c}</span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function Projects() {
  const [filter, setFilter] = useState("all");
  const tags = ["all", "fullstack", "frontend", "capstone"];
  const filtered = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(filter));

  return (
    <section id="projects" className="section">
      <div className="wrap">
        <Reveal><span className="section-tag">Portfolio</span></Reveal>
        <Reveal delay={60}>
          <h2 className="section-title">
            My <span className="gradient-text">Projects</span>
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="section-sub">
            A selection of projects I've designed and developed — from management systems to platforms.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="filter-bar">
            {tags.map((t) => (
              <button
                key={t}
                className={`filter-pill ${filter === t ? "active" : ""}`}
                onClick={() => setFilter(t)}
              >
                {t === "all" ? "All" : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </Reveal>
        <div className="proj-grid">
          {filtered.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

const ACHIEVEMENTS = [
  { icon: "🚀", text: "Built multiple full-stack web applications from concept to deployment" },
  { icon: "🎨", text: "Developed responsive and modern UI designs with attention to user experience" },
  { icon: "⚙️", text: "Improved backend and database integration skills across multiple projects" },
  { icon: "📚", text: "Successfully worked on academic and capstone projects with real-world impact" },
  { icon: "🏆", text: "Created functional management systems and e-commerce websites" },
];

const ACHIEVE_STATS = [
  { num: "5+", label: "Full-Stack Projects" },
  { num: "10+", label: "Technologies Used" },
  { num: "2+", label: "Capstone Systems" },
  { num: "3+", label: "DB Integrations" },
];

function Achievements() {
  return (
    <section id="achievements" className="section">
      <div className="wrap">
        <Reveal><span className="section-tag">Achievements</span></Reveal>
        <Reveal delay={60}>
          <h2 className="section-title">
            What I've <span className="gradient-text">Accomplished</span>
          </h2>
        </Reveal>
        <div className="achieve-grid">
          <div className="achieve-list">
            {ACHIEVEMENTS.map((a, i) => (
              <Reveal key={i} delay={100 + i * 70}>
                <div className="achieve-item glass">
                  <span className="achieve-icon">{a.icon}</span>
                  <span>{a.text}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <div className="achieve-stats">
              {ACHIEVE_STATS.map((s) => (
                <div key={s.label} className="achieve-stat glass">
                  <span className="achieve-num">{s.num}</span>
                  <span className="achieve-label">{s.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    if (fd.get("_hp")) return;
    setStatus({ kind: "success", msg: "Message sent! I'll get back to you soon." });
    e.target.reset();
  };

  return (
    <section id="contact" className="section">
      <div className="wrap">
        <Reveal><span className="section-tag">Get in touch</span></Reveal>
        <Reveal delay={60}>
          <h2 className="section-title">
            Let's <span className="gradient-text">Connect</span>
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="section-sub">
            Whether you have a project idea, collaboration opportunity, or just want to say hello — I'd love to hear from you.
          </p>
        </Reveal>
        <div className="contact-grid">
          <Reveal delay={120}>
            <div className="contact-info">
              <a href="mailto:trishley55@gmail.com" className="contact-link glass">
                <span>📧</span> trishley55@gmail.com
              </a>
              <a href="tel:+63XXXXXXXXXX" className="contact-link glass">
                <span>📱</span> +63 952 628 9598
              </a>
              <a href="https://github.com/Trishley" target="_blank" rel="noopener noreferrer" className="contact-link glass">
                <span>💻</span> github.com/Trishley
              </a>
              <a href="https://facebook.com/Mokongyawa143" target="_blank" rel="noopener noreferrer" className="contact-link glass">
                <span>📘</span> facebook.com/Mokongyawa143
              </a>
            </div>
          </Reveal>
          <Reveal delay={180}>
            <div className="contact-form-wrap glass">
              <h3 className="form-title">Send a Message</h3>
              <div className="contact-form" role="form">
                <input type="text" name="_hp" className="hpField" tabIndex={-1} autoComplete="off" />
                <div className="field-group">
                  <label className="field-label">Your Name</label>
                  <input type="text" name="name" className="field-input" placeholder="John Doe" required />
                </div>
                <div className="field-group">
                  <label className="field-label">Email Address</label>
                  <input type="email" name="email" className="field-input" placeholder="john@example.com" required />
                </div>
                <div className="field-group">
                  <label className="field-label">Message</label>
                  <textarea name="message" className="field-input field-textarea" placeholder="Tell me about your project..." required />
                </div>
                <button type="button" className="btn-accent submit-btn" onClick={handleSubmit}>
                  Send Message <IconSend />
                </button>
                {status && (
                  <div className={`form-status ${status.kind}`}>{status.msg}</div>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════ */
/*  FOOTER                                                */
/* ═══════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <span>© {new Date().getFullYear()} Trishley Rosalita. Designed & built with passion.</span>
        <div className="footer-links">
          <a href="#">Back to top ↑</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════ */
/*  CHATBOT FAB                                           */
/* ═══════════════════════════════════════════════════════ */
function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi there! 👋 I'm Trishley's assistant. Ask me anything about her work or projects!" },
  ]);
  const [input, setInput] = useState("");
  const msgsEnd = useRef(null);

  useEffect(() => {
    msgsEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    const txt = input.trim();
    if (!txt) return;
    setMessages((m) => [...m, { role: "user", text: txt }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { role: "bot", text: "Thanks for your message! Trishley will get back to you soon. In the meantime, feel free to browse the projects section!" },
      ]);
    }, 800);
  };

  return (
    <>
      <button className="chat-fab" onClick={() => setOpen(!open)} aria-label="Chat">
        {open ? <IconX /> : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {open && (
        <div className="chat-panel glass">
          <div className="chat-header">
            <div>
              <div className="chat-title">Trishley's Assistant</div>
              <div className="chat-status">● Online — Ask me anything</div>
            </div>
            <button className="icon-btn" onClick={() => setOpen(false)}><IconX /></button>
          </div>
          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}`}>{m.text}</div>
            ))}
            <div ref={msgsEnd} />
          </div>
          <div className="chat-input-row">
            <textarea
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Type a message..."
              rows={1}
            />
            <button className="chat-send btn-accent" onClick={send} disabled={!input.trim()}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════════ */
/*  APP                                                   */
/* ═══════════════════════════════════════════════════════ */
export default function App() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <>
      <Nav dark={dark} toggle={() => setDark(!dark)} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Achievements />
      <Contact />
      <Footer />
      <Chatbot />
    </>
  );
}
