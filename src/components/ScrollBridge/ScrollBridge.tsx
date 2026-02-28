import React, { 
  createContext, 
  useContext, 
  useState, 
  useMemo, 
  useCallback, 
  useEffect 
} from 'react';
import { createPortal } from 'react-dom';

interface ScrollHeightContextType {
  reportHeight: (id: string, height: number) => void;
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
    const decoratorHeight = margin * 2 + navbarHeight;
    
    return sectionsHeight + decoratorHeight;
  }, [heights]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ScrollHeightContext.Provider value={{ reportHeight }}>
      {createPortal(
        <div 
          id="scroll-ghost"
          style={{ 
            height: `${totalHeight}px`, 
            width: '1px',
            pointerEvents: 'none',
            visibility: 'hidden'
          }} 
        />,
        document.body
      )}

      <div style={{ 
        height: '100%',
        transform: `translateY(-${scrollY}px)`,
        willChange: 'transform' 
      }}>
        {children}
      </div>
    </ScrollHeightContext.Provider>
  );
};

export default ScrollBridge;