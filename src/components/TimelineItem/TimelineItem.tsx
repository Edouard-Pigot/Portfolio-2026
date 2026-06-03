import styles from './TimelineItem.module.scss';

import TechStack from '../TechStack/TechStack';

import { useTranslation } from 'react-i18next';

type DateFormat = "MM/YYYY" | "YYYY";

export interface Date {
  month: number | undefined;
  year: number;
}

export interface Period {
  start: Date;
  end: Date;
}

interface TimelineItemProps {
  timelineDates: Period | Period[] | number;
  dateFormat?: DateFormat;
  location: string;
  title: string;
  subtitle: string;
  subtitleInfo?: string;
  description?: string;
  list?: string[];
  techStack?: string[];
}

function TimelineItem({ timelineDates, dateFormat, location, title, subtitle, subtitleInfo, description, list, techStack }: TimelineItemProps) {
  const { t } = useTranslation();

  let getDateString = (date: Period | number, dateFormat: DateFormat) => {
    let dateStr: string = "";

    if (typeof date === 'number') {
      dateStr = date.toString();
    } else {
      if(date.end.year === -1) {
        const startStr = dateFormat === "MM/YYYY" ? `${t(`dates.months.${date.start.month}`)} ${date.start.year}` : `${date.start.year}`;
        dateStr = `${startStr} - ${t("experiences.current_position")}`;
      }
      if(dateFormat === "MM/YYYY") {
        if (date.start.year === date.end.year) {
          if(date.start.month === date.end.month) 
            dateStr = `${t(`dates.months.${date.start.month}`)} ${date.start.year}`;
          else
            dateStr = `${t(`dates.months.${date.start.month}`)} - ${t(`dates.months.${date.end.month}`)} ${date.end.year}`;
        } else
          dateStr = `${t(`dates.months.${date.start.month}`)} ${date.start.year} - ${t(`dates.months.${date.end.month}`)} ${date.end.year}`;
      } else {
        dateStr = date.start.year === date.end.year ? `${date.end.year}` : `${date.start.year} - ${date.end.year}`;
      }
    }

    return dateStr;
  };

  let getH6Content = (timelineDates: TimelineItemProps['timelineDates'], dateFormat: TimelineItemProps['dateFormat'], location: TimelineItemProps['location']) : React.ReactNode => {
    let lastPeriod: string = "";
    let otherPeriods: React.ReactNode[] = [];

    const dateFormatToUse: DateFormat = dateFormat || "MM/YYYY";

    if(Array.isArray(timelineDates)) {
      for(let i = timelineDates.length - 1; i >= 0; i--) {
        const date = timelineDates[i];
        if(i === timelineDates.length - 1) {
          lastPeriod = getDateString(date, dateFormatToUse);
        } else {
          const otherPeriodStr = getDateString(date, dateFormatToUse);
          otherPeriods.push(
            <h6 key={i} className={styles['other-period']}>
              {otherPeriodStr}
            </h6>
          );
        }
      }
    } else {
      lastPeriod = getDateString(timelineDates, dateFormatToUse);
    }

    return (
      <>
        <h6>
          {lastPeriod}  
          {location && (
            <>
              <span className={styles.separator} /> 
              {location}
            </>
          )}
        </h6>
        {otherPeriods}
      </>
    );
  }

  return (
    <div className={styles.timelineItem}>
      {getH6Content(timelineDates, dateFormat, location)}
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
      {(description && <p>{description}</p>)}
      {(list && list.length > 0) && (
        <ul className={styles['tasks-list']}>
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
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