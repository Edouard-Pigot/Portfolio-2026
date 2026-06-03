import styles from './ProjectItem.module.scss';

import MediaCarousel from '../MediaCarousel/MediaCarousel';
import TechStack from '../TechStack/TechStack';

import { type Project } from '@data/projects';

import { useTranslation } from 'react-i18next';

function ProjectItem({ title, dates, description, techStack, media, link }: Project) {

  const { t } = useTranslation();

  let stringToDisplay = "";
  let isWIP = false;

  if(dates.end.year === -1) {
    isWIP = true;
  }

  if(isWIP) {
    stringToDisplay = t("projects.work_in_progress");
  } else {
    if (dates.start.year === dates.end.year) {
        stringToDisplay = `${dates.end.year}`;
    } else {
      stringToDisplay = `${dates.start.year}-${dates.end.year}`;
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
              <TechStack techStack={techStack} />
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

export default ProjectItem;