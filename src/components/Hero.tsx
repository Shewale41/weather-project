import { useEffect, useRef, useState } from 'react';
import { useImagePreload } from '@/components/ui/SmartImage';

export default function Hero() {
  const revealRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [heroReady, setHeroReady] = useState(false);

  // Preload both hero images before showing content
  const baseLoaded = useImagePreload('/transparent-base.png');
  const flameLoaded = useImagePreload('/transparent-flame.png');

  useEffect(() => {
    if (baseLoaded && flameLoaded) {
      setHeroReady(true);
    }
  }, [baseLoaded, flameLoaded]);

  useEffect(() => {
    // Spotlight logic
    const imgLayer = revealRef.current;
    if (!imgLayer) return;

    imgLayer.style.setProperty('--reveal-opacity', '1');

    // Start centered in the viewport
    const startX = window.innerWidth / 2;
    const startY = window.innerHeight / 2;
    const mouse = { x: startX, y: startY };
    const smooth = { x: startX, y: startY };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchstart', onTouchMove, { passive: true });

    let animationFrameId: number;
    const loop = () => {
      smooth.x += (mouse.x - smooth.x) * 0.1;
      smooth.y += (mouse.y - smooth.y) * 0.1;
      imgLayer.style.setProperty('--x', `${smooth.x}px`);
      imgLayer.style.setProperty('--y', `${smooth.y}px`);
      animationFrameId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchstart', onTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    // Word reveal logic for headline
    const headline = headlineRef.current;
    if (!headline) return;

    const text = "Hello there, I'm a software dev—not a boring one though :)";
    headline.textContent = '';
    const words = text.split(' ');

    words.forEach((word, index) => {
      const span = document.createElement('span');
      span.className = 'word-reveal';
      span.textContent = word + ' ';
      span.style.animationDelay = `${index * 0.05}s`;
      headline.appendChild(span);
    });
  }, []);

  return (
    <main className="hero">
      {/* Splash skeleton — shown until hero images are loaded */}
      {!heroReady && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-48 animate-pulse rounded-lg bg-neutral-800" />
            <div className="h-4 w-64 animate-pulse rounded bg-neutral-800" />
          </div>
        </div>
      )}

      <div
        className={`transition-opacity duration-700 ${heroReady ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="hero-big-text creator-text-animate">
          <h2>Gopal</h2>
        </div>

        <div className="hero-base-img" style={{ backgroundImage: "url('/transparent-base.png')" }}>
        </div>

        <div ref={revealRef} className="hero-reveal-img" id="reveal-img" style={{ backgroundImage: "url('/transparent-flame.png')" }}>
        </div>

        <div className="hero-content">
          <div className="hero-content-inner">
            <h1 ref={headlineRef} className="hero-headline" id="headline"></h1>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="cta-btn cta-animate" style={{ display: 'inline-flex', textDecoration: 'none' }}>
              <span className="cta-btn-bg"></span>
              <span className="cta-btn-text">View Resume</span>
              <span className="cta-btn-circle">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 13L13 5M13 5H6M13 5V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </div>
        </div>

        <div className="hero-bottom-fade"></div>
      </div>
    </main>
  );
}
