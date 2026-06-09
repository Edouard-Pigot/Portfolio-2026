import React, { useContext } from 'react';
import { ScrollHeightContext } from '@components/ScrollBridge/ScrollBridge';

function ScrollTrack({ children }: { children: React.ReactNode }) {
  const context = useContext(ScrollHeightContext);
  if (!context) return <>{children}</>;

  const isMobile = window.innerWidth < 850 || window.innerHeight < 500;

  return (
    <div style={{ 
      height: '100%',
      transform: isMobile ? 'translateY(0)' : `translateY(-${context.scrollY}px)`, 
      willChange: isMobile ? 'auto' : 'transform'
    }}>
      {children}
    </div>
  );
};

export default ScrollTrack;