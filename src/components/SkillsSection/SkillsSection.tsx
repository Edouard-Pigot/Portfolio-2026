import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

import { skills } from '@data/skills';

import styles from './SkillsSection.module.scss';

gsap.registerPlugin(ScrollTrigger);

function SkillsSection() {
  const { t } = useTranslation();

  const sectionRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%'
      }
    });

    const columns = sectionRef.current?.querySelectorAll(`div.${styles.skillColumn}`);
    if (!columns || columns.length === 0) return;

    columns.forEach((column) => {
      const title = column.querySelector('h4');
      const items = column.querySelectorAll('li');
      
      if (title) {
        tl.from(title, {
          x: -25,
          opacity: 0,
          duration: 0.4,
          ease: 'power1.out'
        });
      }
      
      if (items && items.length > 0) {
        tl.from(items, {
          x: -25,
          opacity: 0,
          duration: 0.2,
          ease: 'power1.out',
          stagger: 0.05
        });
      }
    });
  }, {scope: sectionRef});

  return (
    <div className={styles.skillsGrid} ref={sectionRef}>
      {skills.map((column) => {
        return (
          <div key={column.category} className={styles.skillColumn}>
            <h4 className={styles.groupTitle}>{t(column.category)}</h4>
            <ul className={styles.skillList}>
              {column.skills.map((skill) => (
                <li 
                  key={skill}
                  className={`${styles.skillItem}`}
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default SkillsSection;