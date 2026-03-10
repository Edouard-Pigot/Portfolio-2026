import { useContext, useLayoutEffect, useRef } from 'react';
import { ScrollHeightContext } from '../components/ScrollBridge/ScrollBridge';

export const useReportHeight = <T extends HTMLElement>(id: string) => {
  const context = useContext(ScrollHeightContext);
  
  if (!context) {
    throw new Error("useReportHeight must be used within a ScrollBridge provider");
  }

  const { reportHeight } = context;
  const elementRef = useRef<T>(null);

  useLayoutEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
        reportHeight(id, height);
      }
    });

    observer.observe(element);

    // Initial height report
    const height = element.getBoundingClientRect().height;
    reportHeight(id, height);

    return () => {
      observer.disconnect();
    };
  }, [id, reportHeight]);

  return elementRef;
};