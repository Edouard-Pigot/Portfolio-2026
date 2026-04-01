import styles from './PageLoader.module.scss';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Props {
  isReady: boolean;
  onFinished: () => void;
}

function PageLoader ({ isReady, onFinished }: Props) {

  const wrapperRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const root = getComputedStyle(document.documentElement);
  const color = root.getPropertyValue('--highlight-color');

  useEffect(() => {
    if (progressRef.current) {
      const spans = progressRef.current.querySelectorAll('span');

      tl.current = gsap.timeline({ repeat: -1 });

      tl.current.to(spans, {
        backgroundColor: color,
        duration: 0.4,
        stagger: {
          each: 0.4,       // Time between each span starting its animation
          repeat: 1,       // Repeat once to go "on" then "off"
          yoyo: true       // Reverses the color back to original
        }
      });
    }

    return () => { tl.current?.kill(); };
  }, []);

  useEffect(() => {
    if (isReady && progressRef.current && wrapperRef.current && tl.current) {
      const spans = progressRef.current.querySelectorAll('span');

      // Stop the looping animation immediately
      tl.current.kill();

      const finalTl = gsap.timeline();

      finalTl.to(spans, {
        backgroundColor: color,
        scale: 1.2,
        duration: 0.4,
        stagger: 0.1
      })
      .to(wrapperRef.current, {
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        onComplete: () => {
          // completely remove from layout so it's not clickable
          if (wrapperRef.current) wrapperRef.current.style.display = 'none';
          onFinished();
        }
      });
    }
  }, [isReady]);

  return (
    <div className={styles['loader-wrapper']} ref={wrapperRef}>
      <div className={styles['loader-progress']} ref={progressRef}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}

export default PageLoader;