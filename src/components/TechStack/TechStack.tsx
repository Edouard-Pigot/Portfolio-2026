import styles from './TechStack.module.scss';

function TechStack(prop: { techStack: string[], className?: string }) {
  return (
    <ul className={`${prop.className} ${styles['tech-stack']}`}>
      {prop.techStack.map((tech) => (
        <li key={tech + '_' + prop.className}>{tech}</li>
      ))}
    </ul>  
  );
}

export default TechStack;