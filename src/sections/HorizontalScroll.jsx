import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   Horizontal Section Phrases
──────────────────────────────────────────────── */
const PHRASES = [
  { text: 'CRAFTING SEAMLESS', sub: 'DIGITAL EXPERIENCES' },
  { text: 'INNOVATIVE', sub: 'ARCHITECTURE & CLEAN CODE' },
  { text: 'HIGH PERFORMANCE', sub: 'FULL-STACK WEB APPS' },
  { text: 'MODERN TECH STACK', sub: 'SCALABLE SYSTEMS' },
];

const HorizontalScroll = () => {
  const sectionRef = useRef(null);
  const trackRef   = useRef(null);
  const cardRefs   = useRef([]);
  const numRef     = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track   = trackRef.current;
    if (!section || !track) return;

    let ctx;

    const initHorizontal = () => {
      ctx = gsap.context(() => {
        const getTravelDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);

        /* ── 1. Main Horizontal Pinning & Translation ── */
        const hTween = gsap.to(track, {
          x: () => -getTravelDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${getTravelDistance() + 300}`,
            pin: true,
            scrub: 1.2, // extra buttery smooth scrub
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (numRef.current) {
                const progressVal = Math.round(self.progress * 100);
                numRef.current.textContent = String(progressVal).padStart(3, '0');
              }
            },
          },
        });

        /* ── 2. Per-Card Staggered Character Fly-in Animations ── */
        cardRefs.current.forEach((card) => {
          if (!card) return;

          const chars = card.querySelectorAll('.h-char');
          const sub   = card.querySelector('.h-sub');

          if (chars.length) {
            gsap.fromTo(chars,
              {
                opacity: 0,
                y: 50,
                rotateZ: () => gsap.utils.random(-15, 15),
                scale: 0.85,
              },
              {
                opacity: 1,
                y: 0,
                rotateZ: 0,
                scale: 1,
                ease: 'back.out(1.6)',
                stagger: 0.03,
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: hTween,
                  start: 'left 88%',
                  end: 'left 42%',
                  scrub: 1,
                },
              }
            );
          }

          if (sub) {
            gsap.fromTo(sub,
              { opacity: 0, y: 35 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: hTween,
                  start: 'left 80%',
                  end: 'left 45%',
                  scrub: 1,
                },
              }
            );
          }
        });
      }, section);

      ScrollTrigger.refresh();
    };

    // Initialize with a short RAF delay to ensure exact layout dimensions
    const rafId = requestAnimationFrame(initHorizontal);

    return () => {
      cancelAnimationFrame(rafId);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="horizontal-scroll"
      style={{
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: '#0a0a0a',
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* Decorative top & bottom hairline borders */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          pointerEvents: 'none',
        }}
      />

      {/* Subtle guide line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '50%',
          width: 1,
          background: 'rgba(255,255,255,0.025)',
          pointerEvents: 'none',
        }}
      />

      {/* Top-left: explore indicator */}
      <div
        style={{
          position: 'absolute',
          top: '2.5rem',
          left: 'clamp(1.5rem, 5vw, 4rem)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.62rem',
          letterSpacing: '0.22em',
          color: 'rgba(255,255,255,0.35)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          pointerEvents: 'none',
          zIndex: 20,
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'white',
            display: 'inline-block',
            boxShadow: '0 0 8px rgba(255,255,255,0.6)',
          }}
        />
        HORIZONTAL SCROLL EXPERIENCE →
      </div>

      {/* Top-right: live progress counter */}
      <div
        style={{
          position: 'absolute',
          top: '2.5rem',
          right: 'clamp(1.5rem, 5vw, 4rem)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.62rem',
          letterSpacing: '0.22em',
          color: 'rgba(255,255,255,0.35)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          pointerEvents: 'none',
          zIndex: 20,
        }}
      >
        <span ref={numRef} style={{ fontSize: '1rem', fontWeight: 800, color: 'white' }}>
          000
        </span>
        <span>/ 100</span>
      </div>

      {/* Bottom-right: badge */}
      <div
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          right: 'clamp(1.5rem, 5vw, 4rem)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.58rem',
          letterSpacing: '0.22em',
          color: 'rgba(255,255,255,0.25)',
          pointerEvents: 'none',
          zIndex: 20,
        }}
      >
        GSAP PINNED TRACK · FLUID MOTION
      </div>

      {/* Moving Horizontal Track */}
      <div
        ref={trackRef}
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '12vw',
          paddingLeft: '100vw', // starts off right edge
          paddingRight: '35vw',
          whiteSpace: 'nowrap',
          willChange: 'transform',
        }}
      >
        {PHRASES.map((phrase, idx) => (
          <React.Fragment key={idx}>
            <div
              ref={(el) => { cardRefs.current[idx] = el; }}
              className="h-card"
              style={{
                display: 'inline-flex',
                flexDirection: 'column',
                gap: '0.5rem',
                cursor: 'default',
              }}
            >
              {/* Main title rendered with individual characters */}
              <div
                className="h-title"
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3.5rem, 8vw, 9rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  color: '#ffffff',
                }}
              >
                {phrase.text.split('').map((char, ci) => (
                  <span
                    key={ci}
                    className="h-char"
                    style={{
                      display: 'inline-block',
                      willChange: 'transform, opacity',
                      transformOrigin: '50% 100%',
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </div>

              {/* Sub-label */}
              <div
                className="h-sub"
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.85rem, 1.6vw, 1.4rem)',
                  letterSpacing: '0.24em',
                  color: 'rgba(255,255,255,0.4)',
                  paddingLeft: '0.12em',
                }}
              >
                {phrase.sub}
              </div>
            </div>

            {/* Separator badge between phrases */}
            {idx < PHRASES.length - 1 && (
              <div
                style={{
                  display: 'inline-flex',
                  flexShrink: 0,
                  width: 'clamp(48px, 5.5vw, 80px)',
                  height: 'clamp(48px, 5.5vw, 80px)',
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.15)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: 'clamp(1.2rem, 2vw, 2rem)',
                }}
              >
                ✦
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default HorizontalScroll;
