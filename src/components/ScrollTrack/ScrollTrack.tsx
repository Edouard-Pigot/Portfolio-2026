import React, { useContext } from 'react';
import { ScrollHeightContext } from '@components/ScrollBridge/ScrollBridge';

function ScrollTrack({ children }: { children: React.ReactNode }) {
  const context = useContext(ScrollHeightContext);
  if (!context) return <>{children}</>;

  const isMobile = window.innerWidth < 850;

  return (
    <div style={{ 
      height: '100%',
      transform: isMobile ? 'none' : `translateY(-${context.scrollY}px)`, 
      willChange: isMobile ? 'auto' : 'transform'
    }}>
      {children}
    </div>
  );
};

export default ScrollTrack;