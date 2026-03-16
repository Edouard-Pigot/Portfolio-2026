import styles from './ProjectDisplay.module.scss';

import MediaCarousel from '../MediaCarousel/MediaCarousel';
import { type Project } from '@data/projects';

import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

function ProjectDisplay({ id, title, dates, description, techStack, media, link }: Project) {

  const { t } = useTranslation();

  let stringToDisplay = "";
  let isWIP = false;
  let startDate, endDate;

  if(dates) {
    if(dates[0])
      startDate = new Date(dates[0]*1000);
  
    if(dates[1]) {
      if(dates[1] === -1)
        isWIP = true;
      else
        endDate = new Date(dates[1]*1000);
    }
  }

  if(isWIP) {
    stringToDisplay = t("projects.work_in_progress");
  } else {
    const startM = (startDate?.getUTCMonth() ?? 0) + 1;
    const startY = startDate?.getUTCFullYear();
    
    const endM = (endDate?.getUTCMonth() ?? 0) + 1;
    const endY = endDate?.getUTCFullYear();

    if (startDate?.getUTCFullYear() === endDate?.getUTCFullYear()) {
      if(startM === endM) {
        stringToDisplay = `${startM}/${endY}`;
      } else {
        stringToDisplay = `${startM}-${endM}/${endY}`;
      }
    } else {
      stringToDisplay = `${startM}/${startY}-${endM}/${endY}`;
    }
  }


  return (
    <div className={styles['project']}>
      <div className={styles['project-media']}>
        <MediaCarousel media={media}/>
      </div>
      <div className={styles['project-content']}>
        <div className={styles['project-header']}>
          <h4>{t(title)}</h4>
          <div className={styles['project-decorator']}>
            <p>{stringToDisplay}</p>
          </div>
        </div>
        <div className={styles['project-description']}>
          <p>
            {t(description)}
          </p>
        </div>
        
        {(techStack.length > 0 || link) && (
          <div className={styles['project-details']}>
            {techStack.length > 0 && (
              <div className={styles['project-techStack']}>
                <ul>
                  {techStack.map((tech) => (
                    <li key={tech + '_' + title}>{tech}</li>
                  ))}
                </ul>  
              </div>
            )}
            {link && (
              <div className={styles['project-link']}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  <p>{t('projects.details_button')}</p>
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>  
  );
}

export default ProjectDisplay;