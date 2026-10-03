import React from 'react';
import { FiGithub, FiLinkedin, FiTwitter, FiArrowUp } from 'react-icons/fi';
import { useLocomotiveScroll } from '../context/SmoothScroll';

const Footer = () => {
  const locoScroll = useLocomotiveScroll();

  return (
    <footer data-scroll-section style={{
      borderTop: '1px solid var(--border)', padding: '2.5rem clamp(1.5rem, 5vw, 3rem)',
      maxWidth: '1400px', margin: '0 auto',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '1.5rem',
      }}>
        <div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 700,
            color: 'var(--text)', marginBottom: '0.3rem',
            display: 'flex', alignItems: 'center', gap: '0.4rem',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text)' }} />
            dev.RJ
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
            color: 'var(--text-dim)', letterSpacing: '0.1em',
          }}>
            © {new Date().getFullYear()} JEET RANPARIYA. REACT + GSAP + LOCOMOTIVE.
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {[
            { icon: <FiGithub />, href: 'https://github.com/Jeet-827' },
            { icon: <FiLinkedin />, href: 'https://www.linkedin.com/in/ranpariya-jeet-6965a42a6/' },
            { icon: <FiTwitter />, href: 'https://x.com/JRanpariya64513' },
          ].map((link, i) => (
            <a key={i} href={link.href} target="_blank" rel="noopener noreferrer"
              className="interactive" style={{
                width: 36, height: 36, borderRadius: '50%',
                border: '1px solid var(--border)', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-muted)', transition: 'all 0.3s ease', fontSize: '0.9rem',
              }}>{link.icon}</a>
          ))}
        </div>

        <button onClick={() => {
          if (locoScroll) locoScroll.scrollTo(0);
          else window.scrollTo({ top: 0, behavior: 'smooth' });
        }} className="interactive" style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em',
          color: 'var(--text-muted)', transition: 'color 0.3s ease',
        }}>
          BACK TO TOP <FiArrowUp />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
