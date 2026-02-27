import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaCode, FaBriefcase, FaRocket, FaGraduationCap, FaAward, FaEnvelope, FaChevronLeft, FaChevronRight, FaPause, FaPlay, FaKeyboard, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const TOTAL_SECTIONS = 7;
const SECTION_DURATION = 12000;

const sectionsMeta = [
  { key: 'about',        icon: FaUser,           label: 'PROFILE',      color: '#6366f1', desc: 'Know who I am' },
  { key: 'skills',       icon: FaCode,           label: 'SKILLS',       color: '#06b6d4', desc: 'My tech arsenal' },
  { key: 'experience',   icon: FaBriefcase,      label: 'EXPERIENCE',   color: '#f59e0b', desc: 'Work journey' },
  { key: 'projects',     icon: FaRocket,         label: 'PROJECTS',     color: '#ec4899', desc: 'What I built' },
  { key: 'education',    icon: FaGraduationCap,  label: 'EDUCATION',    color: '#10b981', desc: 'Academic path' },
  { key: 'certificates', icon: FaAward,          label: 'CERTIFICATES', color: '#f97316', desc: 'Achievements' },
  { key: 'contact',      icon: FaEnvelope,       label: 'CONTACT',      color: '#a855f7', desc: 'Get in touch' },
];

/* ─── Panel components ─── */

const AboutPanel = () => (
  <div className="p-about">
    <div className="p-about-header">
      <div className="p-about-avatar">
        <span className="avatar-text">AC</span>
        <span className="avatar-ring" />
      </div>
      <div className="p-about-meta">
        <h3>ANUJ CHOUHAN</h3>
        <span className="p-about-tag">FULL STACK DEVELOPER</span>
        <span className="p-about-location">📍 Punjab, India</span>
      </div>
    </div>
    <div className="p-about-attrs">
      {[['CLASS', 'B.Tech CSE'], ['LEVEL', 'Final Year'], ['ORIGIN', 'India'], ['SPEC', 'MERN Stack'], ['STATUS', 'Open to Work'], ['PASSION', 'Problem Solver']].map(([k, v]) => (
        <div key={k} className="p-about-attr">
          <span className="attr-key">{k}</span>
          <span className="attr-val">{v}</span>
        </div>
      ))}
    </div>
    <p className="p-about-bio">
      Passionate full stack developer with expertise in the MERN stack, building scalable web applications 
      that prioritize performance and user experience. I love transforming complex problems into elegant, 
      intuitive solutions. When I'm not coding, you'll find me exploring new technologies, contributing 
      to open source, or mentoring fellow developers.
    </p>
    <div className="p-about-highlights">
      <div className="highlight-item">
        <span className="highlight-num">10+</span>
        <span className="highlight-label">Projects</span>
      </div>
      <div className="highlight-item">
        <span className="highlight-num">500+</span>
        <span className="highlight-label">GitHub Commits</span>
      </div>
      <div className="highlight-item">
        <span className="highlight-num">5+</span>
        <span className="highlight-label">Certificates</span>
      </div>
      <div className="highlight-item">
        <span className="highlight-num">24/7</span>
        <span className="highlight-label">Learning</span>
      </div>
    </div>
  </div>
);

