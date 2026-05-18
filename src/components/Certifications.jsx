/* ============================================================
   Certifications.jsx — Magical seal / badge certification cards
   ============================================================ */
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { certifications } from '../data/achievements';
import { Award } from 'lucide-react';

const accentMap = {
  gold:   { color: '#D4AF37', glow: 'rgba(212,175,55,0.4)', bg: 'rgba(212,175,55,0.07)' },
  green:  { color: '#22C55E', glow: 'rgba(34,197,94,0.4)',  bg: 'rgba(34,197,94,0.07)'  },
  purple: { color: '#8B5CF6', glow: 'rgba(139,92,246,0.4)', bg: 'rgba(139,92,246,0.07)' },
};

function CertCard({ cert, index }) {
  const accent = accentMap[cert.accent];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.15 }}
      whileHover={{ scale: 1.04, y: -6 }}
      style={{
        background: `linear-gradient(135deg, ${accent.bg}, var(--card-color))`,
        border: `1px solid ${accent.color}30`,
        borderRadius: '12px',
        padding: '2rem 1.5rem',
        textAlign: 'center',
        cursor: 'none',
        position: 'relative',
        overflow: 'hidden',
        transition: 'box-shadow 0.3s',
      }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 30px ${accent.glow}`}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      {/* Shimmer overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(135deg, transparent 40%, ${accent.color}08 60%, transparent 80%)`,
        backgroundSize: '200% 200%',
        animation: 'shimmer 4s linear infinite',
        pointerEvents: 'none',
      }} />

      {/* Seal icon */}
      <motion.div
        animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
        style={{
          fontSize: '2.5rem',
          marginBottom: '1rem',
          filter: `drop-shadow(0 0 12px ${accent.glow})`,
        }}
      >
        {cert.icon}
      </motion.div>

      {/* Golden seal ring */}
      <div style={{
        width: '60px', height: '60px',
        borderRadius: '50%',
        border: `2px solid ${accent.color}60`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '-4.5rem auto 1rem',
        background: `radial-gradient(circle, ${accent.bg}, transparent)`,
        boxShadow: `0 0 15px ${accent.glow}`,
      }} />

      <Award size={20} style={{ color: accent.color, marginBottom: '0.75rem', margin: '-3.5rem auto 0.75rem', display: 'block' }} />

      <h3 style={{
        fontFamily: 'Cinzel, serif',
        fontSize: '0.95rem',
        fontWeight: 700,
        color: accent.color,
        marginBottom: '0.4rem',
        textShadow: `0 0 10px ${accent.glow}`,
      }}>
        {cert.title}
      </h3>
      <p style={{ color: '#71717A', fontSize: '0.8rem', fontFamily: 'Crimson Text, serif' }}>
        {cert.issuer}
      </p>

      {/* Animated border bottom */}
      <motion.div
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${accent.color}, transparent)`,
        }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay: index * 0.4 }}
      />
    </motion.div>
  );
}

export default function Certifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="certifications" style={{ position: 'relative', zIndex: 2 }}>
      <div className="section-container" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <div className="ornament">
            <div className="ornament-line" />
            <span className="ornament-star">🔮</span>
            <div className="ornament-line right" />
          </div>
          <h2 className="section-title">Certifications</h2>
          <div className="section-divider" />
          <p className="section-subtitle">Seals of mastery bestowed upon the worthy</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
          {certifications.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
