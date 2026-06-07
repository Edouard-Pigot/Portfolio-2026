import { forwardRef } from 'react';

import styles from './TechStack.module.scss';

type TechStackProps = {
  techStack: string[];
  className?: string;
};

const TechStack = forwardRef<HTMLUListElement, TechStackProps>(
  function TechStack({ techStack, className }, ref) {
    return (
      <ul ref={ref} className={`${className ?? ''} ${styles['tech-stack']}`.trim()}>
        {techStack.map((tech) => (
          <li key={`${tech}_${className ?? 'tech-stack'}`}>{tech}</li>
        ))}
      </ul>
    );
  }
);

export default TechStack;