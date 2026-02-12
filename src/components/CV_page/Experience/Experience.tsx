import styles from './Experience.module.scss';

interface ExperienceProps {
  date: string[];
  title: string;
  contractType: string;
  company: string;
  location: string;
  description: string[];
  environment?: string;
}

function Experience(props: ExperienceProps) {
  let descriptionItems = props.description.map((item, index) => <li key={index}>{item}</li>);
  let dateItems = props.date.map((date, index) => {
    return <li key={index}>{date}</li>
  });
  return (
    <div className={styles.experience}>
      <ul className={styles.date}>{dateItems}</ul>
      <h4 className={styles.title}>{props.title} - <span className={styles.contractType}>{props.contractType}</span></h4>
      <h5 className={styles.companyInfo}><span className={styles.companyName}>{props.company}</span> {props.location}</h5>
      <ul className={styles.description}>
        {descriptionItems}
      </ul>
      <p className={styles.environment}>
        {props.environment && `Environnement : ${props.environment}`}
      </p>
    </div>
  )
};

export default Experience;
