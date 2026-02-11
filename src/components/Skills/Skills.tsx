import styles from './Skills.module.scss';
import type { SkillGroup } from '../SkillColumn/SkillColumn';
import SkillColumn from '../SkillColumn/SkillColumn';

const frontWebSkills: SkillGroup = {name: "Front-end", skills:[
  { name: 'HTML', level: 'primary' },
  { name: 'CSS', level: 'primary' },
  { name: 'SASS', level: 'primary' },
  { name: 'JavaScript', level: 'primary' },
  { name: 'TypeScript', level: 'primary' },
  { name: 'React', level: 'third' },
  { name: 'Vue.js', level: 'third' }
]};
const backWebSkills: SkillGroup = {name: "Back-end", skills:[
  { name: 'MySQL', level: 'primary' },
  { name: 'PHP', level: 'third' },
  { name: 'Node.js', level: 'third' },
  { name: 'Express', level: 'third' },
  { name: 'MongoDB', level: 'third' },
  { name: 'PostgreSQL', level: 'third' }
]};
const nativeSkills: SkillGroup = {name: "Native", skills:[
  { name: 'C++', level: 'secondary' },
  { name: 'C#', level: 'third' },
  { name: 'Java', level: 'third' }
]};
const toolsSkills: SkillGroup = {name: "Tools", skills:[
  { name: 'Git', level: 'primary' },
  { name: 'GitHub', level: 'primary' },
  { name: 'Visual Studio Code', level: 'primary' },
  { name: 'Vite', level: 'third' }
]};

function Skills() {
  return (
    <>
      <div className={styles.legend}>
        <span className={styles.primary}>Stack principale</span>
        <span className={styles.secondary}>Confidence</span>
        <span className={styles.third}>Expérience</span>
      </div>
      <div className={styles.skills}>
        <SkillColumn skill={frontWebSkills}/>
        <SkillColumn skill={backWebSkills}/>
        <SkillColumn skill={nativeSkills}/>
        <SkillColumn skill={toolsSkills}/>
      </div>
    </>
  )
}

export default Skills
