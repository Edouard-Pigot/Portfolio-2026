import TechStack from '../TechStack/TechStack';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

import styles from './TimelineItem.module.scss';

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

gsap.registerPlugin(ScrollTrigger);

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

  const componentRef = useRef(null);
  const descriptionRef = useRef(null);
  const taskRef = useRef(null);
  const techStackRef = useRef(null);

  useGSAP(() => {
    const targets = [descriptionRef.current, taskRef.current, techStackRef.current].filter(el => el !== null);
    if (targets.length > 0) {
      gsap.from(targets, {
        x: -25,
        opacity: 0,
        duration: 1.0,
        stagger: 0.2,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: componentRef.current,
          start: 'top 70%'
        }
      });
    }
  }, {scope: componentRef});

  return (
    <div className={styles.timelineItem} ref={componentRef}>
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
      {(description && <p ref={descriptionRef}>{description}</p>)}
      {(list && list.length > 0 && list[0] !== "") && (
        <ul className={styles['tasks-list']} ref={taskRef}>
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
      {(techStack && techStack.length > 0) && (
        <div className={styles['project-details']} ref={techStackRef}>
          {techStack.length > 0 && (
            <TechStack techStack={techStack} />
          )}
        </div>
      )}
    </div>
  );
}

export default TimelineItem;