const SkillsPanel = () => {
  const groups = [
    { title: 'FRONTEND', color: '#6366f1', skills: [['React.js', 92], ['JavaScript', 90], ['HTML5/CSS3', 95], ['Tailwind CSS', 88], ['Next.js', 78], ['Three.js', 75]] },
    { title: 'BACKEND', color: '#10b981', skills: [['Node.js', 88], ['Express.js', 85], ['REST APIs', 90], ['MongoDB', 82], ['PostgreSQL', 70], ['GraphQL', 65]] },
    { title: 'DEV TOOLS', color: '#f59e0b', skills: [['Git/GitHub', 90], ['VS Code', 92], ['Docker', 72], ['Postman', 85], ['Linux', 75], ['Vercel', 80]] },
    { title: 'SOFT SKILLS', color: '#ec4899', skills: [['Problem Solving', 92], ['Team Work', 90], ['Communication', 87], ['Leadership', 82], ['Time Mgmt', 85], ['Adaptability', 90]] },
  ];
  return (
    <div className="p-skills">
      {groups.map(g => (
        <div key={g.title} className="p-skills-group">
          <h4 style={{ color: g.color }}>{g.title}</h4>
          {g.skills.map(([name, pct]) => (
            <div key={name} className="skill-row">
              <div className="skill-row-top">
                <span className="skill-name">{name}</span>
                <span className="skill-pct">{pct}%</span>
              </div>
              <div className="skill-track">
                <motion.div
                  className="skill-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 1.2, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ background: `linear-gradient(90deg, ${g.color}, ${g.color}88)` }}
                />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const ExperiencePanel = () => (
  <div className="p-experience">
    {[
      { role: 'Freelance Full Stack Developer', company: 'Self-Employed', period: '2024 – Present', desc: 'Building complete web solutions for startups and small businesses. Delivered 5+ production apps with MERN stack, focusing on performance and SEO optimization.', highlights: ['React + Node.js', 'MongoDB Atlas', 'Stripe Integration'] },
      { role: 'Web Development Intern', company: 'TechCorp Solutions', period: '2023 – 2024', desc: 'Worked on enterprise-level React dashboards and RESTful APIs in agile sprints. Reduced API response time by 40% through query optimization.', highlights: ['React Dashboard', 'API Optimization', 'Agile/Scrum'] },
      { role: 'Open Source Contributor', company: 'GitHub Community', period: '2022 – Present', desc: 'Active contributor to open source projects. Fixed bugs, improved documentation, and added features to popular npm packages.', highlights: ['Pull Requests', 'Code Reviews', 'Community'] },
    ].map((e, i) => (
      <div key={i} className="exp-entry">
        <div className="exp-timeline">
          <div className="exp-marker">{String(i + 1).padStart(2, '0')}</div>
          {i < 2 && <div className="exp-line" />}
        </div>
        <div className="exp-body">
          <div className="exp-top"><h4>{e.role}</h4><span className="exp-period">{e.period}</span></div>
          <span className="exp-company">{e.company}</span>
          <p>{e.desc}</p>
          <div className="exp-highlights">
            {e.highlights.map(h => <span key={h} className="exp-highlight-tag">{h}</span>)}
          </div>
        </div>
      </div>
    ))}
  </div>
);

const ProjectsPanel = () => (
  <div className="p-projects">
    {[
      { name: '3D Portfolio City', tech: 'React, Three.js, Framer Motion', desc: 'Immersive 3D game-style portfolio with cyberpunk city, animated camera journey, rain effects, and glassmorphism UI.', rarity: 'LEGENDARY', link: '#' },
      { name: 'ShopZone E-Commerce', tech: 'MERN, Redux, Stripe, JWT', desc: 'Full-stack e-commerce with authentication, shopping cart, Stripe payments, admin dashboard, and real-time inventory tracking.', rarity: 'LEGENDARY', link: 'https://github.com/Anujchouhan001' },
      { name: 'ChatPulse Messenger', tech: 'React, Socket.io, Node.js', desc: 'Real-time messaging app with private rooms, typing indicators, online/offline status, and file sharing.', rarity: 'EPIC', link: 'https://github.com/Anujchouhan001' },
      { name: 'TaskFlow Manager', tech: 'React, Express, MongoDB', desc: 'Kanban-style task management with drag-and-drop, labels, deadlines, team collaboration, and activity logs.', rarity: 'EPIC', link: 'https://github.com/Anujchouhan001' },
      { name: 'DevBlog Platform', tech: 'Next.js, Markdown, Prisma', desc: 'Technical blogging platform with MDX support, syntax highlighting, SEO optimization, and analytics dashboard.', rarity: 'RARE', link: 'https://github.com/Anujchouhan001' },
      { name: 'Weather Dashboard', tech: 'React, OpenWeather API, Chart.js', desc: '7-day weather forecast with interactive charts, location search, and beautiful animated weather icons.', rarity: 'RARE', link: 'https://github.com/Anujchouhan001' },
    ].map((p, i) => (
      <div key={i} className={`proj-card rarity-${p.rarity.toLowerCase()}`}>
        <div className="proj-head">
          <h4>{p.name}</h4>
          <div className="proj-badges">
            <span className="proj-rarity">{p.rarity}</span>
          </div>
        </div>
        <span className="proj-tech">{p.tech}</span>
        <p>{p.desc}</p>
        <div className="proj-links">
          <a href={p.link} target="_blank" rel="noreferrer" className="proj-link-btn">
            <FaGithub /> Code
          </a>
          <a href={p.link} target="_blank" rel="noreferrer" className="proj-link-btn proj-link-live">
            <FaExternalLinkAlt /> Live
          </a>
        </div>
      </div>
    ))}
  </div>
);

const EducationPanel = () => (
  <div className="p-education">
    {[
      { degree: 'B.Tech — Computer Science & Engineering', school: 'Lovely Professional University, Punjab', year: '2021 – 2025', score: 'CGPA: 7.5+', details: 'Focused on Data Structures, Algorithms, Web Development, Database Management, and Software Engineering.' },
      { degree: 'Senior Secondary (12th) — CBSE', school: 'Senior Secondary School, India', year: '2020 – 2021', score: '75%+', details: 'Science stream with Mathematics, Physics, and Computer Science.' },
      { degree: 'Secondary (10th) — CBSE', school: 'Secondary School, India', year: '2018 – 2019', score: '80%+', details: 'Strong foundation in Mathematics and Science with distinction.' },
    ].map((e, i) => (
      <div key={i} className="edu-entry">
        <div className="edu-icon-wrap">
          <span className="edu-icon">🎓</span>
          <span className="edu-year-badge">{e.year.split(' – ')[1]}</span>
        </div>
        <div className="edu-body">
          <h4>{e.degree}</h4>
          <span className="edu-school">{e.school}</span>
          <p className="edu-details">{e.details}</p>
          <div className="edu-bottom"><span className="edu-year">{e.year}</span><span className="edu-score">{e.score}</span></div>
        </div>
      </div>
    ))}
  </div>
);

const CertificatesPanel = () => (
  <div className="p-certificates">
    {[
      { name: 'Full Stack Web Development', from: 'Udemy', year: '2024', verified: true },
      { name: 'React — The Complete Guide', from: 'Udemy', year: '2023', verified: true },
      { name: 'MongoDB for Developers', from: 'MongoDB University', year: '2023', verified: true },
      { name: 'JavaScript Algorithms & DS', from: 'freeCodeCamp', year: '2023', verified: true },
      { name: 'Responsive Web Design', from: 'freeCodeCamp', year: '2022', verified: true },
      { name: 'Node.js Backend Mastery', from: 'Coursera', year: '2024', verified: true },
      { name: 'Git & GitHub Professional', from: 'LinkedIn Learning', year: '2023', verified: false },
    ].map((c, i) => (
      <div key={i} className="cert-entry">
        <span className="cert-icon">{c.verified ? '✅' : '📜'}</span>
        <div className="cert-body">
          <h4>{c.name}</h4>
          <div className="cert-meta">
            <span>{c.from}</span>
            <span className="cert-year">{c.year}</span>
          </div>
        </div>
        {c.verified && <span className="cert-verified">VERIFIED</span>}
      </div>
    ))}
  </div>
);

const ContactPanel = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) return;
    setStatus('sending');
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      // If server is not available, open mailto fallback
      const mailtoLink = `mailto:canuj546@gmail.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`From: ${form.name} (${form.email})\n\n${form.message}`)}`;
      window.open(mailtoLink);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    }
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <div className="p-contact">
      <p className="contact-intro">
        Interested in collaborating or have a project in mind? Let's build something amazing together.
      </p>
      <div className="contact-links">
        {[
          { label: 'EMAIL', value: 'canuj546@gmail.com', icon: '📧', href: 'mailto:canuj546@gmail.com' },
          { label: 'GITHUB', value: 'github.com/Anujchouhan001', icon: '💻', href: 'https://github.com/Anujchouhan001' },
          { label: 'LINKEDIN', value: 'linkedin.com/in/anuj-chouhan11', icon: '🔗', href: 'https://linkedin.com/in/anuj-chouhan11' },
          { label: 'PHONE', value: '+91-7489635343', icon: '📱', href: 'tel:+917489635343' },
        ].map((c, i) => (
          <a key={i} href={c.href} target="_blank" rel="noreferrer" className="contact-row">
            <span className="contact-icon">{c.icon}</span>
            <div className="contact-data">
              <span className="contact-label">{c.label}</span>
              <span className="contact-value">{c.value}</span>
            </div>
          </a>
        ))}
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="cf-row">
          <input className="cf-input" name="name" placeholder="YOUR NAME" value={form.name} onChange={handleChange} required />
          <input className="cf-input" name="email" type="email" placeholder="YOUR EMAIL" value={form.email} onChange={handleChange} required />
        </div>
        <input className="cf-input" name="subject" placeholder="SUBJECT" value={form.subject} onChange={handleChange} required />
        <textarea className="cf-input cf-textarea" name="message" placeholder="YOUR MESSAGE..." value={form.message} onChange={handleChange} required rows={3} />
        <button className="cf-submit" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? '⟳ TRANSMITTING...' : status === 'success' ? '✓ MESSAGE SENT!' : status === 'error' ? '✗ RETRY TRANSMISSION' : '▶ SEND MESSAGE'}
        </button>
      </form>
    </div>
  );
};

const panels = [AboutPanel, SkillsPanel, ExperiencePanel, ProjectsPanel, EducationPanel, CertificatesPanel, ContactPanel];

/* ─── Journey component ─── */

const Journey = ({ currentSection, onSectionChange, onComplete }) => {
  const [timer, setTimer] = useState(0);
  const [paused, setPaused] = useState(false);
  const [showKeys, setShowKeys] = useState(true);

  // Auto-hide keyboard hint
  useEffect(() => {
    const t = setTimeout(() => setShowKeys(false), 5000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setTimer(0);
    const interval = setInterval(() => {
      if (paused) return;
      setTimer(prev => {
        if (prev >= SECTION_DURATION) {
          if (currentSection < TOTAL_SECTIONS - 1) {
            onSectionChange(currentSection + 1);
          } else {
            onComplete();
          }
          return 0;
        }
        return prev + 100;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [currentSection, onSectionChange, onComplete, paused]);

  const goTo = useCallback((dir) => {
    const next = currentSection + dir;
    if (next >= 0 && next < TOTAL_SECTIONS) { onSectionChange(next); setTimer(0); }
    else if (next >= TOTAL_SECTIONS) onComplete();
  }, [currentSection, onSectionChange, onComplete]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') goTo(1);
      else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') goTo(-1);
      else if (e.key === ' ') { e.preventDefault(); setPaused(p => !p); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goTo]);

  // Touch/swipe navigation
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };
    const handleTouchEnd = (e) => {
      if (touchStartX.current === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      const dy = e.changedTouches[0].clientY - touchStartY.current;
      // Only trigger if horizontal swipe is dominant and > 50px
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
        if (dx < 0) goTo(1);  // swipe left → next
        else goTo(-1);         // swipe right → prev
      }
      touchStartX.current = null;
      touchStartY.current = null;
    };
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [goTo]);

  const meta = sectionsMeta[currentSection];
  const SectionIcon = meta.icon;
  const PanelComponent = panels[currentSection];
  const progress = timer / SECTION_DURATION;

  return (
    <div className="journey-overlay">
      {/* Keyboard hint */}
      <AnimatePresence>
        {showKeys && (
          <motion.div
            className="keyboard-hint"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <FaKeyboard /> {typeof window !== 'undefined' && 'ontouchstart' in window ? 'Swipe ← → to navigate' : 'Use ← → arrows or A/D keys • Space to pause'}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HUD TOP */}
      <div className="hud-top">
        <div className="hud-top-left">
          <div className="hud-mode" style={{ color: meta.color }}>
            <SectionIcon /> <span>{meta.label}</span>
          </div>
          <span className="hud-mode-desc">{meta.desc}</span>
        </div>
        <div className="hud-top-center">
          <div className="hud-dots">
            {sectionsMeta.map((s, i) => {
              const Ic = s.icon;
              return (
                <motion.button
                  key={i}
                  className={`hud-dot ${i === currentSection ? 'active' : ''} ${i < currentSection ? 'done' : ''}`}
                  style={{ '--dot-color': s.color }}
                  onClick={() => { onSectionChange(i); setTimer(0); }}
                  title={s.label}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Ic />
                </motion.button>
              );
            })}
          </div>
          <div className="hud-progress-track">
            <motion.div
              className="hud-progress-fill"
              style={{ background: meta.color }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>
        <div className="hud-top-right">
          <button className="hud-pause-btn" onClick={() => setPaused(p => !p)} title={paused ? 'Resume' : 'Pause'}>
            {paused ? <FaPlay /> : <FaPause />}
          </button>
          <span className="hud-counter">{String(currentSection + 1).padStart(2, '0')} / {String(TOTAL_SECTIONS).padStart(2, '0')}</span>
        </div>
      </div>

      {/* SECTION PANEL */}
      <AnimatePresence mode="wait">
        <motion.div
          key={meta.key}
          className="section-panel"
          initial={{ x: 60, opacity: 0, scale: 0.96 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: -60, opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ '--panel-accent': meta.color }}
        >
          <div className="panel-header">
            <div className="panel-header-icon" style={{ background: `${meta.color}20`, color: meta.color }}>
              <SectionIcon />
            </div>
            <div className="panel-header-text">
              <h2>{meta.label}</h2>
              <span className="panel-desc">{meta.desc}</span>
            </div>
            <span className="panel-timer" style={{ color: paused ? '#ef4444' : meta.color }}>
              {paused ? 'PAUSED' : `${Math.ceil((SECTION_DURATION - timer) / 1000)}s`}
            </span>
          </div>
          <div className="panel-body">
            <PanelComponent />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* HUD BOTTOM */}
      <div className="hud-bottom">
        <motion.button
          className="hud-btn"
          onClick={() => goTo(-1)}
          disabled={currentSection === 0}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaChevronLeft /> PREV
        </motion.button>
        <div className="hud-bottom-center">
          <span className="hud-bottom-label">JOURNEY MODE</span>
          <div className="hud-mini-progress">
            {sectionsMeta.map((s, i) => (
              <div
                key={i}
                className={`mini-seg ${i <= currentSection ? 'filled' : ''}`}
                style={{ background: i <= currentSection ? s.color : undefined }}
              />
            ))}
          </div>
        </div>
        <motion.button
          className="hud-btn"
          onClick={() => goTo(1)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {currentSection === TOTAL_SECTIONS - 1 ? 'FINISH' : 'NEXT'} <FaChevronRight />
        </motion.button>
      </div>
    </div>
  );
};

export default Journey;
