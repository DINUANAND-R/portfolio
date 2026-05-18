/* ============================================================
   Footer.jsx — Magical footer with floating sparks
   ============================================================ */
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { FaGithub, FaLinkedin, FaCode } from 'react-icons/fa6';

const socials = [
  { icon: <FaGithub size={18} />, href: 'https://github.com/DINUANAND-R', label: 'GitHub', color: '#D4AF37' },
  { icon: <FaLinkedin size={18} />, href: 'https://linkedin.com/in/dinu-anand-c-r', label: 'LinkedIn', color: '#22C55E' },
  { icon: <FaCode size={18} />, href: 'https://leetcode.com/u/DINUANAND', label: 'LeetCode', color: '#8B5CF6' },
];

const sparks = ['✦', '⚡', '✧', '◈', '⌬', '✦'];

export default function Footer() {
  return (
    <footer style={{
      position: 'relative', zIndex: 2,
      borderTop: '1px solid rgba(212,175,55,0.15)',
      background: 'rgba(11,15,25,0.9)',
      padding: '2.5rem 2rem',
      textAlign: 'center',
      overflow: 'hidden',
    }}>
      {/* Floating sparks */}
      {sparks.map((spark, i) => (
        <motion.span
          key={i}
          style={{
            position: 'absolute',
            bottom: `${20 + i * 8}%`,
            left: `${8 + i * 14}%`,
            fontSize: '0.8rem',
            color: i % 2 === 0 ? '#D4AF37' : '#22C55E',
            pointerEvents: 'none',
          }}
          animate={{ y: [0, -15, 0], opacity: [0.3, 0.9, 0.3], rotate: [0, 15, 0] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
        >
          {spark}
        </motion.span>
      ))}

      {/* Logo */}
      <motion.div
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}
        whileHover={{ scale: 1.04 }}
      >
        <Sparkles size={16} style={{ color: '#D4AF37' }} />
        <span style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '1rem',
          fontWeight: 700,
          color: '#D4AF37',
          letterSpacing: '0.12em',
          textShadow: '0 0 12px rgba(212,175,55,0.5)',
        }}>
          DINU ANAND
        </span>
      </motion.div>

      {/* Social icons */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
        {socials.map(s => (
          <motion.a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            whileHover={{ scale: 1.25, rotate: 6 }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '38px', height: '38px',
              borderRadius: '50%',
              border: `1px solid ${s.color}40`,
              color: s.color,
              background: `${s.color}10`,
              cursor: 'none',
              textDecoration: 'none',
              transition: 'box-shadow 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 14px ${s.color}60`}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
          >
            {s.icon}
          </motion.a>
        ))}
      </div>

      {/* Divider */}
      <div style={{
        width: '120px', height: '1px',
        background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
        margin: '0 auto 1.25rem',
      }} />

      {/* Copyright */}
      <p style={{
        fontFamily: 'Crimson Text, serif',
        fontSize: '0.95rem',
        color: '#71717A',
        letterSpacing: '0.02em',
      }}>
        © 2026 <span style={{ color: '#D4AF37' }}>Dinu Anand C R</span>.{' '}
        Crafted with code, creativity, and magic.
      </p>

      <p style={{ color: '#3F3F46', fontSize: '0.75rem', marginTop: '0.5rem', fontFamily: 'Cinzel, serif', letterSpacing: '0.08em' }}>
        ✦ B.E. Computer Science & Engineering · Kongu Engineering College ✦
      </p>
    </footer>
  );
}
