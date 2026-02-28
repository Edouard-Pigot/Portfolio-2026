import styles from './Section.module.scss';

import { useReportHeight } from '../../hooks/useReportHeight';

interface SectionProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  index: string,
  title?: string, 
  number?: string,
  children?: React.ReactNode
}

function Section(props: SectionProps) {

  const sectionRef = useReportHeight<HTMLDivElement>(props.index);

  let combinedClassName = styles.section;
  combinedClassName += props.className ? ` ${props.className}` : '';

  return (
    <>
      <section id={props.index} className={combinedClassName + ' full-background'} ref={sectionRef}>
        {props.title && <div className={styles.sectionHeader}>
          {props.number && <p className={styles.sectionNumber}>{props.number}</p>}
          <h3>{props.title}</h3>
        </div>}
        {props.children}
      </section>
    </>
  )
}

export default Section
