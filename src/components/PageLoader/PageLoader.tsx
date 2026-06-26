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

  const progressRef = useRef<HTMLDivElement>(null);
  const loaderTextRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const percentTl = useRef<gsap.core.Timeline | null>(null);
  const [percent, setPercent] = useState(0);
  const [wasActivated, setWasActivated] = useState(false);
  const threshold = 400;

   const revealDecorators = () => {
    if (!mainDecoratorRef?.current) return;
    
    const decoratorChildren = Array.from(mainDecoratorRef.current.children).filter(
      (child): child is HTMLElement => child instanceof HTMLElement
    );

    const revealTimeline = gsap.timeline();
    decoratorChildren.forEach((child: HTMLElement, index: number) => {
      const delay = 0.25;
      const blinkDuration = 0.05;
      const start = index * delay;
      revealTimeline.set(child, { visibility: 'visible' }, start);
      revealTimeline.set(child, { visibility: 'hidden' }, start + blinkDuration);
      revealTimeline.set(child, { visibility: 'visible' }, start + blinkDuration * 2);
      document.body.classList.remove(styles['no-scroll']);
    });
  };

  useEffect(() => {
  let timer: ReturnType<typeof setTimeout> | undefined = undefined;

  if (isLoading) {
    timer = setTimeout(() => {
      setWasActivated(true);
    }, threshold);
  } else {
    if (timer) clearTimeout(timer);
    if (!wasActivated) {
      revealDecorators();
    }
  }

  return () => {
    if (timer) clearTimeout(timer);
  };
}, [isLoading, threshold, wasActivated]);

  useEffect(() => {

    if (!wasActivated) return;

    const root = getComputedStyle(document.documentElement);
    const color = root.getPropertyValue('--highlight-color').trim() || '#000';

    percentTl.current?.kill();
    percentTl.current = gsap.timeline();
    tl.current?.kill();
    tl.current = gsap.timeline({ repeat: -1 });

    if (isLoading) {
      document.body.classList.add(styles['no-scroll']);

      if (progressRef.current) {
        const spans = progressRef.current.querySelectorAll('span');

        // PERCENT ANIMATION
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
      if (progressRef.current) {
        const spans = progressRef.current.querySelectorAll('span');
        const expandTimeline = gsap.timeline();

        // FINAL PERCENT ANIMATION
        const currentPercent = percent;
        let timing = 0.0;
        timing += 0.5;

        percentTl.current?.to(
          { percent: currentPercent },
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
                revealDecorators();
                setWasActivated(false);
              }, [], timing);
            }
          }
        );
      } else {
        document.body.classList.remove(styles['no-scroll']);
        setWasActivated(false);
      }
    }
  }, [isLoading, wasActivated]);

  useEffect(() => {
    return () => {
      tl.current?.kill();
      percentTl.current?.kill();
      document.body.classList.remove(styles['no-scroll']);
    };
  }, []);

  if (!wasActivated) return null;

  return (
    <div className={styles['loader-wrapper']}>
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