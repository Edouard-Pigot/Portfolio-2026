import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { gsap } from 'gsap';

import styles from './PageLoader.module.scss';

interface Props {
  isLoading: boolean;
  mainDecoratorRef?: RefObject<HTMLDivElement | null>;
}

function PageLoader ({ isLoading, mainDecoratorRef }: Props) {

  const wrapperRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const loaderTextRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const percentTl = useRef<gsap.core.Timeline | null>(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (isLoading) {
      document.body.classList.add(styles['no-scroll']);

      if (progressRef.current) {
        const spans = progressRef.current.querySelectorAll('span');

        const root = getComputedStyle(document.documentElement);
        const color = root.getPropertyValue('--highlight-color').trim() || '#000';

        // PERCENT ANIMATION
        percentTl.current = gsap.timeline();
        percentTl.current.to(
          { percent: 0 },
          {
            percent: 90,
            duration: 2,
            onUpdate: function() {
              setPercent(Math.round(this.targets()[0].percent));
            }
          }
        );

        // SQUARES ANIMATION
        tl.current = gsap.timeline({ repeat: -1 });
        tl.current.to(spans, {
          backgroundColor: color,
          duration: 0.4,
          stagger: {
            each: 0.4,
            repeat: 1,
            yoyo: true
          }
        });
      }
    } else {
      if (tl.current && progressRef.current) {
        tl.current.eventCallback('onComplete', () => {
          tl.current?.kill();
          
          if (progressRef.current && wrapperRef.current) {
            const root = getComputedStyle(document.documentElement);
            const decoratorMargin = root.getPropertyValue('--decorator-margin').trim() || '0px';
            const wrapperRect = wrapperRef.current.getBoundingClientRect();

            function getScrollbarWidth() {

              // Creating invisible container
              const outer = document.createElement('div');
              outer.style.visibility = 'hidden';
              outer.style.overflow = 'scroll'; // forcing scrollbar to appear
              document.body.appendChild(outer);

              // Creating inner element and placing it in the container
              const inner = document.createElement('div');
              outer.appendChild(inner);
              
              // Calculating difference between container's full width and the child width
              const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

              // Removing temporary elements from the DOM
              outer.parentNode?.removeChild(outer);

              return scrollbarWidth;
            }

            const scrollbarWidth = getScrollbarWidth(); 
            const finalWidth = wrapperRect.width - parseFloat(decoratorMargin) * 2 - scrollbarWidth;
            const finalHeight = wrapperRect.height - parseFloat(decoratorMargin) * 2;
            const spans = progressRef.current.querySelectorAll('span');

            const expandTimeline = gsap.timeline();

            let decoratorChildren: HTMLElement[] = [];
            if (mainDecoratorRef?.current) {
              decoratorChildren = Array.from(mainDecoratorRef.current.children).filter(
                (child): child is HTMLElement => child instanceof HTMLElement
              );
            }

            let timing = 0.0;

            // FINAL PERCENT ANIMATION
            timing += 0.5;
            percentTl.current?.to(
              { percent: 90 },
              {
                percent: 100,
                duration: timing,
                onUpdate: function() {
                  setPercent(Math.round(this.targets()[0].percent));
                }
              }
            );

            // HIDE SQUARES
            spans.forEach((child : HTMLElement, index: number) => {
              expandTimeline.set(child, { visibility: 'hidden' }, timing + 0.3 * index);
            });
            timing += 0.9;

            // HIDE TEXT
            if(loaderTextRef.current) {
              expandTimeline.set(loaderTextRef.current.children[0], { visibility: 'hidden' }, timing);
              timing += 0.5;
              expandTimeline.set(loaderTextRef.current.children[1], { visibility: 'hidden' }, timing);
              timing += 0.5;
            }

            // EXPAND TO FULL WIDTH
            let duration = 1.0;
            expandTimeline.to(progressRef.current, {
              width: finalWidth,
              duration: duration,
              ease: 'none'
            }, timing); 
            timing += duration;

            // EXPAND TO FULL HEIGHT
            duration = 1.0;
            expandTimeline.to(progressRef.current, {
              height: finalHeight,
              duration: duration,
              ease: 'none',

              onComplete: () => {
                document.body.classList.remove(styles['no-scroll']);

                const wrapper = wrapperRef.current;

                if (wrapper) {
                  wrapper.parentNode?.removeChild(wrapper);
                }

                const revealTimeline = gsap.timeline();

                decoratorChildren.forEach((child : HTMLElement, index : number) => {
                  const delay = 0.5;
                  const blinkDuration = 0.12;
                  const start = index * delay;
                  revealTimeline.set(child, { visibility: 'visible' }, start);
                  revealTimeline.set(child, { visibility: 'hidden' }, start + blinkDuration);
                  revealTimeline.set(child, { visibility: 'visible' }, start + blinkDuration * 2);
                });
              }
            }, timing);
            timing += duration;
            
          }
        });

        tl.current.repeat(0);
      } else {
        document.body.classList.remove(styles['no-scroll']);
      }
    }
  }, [isLoading]);

  useEffect(() => {
    return () => {
      tl.current?.kill();
      document.body.classList.remove(styles['no-scroll']);
    };
  }, []);

  return (
    <div className={styles['loader-wrapper']} ref={wrapperRef}>
      <div className={styles['loader-text']} ref={loaderTextRef}>
        <div className={styles["loader-title"]}>INITIALIZING...</div>
        <div className={styles["loader-percent"]}>
          {percent < 100 ? `${percent}%` : "READY"}
        </div>
      </div>
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