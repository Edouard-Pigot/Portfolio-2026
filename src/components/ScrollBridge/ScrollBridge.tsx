import React, { createContext, useState, useMemo, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

const SECTION_ORDER = ['home', 'about', 'projects', 'skills', 'experience', 'education', 'contact'];

interface ScrollHeightContextType {
  reportHeight: (id: string, height: number) => void;
  scrollToSection: (id: string) => void;
  activeSection: string;
  scrollY: number;
}

export const ScrollHeightContext = createContext<ScrollHeightContextType | undefined>(undefined);

function ScrollBridge({ children }: { children: React.ReactNode }) {
  const [heights, setHeights] = useState<Record<string, number>>({});
  const [scrollY, setScrollY] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const isMobile = windowWidth < 850;

  const reportHeight = useCallback((id: string, h: number) => {
    setHeights((prev) => (prev[id] === h ? prev : { ...prev, [id]: h }));
  }, []);

  const totalHeight = useMemo(() => {
    if (isMobile) return 0;

    const sectionsHeight = Object.values(heights).reduce((acc, curr) => acc + curr, 0);

    const root = getComputedStyle(document.documentElement);
    const margin = parseInt(root.getPropertyValue('--decorator-margin')) || 0;
    const navbarHeight = parseInt(root.getPropertyValue('--navbar-height')) || 0;
    return sectionsHeight + (margin * 2) + navbarHeight;
  }, [heights, isMobile]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('resize', handleResize)
    }
  }, []);

  const scrollToSection = useCallback((id: string) => {
    if (isMobile) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    
    const targetIndex = SECTION_ORDER.indexOf(id);
    if (targetIndex === -1) return;

    const offset = SECTION_ORDER
      .slice(0, targetIndex)
      .reduce((acc, curr) => acc + (heights[curr] || 0), 0);

    window.scrollTo({ top: offset, behavior: 'smooth' });
  }, [heights, windowWidth]);

  const activeSection = useMemo(() => {
    const root = getComputedStyle(document.documentElement);
    const margin = parseInt(root.getPropertyValue('--decorator-margin')) || 0;

    // Use the center of the viewport as the reference point
    const viewportCenter = scrollY + window.innerHeight / 2;

    let sectionTop = margin;

    for (const id of SECTION_ORDER) {
      const sectionHeight = heights[id] || 0;
      const sectionBottom = sectionTop + sectionHeight;

      // Check if viewport center falls within this section
      if (viewportCenter >= sectionTop && viewportCenter < sectionBottom) {
        return id;
      }

      sectionTop = sectionBottom;
    }

    // If no section contains the viewport center, return the last section
    return SECTION_ORDER[SECTION_ORDER.length - 1];
  }, [scrollY, heights]);

  return (
    <ScrollHeightContext.Provider value={{ reportHeight, scrollToSection, activeSection, scrollY }}>
      {createPortal(
        <div 
          style={{ 
            height: `${totalHeight}px`, 
            position: 'absolute', top: 0, left: 0, width: '1px', 
            pointerEvents: 'none', visibility: 'hidden' 
          }} 
        />,
        document.body
      )}
      {children}
    </ScrollHeightContext.Provider>
  );
};

export default ScrollBridge;