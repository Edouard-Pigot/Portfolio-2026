import styles from './TimelineItem.module.scss';

import TechStack from '../TechStack/TechStack';

import { useTranslation } from 'react-i18next';

type DateFormat = "MM/YYYY" | "YYYY";

interface TimelineItemProps {
  timelineDates: [number, number] | [number];
  dateFormat?: DateFormat;
  location: string;
  title: string;
  subtitle: string;
  subtitleInfo?: string;
  description: string;
  techStack?: string[];
}

function TimelineItem({ timelineDates, dateFormat, location, title, subtitle, subtitleInfo, description, techStack }: TimelineItemProps) {
  const { t } = useTranslation();

  let computeDateString = () : string => {
    let dateFormatToUse: DateFormat = dateFormat || "MM/YYYY";

    const startDate = new Date(timelineDates[0] * 1000);
    const startM = startDate.getUTCMonth() + 1;
    const startY = startDate.getUTCFullYear();

    if (timelineDates.length === 1) {
      return dateFormat === "MM/YYYY" 
        ? `${t(`dates.months.${startM}`)} ${startY}` 
        : `${startY}`;
    }

    if (timelineDates[1] === -1) {
      const startStr = dateFormat === "MM/YYYY" ? `${t(`dates.months.${startM}`)} ${startY}` : `${startY}`;
      return `${startStr} - ${t("experiences.current_position")}`;
    }

    const endDate = new Date(timelineDates[1] * 1000);
    const endM = endDate.getUTCMonth() + 1;
    const endY = endDate.getUTCFullYear();


    if(dateFormatToUse === "MM/YYYY") {
      if (startY === endY) {
        if(startM === endM) return `${t(`dates.months.${startM}`)} ${startY}`;
        return `${t(`dates.months.${startM}`)} - ${t(`dates.months.${endM}`)} ${startY}`;
      }
      return `${t(`dates.months.${startM}`)} ${startY} - ${t(`dates.months.${endM}`)} ${endY}`;
    } else {
      return startY === endY ? `${startY}` : `${startY} - ${endY}`;
    }
    
  }

  return (
    <div className={styles.timelineItem}>
      <h6>
        {computeDateString()} 
        {location && (
          <>
            <span className={styles.separator} /> 
            {location}
          </>
        )}
      </h6>
      <h4>{title}</h4>
      <h5>
        {subtitle} 
        {subtitleInfo && (
          <>
            <span className={styles.separator} /> 
            {subtitleInfo}
          </>
        )}
      </h5>
      <p>{description}</p>
      {(techStack && techStack.length > 0) && (
        <div className={styles['project-details']}>
          {techStack.length > 0 && (
            <TechStack techStack={techStack} />
          )}
        </div>
      )}
    </div>
  );
}

export default TimelineItem;