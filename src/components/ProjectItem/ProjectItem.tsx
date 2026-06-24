import MediaCarousel from '../MediaCarousel/MediaCarousel';
import TechStack from '../TechStack/TechStack';
import Button from '../Button/Button';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { type Project } from '@data/projects';

import styles from './ProjectItem.module.scss';

gsap.registerPlugin(ScrollTrigger);

function ProjectItem({ title, dates, description, techStack, media, link }: Project) {

  const { t } = useTranslation();

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const dateRef = useRef(null);
  const textRef = useRef(null);
  const stackRef = useRef(null);
  const buttonRef = useRef(null);

  useGSAP(() => {
    gsap.from([titleRef.current, dateRef.current, textRef.current, stackRef.current, buttonRef.current], {
      x: -25,
      opacity: 0,
      duration: 1.0,
      stagger: 0.2,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 90%'
      }
    });
  }, {scope: sectionRef});

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
    <div className={styles['project']} ref={sectionRef}>
      <div className={styles['project-media']}>
        <MediaCarousel media={media}/>
      </div>
      <div className={styles['project-content']}>
        <div className={styles['project-header']}>
          <h4 ref={titleRef}>{t(title)}</h4>
          <div className={styles['project-decorator']}>
            <p ref={dateRef}>{stringToDisplay}</p>
          </div>
        </div>
        <div className={styles['project-description']}>
          <p ref={textRef}>
            {t(description)}
          </p>
        </div>
        
        {(techStack.length > 0 || link) && (
          <div className={styles['project-details']}>
            {techStack.length > 0 && (
              <TechStack techStack={techStack} ref={stackRef} />
            )}
            {link && (
              <Button className={styles['project-link']} ref={buttonRef}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  <p>{t('projects.details_button')}</p>
                  <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="24px">
                    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/>
                  </svg>
                </a>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>  
  );
}

export default ProjectItem;