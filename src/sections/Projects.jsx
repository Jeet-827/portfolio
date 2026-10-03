import React, { useRef, useEffect } from 'react';
import { FiArrowUpRight, FiGithub, FiExternalLink } from 'react-icons/fi';
import gsap from 'gsap';
import { projectsData } from '../data/projects';
import { useGSAP } from '../hooks/useGSAP';

/* ── Individual project card with magnetic hover ── */
const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  - 0.5) * 18;
      const y = ((e.clientY - r.top)  / r.height - 0.5) * -10;

      gsap.to(el, { rotateY: x, rotateX: y, scale: 1.02, duration: 0.4, ease: 'power2.out', transformPerspective: 800 });
    };
    const onLeave = () => {
      gsap.to(el, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.6, ease: 'elastic.out(1,0.4)' });
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div ref={cardRef} className="card interactive" style={{
      borderRadius: '1.25rem', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      transformStyle: 'preserve-3d',
    }}>
      {/* Header */}
      <div style={{
        padding: '2rem', background: 'var(--bg-alt)',
        borderBottom: '1px solid var(--border)', position: 'relative',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em',
            color: 'var(--text)', padding: '0.3rem 0.7rem', borderRadius: '100px',
            border: '1px solid var(--border-strong)', background: 'white',
          }}>{project.badge}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-dim)' }}>
            {project.number}
          </span>
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)',
          display: 'flex', alignItems: 'center', gap: '0.5rem',
        }}>
          <span style={{ color: 'var(--text)' }}>$</span>
          <span>npm run deploy --production</span>
          <span style={{ width: 8, height: 14, background: 'var(--text)', animation: 'pulse-glow 1s infinite', borderRadius: '1px' }} />
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '1.5rem 2rem 2rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{
            fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700,
            color: 'var(--text)', marginBottom: '0.75rem',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            {project.title}
            <FiArrowUpRight style={{ color: 'var(--text-dim)', flexShrink: 0 }} />
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
            {project.description}
          </p>
        </div>

        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
            {project.technologies.map((tech, i) => (
              <span key={i} className="tag">{tech}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
            <a href={project.liveDemo} target="_blank" rel="noopener noreferrer"
              className="btn btn-dark interactive" style={{ fontSize: '0.65rem', padding: '0.55rem 1.1rem' }}>
              <FiExternalLink /> LIVE DEMO
            </a>
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="btn btn-outline interactive" style={{ fontSize: '0.65rem', padding: '0.55rem 1.1rem' }}>
              <FiGithub /> GITHUB
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Section ── */
const Projects = () => {
  const gridRef   = useRef(null);
  const headerRef = useRef(null);

  useGSAP((gsap) => {
    /* header clip-path reveal */
    gsap.fromTo(headerRef.current,
      { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
      { opacity: 1, clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%' } }
    );

    /* cards staggered flip-in */
    if (gridRef.current) {
      gsap.fromTo(Array.from(gridRef.current.children),
        { opacity: 0, y: 80, rotateX: 8, scale: 0.96 },
        { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' } }
      );
    }
  }, []);

  return (
    <section id="work" data-scroll-section className="section section-divider">
      <div className="container">
        <div ref={headerRef} className="section-header" style={{ opacity: 0 }}>
          <div className="section-category">// 02. FEATURED PORTFOLIO</div>
          <h2 className="section-title">SELECTED WORK</h2>
          <p className="section-subtitle">
            Full-stack web applications with clean solutions, robust auth, and AI integration.
          </p>
        </div>

        <div ref={gridRef} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
          gap: 'clamp(1.5rem,3vw,2rem)',
        }}>
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
