import React, { useRef } from 'react';
import { FiGithub, FiGitCommit, FiStar, FiGitPullRequest, FiCode } from 'react-icons/fi';
import { useGSAP } from '../hooks/useGSAP';

const Github = () => {
  const headerRef = useRef(null);
  const cardRef = useRef(null);
  const statsRef = useRef(null);

  const githubStats = [
    { label: 'PUBLIC REPOS', value: '25+', icon: <FiCode />, },
    { label: 'ANNUAL COMMITS', value: '850+', icon: <FiGitCommit /> },
    { label: 'PULL REQUESTS', value: '45+', icon: <FiGitPullRequest /> },
    { label: 'STARS EARNED', value: '18+', icon: <FiStar /> },
  ];

  useGSAP((gsap) => {
    gsap.fromTo(headerRef.current, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.8,
      scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
    });

    gsap.fromTo(cardRef.current, { opacity: 0, y: 50, scale: 0.97 }, {
      opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: cardRef.current, start: 'top 85%' },
    });

    if (statsRef.current) {
      gsap.fromTo(Array.from(statsRef.current.children),
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: statsRef.current, start: 'top 85%' } }
      );
    }
  }, []);

  return (
    <section id="github" data-scroll-section className="section section-divider" style={{ overflow: 'hidden' }}>
      <div className="container">
        <div ref={headerRef} className="section-header" style={{ opacity: 0 }}>
          <div className="section-category">// 05. OPEN SOURCE</div>
          <h2 className="section-title">GITHUB ACTIVITY</h2>
          <p className="section-subtitle">Consistent contributions and a growing open-source presence.</p>
        </div>

        <div ref={cardRef} className="card" style={{ padding: 'clamp(1.25rem, 3.5vw, 2rem)', borderRadius: '1.25rem', opacity: 0 }}>
          <div className="github-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', alignItems: 'center' }}>
            {/* Info */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%', background: 'var(--bg-dark)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.2rem', color: 'white', flexShrink: 0,
                }}><FiGithub /></div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 700 }}>@Jeet-827</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>OPEN SOURCE CONTRIBUTOR</div>
                </div>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Actively maintaining full-stack repositories, contributing to the ecosystem,
                and shipping production-grade code consistently.
              </p>
              <a href="https://github.com/Jeet-827" target="_blank" rel="noopener noreferrer"
                className="btn btn-dark interactive">
                <FiGithub /> VISIT PROFILE
              </a>
            </div>

            {/* Stats */}
            <div>
              <div ref={statsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 120px), 1fr))', gap: '0.75rem' }}>
                {githubStats.map((stat, i) => (
                  <div key={i} className="interactive" style={{
                    padding: 'clamp(0.9rem, 2vw, 1.25rem)', borderRadius: '1rem', background: 'var(--bg-alt)',
                    border: '1px solid var(--border)', transition: 'all 0.3s ease',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '1.2rem', color: 'var(--text)' }}>{stat.icon}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>LIVE</span>
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontWeight: 800, color: 'var(--text)', marginBottom: '0.2rem' }}>{stat.value}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.1em', color: 'var(--text-dim)' }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: '0.75rem', padding: '0.9rem 1.25rem', borderRadius: '0.75rem',
                background: 'var(--bg-alt)', border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)',
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="pulse-dot" style={{ width: 8, height: 8 }} />
                  Streak: <strong style={{ color: 'var(--text)' }}>24 Days</strong>
                </span>
                <span style={{ color: 'var(--text)' }}>ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .github-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Github;
