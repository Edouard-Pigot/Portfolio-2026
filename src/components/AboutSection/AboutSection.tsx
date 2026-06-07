import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

import styles from './AboutSection.module.scss';

gsap.registerPlugin(ScrollTrigger);

function AboutSection() {
  const { t } = useTranslation();

  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    gsap.from([textRef.current], {
      x: -25,
      opacity: 0,
      duration: 1.0,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%'
      }
    });
  }, {scope: sectionRef});

  return (
    <div id={styles['about-section']} ref={sectionRef}>
      <div  id={styles['about-section-wrapper']}>
        <p id={styles['about-section-content']} ref={textRef}>
          {t('about.description')}
        </p>
      </div>
    </div>
  );
}

export default AboutSection;