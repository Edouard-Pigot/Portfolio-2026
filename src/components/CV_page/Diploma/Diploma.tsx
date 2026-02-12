import styles from './Diploma.module.scss';

interface DiplomaProps {
  date: string;
  title: string;
  institution: string;
  location: string;
  description?: string;
}

function Diploma(props: DiplomaProps) {
  return (
    <div className={styles.diploma}>
      <p className={styles.date}>{props.date}</p>
      <h4 className={styles.title}>{props.title}</h4>
      <h5 className={styles.institutionInfo}><span className={styles.institutionName}>{props.institution}</span> {props.location}</h5>
      <p className={styles.description}>{props.description}</p>
    </div>
  )
};

export default Diploma;
