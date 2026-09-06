'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  vx: number;
  vy: number;
  color: string;
}

interface Nebula {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  colorStop0: string;
  colorStop1: string;
}

export function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 180,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('resize', handleResize);

    // Particle Starfield Setup
    let stars: Star[] = [];
    let nebulae: Nebula[] = [];

    const colors = [
      '#ffffff',
      '#00f2fe',
      '#4facfe',
      '#7f00ff',
      '#e100ff',
      '#e0f2fe',
    ];

    const initParticles = () => {
      const starCount = Math.floor((width * height) / 7000);
      stars = [];

      for (let i = 0; i < starCount; i++) {
        const size = Math.random() * 2 + 0.5;
        const baseAlpha = Math.random() * 0.7 + 0.3;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size,
          baseAlpha,
          alpha: baseAlpha,
          twinkleSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() < 0.5 ? 1 : -1),
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      // Deep space nebulae clouds
      nebulae = [
        {
          x: width * 0.2,
          y: height * 0.25,
          radius: Math.min(width, height) * 0.45,
          vx: 0.08,
          vy: 0.05,
          colorStop0: 'rgba(0, 242, 254, 0.035)',
          colorStop1: 'rgba(0, 0, 0, 0)',
        },
        {
          x: width * 0.8,
          y: height * 0.75,
          radius: Math.min(width, height) * 0.5,
          vx: -0.06,
          vy: -0.04,
          colorStop0: 'rgba(127, 0, 255, 0.04)',
          colorStop1: 'rgba(0, 0, 0, 0)',
        },
        {
          x: width * 0.5,
          y: height * 0.5,
          radius: Math.min(width, height) * 0.35,
          vx: 0.03,
          vy: -0.05,
          colorStop0: 'rgba(225, 0, 255, 0.025)',
          colorStop1: 'rgba(0, 0, 0, 0)',
        },
      ];
    };

    initParticles();

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Nebulae
      nebulae.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < -n.radius) n.x = width + n.radius;
        if (n.x > width + n.radius) n.x = -n.radius;
        if (n.y < -n.radius) n.y = height + n.radius;
        if (n.y > height + n.radius) n.y = -n.radius;

        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius);
        grad.addColorStop(0, n.colorStop0);
        grad.addColorStop(1, n.colorStop1);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw & Update Stars
      stars.forEach((star) => {
        // Twinkle
        star.alpha += star.twinkleSpeed;
        if (star.alpha > 0.95 || star.alpha < 0.2) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        // Drift
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around screen boundaries
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        // Interactive Cursor Attraction
        const dx = mouse.x - star.x;
        const dy = mouse.y - star.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let renderX = star.x;
        let renderY = star.y;
        let activeAlpha = star.alpha;

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 12;
          const angle = Math.atan2(dy, dx);
          renderX += Math.cos(angle) * force;
          renderY += Math.sin(angle) * force;
          activeAlpha = Math.min(1, star.alpha + 0.4);

          // Draw faint attraction line for close stars
          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(0, 242, 254, ${(1 - dist / 80) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Draw Star
        ctx.beginPath();
        ctx.arc(renderX, renderY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0.1, activeAlpha);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
      {/* HTML Canvas for stars, nebulae, & cursor attraction */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />

      {/* Ambient radial gradients for depth */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-[550px] h-[550px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-40 left-1/4 w-[650px] h-[650px] bg-indigo-600/5 rounded-full blur-[160px] pointer-events-none" />
    </div>
  );
}
