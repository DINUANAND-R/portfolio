/* ============================================================
   Hero.jsx — Cinematic full-screen hero with typing animation,
   floating code window, castle silhouette, spell line effects
   ============================================================ */
import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { FaGithub, FaLinkedin, FaCode } from 'react-icons/fa6';

/* ---- Typing hook ---- */
const typingWords = [
  'Full Stack Developer',
  'MERN Stack Developer',
  'DevOps Enthusiast',
  'Problem Solver',
  'Real-Time App Developer',
];

function useTyping(words, speed = 80, pause = 1600) {
  const [text, setText]       = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timeout = useRef(null);

  useEffect(() => {
    const word = words[wordIdx % words.length];
    const delay = deleting ? speed / 2 : speed;
    timeout.current = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, text.length + 1));
        if (text.length + 1 === word.length) {
          setTimeout(() => setDeleting(true), pause);
        }
      } else {
        setText(word.slice(0, text.length - 1));
        if (text.length === 0) {
          setDeleting(false);
          setWordIdx(i => i + 1);
        }
      }
    }, delay);
    return () => clearTimeout(timeout.current);
  }, [text, deleting, wordIdx, words, speed, pause]);

  return text;
}

/* ---- Floating code window ---- */
const codeLines = [
  { indent: 0, text: 'const dinu = {',         color: '#D4AF37' },
  { indent: 1, text: 'name: "Dinu Anand C R",', color: '#F5E6C8' },
  { indent: 1, text: 'role: "Full Stack Dev",', color: '#F5E6C8' },
  { indent: 1, text: 'stack: ["MERN", "DevOps"],', color: '#22C55E' },
  { indent: 1, text: 'leetcode: "250+ solved",', color: '#8B5CF6' },
  { indent: 1, text: 'status: "Available 🚀",', color: '#22C55E' },
  { indent: 0, text: '};',                      color: '#D4AF37' },
  { indent: 0, text: '',                         color: '' },
  { indent: 0, text: 'dinu.build("future");',   color: '#A1A1AA' },
];

function FloatingCodeWindow() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      style={{ position: 'relative' }}
    >
      {/* Outer glow */}
      <div style={{
        position: 'absolute', inset: '-2px',
        borderRadius: '12px',
        background: 'linear-gradient(135deg, rgba(212,175,55,0.4), rgba(34,197,94,0.2), rgba(139,92,246,0.3))',
        filter: 'blur(8px)',
        zIndex: 0,
      }} />

      {/* Code window */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'relative',
          background: 'rgba(15,20,30,0.92)',
          border: '1px solid rgba(212,175,55,0.3)',
          borderRadius: '12px',
          overflow: 'hidden',
          backdropFilter: 'blur(12px)',
          zIndex: 1,
          minWidth: 'min(340px, 90vw)',
          width: '100%',
        }}
      >
        {/* Window chrome */}
        <div style={{
          padding: '0.65rem 1rem',
          background: 'rgba(212,175,55,0.07)',
          borderBottom: '1px solid rgba(212,175,55,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          {['#FF6057','#FFBD2E','#28C840'].map((c, i) => (
            <div key={i} style={{ width: '11px', height: '11px', borderRadius: '50%', background: c, opacity: 0.8 }} />
          ))}
          <span style={{ marginLeft: '0.5rem', fontFamily: 'Cinzel, serif', fontSize: '0.65rem', color: 'rgba(212,175,55,0.6)', letterSpacing: '0.1em' }}>
            developer.js
          </span>
        </div>

        {/* Code body */}
        <div style={{ padding: '1.25rem 1.5rem', fontFamily: 'monospace', fontSize: '0.82rem', lineHeight: '1.9' }}>
          {codeLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 + i * 0.08 }}
              style={{
                paddingLeft: `${line.indent * 1.25}rem`,
                color: line.color || '#A1A1AA',
              }}
            >
              {line.text || '\u00A0'}
            </motion.div>
          ))}

          {/* Blinking cursor at end */}
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{ display: 'inline-block', width: '8px', height: '16px', background: '#D4AF37', verticalAlign: 'middle' }}
          />
        </div>
      </motion.div>

      {/* Floating badge */}
      <motion.div
        animate={{ y: [0, -6, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        style={{
          position: 'absolute',
          top: '-16px', right: '-16px',
          padding: '0.4rem 0.8rem',
          background: 'rgba(34,197,94,0.15)',
          border: '1px solid rgba(34,197,94,0.4)',
          borderRadius: '99px',
          color: '#22C55E',
          fontSize: '0.7rem',
          fontFamily: 'Cinzel, serif',
          letterSpacing: '0.08em',
          zIndex: 2,
          backdropFilter: 'blur(8px)',
          boxShadow: '0 0 12px rgba(34,197,94,0.3)',
        }}
      >
        ⚡ Available
      </motion.div>

      {/* Stack pills floating below */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        style={{
          position: 'absolute',
          bottom: '-18px', left: '-12px',
          padding: '0.35rem 0.9rem',
          background: 'rgba(139,92,246,0.15)',
          border: '1px solid rgba(139,92,246,0.4)',
          borderRadius: '99px',
          color: '#8B5CF6',
          fontSize: '0.68rem',
          fontFamily: 'Cinzel, serif',
          letterSpacing: '0.06em',
          zIndex: 2,
          backdropFilter: 'blur(8px)',
          boxShadow: '0 0 10px rgba(139,92,246,0.3)',
        }}
      >
        🔮 MERN + DevOps
      </motion.div>
    </motion.div>
  );
}

/* ---- Spell line effect SVG ---- */
function SpellLines() {
  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}
      viewBox="0 0 1440 800"
      preserveAspectRatio="none"
    >
      {/* Diagonal gold spell streaks */}
      {[
        { d: 'M 0 200 Q 300 100 600 250 T 1100 180', color: '#D4AF37', delay: '0s' },
        { d: 'M 100 600 Q 400 500 700 620 T 1440 550', color: '#22C55E', delay: '1.2s' },
        { d: 'M 200 400 Q 500 300 800 420 T 1440 350', color: '#8B5CF6', delay: '2.4s' },
      ].map((s, i) => (
        <motion.path
          key={i}
          d={s.d}
          stroke={s.color}
          strokeWidth="0.8"
          fill="none"
          opacity={0.15}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 0], opacity: [0, 0.18, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 1.4, ease: 'easeInOut' }}
        />
      ))}
    </svg>
  );
}

