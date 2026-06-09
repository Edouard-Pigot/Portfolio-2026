import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

import styles from './SkillsSection.module.scss';

const LEVEL_PRIORITY = {
  high: 3,
  medium: 2,
  low: 1
} as const;

export type SkillLevel = keyof typeof LEVEL_PRIORITY;

export type SkillGroup = {
  name: string;
  skills: {
    name: string;
    level: SkillLevel;
  }[];
};

const frontWebSkills: SkillGroup = {
  name: "skills.groups.frontend",
  skills:[
    { name: 'HTML',       level: 'high' },
    { name: 'CSS',        level: 'high' },
    { name: 'SASS',       level: 'high' },
    { name: 'JavaScript', level: 'high' },
    { name: 'TypeScript', level: 'high' },
    { name: 'React',      level: 'medium' },
    { name: 'JQuery',     level: 'low' },
    { name: 'ThreeJS',     level: 'low' }
  ]
};
const backWebSkills: SkillGroup = {
  name: "skills.groups.backend",
  skills:[
    { name: 'SQL',        level: 'high' },
    { name: 'MySQL',      level: 'high' },
    { name: 'PHP',        level: 'low' },
    { name: 'Node.js',    level: 'low' },
    { name: 'Python',     level: 'low' },
    { name: 'PostgreSQL', level: 'low' }
  ]
};
const nativeSkills: SkillGroup = {
  name: "skills.groups.software",
  skills:[
    { name: 'C++',        level: 'medium' },
    { name: 'Unity',      level: 'medium' },
    { name: 'C#',         level: 'low' },
    { name: 'Java',       level: 'low' },
    { name: 'Qt',         level: 'low' },
    { name: 'Blender',    level: 'low' }
  ]
};
const toolsSkills: SkillGroup = {
  name: "skills.groups.tools",
  skills:[
    { name: 'Git',        level: 'high' },
    { name: 'GitHub',     level: 'high' },
    { name: 'Visual Studio Code', level: 'high' },
    { name: 'Visual Studio 2019', level: 'medium' },
    { name: 'Vite',       level: 'low' },
    { name: 'Jira',       level: 'low' }
  ]
};
const allSkills = [frontWebSkills, backWebSkills, nativeSkills, toolsSkills];

gsap.registerPlugin(ScrollTrigger);

function SkillsSection() {
  const { t } = useTranslation();

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const legendRef = useRef<HTMLDivElement | null>(null);

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
    <>
    <div className={styles.legend} ref={legendRef}>
      <span className={styles.high}>{t('skills.legend.high')}</span>
      <span className={styles.medium}>{t('skills.legend.medium')}</span>
      <span className={styles.low}>{t('skills.legend.low')}</span>
    </div>
    <div className={styles.skillsGrid} ref={sectionRef}>
        {allSkills.map((group) => {
          const sortedSkills = [...group.skills].sort((a, b) => 
            LEVEL_PRIORITY[b.level] - LEVEL_PRIORITY[a.level]
          );

          return (
            <div key={group.name} className={styles.skillColumn}>
              <h4 className={styles.groupTitle}>{t(group.name)}</h4>
              <ul className={styles.skillList}>
                {sortedSkills.map((skill) => (
                  <li 
                    key={skill.name}
                    className={`${styles.skillItem} ${styles[skill.level]}`}
                  >
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default SkillsSection;