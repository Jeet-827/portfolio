import React, { useRef } from 'react';
import { journeyTimeline } from '../data/skills';
import { useGSAP } from '../hooks/useGSAP';

const Journey = () => {
  const headerRef = useRef(null);
  const timelineRef = useRef(null);

  useGSAP((gsap) => {
    gsap.fromTo(headerRef.current, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.8,
      scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
    });

    if (timelineRef.current) {
      const items = Array.from(timelineRef.current.children);
      items.forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, x: i % 2 === 0 ? -50 : 50, scale: 0.96 },
          { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 85%' } }
        );
      });
    }
  }, []);

  const statusColor = (status) => {
    switch (status) {
      case 'Active Focus': return { color: 'var(--text)', bg: 'var(--bg-alt)', border: 'var(--border-strong)' };
      case 'Completed': return { color: 'var(--text-secondary)', bg: 'white', border: 'var(--border)' };
      case 'Upcoming': return { color: 'var(--text-muted)', bg: 'var(--bg-alt)', border: 'var(--border)' };
      default: return { color: 'var(--text-dim)', bg: 'var(--bg)', border: 'var(--border)' };
    }
  };

  return (
    <section id="journey" data-scroll-section className="section section-divider">
      <div className="container">
        <div ref={headerRef} className="section-header" style={{ opacity: 0 }}>
          <div className="section-category">// 04. THE PATH</div>
          <h2 className="section-title">MY JOURNEY</h2>
          <p className="section-subtitle">The milestones that shaped my engineering career.</p>
        </div>

        <div ref={timelineRef} style={{
          display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative',
        }}>
          {/* Vertical line */}
          <div className="timeline-line" style={{
            position: 'absolute', left: '28px', top: 0, bottom: 0, width: '1px',
            background: 'linear-gradient(to bottom, var(--border), var(--text), var(--border))',
          }} />

          {journeyTimeline.map((item, idx) => {
            const s = statusColor(item.status);
            return (
              <div key={idx} style={{
                display: 'flex', gap: '1.5rem', alignItems: 'flex-start',
                position: 'relative', zIndex: 1, opacity: 0,
              }}>
                <div style={{ width: 56, minWidth: 56, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '0.3rem' }}>
                  <div style={{
                    width: item.status === 'Active Focus' ? 14 : 10,
                    height: item.status === 'Active Focus' ? 14 : 10,
                    borderRadius: '50%', background: s.color,
                    boxShadow: item.status === 'Active Focus' ? '0 0 12px rgba(0,0,0,0.2)' : 'none',
                  }} />
                </div>

                <div className="card interactive" style={{
                  flex: 1, padding: '1.5rem', borderRadius: '1rem',
                  borderLeft: `2px solid ${s.border}`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '1.3rem', fontWeight: 800, color: s.color,
                    }}>{item.year}</span>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.1em',
                      color: s.color, padding: '0.2rem 0.6rem', borderRadius: '100px',
                      background: s.bg, border: `1px solid ${s.border}`,
                    }}>{item.status}</span>
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700,
                    color: 'var(--text)', marginBottom: '0.5rem',
                  }}>{item.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .timeline-line { left: 18px !important; }
        }
      `}</style>
    </section>
  );
};

export default Journey;
