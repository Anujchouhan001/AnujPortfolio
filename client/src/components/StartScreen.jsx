import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/* ─── Typing Effect Hook ─── */
const useTypingEffect = (texts, speed = 80, deleteSpeed = 40, pauseTime = 2000) => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    let timeout;

    if (!isDeleting && charIndex < current.length) {
      timeout = setTimeout(() => {
        setDisplayText(current.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, speed);
    } else if (!isDeleting && charIndex === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayText(current.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, deleteSpeed);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((textIndex + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, speed, deleteSpeed, pauseTime]);

  return displayText;
};

/* ─── Floating Code Snippets ─── */
const codeSnippets = [
  'const app = express();',
  'import React from "react";',
  '<Canvas shadows>',
  'db.collection.find({})',
  'npm run build',
  'git push origin main',
  'useState(false)',
  'async/await',
  'REST API',
  'JWT auth',
  'WebSocket.on("connect")',
  'docker compose up',
  'tailwind.config.js',
  'useEffect(() => {})',
  'router.get("/api")',
];

const startIsMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

const StartScreen = ({ onStart }) => {
  const [ready, setReady] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState('');
  const containerRef = useRef(null);

  const typedRole = useTypingEffect(
    ['FULL STACK DEVELOPER', 'MERN STACK SPECIALIST', 'UI/UX ENTHUSIAST', 'CREATIVE CODER'],
    70, 35, 2500
  );

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 2200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 120);
    }, 5000 + Math.random() * 4000);
    return () => clearInterval(glitchInterval);
  }, []);

  // Live clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  // Parallax mouse tracking
  useEffect(() => {
    const handleMouse = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <motion.div
      className="start-screen"
      ref={containerRef}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Animated grid background */}
      <div className="start-grid" style={{
        transform: `translate(${mousePos.x * -8}px, ${mousePos.y * -8}px)`
      }} />

      {/* Particles rising */}
      <div className="start-particles">
        {Array.from({ length: startIsMobile ? 25 : 100 }).map((_, i) => (
          <div
            key={i}
            className="start-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${5 + Math.random() * 8}s`,
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
              background: ['#6366f1', '#a855f7', '#06b6d4', '#ec4899', '#10b981'][Math.floor(Math.random() * 5)],
            }}
          />
        ))}
      </div>

      {/* Floating code snippets */}
      <div className="start-code-rain">
        {(startIsMobile ? codeSnippets.slice(0, 6) : codeSnippets).map((snippet, i) => (
          <motion.div
            key={i}
            className="code-snippet"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.15, 0.15, 0],
              y: [0, -200],
              x: Math.sin(i) * 30,
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              delay: i * 0.8,
              ease: 'linear',
            }}
            style={{
              left: `${5 + (i / codeSnippets.length) * 90}%`,
              top: `${60 + Math.random() * 40}%`,
            }}
          >
            {snippet}
          </motion.div>
        ))}
      </div>

      {/* HUD corners */}
      <div className="start-corners">
        <div className="corner corner-tl" />
        <div className="corner corner-tr" />
        <div className="corner corner-bl" />
        <div className="corner corner-br" />
      </div>

      {/* Top-left HUD */}
      <div className="start-coords top-left">
        <span>SYS://PORTFOLIO v2.0</span>
        <span>LAT: 31.2°N • LON: 75.8°E</span>
        <span>NODE: {time}</span>
      </div>

      {/* Top-right HUD */}
      <div className="start-coords top-right">
        <span>STATUS: ONLINE</span>
        <span>RENDER: THREE.JS</span>
        <span>FPS: 60 • GPU: ACTIVE</span>
      </div>

      {/* Main content */}
      <div className="start-content" style={{
        transform: `translate(${mousePos.x * -4}px, ${mousePos.y * -4}px)`
      }}>
        <motion.div
          className="start-badge"
          initial={{ y: -30, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="badge-dot" /> INTERACTIVE 3D PORTFOLIO EXPERIENCE
        </motion.div>

        <motion.h1
          className={`start-title ${glitch ? 'glitch' : ''}`}
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="start-name-first" data-text="ANUJ">ANUJ</span>
          <span className="start-name-last" data-text="CHOUHAN">CHOUHAN</span>
        </motion.h1>

        <motion.div
          className="start-role-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          <span className="start-role-line" />
          <span className="start-role">
            {typedRole}
            <span className="typing-cursor">|</span>
          </span>
          <span className="start-role-line" />
        </motion.div>

        <motion.p
          className="start-tagline"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          Building immersive digital experiences with modern web technologies
        </motion.p>

        <motion.div
          className="start-divider"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.8, duration: 0.9 }}
        />

        <motion.div
          className="start-stats"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <div className="sstat">
            <span className="sstat-val">7</span>
            <span className="sstat-lbl">ZONES</span>
          </div>
          <div className="sstat-sep" />
          <div className="sstat">
            <span className="sstat-val">15+</span>
            <span className="sstat-lbl">SKILLS</span>
          </div>
          <div className="sstat-sep" />
          <div className="sstat">
            <span className="sstat-val">3D</span>
            <span className="sstat-lbl">WORLD</span>
          </div>
          <div className="sstat-sep" />
          <div className="sstat">
            <span className="sstat-val">∞</span>
            <span className="sstat-lbl">PASSION</span>
          </div>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="start-socials"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1 }}
        >
          <a href="https://github.com/Anujchouhan001" target="_blank" rel="noreferrer" className="start-social-link">
            <span className="social-icon">⌨</span> GitHub
          </a>
          <a href="https://linkedin.com/in/anuj-chouhan11" target="_blank" rel="noreferrer" className="start-social-link">
            <span className="social-icon">◆</span> LinkedIn
          </a>
          <a href="mailto:canuj546@gmail.com" className="start-social-link">
            <span className="social-icon">✉</span> Email
          </a>
        </motion.div>

        {ready && (
          <motion.button
            className="start-button"
            onClick={onStart}
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 160, damping: 14, delay: 0.2 }}
            whileHover={{ scale: 1.07, boxShadow: '0 0 40px rgba(99, 102, 241, 0.4)' }}
            whileTap={{ scale: 0.93 }}
          >
            <span className="start-btn-pulse" />
            <span className="start-btn-border" />
            <span className="start-btn-text">▶ EXPLORE MY WORLD</span>
            <span className="start-btn-glow" />
          </motion.button>
        )}

        <motion.p
          className="start-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ delay: 3 }}
        >
          [ PRESS START TO ENTER THE CYBERPUNK CITY ]
        </motion.p>
      </div>

      {/* Bottom info */}
      <div className="start-version">BUILD v2.0 // REACT + THREE.JS + FRAMER MOTION</div>
      <div className="start-year">© 2026 ANUJ CHOUHAN • ALL RIGHTS RESERVED</div>

      {/* Bottom center tech stack */}
      <motion.div
        className="start-tech-stack"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        {['REACT', 'THREE.JS', 'NODE.JS', 'MONGODB', 'EXPRESS'].map((tech, i) => (
          <span key={tech} className="tech-tag">{tech}</span>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default StartScreen;
