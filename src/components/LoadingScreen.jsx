/* ============================================================
   LoadingScreen.jsx — Cinematic intro splash
   Fades out after ~2s to reveal the portfolio
   ============================================================ */
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9000,
            background: '#0B0F19',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
          }}
        >
          {/* Spinning runic ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            style={{
              width: '90px', height: '90px',
              borderRadius: '50%',
              border: '2px solid transparent',
              borderTopColor: '#D4AF37',
              borderRightColor: 'rgba(212,175,55,0.3)',
              position: 'relative',
            }}
          >
            {/* Inner ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                inset: '10px',
                borderRadius: '50%',
                border: '1.5px solid transparent',
                borderTopColor: '#22C55E',
                borderLeftColor: 'rgba(34,197,94,0.3)',
              }}
            />
            {/* Center spark */}
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                position: 'absolute',
                inset: '28px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(212,175,55,0.8), transparent)',
              }}
            />
          </motion.div>

          {/* Logo text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '1.1rem',
              fontWeight: 700,
              color: '#D4AF37',
              letterSpacing: '0.2em',
              textShadow: '0 0 20px rgba(212,175,55,0.6)',
            }}
          >
            DINU ANAND
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0] }}
            transition={{ delay: 0.6, duration: 1.5, repeat: Infinity }}
            style={{
              fontFamily: 'Crimson Text, serif',
              fontSize: '0.85rem',
              color: '#71717A',
              letterSpacing: '0.1em',
              fontStyle: 'italic',
            }}
          >
            Summoning the spellbook…
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
