import React, { useRef } from 'react';
import { FiGithub, FiArrowDown, FiArrowUpRight } from 'react-icons/fi';
import { useGSAP } from '../hooks/useGSAP';
import { useLocomotiveScroll } from '../context/SmoothScroll';

const Hero = () => {
  const containerRef  = useRef(null);
  const statusRef     = useRef(null);
  const h1Ref         = useRef(null);
  const nameRef       = useRef(null);
  const roleRef       = useRef(null);
  const descRef       = useRef(null);
  const buttonsRef    = useRef(null);
  const cardRef       = useRef(null);
  const scrollRef     = useRef(null);
  const bgLineRef     = useRef(null);
  const locoScroll    = useLocomotiveScroll();

  useGSAP((gsap) => {
    /* ── entrance timeline ── */
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl
      .fromTo(bgLineRef.current,
        { scaleX: 0, transformOrigin: 'left' },
        { scaleX: 1, duration: 1.8, ease: 'power3.inOut', delay: 0.1 }
      )
      .fromTo(statusRef.current,
        { opacity: 0, y: -20, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7 },
        '-=1.2'
      )
      .fromTo(nameRef.current,
        { opacity: 0, y: 80, clipPath: 'inset(100% 0 0 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 1.1 },
        '-=0.4'
      )
      .fromTo(roleRef.current,
        { opacity: 0, x: -40, clipPath: 'inset(0 100% 0 0)' },
        { opacity: 1, x: 0,   clipPath: 'inset(0 0% 0 0)', duration: 0.9 },
        '-=0.6'
      )
      .fromTo(descRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.4'
      )
      .fromTo(buttonsRef.current.children,
        { opacity: 0, y: 24, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.12, ease: 'back.out(1.7)' },
        '-=0.3'
      )
      .fromTo(cardRef.current,
        { opacity: 0, x: 70, scale: 0.93, rotateY: 8 },
        { opacity: 1, x: 0, scale: 1, rotateY: 0, duration: 1.1, ease: 'power3.out' },
        '-=1.0'
      )
      .fromTo(scrollRef.current,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.2'
      );

    /* ── scroll-driven parallax on name ── */
    gsap.to(h1Ref.current, {
      y: -80, opacity: 0.3,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    /* ── card tilt on mouse move ── */
    const card = cardRef.current;
    const onMove = (e) => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  - 0.5) * 14;
      const y = ((e.clientY - r.top)  / r.height - 0.5) * -14;
      gsap.to(card, { rotateY: x, rotateX: y, duration: 0.4, ease: 'power2.out', transformPerspective: 800 });
    };
    const onLeave = () => gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'elastic.out(1,0.4)' });
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);

    return () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      data-scroll-section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(7rem,14vh,12rem) clamp(1.5rem,5vw,3rem) clamp(2rem,6vh,4rem)',
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      {/* Background horizontal rule (animates in) */}
      <div ref={bgLineRef} style={{
        position: 'absolute', left: 0, right: 0, top: '58%',
        height: '1px', background: 'var(--border)',
        pointerEvents: 'none',
      }} />

      {/* Status badge */}
      <div ref={statusRef} style={{ marginBottom: '2.5rem', opacity: 0 }}>
        <div className="status-badge">
          <span className="pulse-dot" />
          AVAILABLE FOR WORK — 2026
        </div>
      </div>

      {/* Grid */}
      <div className="hero-layout" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', alignItems: 'center' }}>
        {/* Left: Typography */}
        <div>
          <h1 ref={h1Ref} style={{ marginBottom: '1.5rem' }}>
            <div
              ref={nameRef}
              style={{
                fontFamily: 'var(--font-display)', fontWeight: 900,
                fontSize: 'clamp(3rem,8vw,7rem)', lineHeight: 0.95,
                letterSpacing: '-0.05em', color: 'var(--text)', opacity: 0,
              }}
            >
              JEET<br />RANPARIYA
            </div>
            <div
              ref={roleRef}
              style={{
                fontFamily: 'var(--font-mono)', fontWeight: 600,
                fontSize: 'clamp(0.8rem,1.8vw,1.1rem)',
                letterSpacing: '0.2em', color: 'var(--text-muted)',
                marginTop: '1rem', opacity: 0,
              }}
            >
              FULL STACK DEVELOPER
            </div>
          </h1>

          <p ref={descRef} style={{
            fontSize: 'clamp(1rem,1.5vw,1.15rem)', color: 'var(--text-secondary)',
            maxWidth: '500px', lineHeight: 1.8, marginBottom: '2rem', opacity: 0,
          }}>
            Building modern, scalable web applications with React, Node.js,
            PostgreSQL, MongoDB, Redis, and GenAI integrations.
          </p>

          <div ref={buttonsRef} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#work" onClick={(e) => {
              e.preventDefault();
              const t = document.getElementById('work');
              if (locoScroll) locoScroll.scrollTo(t);
              else t?.scrollIntoView({ behavior: 'smooth' });
            }} className="btn btn-dark interactive">
              VIEW PROJECTS <FiArrowUpRight />
            </a>
            <a href="https://github.com/Jeet-827" target="_blank" rel="noopener noreferrer"
              className="btn btn-outline interactive">
              <FiGithub /> GITHUB
            </a>
          </div>
        </div>

        {/* Right: Info Card with 3D tilt */}
        <div ref={cardRef} className="card" style={{ padding: '2rem', opacity: 0, transformStyle: 'preserve-3d' }}>
          {/* Terminal Header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: '1.5rem', paddingBottom: '1rem',
            borderBottom: '1px solid var(--border)',
          }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#0a0a0a' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ccc' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#eee' }} />
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-dim)' }}>
              architecture.config
            </span>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
            {[
              { label: 'EXPERIENCE', value: '2+ Years', bold: true },
              { label: 'PROJECTS', value: '20+ Built' },
              { label: 'STACK', value: 'MERN + SQL' },
              { label: 'FOCUS', value: 'GenAI Ready', bold: true },
            ].map((item, i) => (
              <div key={i} className="interactive" style={{
                padding: '0.9rem', borderRadius: '0.75rem',
                background: 'var(--bg-alt)', border: '1px solid var(--border)',
                transition: 'all 0.3s ease',
              }}>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.5rem',
                  letterSpacing: '0.15em', color: 'var(--text-dim)', marginBottom: '0.25rem',
                }}>{item.label}</div>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.85rem',
                  fontWeight: 700, color: item.bold ? 'var(--text)' : 'var(--text-secondary)',
                }}>{item.value}</div>
              </div>
            ))}
          </div>

          <div style={{
            paddingTop: '0.75rem', borderTop: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--text-dim)',
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span className="pulse-dot" style={{ width: 6, height: 6 }} />
              OPERATIONAL
            </span>
            <span>2026 EDITION</span>
          </div>
        </div>
      </div>

      {/* Scroll CTA */}
      <div ref={scrollRef} style={{ marginTop: 'clamp(3rem,8vh,5rem)', display: 'flex', justifyContent: 'center', opacity: 0 }}>
        <button onClick={() => {
          const t = document.getElementById('about');
          if (locoScroll) locoScroll.scrollTo(t);
          else t?.scrollIntoView({ behavior: 'smooth' });
        }} className="interactive" style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
          fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em',
          color: 'var(--text-dim)', transition: 'color 0.3s ease',
        }}>
          SCROLL TO EXPLORE
          <FiArrowDown className="bounce-arrow" />
        </button>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .hero-layout { grid-template-columns: 1.3fr 0.7fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
