import styles from './SkillColumn.module.scss';

export type SkillGroup = {
  name: string;
  skills: {
    name: string;
    level: 'primary' | 'secondary' | 'third';
  }[];
};

function SkillColumn(props: {skill: SkillGroup}) {

  return (
    <>
      <div className={styles.base}>
        <h3>{props.skill.name}</h3>
        {props.skill.skills.map((skill, index) => (
          <div key={index} className={`${styles.skill} ${styles[skill.level]}`}>
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </>
  )
}

export default SkillColumn
