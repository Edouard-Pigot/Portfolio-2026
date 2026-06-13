import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { gsap } from 'gsap';

import styles from './PageLoader.module.scss';

interface Props {
  isLoading: boolean;
  mainDecoratorRef?: RefObject<HTMLDivElement | null>;
}

function PageLoader ({ isLoading, mainDecoratorRef }: Props) {

  const { t } = useTranslation();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const loaderTextRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const percentTl = useRef<gsap.core.Timeline | null>(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const root = getComputedStyle(document.documentElement);
    const color = root.getPropertyValue('--highlight-color').trim() || '#000';
    if (isLoading) {
      document.body.classList.add(styles['no-scroll']);

      if (progressRef.current) {
        const spans = progressRef.current.querySelectorAll('span');

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
          duration: 0.05,
          stagger: {
            each: (0.25),
            repeat: -1,
            repeatDelay: 1.0,
            yoyo: true
          }
        });
      }
    } else {
      if (tl.current && progressRef.current) {
        const spans = progressRef.current.querySelectorAll('span');
        const expandTimeline = gsap.timeline();

        let decoratorChildren: HTMLElement[] = [];
        if (mainDecoratorRef?.current) {
          decoratorChildren = Array.from(mainDecoratorRef.current.children).filter(
            (child): child is HTMLElement => child instanceof HTMLElement
          );
        }

        // FINAL PERCENT ANIMATION
        let timing = 0.0;
        timing += 0.5;
        percentTl.current?.to(
          { percent: 90 },
          {
            percent: 100,
            duration: timing,
            onUpdate: function() {
              setPercent(Math.round(this.targets()[0].percent));
            },
            onComplete: function() {
              tl.current?.kill();

              expandTimeline.set(spans, { backgroundColor: color });
              // HIDE SQUARES
              let disapearDuration = 0.3;
              timing += 0.5;
              spans.forEach((child : HTMLElement, index: number) => {
                expandTimeline.set(child, { visibility: 'hidden' }, timing + disapearDuration * index);
              });
              timing = disapearDuration * spans.length;

              // HIDE TEXT
              if(loaderTextRef.current) {
                expandTimeline.set(loaderTextRef.current.children[0], { visibility: 'hidden' }, timing);
                timing += 0.5;
                expandTimeline.set(loaderTextRef.current.children[1], { visibility: 'hidden' }, timing);
                timing += 0.5;
              }

              // DECORATOR CHILDREN ANIMATION
              expandTimeline.call(() => {
                const wrapper = wrapperRef.current;

                if (wrapper) {
                  wrapper.parentNode?.removeChild(wrapper);
                }

                const revealTimeline = gsap.timeline();

                decoratorChildren.forEach((child : HTMLElement, index : number) => {
                  const delay = 0.25;
                  const blinkDuration = 0.15;
                  const start = index * delay;
                  revealTimeline.set(child, { visibility: 'visible' }, start);
                  revealTimeline.set(child, { visibility: 'hidden' }, start + blinkDuration);
                  revealTimeline.set(child, { visibility: 'visible' }, start + blinkDuration * 2);
                  document.body.classList.remove(styles['no-scroll']);
                });
              }, [], timing);
            }
          }
        );
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
        <div className={styles["loader-title"]}>{t('loading.loading')}</div>
        <div className={styles["loader-percent"]}>
          {percent < 100 ? `${percent}%` : t('loading.loaded')}
        </div>
      </div>
      <div className={styles['loader-progress']} ref={progressRef}>
        <span/>
        <span/>
        <span/>
        <span/>
      </div>
    </div>
  )
}

export default PageLoader;