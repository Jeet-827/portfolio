import React, { useState, useEffect, useRef } from 'react';
import { FiMenu, FiX, FiArrowUpRight } from 'react-icons/fi';
import { scrollToSection } from '../utils/smoothScroll';
import { useMagnetic } from '../hooks/useGSAP';
import { useLocomotiveScroll } from '../context/SmoothScroll';

const navLinks = [
  { label: 'WORK', href: 'work' },
  { label: 'SKILLS', href: 'skills' },
  { label: 'ABOUT', href: 'about' },
  { label: 'JOURNEY', href: 'journey' },
  { label: 'CONTACT', href: 'contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const logoRef = useRef(null);
  const locoScroll = useLocomotiveScroll();

  useMagnetic(logoRef, 0.2);

  useEffect(() => {
    const pickActive = () => {
      let current = '';
      for (const link of navLinks) {
        const el = document.getElementById(link.href);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) current = link.href;
      }
      setActiveSection(current);
    };

    if (!locoScroll) {
      // Fallback: native scroll listener
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
        pickActive();
      };
      handleScroll();
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }

    // Locomotive v4 has no `off()`, so guard the callback with a flag
    let active = true;
    locoScroll.on('scroll', (args) => {
      if (!active) return;
      setIsScrolled(args.scroll.y > 50);
      pickActive();
    });
    return () => { active = false; };
  }, [locoScroll]);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    if (locoScroll) {
      const target = document.getElementById(id);
      if (target) locoScroll.scrollTo(target);
    } else {
      scrollToSection(id);
    }
    setMobileOpen(false);
  };

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
      <nav
        className={isScrolled ? 'nav-scrolled' : ''}
        style={{
          padding: '0 clamp(1.5rem, 5vw, 3rem)',
          transition: 'all 0.4s ease',
          ...(isScrolled ? {} : { background: 'transparent' }),
        }}
      >
        <div style={{
          maxWidth: '1400px', margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: '76px',
        }}>
          {/* Logo */}
          <a
            ref={logoRef}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (locoScroll) locoScroll.scrollTo(0);
              else window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="interactive"
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '1.1rem',
              fontWeight: 700, letterSpacing: '0.05em', color: 'var(--text)',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}
          >
            <span style={{
              width: 8, height: 8, borderRadius: '50%', background: 'var(--text)',
            }} />
            dev.RJ
          </a>

          {/* Desktop Nav */}
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={`#${link.href}`}
                onClick={(e) => handleNavClick(e, link.href)}
                className="interactive"
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                  letterSpacing: '0.15em',
                  color: activeSection === link.href ? 'var(--text)' : 'var(--text-muted)',
                  transition: 'color 0.3s ease', position: 'relative',
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="btn btn-dark interactive"
              style={{ padding: '0.5rem 1.2rem', fontSize: '0.6rem' }}
            >
              <span className="pulse-dot" style={{ width: 5, height: 5, background: 'white' }} />
              HIRE ME
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="mobile-toggle interactive"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ display: 'none', padding: '0.5rem', color: 'var(--text)' }}
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed', top: '80px', left: '1rem', right: '1rem',
            padding: '1.5rem', zIndex: 90, borderRadius: '1rem',
            background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)',
            border: '1px solid var(--border)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
            animation: 'fadeInDown 0.3s ease',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label} href={`#${link.href}`}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.1em',
                padding: '0.8rem 1rem', borderRadius: '0.75rem',
                color: 'var(--text-secondary)', transition: 'all 0.2s ease',
              }}
            >
              {link.label}
              <FiArrowUpRight style={{ opacity: 0.3 }} />
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
