import React, { createContext, useContext, useEffect, useRef, useState, useMemo } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LocoContext = createContext(null);

/**
 * Ultra-smooth momentum scrolling powered by Lenis + GSAP ScrollTrigger.
 * Provides luxury inertia scrolling, native window scroll events,
 * and reliable ScrollTrigger pinning for horizontal scroll sections.
 */
export function SmoothScrollProvider({ children }) {
  const [lenis, setLenis] = useState(null);
  const lenisRef = useRef(null);
  const scrollListeners = useRef(new Set());

  useEffect(() => {
    // 1. Initialize Lenis with smooth momentum settings
    const l = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential deceleration
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = l;
    setLenis(l);

    // 2. Connect Lenis scroll events to ScrollTrigger and subscribers
    l.on('scroll', (e) => {
      ScrollTrigger.update();
      const scrollY = e.scroll ?? window.scrollY;
      const data = { scroll: { y: scrollY } };
      scrollListeners.current.forEach((cb) => {
        try {
          cb(data);
        } catch (err) {
          console.error(err);
        }
      });
    });

    // 3. Drive Lenis updates using GSAP's internal ticker for perfect 60-120fps sync
    const tickerUpdate = (time) => {
      l.raf(time * 1000);
    };

    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    // Ensure ScrollTrigger defaults to window
    ScrollTrigger.defaults({ scroller: window });

    // Refresh ScrollTrigger after initial mount and layout calculations
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 200);
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 800);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', onResize);
      gsap.ticker.remove(tickerUpdate);
      l.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  // Bridge API matching useLocomotiveScroll interface
  const scrollProxy = useMemo(() => ({
    scrollTo: (target, options = {}) => {
      const instance = lenisRef.current;
      if (!target && target !== 0) return;

      if (!instance) {
        if (typeof target === 'number') {
          window.scrollTo({ top: target, behavior: 'smooth' });
        } else if (typeof target === 'string') {
          const el = document.getElementById(target.replace('#', ''));
          el?.scrollIntoView({ behavior: 'smooth' });
        } else if (target instanceof HTMLElement) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }

      instance.scrollTo(target, {
        offset: options.offset || (typeof target === 'string' && !target.includes('hero') ? -75 : 0),
        duration: options.duration || 1.2,
        immediate: options.immediate || false,
      });
    },
    on: (event, callback) => {
      if (event === 'scroll' && typeof callback === 'function') {
        scrollListeners.current.add(callback);
        // Immediate callback with current position
        callback({ scroll: { y: window.scrollY } });
        return () => scrollListeners.current.delete(callback);
      }
      return () => {};
    },
    update: () => {
      ScrollTrigger.refresh();
    },
    destroy: () => {
      lenisRef.current?.destroy();
    },
  }), []);

  return (
    <LocoContext.Provider value={scrollProxy}>
      <div className="smooth-scroll-wrapper" style={{ width: '100%', position: 'relative' }}>
        {children}
      </div>
    </LocoContext.Provider>
  );
}

/**
 * Access the smooth scroll instance (compatible with locomotive-scroll API).
 */
export function useLocomotiveScroll() {
  return useContext(LocoContext);
}
