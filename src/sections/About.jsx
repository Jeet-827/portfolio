import React, { useRef } from 'react';
import { FiFileText, FiArrowUpRight } from 'react-icons/fi';
import { statistics } from '../data/skills';
import { useGSAP } from '../hooks/useGSAP';

const About = () => {
  const headerRef  = useRef(null);
  const textRef    = useRef(null);
  const techRef    = useRef(null);
  const statsRef   = useRef(null);
  const lineRef    = useRef(null);

  const mainTech = ['React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Redis', 'Docker', 'AI / GenAI'];

  useGSAP((gsap) => {
    /* ── header reveal ── */
    gsap.fromTo(headerRef.current,
      { opacity: 0, x: -60 },
      { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%' } }
    );

    /* ── line draw ── */
    gsap.fromTo(lineRef.current,
      { scaleX: 0, transformOrigin: 'left' },
      { scaleX: 1, duration: 1.4, ease: 'power3.inOut',
        scrollTrigger: { trigger: headerRef.current, start: 'top 80%' } }
    );

    /* ── text paragraphs ── */
    if (textRef.current) {
      gsap.fromTo(Array.from(textRef.current.querySelectorAll('p')),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: textRef.current, start: 'top 82%' } }
      );
    }

    /* ── tech tags pop in ── */
    if (techRef.current) {
      gsap.fromTo(Array.from(techRef.current.children),
        { opacity: 0, scale: 0.7, y: 20, rotation: gsap.utils.random(-6, 6) },
        { opacity: 1, scale: 1, y: 0, rotation: 0, duration: 0.5, stagger: 0.06, ease: 'back.out(2)',
          scrollTrigger: { trigger: techRef.current, start: 'top 85%' } }
      );
    }

    /* ── stat cards counter + slide ── */
    if (statsRef.current) {
      gsap.fromTo(Array.from(statsRef.current.children),
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 82%' } }
      );
    }
  }, []);

  return (
    <section id="about" data-scroll-section className="section section-divider" style={{ overflow: 'hidden' }}>
      <div className="container">
        {/* Header */}
        <div ref={headerRef} className="section-header" style={{ opacity: 0 }}>
          <div className="section-category">// 01. PHILOSOPHY</div>
          <h2 className="section-title">ABOUT ME</h2>
          <p className="section-subtitle">I build end-to-end web applications that are fast, secure, and scalable.</p>
        </div>

        {/* Animated rule */}
        <div ref={lineRef} style={{
          height: 1, background: 'var(--border)', marginBottom: 'clamp(2rem,4vw,4rem)',
        }} />

        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}>
          {/* Text */}
          <div ref={textRef}>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: '1.5rem' }}>
              As a full-stack developer with a passion for engineering clean, maintainable
              systems, I specialize in the MERN stack extended with PostgreSQL, Redis, and
              Docker for production-grade applications. From building agriculture platforms
              to crafting secure authentication systems, I focus on shipping impactful products.
            </p>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: '2rem' }}>
              Currently exploring GenAI and LLM integrations to push the boundaries of
              what web applications can do.
            </p>

            <h4 style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em',
              color: 'var(--text-dim)', marginBottom: '1rem',
            }}>CORE TECHNOLOGIES</h4>
            <div ref={techRef} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {mainTech.map((tech) => (
                <span key={tech} className="tag interactive">{tech}</span>
              ))}
            </div>

            <div style={{ marginTop: '2rem' }}>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-dark interactive"
                style={{ gap: '0.6rem' }}
              >
                <FiFileText size={16} /> VIEW RESUME <FiArrowUpRight />
              </a>
            </div>
          </div>

          {/* Stats */}
          <div ref={statsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            {statistics.map((stat, idx) => (
              <div key={idx} className="card interactive" style={{
                padding: 'clamp(1.5rem,3vw,2rem)', borderRadius: '1rem',
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)',
                  fontWeight: 900, color: 'var(--text)', lineHeight: 1, marginBottom: '0.4rem',
                }}>{stat.value}</div>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em',
                  color: 'var(--text-muted)', textTransform: 'uppercase',
                }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .about-grid { grid-template-columns: 7fr 5fr !important; }
        }
      `}</style>
    </section>
  );
};

export default About;
