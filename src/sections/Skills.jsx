import React, { useRef } from 'react';
import { skillCategories, marqueeSkills } from '../data/skills';
import { useGSAP } from '../hooks/useGSAP';

const Skills = () => {
  const headerRef = useRef(null);
  const marqueeRef = useRef(null);
  const gridRef = useRef(null);

  useGSAP((gsap) => {
    gsap.fromTo(headerRef.current, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.8,
      scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
    });

    gsap.fromTo(marqueeRef.current, { opacity: 0, x: -80 }, {
      opacity: 1, x: 0, duration: 1,
      scrollTrigger: { trigger: marqueeRef.current, start: 'top 90%' },
    });

    if (gridRef.current) {
      gsap.fromTo(Array.from(gridRef.current.children),
        { opacity: 0, y: 60, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' } }
      );
    }
  }, []);

  const levelDot = (level) => {
    switch (level) {
      case 'Expert': return 'var(--text)';
      case 'Advanced': return 'var(--text-secondary)';
      default: return 'var(--text-dim)';
    }
  };

  return (
    <section id="skills" data-scroll-section className="section section-dark">
      <div className="container">
        <div ref={headerRef} className="section-header" style={{ opacity: 0 }}>
          <div className="section-category" style={{ color: 'rgba(255,255,255,0.4)' }}>// 03. TECH ARSENAL</div>
          <h2 className="section-title">SKILLS & TOOLS</h2>
          <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Technologies I work with daily to build production-grade applications.
          </p>
        </div>

        {/* Marquee */}
        <div ref={marqueeRef} style={{
          overflow: 'hidden', padding: '1.5rem 0',
          margin: '0 calc(-1 * clamp(1.5rem, 5vw, 3rem)) 3rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          opacity: 0,
        }}>
          <div className="marquee-track">
            {[...marqueeSkills, ...marqueeSkills].map((skill, i) => (
              <span key={i} style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(1.2rem, 3vw, 2rem)',
                fontWeight: 800, color: i % 2 === 0 ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)',
                whiteSpace: 'nowrap', padding: '0 1.5rem', letterSpacing: '-0.02em',
              }}>
                {skill}
                <span style={{ color: 'rgba(255,255,255,0.15)', margin: '0 0.75rem', fontWeight: 300 }}>/</span>
              </span>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div ref={gridRef} style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.25rem',
        }}>
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="card-dark" style={{ padding: '1.75rem', borderRadius: '1rem' }}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                paddingBottom: '1rem', marginBottom: '1rem',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700,
                  letterSpacing: '0.1em', color: 'white',
                }}>{cat.category}</h3>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)',
                }}>{cat.skills.length} TECH</span>
              </div>

              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                {cat.description}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="interactive" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0.6rem 0.75rem', borderRadius: '0.5rem',
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.04)',
                    transition: 'all 0.2s ease',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span style={{
                        width: 6, height: 6, borderRadius: '50%', background: levelDot(skill.level),
                      }} />
                      <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>
                        {skill.name}
                      </span>
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.1em',
                      color: 'rgba(255,255,255,0.3)', padding: '0.2rem 0.5rem', borderRadius: '0.25rem',
                      background: 'rgba(255,255,255,0.03)',
                    }}>{skill.level}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
