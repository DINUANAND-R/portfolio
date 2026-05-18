/* ============================================================
   MagicBackground.jsx
   Renders animated floating particles, glowing orbs, mist layer,
   moving stars, and golden spark trails as a full-screen canvas.
   ============================================================ */
import { useEffect, useRef, useCallback } from 'react';

// Single animated canvas-based background
export default function MagicBackground() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef([]);
  const orbsRef = useRef([]);
  const starsRef = useRef([]);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // ---- Stars ----
    starsRef.current = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.3,
      alpha: Math.random(),
      speed: Math.random() * 0.005 + 0.002,
      phase: Math.random() * Math.PI * 2,
    }));

    // ---- Floating particles ----
    particlesRef.current = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height + canvas.height,
      r: Math.random() * 2.5 + 0.5,
      speed: Math.random() * 0.4 + 0.15,
      alpha: Math.random() * 0.7 + 0.3,
      color: Math.random() > 0.5
        ? `rgba(212,175,55,${(Math.random() * 0.6 + 0.2).toFixed(2)})`
        : Math.random() > 0.5
          ? `rgba(34,197,94,${(Math.random() * 0.5 + 0.2).toFixed(2)})`
          : `rgba(139,92,246,${(Math.random() * 0.5 + 0.2).toFixed(2)})`,
      drift: (Math.random() - 0.5) * 0.5,
    }));

    // ---- Glowing orbs ----
    orbsRef.current = [
      { x: canvas.width * 0.15, y: canvas.height * 0.25, r: 220, color: 'rgba(212,175,55,0.06)', dx: 0.12, dy: 0.08 },
      { x: canvas.width * 0.8,  y: canvas.height * 0.6,  r: 280, color: 'rgba(34,197,94,0.05)',  dx: -0.10, dy: 0.12 },
      { x: canvas.width * 0.5,  y: canvas.height * 0.85, r: 180, color: 'rgba(139,92,246,0.06)', dx: 0.07, dy: -0.09 },
      { x: canvas.width * 0.9,  y: canvas.height * 0.15, r: 150, color: 'rgba(212,175,55,0.04)', dx: -0.08, dy: 0.10 },
    ];
  }, []);

  useEffect(() => {
    initCanvas();
    window.addEventListener('resize', initCanvas);
    return () => window.removeEventListener('resize', initCanvas);
  }, [initCanvas]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frame = 0;

    const draw = () => {
      frame++;
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Draw orbs
      orbsRef.current.forEach(orb => {
        orb.x += orb.dx;
        orb.y += orb.dy;
        if (orb.x < -orb.r || orb.x > W + orb.r) orb.dx *= -1;
        if (orb.y < -orb.r || orb.y > H + orb.r) orb.dy *= -1;
        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        grad.addColorStop(0, orb.color);
        grad.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // Draw stars (twinkling)
      starsRef.current.forEach(s => {
        const alpha = 0.2 + 0.8 * Math.abs(Math.sin(s.phase + frame * s.speed));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245,230,200,${alpha.toFixed(2)})`;
        ctx.fill();
      });

      // Draw mist layer
      const mist = ctx.createLinearGradient(0, H * 0.55 + Math.sin(frame * 0.008) * 20, 0, H);
      mist.addColorStop(0, 'transparent');
      mist.addColorStop(0.4, 'rgba(212,175,55,0.018)');
      mist.addColorStop(0.7, 'rgba(34,197,94,0.012)');
      mist.addColorStop(1, 'rgba(11,15,25,0.25)');
      ctx.fillStyle = mist;
      ctx.fillRect(0, 0, W, H);

      // Draw floating particles (rising upward)
      particlesRef.current.forEach(p => {
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -10) {
          p.y = H + 10;
          p.x = Math.random() * W;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
