import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

// ─── FIRE CANVAS BACKGROUND ──────────────────────────────────────────────────

const FireBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 180 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedY: Math.random() * 1.5 + 0.3,
      opacity: Math.random(),
    }));

    let rafId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        g.addColorStop(0, `rgba(255,140,0,${p.opacity})`);
        g.addColorStop(1, 'rgba(255,0,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        p.y -= p.speedY;
        if (p.y < 0) { p.y = canvas.height; p.x = Math.random() * canvas.width; }
      });
      rafId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: 'absolute', top: 0, left: 0,
      width: '100%', height: '100%',
      zIndex: 0, pointerEvents: 'none',
    }} />
  );
};

// ─── STYLES ───────────────────────────────────────────────────────────────────

const PreloaderStyles = () => (
  <style>{`
    @font-face {
  font-family: 'Alice';
  src: url('src/assets/font/Alice_in_Wonderland_3 copy.ttf') format('truetype');
}

    .wc-title {
      font-family: 'Alice', cursive;
      font-size: clamp(48px, 12vw, 120px);
      letter-spacing: 1px;
      background: linear-gradient(to bottom, #fff9b0 0%, #ffd000 35%, #ff8c00 60%, #ff3c00 80%, #b30000 100%);
      filter: contrast(120%) brightness(105%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      color: transparent;
      animation: wcFireFlicker 1.8s infinite alternate;
      line-height: 1;
      white-space: nowrap;
      user-select: none;
    }

    @keyframes wcFireFlicker {
      0%   { text-shadow: 0 0 5px #ff6600, 0 0 10px #ff3300, 0 0 20px #ff0000; }
      50%  { text-shadow: 0 0 8px #ff6600, 0 0 15px #ff3300, 0 0 25px #ff0000; }
      100% { text-shadow: 0 0 5px #ff8c00, 0 0 12px #ff3300, 0 0 22px #ff0000; }
    }

    .wc-title span {
      display: inline-block;
      animation: wcLetterMove 2s infinite ease-in-out;
    }
    .wc-title .wc-space { width: 0.35em; animation: none; }

    @keyframes wcLetterMove {
      0%   { transform: translateY(0px); }
      25%  { transform: translateY(-3px); }
      50%  { transform: translateY(2px); }
      75%  { transform: translateY(-2px); }
      100% { transform: translateY(0px); }
    }

    .wc-title span:nth-child(1) { animation-delay: 0s; }
    .wc-title span:nth-child(2) { animation-delay: 0.1s; }
    .wc-title span:nth-child(3) { animation-delay: 0.2s; }
    .wc-title span:nth-child(4) { animation-delay: 0.3s; }
    .wc-title span:nth-child(6) { animation-delay: 0.4s; }
    .wc-title span:nth-child(7) { animation-delay: 0.5s; }
    .wc-title span:nth-child(8) { animation-delay: 0.6s; }
    .wc-title span:nth-child(9) { animation-delay: 0.7s; }
    .wc-title span:nth-child(10){ animation-delay: 0.8s; }

    .wc-fire-loader {
      width: clamp(140px, 40vw, 320px);
      height: 6px;
      background: #222;
      border-radius: 10px;
      margin: 25px auto 0;
      overflow: hidden;
    }

    .wc-fire-bar {
      width: 40%;
      height: 100%;
      background: linear-gradient(90deg, #ff0000, #ff7300, #ffd700, #ff7300, #ff0000);
      box-shadow: 0 0 10px #ff7300, 0 0 20px #ff0000, 0 0 40px #ff4500;
      border-radius: 10px;
      animation: wcFireMove 1.5s infinite;
    }

    @keyframes wcFireMove {
      0%   { transform: translateX(-100%); }
      100% { transform: translateX(250%); }
    }

    .wc-tag {
      margin-top: 20px;
      font-size: clamp(14px, 3vw, 24px);
      letter-spacing: 3px;
      color: #e6e6e6;
      text-align: center;
      font-family: sans-serif;
    }
  `}</style>
);

// ─── PRELOADER ────────────────────────────────────────────────────────────────
// No internal visible state — parent mounts/unmounts this component entirely.
// Parent should wrap with <AnimatePresence> and pass onComplete to trigger unmount.

interface PreloaderProps {
  duration?: number;
  onComplete?: () => void;
}

export const Preloader = ({ duration = 4000, onComplete }: PreloaderProps) => {
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    const t = setTimeout(() => {
      onComplete?.();
    }, duration);

    return () => clearTimeout(t);
  }, [duration, onComplete]);

  return (
    <motion.div
      key="preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'radial-gradient(circle, #111, #000)',
        overflow: 'hidden',
      }}
    >
      <PreloaderStyles />
      <FireBackground />

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 16px' }}>
        <h1 className="wc-title">
          <span>W</span>
          <span>A</span>
          <span>V</span>
          <span>E</span>
          <span className="wc-space"> </span>
          <span>C</span>
          <span>R</span>
          <span>A</span>
          <span>Z</span>
          <span>E</span>
        </h1>

        <div className="wc-fire-loader">
          <div className="wc-fire-bar" />
        </div>

        <br />

        <p className="wc-tag">Igniting the Waves...</p>
      </div>
    </motion.div>
  );
};

export default Preloader;