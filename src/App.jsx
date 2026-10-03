import React from 'react';
import { SmoothScrollProvider } from './context/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import HorizontalScroll from './sections/HorizontalScroll';
import Skills from './sections/Skills';
import Journey from './sections/Journey';
import Github from './sections/Github';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function App() {
  return (
    <SmoothScrollProvider>
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Sticky Navigation */}
      <Navbar />

      {/* Main Content */}
      <main style={{ width: '100%', overflowX: 'hidden', position: 'relative' }}>
        <Hero />
        <About />
        <Projects />

        {/* GSAP Horizontal Scroll Section with SplitText character animation */}
        <HorizontalScroll />

        <Skills />
        <Journey />
        <Github />
        <Contact />
      </main>

      <Footer />
    </SmoothScrollProvider>
  );
}

export default App;
