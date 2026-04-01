import styles from './MainDecorator.module.scss';

import NavBar from '@components/NavBar/NavBar';
import MainContent from '@components/MainContent/MainContent';
import ScrollBridge from '@components/ScrollBridge/ScrollBridge';
import UtilityButtons from '../UtilityButtons/UtilityButtons';

import { useState, useRef, useEffect } from 'react';

import { gsap } from 'gsap';

interface Props {
  startAnimation: boolean;
}

function MainDecorator({ startAnimation }: Props) {

  const [showLoader, setShowLoader] = useState(true);
  const [percent, setPercent] = useState(0);

  const mainDecoratorRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const loaderTextRef = useRef<HTMLDivElement>(null);
  const menusRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (startAnimation) {

    }
  }, [startAnimation]);

  /*useEffect(() => {
    const timer = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 90) {
          if (document.readyState === 'complete') {
            clearInterval(timer);
            return 100;
          }
          return 90;
        }
        return prev + Math.floor(Math.random() * 10);
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (percent === 100 && mainDecoratorRef.current && loaderRef.current) {
      const timeline = gsap.timeline({
        onComplete: () => {
          gsap.set(loaderRef.current, { pointerEvents: "none" });
        }
      });

      timeline.to(loaderRef.current, {
        opacity: 0,
        duration: .5,
        ease: "power2.in",
      });

      timeline.to(loaderTextRef.current, {
        opacity: 0,
        duration: .5,
        ease: "power2.in",
        onComplete: () => {
          loaderTextRef.current?.remove();
        }
      });

      timeline.add("expand");

      timeline.to(mainDecoratorRef.current, {
        width: "calc(100% - var(--decorator-margin) * 2)",
        height: "calc(100% - var(--decorator-margin) * 2)",
        duration: 2,
        ease: "none"
      }, "expand");

      timeline.to(mainDecoratorRef.current, {
        top: "0%",
        left: "0%",
        xPercent: 0,
        yPercent: 0,
        duration: 2,
        ease: "none"
      }, "expand");
    }
  }, [percent]);*/

  return (
    <ScrollBridge>
      <div ref={mainDecoratorRef} className={`${styles.mainDecorator}`}>
        <div id={styles["top-left-corner"]} >
          EP
        </div>
        <div id={styles["top-navbar"]}>
          <NavBar />
        </div>
        <div id={styles["left-toolbar"]}>
          <div id={styles["spacer"]} className='hashed-background'/>
          <UtilityButtons id={styles["nav-utilities"]} />
        </div>
        <div id={styles["main-content-container"]} className="dotted-background">
          <MainContent />
        </div>
        {showLoader && 
          <div ref={loaderRef} className={styles.loadingLine} style={{ width: `${percent}%` }}/>
        }
      </div>
      {/*showLoader && (
          <div ref={loaderTextRef}>
            <div className={styles["loaderText"]}>INITIALIZING...</div>
            <div className={styles["loaderPercent"]}>
              {percent < 100 ? `${percent}%` : "READY"}
            </div>
          </div>
        )*/}
    </ScrollBridge>
  )
}

export default MainDecorator;