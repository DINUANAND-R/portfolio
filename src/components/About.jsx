/* ============================================================
   About.jsx — Parchment-style About section with education
   timeline and animated stat cards
   ============================================================ */
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { BookOpen, GraduationCap, School } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' },
  }),
};

const stats = [
  { value: '250+', label: 'LeetCode Problems Solved', icon: '⚡', accent: '#D4AF37' },
  { value: '5+',   label: 'Major Projects Built',       icon: '🏗️', accent: '#22C55E' },
  { value: '6+',   label: 'Hackathon Participations',   icon: '🚀', accent: '#8B5CF6' },
  { value: '2',    label: 'Specialisations (FS & DevOps)', icon: '🔮', accent: '#D4AF37' },
];

const education = [
  {
    degree: 'B.E. Computer Science & Engineering',
    school: 'Kongu Engineering College, Erode',
    year: '2023 – 2027',
    icon: <GraduationCap size={18} />,
    accent: '#D4AF37',
  },
  {
    degree: 'Higher Secondary Education',
    school: 'M R S Matriculation School',
    year: '2022 – 2023',
    icon: <School size={18} />,
    accent: '#22C55E',
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" style={{ position: 'relative', zIndex: 2 }}>
      <div className="section-container" ref={ref}>
        {/* Section header */}
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <div className="ornament">
            <div className="ornament-line" />
            <span className="ornament-star">✦</span>
            <div className="ornament-line right" />
          </div>
          <h2 className="section-title">About Me</h2>
          <div className="section-divider" />
          <p className="section-subtitle">The story so far…</p>
        </motion.div>

        {/* Main content grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', marginTop: '1rem' }}>

          {/* Left — parchment bio */}
          <motion.div
            custom={1} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          >
            <div
              className="parchment-card"
              style={{ padding: '2rem', height: '100%' }}
            >
              {/* Open book SVG accent */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <BookOpen size={22} style={{ color: '#D4AF37' }} />
                <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.8rem', color: '#D4AF37', letterSpacing: '0.1em' }}>
                  MY CHRONICLE
                </span>
              </div>
              <p style={{ color: '#D4D4D8', lineHeight: 1.85, fontFamily: 'Crimson Text, serif', fontSize: '1.05rem' }}>
                I am <span style={{ color: '#D4AF37', fontWeight: 600 }}>Dinu Anand C R</span>, a Computer Science and
                Engineering student at{' '}
                <span style={{ color: '#22C55E' }}>Kongu Engineering College, Erode</span>. I am passionate about
                software development, full-stack web applications, DevOps workflows, and solving real-world problems
                through technology.
              </p>
              <p style={{ color: '#A1A1AA', lineHeight: 1.85, fontFamily: 'Crimson Text, serif', fontSize: '1.05rem', marginTop: '1rem' }}>
                I have hands-on experience in MERN stack applications, real-time chat systems, appointment booking
                systems, inventory and billing software, and deployment-ready projects using{' '}
                <span style={{ color: '#8B5CF6' }}>Docker, Jenkins, Kubernetes, and AWS</span>.
              </p>

              {/* Education timeline inside parchment */}
              <div style={{ marginTop: '1.75rem' }}>
                <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.75rem', color: '#D4AF37', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                  ✦ EDUCATION
                </div>
                {education.map((edu, i) => (
                  <motion.div
                    key={i}
                    custom={i + 2}
                    variants={fadeUp}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    style={{
                      display: 'flex', gap: '1rem', alignItems: 'flex-start',
                      paddingLeft: '1rem',
                      borderLeft: `2px solid ${edu.accent}40`,
                      marginBottom: '1.25rem',
                      paddingBottom: '0.25rem',
                    }}
                  >
                    <span style={{ color: edu.accent, marginTop: '0.2rem' }}>{edu.icon}</span>
                    <div>
                      <p style={{ color: '#F9FAFB', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.2rem' }}>{edu.degree}</p>
                      <p style={{ color: edu.accent, fontSize: '0.82rem' }}>{edu.school}</p>
                      <p style={{ color: '#71717A', fontSize: '0.78rem', marginTop: '0.15rem', fontFamily: 'Cinzel, serif' }}>{edu.year}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Stat achievement scrolls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                custom={i + 3}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                whileHover={{ scale: 1.03, x: 6 }}
                className="magic-card magic-border"
                style={{
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  borderRadius: '8px',
                }}
              >
                <motion.span
                  style={{ fontSize: '2rem' }}
                  animate={{ scale: [1, 1.15, 1], rotate: [0, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                >
                  {stat.icon}
                </motion.span>
                <div>
                  <div style={{
                    fontFamily: 'Cinzel, serif',
                    fontSize: '1.6rem',
                    fontWeight: 700,
                    color: stat.accent,
                    textShadow: `0 0 14px ${stat.accent}80`,
                  }}>
                    {stat.value}
                  </div>
                  <div style={{ color: '#A1A1AA', fontSize: '0.85rem', marginTop: '0.1rem' }}>
                    {stat.label}
                  </div>
                </div>
                {/* Shimmer accent */}
                <motion.div
                  style={{
                    marginLeft: 'auto',
                    width: '3px', height: '40px',
                    background: `linear-gradient(180deg, transparent, ${stat.accent}, transparent)`,
                    borderRadius: '2px',
                  }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
