/* ============================================================
   Projects.jsx — Ancient scroll archive project cards
   with 3D tilt, glowing borders, tech badges
   ============================================================ */
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, CheckCircle2, Calendar, Layers } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { projects } from '../data/projects';

const accentMap = {
  gold:   { color: '#D4AF37', glow: 'rgba(212,175,55,0.3)', bg: 'rgba(212,175,55,0.08)', badge: 'gold' },
  green:  { color: '#22C55E', glow: 'rgba(34,197,94,0.3)',  bg: 'rgba(34,197,94,0.08)',  badge: 'green' },
  purple: { color: '#8B5CF6', glow: 'rgba(139,92,246,0.3)', bg: 'rgba(139,92,246,0.08)', badge: 'purple' },
};

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const accent = accentMap[project.accent];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x, y });
  };

  return (
    /* Framer motion handles fade-up; inner div handles 3D tilt separately */
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: 'easeOut' }}
      style={{ height: '100%' }}
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        style={{
          transform: `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          transition: 'transform 0.18s ease',
          height: '100%',
        }}
      >
        <div
          className="magic-card"
          style={{
            padding: '1.75rem',
            borderColor: `${accent.color}25`,
            background: `linear-gradient(135deg, ${accent.bg}, var(--card-color))`,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 35px ${accent.glow}, 0 12px 40px rgba(0,0,0,0.5)`}
          onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                <Calendar size={13} style={{ color: accent.color }} />
                <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', color: accent.color, letterSpacing: '0.12em' }}>
                  {project.year || '2025'}
                </span>
              </div>
              <h3 style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '1.05rem',
                fontWeight: 700,
                color: accent.color,
                textShadow: `0 0 10px ${accent.glow}`,
                marginBottom: '0.25rem',
              }}>
                {project.title}
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Layers size={12} style={{ color: '#71717A' }} />
                <span style={{ color: '#71717A', fontSize: '0.75rem' }}>{project.type}</span>
              </div>
            </div>
            {/* Scroll icon accent */}
            <motion.span
              style={{ fontSize: '1.8rem', opacity: 0.3 }}
              animate={{ rotate: [0, 5, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
            >
              📜
            </motion.span>
          </div>

          {/* Description */}
          <p style={{ color: '#A1A1AA', lineHeight: 1.7, marginBottom: '1.25rem', fontFamily: 'Crimson Text, serif', fontSize: '0.95rem' }}>
            {project.description}
          </p>

          {/* Features */}
          <div style={{ marginBottom: '1.25rem', flex: 1 }}>
            <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', color: accent.color, letterSpacing: '0.1em', marginBottom: '0.6rem' }}>
              ✦ KEY FEATURES
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {project.features.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={13} style={{ color: accent.color, flexShrink: 0 }} />
                  <span style={{ color: '#D4D4D8', fontSize: '0.82rem' }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
            {project.tech.map(t => (
              <span key={t} className={`tech-badge${project.accent === 'green' ? ' tech-badge-green' : project.accent === 'purple' ? ' tech-badge-purple' : ''}`}>
                {t}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="btn-magic"
              style={{ flex: 1, textAlign: 'center', fontSize: '0.75rem', padding: '0.55rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', textDecoration: 'none' }}
            >
              <FaGithub size={14} /> GitHub
            </motion.a>
            {project.demo && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="btn-magic btn-magic-green"
                style={{ flex: 1, textAlign: 'center', fontSize: '0.75rem', padding: '0.55rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', textDecoration: 'none' }}
              >
                <ExternalLink size={14} /> Demo
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" style={{ position: 'relative', zIndex: 2, overflow: 'hidden' }}>
      <div className="section-container" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <div className="ornament">
            <div className="ornament-line" />
            <span className="ornament-star">📜</span>
            <div className="ornament-line right" />
          </div>
          <h2 className="section-title">Projects Archive</h2>
          <div className="section-divider" />
          <p className="section-subtitle">Artefacts forged through code and conjuration</p>
        </motion.div>

        <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.75rem', alignItems: 'start' }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
