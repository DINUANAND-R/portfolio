/* ============================================================
   Skills.jsx — Magical Spellbook with animated skill cards,
   chapter headers, floating particles on hover
   ============================================================ */
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skillCategories } from '../data/skills';

const accentColors = {
  gold:   { color: '#D4AF37', glow: 'rgba(212,175,55,0.35)', bg: 'rgba(212,175,55,0.07)' },
  green:  { color: '#22C55E', glow: 'rgba(34,197,94,0.35)',  bg: 'rgba(34,197,94,0.07)'  },
  purple: { color: '#8B5CF6', glow: 'rgba(139,92,246,0.35)', bg: 'rgba(139,92,246,0.07)' },
};

function SkillChip({ skill, accent, delay }) {
  const colors = accentColors[accent];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.08, y: -4 }}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        padding: '0.55rem 1.1rem',
        background: colors.bg,
        border: `1px solid ${colors.color}30`,
        borderRadius: '6px',
        cursor: 'none',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = colors.color;
        e.currentTarget.style.boxShadow = `0 0 16px ${colors.glow}`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = `${colors.color}30`;
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <motion.span
        style={{ fontSize: '1.1rem' }}
        animate={{ rotate: [0, 8, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: Math.random() * 2 }}
      >
        {skill.icon}
      </motion.span>
      <span style={{ color: '#D4D4D8', fontSize: '0.85rem', fontWeight: 500 }}>
        {skill.name}
      </span>
    </motion.div>
  );
}

function CategoryCard({ cat, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const colors = accentColors[cat.accent];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: 'easeOut' }}
      style={{
        background: 'var(--card-color)',
        border: `1px solid ${colors.color}25`,
        borderRadius: '10px',
        padding: '1.75rem',
        position: 'relative',
        overflow: 'hidden',
        transition: 'box-shadow 0.3s',
      }}
      whileHover={{ boxShadow: `0 0 30px ${colors.glow}` }}
    >
      {/* Corner rune */}
      <span style={{
        position: 'absolute', top: '0.75rem', right: '1rem',
        fontSize: '1.4rem', color: colors.color, opacity: 0.25,
      }}>
        {cat.rune}
      </span>

      {/* Chapter label */}
      <div style={{
        fontFamily: 'Cinzel, serif', fontSize: '0.65rem',
        color: colors.color, letterSpacing: '0.15em',
        marginBottom: '0.3rem', opacity: 0.8,
      }}>
        {cat.chapter}
      </div>

      {/* Category title */}
      <h3 style={{
        fontFamily: 'Cinzel, serif', fontSize: '1rem',
        fontWeight: 700, color: colors.color,
        marginBottom: '1.25rem',
        textShadow: `0 0 10px ${colors.glow}`,
      }}>
        {cat.title}
      </h3>

      {/* Skills grid */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
        {cat.skills.map((skill, i) => (
          <SkillChip key={skill.name} skill={skill} accent={cat.accent} delay={i * 0.05} />
        ))}
      </div>

      {/* Decorative bottom line */}
      <motion.div
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${colors.color}60, transparent)`,
        }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, delay }}
      />
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" style={{ position: 'relative', zIndex: 2 }}>
      <div className="section-container" ref={ref}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <div className="ornament">
            <div className="ornament-line" />
            <span className="ornament-star">⌬</span>
            <div className="ornament-line right" />
          </div>
          <h2 className="section-title">Technical Spellbook</h2>
          <div className="section-divider" />
          <p className="section-subtitle">Arcane arts mastered through study and practice</p>
        </motion.div>

        {/* Spellbook grid */}
        <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {skillCategories.map((cat, i) => (
            <CategoryCard key={cat.id} cat={cat} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
