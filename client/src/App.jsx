import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CityScene from './components/CityScene';
import StartScreen from './components/StartScreen';
import Journey from './components/Journey';
import './App.css';

const TOTAL_SECTIONS = 7;

/* ─── Entering Screen ─── */
const EnteringScreen = () => {
  const [progress, setProgress] = useState(0);
  const stages = ['INITIALIZING WORLD...', 'LOADING CITY ASSETS...', 'BUILDING GEOMETRY...', 'ENTERING WORLD...'];

  useEffect(() => {
    const iv = setInterval(() => setProgress(p => Math.min(p + 1.1, 100)), 30);
    return () => clearInterval(iv);
  }, []);

  return (
    <motion.div className="entering-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.6 } }}>
      <div className="enter-content">
        <motion.div className="enter-icon" animate={{ rotateY: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
          🌆
        </motion.div>
        <h2 className="enter-title">ENTERING THE CITY</h2>
        <div className="enter-bar-wrap">
          <div className="enter-bar-track">
            <motion.div className="enter-bar-fill" animate={{ width: `${progress}%` }} />
          </div>
          <span className="enter-pct">{Math.floor(progress)}%</span>
        </div>
        <span className="enter-status">{stages[Math.min(Math.floor(progress / 26), stages.length - 1)]}</span>
      </div>
    </motion.div>
  );
};

/* ─── Animated Counter Hook ─── */
function useCounter(target, duration = 2000) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const iv = setInterval(() => {
      start += step;
      if (start >= target) { setValue(target); clearInterval(iv); }
      else setValue(Math.floor(start));
    }, 16);
    return () => clearInterval(iv);
  }, [target, duration]);
  return value;
}

/* ─── Complete Screen ─── */
const CompleteScreen = ({ onRestart }) => {
  const zones = useCounter(7, 1200);
  const skills = useCounter(24, 1800);
  const projects = useCounter(10, 1500);

  return (
    <motion.div className="complete-screen" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }}>
      <div className="complete-content">
        <motion.div
          className="complete-trophy"
          animate={{ y: [0, -14, 0], rotateY: [0, 360] }}
          transition={{ y: { duration: 2.5, repeat: Infinity }, rotateY: { duration: 4, repeat: Infinity, ease: 'linear' } }}
        >
          🏆
        </motion.div>

        <h2 className="complete-title">JOURNEY COMPLETE</h2>
        <p className="complete-message">Thank you for exploring my digital city. Every zone represents a chapter of my journey as a developer. Let's build something amazing together.</p>

        <div className="complete-stats">
          {[[`${zones}/7`, 'ZONES EXPLORED'], [`${skills}+`, 'SKILLS FOUND'], [`${projects}+`, 'PROJECTS'], ['100%', 'COMPLETE']].map(([v, k]) => (
            <motion.div key={k} className="cstat" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + Math.random() * 0.4 }}>
              <span className="cstat-val">{v}</span><span className="cstat-key">{k}</span>
            </motion.div>
          ))}
        </div>

        <div className="complete-links">
          <a href="https://github.com/Anujchouhan001" target="_blank" rel="noreferrer" className="clink">💻 GitHub</a>
          <a href="https://linkedin.com/in/anuj-chouhan11" target="_blank" rel="noreferrer" className="clink">🔗 LinkedIn</a>
          <a href="mailto:canuj546@gmail.com" className="clink">📧 Email</a>
        </div>

        <div className="complete-actions">
          <motion.button className="restart-btn" onClick={onRestart} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}>
            ↻ RESTART JOURNEY
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── App ─── */
function App() {
  const [gameState, setGameState] = useState('start');   // start | entering | journey | complete
  const [currentSection, setCurrentSection] = useState(0);

  const handleStart = useCallback(() => {
    setGameState('entering');
    setTimeout(() => setGameState('journey'), 3200);
  }, []);

  const handleComplete = useCallback(() => setGameState('complete'), []);
  const handleRestart = useCallback(() => { setCurrentSection(0); setGameState('start'); }, []);

  return (
    <div className="game-container">
      {/* 3D background always rendered */}
      <CityScene currentSection={currentSection} gameState={gameState} />

      <div className="scanlines" />
      <div className="vignette" />

      <AnimatePresence mode="wait">
        {gameState === 'start' && <StartScreen key="start" onStart={handleStart} />}
        {gameState === 'entering' && <EnteringScreen key="entering" />}
        {gameState === 'journey' && (
          <Journey key="journey" currentSection={currentSection} onSectionChange={setCurrentSection} onComplete={handleComplete} />
        )}
        {gameState === 'complete' && <CompleteScreen key="complete" onRestart={handleRestart} />}
      </AnimatePresence>
    </div>
  );
}

export default App;
