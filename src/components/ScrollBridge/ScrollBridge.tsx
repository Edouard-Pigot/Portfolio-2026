import React, { createContext, useState, useMemo, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

const SECTION_ORDER = ['home', 'about', 'projects', 'skills', 'experience', 'schooling', 'contact'];

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

  const reportHeight = useCallback((id: string, h: number) => {
    setHeights((prev) => (prev[id] === h ? prev : { ...prev, [id]: h }));
  }, []);

  const totalHeight = useMemo(() => {
    const sectionsHeight = Object.values(heights).reduce((acc, curr) => acc + curr, 0);
    const root = getComputedStyle(document.documentElement);
    const margin = parseInt(root.getPropertyValue('--decorator-margin')) || 0;
    const navbarHeight = parseInt(root.getPropertyValue('--navbar-height')) || 0;
    return sectionsHeight + (margin * 2) + navbarHeight;
  }, [heights]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const targetIndex = SECTION_ORDER.indexOf(id);
    if (targetIndex === -1) return;

    const offset = SECTION_ORDER
      .slice(0, targetIndex)
      .reduce((acc, curr) => acc + (heights[curr] || 0), 0);

    window.scrollTo({ top: offset, behavior: 'smooth' });
  }, [heights]);

  const activeSection = useMemo(() => {
    const root = getComputedStyle(document.documentElement);
    const margin = parseInt(root.getPropertyValue('--decorator-margin')) || 0;
    const navbarHeight = parseInt(root.getPropertyValue('--navbar-height')) || 0;

    const viewportTop = scrollY + margin + navbarHeight;
    const viewportMiddle = scrollY + margin + navbarHeight + (window.innerHeight / 2);

    let accumulatedTop = 0;

    for (const id of SECTION_ORDER) {
      const sectionHeight = heights[id] || 0;
      const sectionBottom = accumulatedTop + sectionHeight;

      // RULE: 
      // 1. The middle of the screen must be past the section's top (viewportMiddle >= accumulatedTop)
      // 2. The top of the screen must NOT have passed the section's bottom (viewportTop < sectionBottom)
      if (viewportMiddle >= accumulatedTop && viewportTop < sectionBottom) {
        return id;
      }

      accumulatedTop = sectionBottom;
    }

    return SECTION_ORDER[0];
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