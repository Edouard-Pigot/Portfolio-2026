import { useContext, useLayoutEffect, useRef } from 'react';
import { ScrollHeightContext } from '../components/ScrollBridge/ScrollBridge';

export const useReportHeight = <T extends HTMLElement>(id: string) => {
  const context = useContext(ScrollHeightContext);
  
  if (!context) {
    throw new Error("useReportHeight must be used within a ScrollBridge provider");
  }

  const { reportHeight } = context;
  const elementRef = useRef<T>(null);

  const idRef = useRef(id);

  useLayoutEffect(() => {
    idRef.current = id;
  }, [id]);

  useLayoutEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
        reportHeight(idRef.current, height);
      }
    });

    observer.observe(element);

    // Initial height report
    const height = element.getBoundingClientRect().height;
    reportHeight(idRef.current, height);

    return () => {
      observer.disconnect();
      // Don't clear height on cleanup to avoid issues with React Strict Mode re-mounting
      // The height will be updated when the observer reports changes
    };
  }, [reportHeight]);

  return elementRef;
};