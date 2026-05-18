/* ============================================================
   App.jsx — Main application shell
   Features: magic wand cursor with sparkle trail, canvas
   background, loading screen, scroll-to-top, mouse glow orb.
   ============================================================ */
import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';
import MagicBackground from './components/MagicBackground';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Achievements from './components/Achievements';
import Profiles from './components/Profiles';
import Contact from './components/Contact';
import Footer from './components/Footer';

/* ---- Wand Sparkle Trail rendered on canvas ---- */
function WandSparkleCanvas() {
  const canvasRef = useRef(null);
  const sparkles  = useRef([]);
  const animRef   = useRef(null);
  const mouseRef  = useRef({ x: -200, y: -200 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      // Spawn 2–3 sparkles per mousemove
      const count = Math.floor(Math.random() * 2) + 1;
      for (let i = 0; i < count; i++) {
        sparkles.current.push({
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          r: Math.random() * 2.5 + 1,
          vx: (Math.random() - 0.5) * 1.8,
          vy: (Math.random() - 0.5) * 1.8 - 0.5,
          life: 1,
          decay: Math.random() * 0.04 + 0.025,
          color: Math.random() > 0.5
            ? `rgba(212,175,55,`
            : Math.random() > 0.5
              ? `rgba(245,230,200,`
              : `rgba(34,197,94,`,
        });
      }
    };
    window.addEventListener('mousemove', onMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparkles.current = sparkles.current.filter(s => s.life > 0);
      sparkles.current.forEach(s => {
        s.x  += s.vx;
        s.y  += s.vy;
        s.vy += 0.04; // slight gravity
        s.life -= s.decay;

        const alpha = Math.max(0, s.life);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `${s.color}${alpha.toFixed(2)})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = `${s.color}0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw a tiny 4-point star for larger sparks
        if (s.r > 2) {
          ctx.save();
          ctx.translate(s.x, s.y);
          ctx.rotate(s.life * 4);
          ctx.fillStyle = `${s.color}${(alpha * 0.6).toFixed(2)})`;
          const sz = s.r * 1.5;
          ctx.beginPath();
          ctx.moveTo(0, -sz); ctx.lineTo(0.5, -0.5); ctx.lineTo(sz, 0);
          ctx.lineTo(0.5, 0.5); ctx.lineTo(0, sz); ctx.lineTo(-0.5, 0.5);
          ctx.lineTo(-sz, 0); ctx.lineTo(-0.5, -0.5);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
      });
      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0,
        width: '100%', height: '100%',
        zIndex: 9997, pointerEvents: 'none',
      }}
    />
  );
}

/* ---- Main App ---- */
export default function App() {
  const [mouse, setMouse]     = useState({ x: -200, y: -200 });
  const [showTop, setShowTop] = useState(false);

  /* Wand: fast spring for responsiveness */
  const springX = useSpring(mouse.x, { stiffness: 600, damping: 40 });
  const springY = useSpring(mouse.y, { stiffness: 600, damping: 40 });
  /* Trail ring: slower spring */
  const trailX  = useSpring(mouse.x, { stiffness: 90,  damping: 22 });
  const trailY  = useSpring(mouse.y, { stiffness: 90,  damping: 22 });

  useEffect(() => {
    const onMove   = (e) => setMouse({ x: e.clientX, y: e.clientY });
    const onScroll = ()  => setShowTop(window.scrollY > 500);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('scroll',   onScroll);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll',   onScroll);
    };
  }, []);

  /* Mouse-follow ambient glow orb */
  const glowRef = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (!glowRef.current) return;
      glowRef.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <>
      {/* ── Loading splash ── */}
      <LoadingScreen />

      {/* ── Sparkle trail canvas (z: 9997) ── */}
      <WandSparkleCanvas />

      {/* ── Magic Wand cursor ── */}
      <motion.div
        aria-hidden="true"
        className="cursor-main"
        style={{ left: springX, top: springY }}
      >
        🪄
      </motion.div>

      {/* ── Trailing sparkle ring ── */}
      <motion.div
        className="cursor-trail"
        style={{ left: trailX, top: trailY }}
      />

      {/* ── Ambient mouse-glow orb ── */}
      <div
        ref={glowRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: '400px', height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.045) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
          transition: 'transform 0.08s linear',
        }}
      />

      {/* ── Canvas background ── */}
      <MagicBackground />

      {/* ── Page layout ── */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Certifications />
          <Achievements />
          <Profiles />
          <Contact />
        </main>
        <Footer />
      </div>

      {/* ── Scroll-to-top ── */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="scrolltop"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            style={{
              position: 'fixed',
              bottom: '2rem', right: '2rem',
              zIndex: 1000,
              width: '48px', height: '48px',
              borderRadius: '50%',
              background: 'rgba(11,15,25,0.75)',
              border: '1.5px solid rgba(212,175,55,0.5)',
              color: '#D4AF37',
              cursor: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.2rem',
              boxShadow: '0 0 18px rgba(212,175,55,0.25)',
              backdropFilter: 'blur(12px)',
            }}
          >
            🪄
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
