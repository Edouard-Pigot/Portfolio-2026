import styles from './SkillsSection.module.scss';

import { useTranslation } from 'react-i18next';

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
    { name: 'Vite',       level: 'low' },
  ]
};
const backWebSkills: SkillGroup = {
  name: "skills.groups.backend",
  skills:[
    { name: 'SQL',        level: 'high' },
    { name: 'MySQL',      level: 'high' },
    { name: 'PHP',        level: 'low' },
    { name: 'Node.js',    level: 'low' },
    { name: 'Python',     level: 'low' }
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
    { name: 'Vite',       level: 'low' }
  ]
};
const allSkills = [frontWebSkills, backWebSkills, nativeSkills, toolsSkills];

function SkillsSection() {
  const { t } = useTranslation();

  return (
    <>
    <div className={styles.legend}>
      <span className={styles.high}>{t('skills.legend.high')}</span>
      <span className={styles.medium}>{t('skills.legend.medium')}</span>
      <span className={styles.low}>{t('skills.legend.low')}</span>
    </div>
    <div className={styles.skillsGrid}>
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