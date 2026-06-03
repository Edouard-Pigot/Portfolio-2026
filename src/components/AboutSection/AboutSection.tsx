import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

import styles from './AboutSection.module.scss';

gsap.registerPlugin(ScrollTrigger);

function AboutSection() {
  const { t } = useTranslation();

  const sectionRef = useRef(null);
  const textRef = useRef(null);

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