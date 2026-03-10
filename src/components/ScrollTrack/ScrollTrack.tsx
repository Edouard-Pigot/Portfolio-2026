import React, { useContext } from 'react';
import { ScrollHeightContext } from '@components/ScrollBridge/ScrollBridge';

function ScrollTrack({ children }: { children: React.ReactNode }) {
  const context = useContext(ScrollHeightContext);
  if (!context) return <>{children}</>;

  return (
    <div style={{ 
      height: '100%',
      transform: `translateY(-${context.scrollY}px)`, 
      willChange: 'transform'
    }}>
      {children}
    </div>
  );
};

export default ScrollTrack;