/* ============================================================
   Achievements.jsx — Vertical animated golden timeline.
   Fully responsive: alternating left/right on desktop,
   single-column on tablet/mobile via CSS classNames.
   ============================================================ */
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { achievements } from '../data/achievements';

const accentMap = {
  gold:   { color: '#D4AF37', glow: 'rgba(212,175,55,0.4)', bg: 'rgba(212,175,55,0.07)' },
  green:  { color: '#22C55E', glow: 'rgba(34,197,94,0.4)',  bg: 'rgba(34,197,94,0.07)'  },
  purple: { color: '#8B5CF6', glow: 'rgba(139,92,246,0.4)', bg: 'rgba(139,92,246,0.07)' },
};

function AchievementItem({ ach, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const isLeft = index % 2 === 0;
  const accent = accentMap[ach.accent];

  return (
    <motion.div
      ref={ref}
      className="ach-item"
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.1 + index * 0.08, ease: 'easeOut' }}
      style={{
        display: 'flex',
        justifyContent: isLeft ? 'flex-end' : 'flex-start',
        paddingRight: isLeft ? 'calc(50% + 1.5rem)' : '0',
        paddingLeft:  isLeft ? '0' : 'calc(50% + 1.5rem)',
        marginBottom: '2.5rem',
        position: 'relative',
      }}
    >
      {/* Timeline dot */}
      <motion.div
        className="ach-dot"
        style={{
          position: 'absolute',
          left: '50%',
          top: '1rem',
          transform: 'translateX(-50%)',
          width: '14px', height: '14px',
          borderRadius: '50%',
          background: accent.color,
          border: '2px solid var(--bg-color)',
          boxShadow: `0 0 12px ${accent.glow}`,
          zIndex: 2,
        }}
        animate={{
          scale: [1, 1.3, 1],
          boxShadow: [
            `0 0 8px ${accent.glow}`,
            `0 0 20px ${accent.glow}`,
            `0 0 8px ${accent.glow}`,
          ],
        }}
        transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
      />

      {/* Card */}
      <motion.div
        whileHover={{ scale: 1.03, y: -3 }}
        className="magic-card timeline-card"
        style={{
          padding: '1.25rem 1.5rem',
          maxWidth: '380px',
          width: '100%',
          borderColor: `${accent.color}25`,
          background: `linear-gradient(135deg, ${accent.bg}, var(--card-color))`,
          cursor: 'none',
        }}
        onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 25px ${accent.glow}`}
        onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <motion.span
            style={{ fontSize: '1.5rem' }}
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: index * 0.4 }}
          >
            {ach.icon}
          </motion.span>
          <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', color: accent.color, letterSpacing: '0.12em' }}>
            {ach.year}
          </span>
        </div>
        <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '0.9rem', fontWeight: 700, color: accent.color, marginBottom: '0.4rem' }}>
          {ach.title}
        </h3>
        <p style={{ color: '#A1A1AA', lineHeight: 1.65, fontFamily: 'Crimson Text, serif', fontSize: '0.9rem' }}>
          {ach.description}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function Achievements() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="achievements" style={{ position: 'relative', zIndex: 2 }}>
      <div className="section-container" ref={ref}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="ornament">
            <div className="ornament-line" />
            <span className="ornament-star">🏆</span>
            <div className="ornament-line right" />
          </div>
          <h2 className="section-title">Achievements</h2>
          <div className="section-divider" />
          <p className="section-subtitle">Milestones etched in the annals of time</p>
        </motion.div>

        {/* Timeline wrapper */}
        <div style={{ position: 'relative', paddingTop: '1rem' }}>
          {/* Glowing center line */}
          <div
            className="timeline-center-line"
            style={{
              position: 'absolute',
              left: '50%',
              top: 0, bottom: 0,
              width: '2px',
              background: 'linear-gradient(180deg, transparent, #D4AF37 20%, #D4AF37 80%, transparent)',
              transform: 'translateX(-50%)',
              animation: 'glow-line 2.5s ease-in-out infinite',
            }}
          />

          {achievements.map((ach, i) => (
            <AchievementItem key={ach.id} ach={ach} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