/* ---- Main Hero component ---- */
export default function Hero() {
  const typedText = useTyping(typingWords);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroY       = useTransform(scrollYProgress, [0, 0.3], [0, -60]);

  const scrollDown = () =>
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: '64px',
      }}
    >
      {/* Spell SVG lines */}
      <SpellLines />

      {/* Background radial glow */}
      <div style={{
        position: 'absolute', top: '25%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px', height: '500px',
        background: 'radial-gradient(ellipse, rgba(212,175,55,0.07) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Castle silhouette */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '40%', zIndex: 1, pointerEvents: 'none',
      }}>
        <svg viewBox="0 0 1440 240" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
          <defs>
            <filter id="winGlow2" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <linearGradient id="castleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0B0F19" stopOpacity="0.85"/>
              <stop offset="100%" stopColor="#0B0F19" stopOpacity="1"/>
            </linearGradient>
          </defs>
          {/* Castle body */}
          <path
            d="M0,240 L0,180 L40,180 L40,140 L55,140 L55,120 L70,120 L70,140 L85,140 L85,180
               L120,180 L120,100 L130,80 L140,100 L140,180
               L175,180 L175,150 L190,150 L190,130 L210,130 L210,150 L225,150 L225,180
               L270,180 L270,120 L285,120 L285,75 L295,55 L305,75 L305,120 L320,120 L320,180
               L380,180 L380,160 L395,160 L395,140 L415,140 L415,160 L430,160 L430,180
               L490,180 L490,100 L505,100 L505,68 L515,45 L525,68 L525,100 L540,100 L540,180
               L600,180 L600,150 L615,150 L615,130 L635,130 L635,150 L650,150 L650,180
               L710,180 L710,110 L725,110 L725,78 L735,52 L745,78 L745,110 L760,110 L760,180
               L820,180 L820,160 L835,160 L835,140 L855,140 L855,160 L870,160 L870,180
               L930,180 L930,100 L945,100 L945,68 L955,42 L965,68 L965,100 L980,100 L980,180
               L1040,180 L1040,150 L1055,150 L1055,130 L1075,130 L1075,150 L1090,150 L1090,180
               L1150,180 L1150,110 L1165,110 L1165,76 L1175,50 L1185,76 L1185,110 L1200,110 L1200,180
               L1260,180 L1260,140 L1275,140 L1275,120 L1295,120 L1295,140 L1310,140 L1310,180
               L1370,180 L1370,160 L1385,160 L1385,140 L1405,140 L1405,160 L1420,160 L1420,180
               L1440,180 L1440,240 Z"
            fill="url(#castleGrad)"
          />
          {/* Lit windows */}
          {[
            [130,85],[295,60],[515,50],[735,57],[955,47],[1175,55],
            [191,135],[415,145],[615,135],[835,145],[1055,135],[1275,125],
          ].map(([x, y], i) => (
            <g key={i}>
              <rect x={x-4} y={y} width={8} height={10} rx={2}
                fill={i % 3 === 0 ? 'rgba(212,175,55,0.8)' : i % 3 === 1 ? 'rgba(34,197,94,0.6)' : 'rgba(139,92,246,0.6)'}
                filter="url(#winGlow2)" />
            </g>
          ))}
        </svg>
      </div>

      {/* Mist layer at bottom */}
      <motion.div
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '35%', zIndex: 2, pointerEvents: 'none',
          background: 'linear-gradient(0deg, rgba(11,15,25,0.5) 0%, transparent 100%)',
        }}
        animate={{ opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* ---- Main content row ---- */}
      <motion.div
      className="hero-row"
        style={{
          position: 'relative', zIndex: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4rem',
          padding: '2rem 2rem 5rem',
          maxWidth: '1200px',
          width: '100%',
          flexWrap: 'wrap',
          opacity: heroOpacity,
          y: heroY,
        }}
      >
        {/* ---- Left: Text content ---- */}
        <div className="hero-text" style={{ flex: '1 1 480px', textAlign: 'center' }}>
          {/* Rune sparkles */}
          {['✦', '⚡', '✧', '◈', '⌬', '✦', '⚡'].map((rune, i) => (
            <motion.span
              key={i}
              style={{
                position: 'absolute',
                top: `${20 + (i % 3) * 15}%`,
                left: `${4 + i * 8}%`,
                color: i % 2 === 0 ? '#D4AF37' : '#22C55E',
                fontSize: '0.9rem',
                pointerEvents: 'none',
              }}
              animate={{ y: [0, -12, 0], opacity: [0.25, 0.7, 0.25], rotate: [0, 20, 0] }}
              transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
            >
              {rune}
            </motion.span>
          ))}

          {/* Greeting badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.4rem 1.2rem',
              background: 'rgba(212,175,55,0.1)',
              border: '1px solid rgba(212,175,55,0.35)',
              borderRadius: '99px',
              marginBottom: '1.5rem',
              color: '#D4AF37',
              fontSize: '0.75rem',
              fontFamily: 'Cinzel, serif',
              letterSpacing: '0.12em',
            }}
          >
            <motion.span animate={{ rotate: [0, 20, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>✦</motion.span>
            Welcome to my Spellbook
            <motion.span animate={{ rotate: [0, -20, 0] }} transition={{ duration: 2, repeat: Infinity }}>✦</motion.span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            className="hero-h1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 'clamp(2rem, 5.5vw, 4.2rem)',
              fontWeight: 900,
              lineHeight: 1.15,
              marginBottom: '0.75rem',
            }}
          >
            <span style={{ color: '#F9FAFB' }}>Hi, I'm </span>
            <motion.span
              className="shimmer-text"
              style={{ display: 'block' }}
              animate={{
                textShadow: [
                  '0 0 20px rgba(212,175,55,0.3)',
                  '0 0 50px rgba(212,175,55,0.7)',
                  '0 0 20px rgba(212,175,55,0.3)',
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              Dinu Anand C R
            </motion.span>
          </motion.h1>

          {/* Typing text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            style={{
              fontSize: 'clamp(0.95rem, 2.2vw, 1.3rem)',
              fontFamily: 'Crimson Text, serif',
              color: '#22C55E',
              fontWeight: 600,
              marginBottom: '1.25rem',
              minHeight: '2rem',
              textShadow: '0 0 12px rgba(34,197,94,0.5)',
            }}
          >
            {typedText}
            <span className="typing-cursor" />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            style={{
              maxWidth: '540px',
              margin: '0 auto 2.5rem',
              fontSize: '1rem',
              color: '#A1A1AA',
              lineHeight: 1.8,
              fontFamily: 'Crimson Text, serif',
            }}
          >
            A detail-oriented Computer Science Engineering student passionate about building scalable
            full-stack applications, real-time systems, DevOps pipelines, and efficient software solutions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="hero-buttons"
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2.5rem' }}
          >
            <motion.button
              className="btn-magic btn-magic-filled"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              ✦ Explore My Work
            </motion.button>
            <motion.button
              className="btn-magic btn-magic-green"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              ⚡ Contact Me
            </motion.button>
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', justifyContent: 'center' }}
          >
            {[
              { icon: <FaGithub size={20} />,   href: 'https://github.com/DINUANAND-R',         label: 'GitHub',   color: '#D4AF37' },
              { icon: <FaLinkedin size={20} />, href: 'https://linkedin.com/in/dinu-anand-c-r', label: 'LinkedIn', color: '#22C55E' },
              { icon: <FaCode size={20} />,     href: 'https://leetcode.com/u/DINUANAND',       label: 'LeetCode', color: '#8B5CF6' },
            ].map(social => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ scale: 1.2, rotate: 6 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '44px', height: '44px',
                  borderRadius: '50%',
                  border: `1px solid ${social.color}40`,
                  color: social.color,
                  background: `${social.color}10`,
                  cursor: 'none',
                  textDecoration: 'none',
                  transition: 'box-shadow 0.3s',
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 18px ${social.color}70`}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* ---- Right: Floating code window ---- */}
        <div className="hero-code" style={{ flex: '0 1 360px', display: 'flex', justifyContent: 'center', width: '100%' }}>
          <FloatingCodeWindow />
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        style={{
          position: 'absolute', bottom: '1.5rem', left: '50%',
          transform: 'translateX(-50%)',
          background: 'none', border: 'none',
          color: '#D4AF37', cursor: 'none', zIndex: 4,
        }}
        aria-label="Scroll down"
      >
        <ChevronDown size={28} style={{ filter: 'drop-shadow(0 0 6px #D4AF37)' }} />
      </motion.button>
    </section>
  );
}
