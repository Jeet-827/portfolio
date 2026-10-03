import React, { useRef } from 'react';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiArrowUpRight, FiFileText } from 'react-icons/fi';
import { useGSAP } from '../hooks/useGSAP';

const Contact = () => {
  const contentRef = useRef(null);

  useGSAP((gsap) => {
    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 80, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: contentRef.current, start: 'top 85%' } }
    );

    const els = contentRef.current?.querySelectorAll('.contact-animate');
    if (els) {
      gsap.fromTo(els, { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: contentRef.current, start: 'top 80%' } }
      );
    }
  }, []);

  const socialLinks = [
    { label: 'GitHub', href: 'https://github.com/Jeet-827', icon: <FiGithub size={18} /> },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ranpariya-jeet-6965a42a6/', icon: <FiLinkedin size={18} /> },
    { label: 'X (Twitter)', href: 'https://x.com/JRanpariya64513', icon: <FiTwitter size={18} /> },
  ];

  return (
    <section id="contact" data-scroll-section className="section section-dark"
      style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        <div ref={contentRef} style={{
          textAlign: 'center', display: 'flex', flexDirection: 'column',
          alignItems: 'center', opacity: 0,
        }}>
          <div className="section-category contact-animate" style={{ color: 'rgba(255,255,255,0.4)' }}>
            // 06. GET IN TOUCH
          </div>

          <h2 className="contact-animate" style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.04em',
            marginTop: '1rem', marginBottom: '1.5rem', color: 'white',
          }}>
            HAVE A PROJECT
            <br />IN MIND?
            <br /><span style={{ color: 'rgba(255,255,255,0.4)' }}>LET'S BUILD IT.</span>
          </h2>

          <p className="contact-animate" style={{
            fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)', color: 'rgba(255,255,255,0.5)',
            maxWidth: '560px', lineHeight: 1.8, marginBottom: '2.5rem',
          }}>
            I'm currently available for full-stack engineering roles, freelance
            opportunities, and technical collaborations.
          </p>

          <div className="contact-animate" style={{ marginBottom: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="mailto:ranpariyajeet27@gmail.com?subject=Project%20Inquiry%20-%20dev.RJ"
              className="btn btn-white btn-lg interactive" style={{ gap: '0.75rem' }}>
              <FiMail size={18} /> EMAIL ME <FiArrowUpRight />
            </a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
              className="btn btn-outline btn-lg interactive" style={{ gap: '0.75rem', borderColor: 'rgba(255,255,255,0.25)', color: 'white' }}>
              <FiFileText size={18} /> VIEW RESUME <FiArrowUpRight />
            </a>
          </div>

          <div className="contact-animate" style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem',
            paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)',
            width: '100%', maxWidth: '500px',
          }}>
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                className="interactive" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.65rem 1.25rem', borderRadius: '100px',
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                  fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                  color: 'rgba(255,255,255,0.6)', transition: 'all 0.3s ease',
                }}>
                {link.icon} {link.label}
                <FiArrowUpRight style={{ opacity: 0.3, fontSize: '0.65rem' }} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
