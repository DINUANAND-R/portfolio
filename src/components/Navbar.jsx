/* ============================================================
   Navbar.jsx — Fixed glassmorphism navbar with scroll glow
   ============================================================ */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home',          href: '#home' },
  { label: 'About',         href: '#about' },
  { label: 'Skills',        href: '#skills' },
  { label: 'Projects',      href: '#projects' },
  { label: 'Certifications',href: '#certifications' },
  { label: 'Achievements',  href: '#achievements' },
  { label: 'Contact',       href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState('#home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setActive(href);
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: '0 2rem',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled
          ? 'rgba(11,15,25,0.85)'
          : 'rgba(11,15,25,0.4)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: scrolled
          ? '1px solid rgba(212,175,55,0.3)'
          : '1px solid rgba(212,175,55,0.1)',
        boxShadow: scrolled
          ? '0 4px 30px rgba(212,175,55,0.12), 0 2px 8px rgba(0,0,0,0.5)'
          : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      {/* Logo */}
      <motion.div
        whileHover={{ scale: 1.04 }}
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'none' }}
        onClick={() => handleNav('#home')}
      >
        <motion.span
          animate={{ rotate: [0, 15, -10, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Sparkles size={20} style={{ color: '#D4AF37' }} />
        </motion.span>
        <span style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '1.05rem',
          fontWeight: 700,
          color: '#D4AF37',
          letterSpacing: '0.1em',
          textShadow: '0 0 14px rgba(212,175,55,0.5)',
        }}>
          DINU ANAND
        </span>
      </motion.div>

      {/* Desktop Links */}
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="nav-desktop">
        {navLinks.map(link => (
          <button
            key={link.href}
            className={`nav-link ${active === link.href ? 'active' : ''}`}
            onClick={() => handleNav(link.href)}
            style={{ background: 'none', border: 'none' }}
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* Hamburger */}
      <button
        className="nav-hamburger"
        onClick={() => setMenuOpen(v => !v)}
        style={{ background: 'none', border: 'none', color: '#D4AF37', cursor: 'none', display: 'none' }}
        aria-label="Toggle menu"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: '64px', left: 0, right: 0,
              background: 'rgba(11,15,25,0.97)',
              backdropFilter: 'blur(14px)',
              borderBottom: '1px solid rgba(212,175,55,0.25)',
              display: 'flex',
              flexDirection: 'column',
              padding: '1.5rem 2rem',
              gap: '1.25rem',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`nav-link ${active === link.href ? 'active' : ''}`}
                onClick={() => handleNav(link.href)}
                style={{ background: 'none', border: 'none', textAlign: 'left' }}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
      `}</style>
    </motion.nav>
  );
}
