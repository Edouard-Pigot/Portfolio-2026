import styles from './SkillsSection.module.scss';

interface SkillsSectionProps {
  title?: string;
  skills: string[];
}

function SkillsSection(props: SkillsSectionProps) {
  return (
    <div className={styles.skillsSection}>
      {props.title && <h4>{props.title}</h4>}
      <ul className={styles.skillsList}>
        {props.skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  )
};

export default SkillsSection;
