import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for GSAP animations with automatic cleanup.
 * @param {function} animationCallback - receives (gsap, ScrollTrigger)
 * @param {Array} deps - dependency array
 */
export function useGSAP(animationCallback, deps = []) {
  const contextRef = useRef(null);

  useEffect(() => {
    // Small delay to ensure locomotive scroll is initialized
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        animationCallback(gsap, ScrollTrigger);
      });
      contextRef.current = ctx;
    }, 100);

    return () => {
      clearTimeout(timer);
      if (contextRef.current) {
        contextRef.current.revert();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return contextRef;
}

/**
 * Magnetic hover effect using GSAP.
 */
export function useMagnetic(ref, strength = 0.3) {
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, { x: x * strength, y: y * strength, duration: 0.3, ease: 'power2.out' });
    };

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [ref, strength]);
}

export { gsap, ScrollTrigger };
