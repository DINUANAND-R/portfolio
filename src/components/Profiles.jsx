/* ============================================================
   Profiles.jsx — Developer profile token cards with magical
   glow hover effects. Equal heights via flex; Visit Profile
   pinned to card bottom.
   ============================================================ */
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub, FaLinkedin, FaCode } from 'react-icons/fa6';

const profiles = [
  {
    platform: 'GitHub',
    handle: 'DINUANAND-R',
    url: 'https://github.com/DINUANAND-R',
    description: 'Open-source projects, personal repositories, and collaborative codebases',
    stat: '4+ Projects',
    statIcon: '📂',
    icon: <FaGithub size={28} />,
    accent: '#D4AF37',
    glow: 'rgba(212,175,55,0.4)',
    bg: 'rgba(212,175,55,0.07)',
    badge: '✦',
  },
  {
    platform: 'LinkedIn',
    handle: 'dinu-anand-c-r',
    url: 'https://linkedin.com/in/dinu-anand-c-r',
    description: 'Professional network, career journey, experiences, and achievements',
    stat: 'Open to Work',
    statIcon: '🤝',
    icon: <FaLinkedin size={28} />,
    accent: '#22C55E',
    glow: 'rgba(34,197,94,0.4)',
    bg: 'rgba(34,197,94,0.07)',
    badge: '⚡',
  },
  {
    platform: 'LeetCode',
    handle: 'DINU ANAND C R',
    url: 'https://leetcode.com/u/DINUANAND',
    description: 'Data Structures & Algorithms practice — 250+ problems solved across all difficulty levels',
    stat: '250+ Solved',
    statIcon: '⚡',
    icon: <FaCode size={28} />,
    accent: '#8B5CF6',
    glow: 'rgba(139,92,246,0.4)',
    bg: 'rgba(139,92,246,0.07)',
    badge: '🔮',
  },
];

export default function Profiles() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="profiles" style={{ position: 'relative', zIndex: 2 }}>
      <div className="section-container" ref={ref}>

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="ornament">
            <div className="ornament-line" />
            <span className="ornament-star">⚡</span>
            <div className="ornament-line right" />
          </div>
          <h2 className="section-title">Developer Profiles</h2>
          <div className="section-divider" />
          <p className="section-subtitle">Where my code lives and breathes</p>
        </motion.div>

        {/* ── Cards grid ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
            gap: '1.75rem',
            marginTop: '1rem',
            alignItems: 'stretch',  /* all cells same height */
          }}
        >
          {profiles.map((profile, i) => (
            <motion.div
              key={profile.platform}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              /* Fill the grid cell height */
              style={{ height: '100%' }}
            >
              <a
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                {/* ── Card shell ── */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,                      /* grow to fill <a> */
                    background: `linear-gradient(135deg, ${profile.bg}, var(--card-color))`,
                    border: `1px solid ${profile.accent}28`,
                    borderRadius: '14px',
                    padding: '2rem 1.75rem 1.5rem',
                    textAlign: 'center',
                    cursor: 'none',
                    transition: 'box-shadow 0.3s, border-color 0.3s',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = `0 0 32px ${profile.glow}, 0 8px 32px rgba(0,0,0,0.4)`;
                    e.currentTarget.style.borderColor = `${profile.accent}55`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = `${profile.accent}28`;
                  }}
                >
                  {/* Corner rune */}
                  <motion.span
                    style={{
                      position: 'absolute', top: '1rem', right: '1.1rem',
                      fontSize: '1rem', color: profile.accent, opacity: 0.25,
                      fontFamily: 'Cinzel, serif',
                    }}
                    animate={{ rotate: [0, 20, 0], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                  >
                    {profile.badge}
                  </motion.span>

                  {/* ── Top content (grows) ── */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    {/* Icon circle */}
                    <motion.div
                      animate={{
                        boxShadow: [
                          `0 0 10px ${profile.glow}`,
                          `0 0 28px ${profile.glow}`,
                          `0 0 10px ${profile.glow}`,
                        ],
                      }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
                      style={{
                        width: '76px', height: '76px',
                        borderRadius: '50%',
                        border: `2px solid ${profile.accent}50`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        marginBottom: '1.25rem',
                        color: profile.accent,
                        background: `radial-gradient(circle at 40% 35%, ${profile.bg}, rgba(11,15,25,0.8))`,
                      }}
                    >
                      {profile.icon}
                    </motion.div>

                    {/* Platform name */}
                    <h3
                      style={{
                        fontFamily: 'Cinzel, serif',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: profile.accent,
                        marginBottom: '0.3rem',
                        textShadow: `0 0 12px ${profile.glow}`,
                        letterSpacing: '0.05em',
                      }}
                    >
                      {profile.platform}
                    </h3>

                    {/* Handle */}
                    <p
                      style={{
                        color: '#52525B',
                        fontSize: '0.75rem',
                        fontFamily: 'Cinzel, serif',
                        letterSpacing: '0.08em',
                        marginBottom: '0.85rem',
                      }}
                    >
                      @{profile.handle}
                    </p>

                    {/* Stat pill */}
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.3rem 0.9rem',
                        background: `${profile.accent}12`,
                        border: `1px solid ${profile.accent}30`,
                        borderRadius: '99px',
                        marginBottom: '1rem',
                        color: profile.accent,
                        fontSize: '0.72rem',
                        fontFamily: 'Cinzel, serif',
                        letterSpacing: '0.06em',
                      }}
                    >
                      <span>{profile.statIcon}</span>
                      {profile.stat}
                    </div>

                    {/* Description */}
                    <p
                      style={{
                        color: '#A1A1AA',
                        fontSize: '0.88rem',
                        lineHeight: 1.65,
                        fontFamily: 'Crimson Text, serif',
                        fontSize: '0.95rem',
                      }}
                    >
                      {profile.description}
                    </p>
                  </div>

                  {/* ── Divider ── */}
                  <motion.div
                    style={{
                      height: '1px',
                      margin: '1.25rem 0 1rem',
                      background: `linear-gradient(90deg, transparent, ${profile.accent}40, transparent)`,
                    }}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                  />

                  {/* ── "Visit Profile" — always at bottom ── */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.45rem',
                      color: profile.accent,
                      fontSize: '0.78rem',
                      fontFamily: 'Cinzel, serif',
                      letterSpacing: '0.1em',
                    }}
                  >
                    <ExternalLink size={13} />
                    VISIT PROFILE
                  </div>

                  {/* Animated bottom glow bar */}
                  <motion.div
                    style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      height: '2px',
                      background: `linear-gradient(90deg, transparent, ${profile.accent}80, transparent)`,
                    }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  />
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
