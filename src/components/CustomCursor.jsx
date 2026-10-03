import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Premium GSAP-driven Custom Cursor.
 * Utilizes gsap.quickTo for silky smooth 120fps physics,
 * magnetic scale-up on interactive elements, and mix-blend-mode difference.
 */
const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // If device doesn't support fine pointer at all, exit safely
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Set initial centering offsets and zero opacity
    gsap.set(dot, { xPercent: -50, yPercent: -50, opacity: 0 });
    gsap.set(ring, { xPercent: -50, yPercent: -50, opacity: 0 });

    // GSAP quickTo functions for ultra-smooth fluid tracking
    const xToDot = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3' });
    const yToDot = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3' });
    const xToRing = gsap.quickTo(ring, 'x', { duration: 0.38, ease: 'power3.out' });
    const yToRing = gsap.quickTo(ring, 'y', { duration: 0.38, ease: 'power3.out' });

    let hasMoved = false;
    let isHovered = false;
    let isTouchActive = false;

    const onTouchStart = () => {
      // Touch detected: restore native browser behavior immediately
      isTouchActive = true;
      document.body.classList.remove('has-custom-cursor');
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };

    const onMouseMove = (e) => {
      if (isTouchActive) {
        // If mouse moved again after touch, re-enable custom cursor
        isTouchActive = false;
      }

      const { clientX: x, clientY: y } = e;

      if (!hasMoved) {
        hasMoved = true;
        document.body.classList.add('has-custom-cursor');
        gsap.set([dot, ring], { x, y });
        gsap.to([dot, ring], { opacity: 1, duration: 0.3, ease: 'power2.out' });
      }

      xToDot(x);
      yToDot(y);
      xToRing(x);
      yToRing(y);
    };

    const onMouseDown = () => {
      if (isTouchActive) return;
      gsap.to(ring, {
        scale: isHovered ? 1.2 : 0.75,
        duration: 0.2,
        ease: 'power2.out',
      });
      gsap.to(dot, {
        scale: 0.5,
        duration: 0.2,
        ease: 'power2.out',
      });
    };

    const onMouseUp = () => {
      if (isTouchActive) return;
      gsap.to(ring, {
        scale: isHovered ? 1.8 : 1,
        duration: 0.35,
        ease: 'back.out(2)',
      });
      gsap.to(dot, {
        scale: isHovered ? 0.4 : 1,
        duration: 0.25,
        ease: 'power2.out',
      });
    };

    const onMouseOver = (e) => {
      if (isTouchActive) return;
      const target = e.target;
      if (!(target instanceof Element)) return;

      const interactive = Boolean(
        target.closest('a, button, input, textarea, select, .interactive, .tag, .card, .btn, [role="button"]')
      );

      if (interactive !== isHovered) {
        isHovered = interactive;
        if (isHovered) {
          gsap.to(ring, {
            scale: 1.8,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderColor: 'rgba(255, 255, 255, 0.8)',
            duration: 0.3,
            ease: 'power2.out',
          });
          gsap.to(dot, {
            scale: 0.4,
            duration: 0.25,
            ease: 'power2.out',
          });
        } else {
          gsap.to(ring, {
            scale: 1,
            backgroundColor: 'transparent',
            borderColor: '#ffffff',
            duration: 0.35,
            ease: 'power2.out',
          });
          gsap.to(dot, {
            scale: 1,
            duration: 0.25,
            ease: 'power2.out',
          });
        }
      }
    };

    const onMouseLeaveWindow = () => {
      document.body.classList.remove('has-custom-cursor');
      gsap.to([dot, ring], { opacity: 0, duration: 0.25, ease: 'power2.out' });
    };

    const onMouseEnterWindow = () => {
      if (hasMoved && !isTouchActive) {
        document.body.classList.add('has-custom-cursor');
        gsap.to([dot, ring], { opacity: 1, duration: 0.25, ease: 'power2.out' });
      }
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onMouseLeaveWindow);
    document.documentElement.addEventListener('mouseenter', onMouseEnterWindow);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
      document.documentElement.removeEventListener('mouseleave', onMouseLeaveWindow);
      document.documentElement.removeEventListener('mouseenter', onMouseEnterWindow);
    };
  }, []);

  return (
    <>
      {/* GSAP Inner Dot */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          pointerEvents: 'none',
          zIndex: 999999,
          mixBlendMode: 'difference',
          willChange: 'transform',
          opacity: 0,
        }}
      />
      {/* GSAP Outer Ring */}
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 38,
          height: 38,
          borderRadius: '50%',
          border: '1.5px solid #ffffff',
          backgroundColor: 'transparent',
          pointerEvents: 'none',
          zIndex: 999998,
          mixBlendMode: 'difference',
          willChange: 'transform',
          opacity: 0,
        }}
      />
    </>
  );
};

export default CustomCursor;
