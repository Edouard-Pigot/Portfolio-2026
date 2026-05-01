import styles from './TimelineItem.module.scss';

import TechStack from '../TechStack/TechStack';

type DateFormat = "MM/YYYY" | "YYYY";

interface TimelineItemProps {
  timelineDates: string[] | string;
  dateFormat?: DateFormat;
  title: string;
  titleInfo?: string;
  subtitle?: string;
  subtitleInfo?: string;
  description?: string[] | string;
  techStack?: string[];
}

function TimelineItem({ timelineDates, title, titleInfo, subtitle, subtitleInfo, description, techStack }: TimelineItemProps) {

  return (
    <div className={styles.timelineItem}>
      <ul className={styles.dates}>
        {Array.isArray(timelineDates) ? (
          timelineDates.map((line, index) => (
            <li key={index}>{line}</li>
          ))
        ) : (
          <li>{timelineDates}</li>
        )}
      </ul>
      <div className={styles.timelineContent} >
        <h4 className={styles.title}>
          {title} 
          {titleInfo && (
            <>
              <span className={styles.separator} /> 
              <span className={styles.titleInfo}>{titleInfo}</span>
            </>
          )}
        </h4>
        <h5 className={styles.subtitle}>
          {subtitle} 
          {subtitleInfo && (
            <>
              <span className={styles.separator} /> 
              <span className={styles.subtitleInfo}>{subtitleInfo}</span>
            </>
          )}
        </h5>
        
          {Array.isArray(description) ? (
            <ul className={styles.description}> 
              {
                description.map((line, index) => (
                  <li key={index}>{line}</li>
                ))
              }
            </ul>
          ) : (
            <p className={styles.description}>{description}</p>
          )}
        {(techStack && techStack.length > 0) && (
          <div className={styles['project-details']}>
            {techStack.length > 0 && (
              <TechStack techStack={techStack} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TimelineItem;