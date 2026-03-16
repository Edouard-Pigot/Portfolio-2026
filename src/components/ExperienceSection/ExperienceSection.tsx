import styles from './ExperienceSection.module.scss';

import { experiences } from '@data/experiences';

import { useTranslation } from 'react-i18next';



function ExperienceSection() {
  const { t } = useTranslation();


  let computeDateString = function(dates: number[]) {
    let isCurrentPosition = false;
    let startDate, endDate;

    if(dates) {
      if(dates[0])
        startDate = new Date(dates[0]*1000);
    
      if(dates[1]) {
        if(dates[1] === -1)
          isCurrentPosition = true;
        else
          endDate = new Date(dates[1]*1000);
      }
    }

    const startM = (startDate?.getUTCMonth() ?? 0) + 1;
    const startY = startDate?.getUTCFullYear();
    
    const endM = (endDate?.getUTCMonth() ?? 0) + 1;
    const endY = endDate?.getUTCFullYear();

    if(isCurrentPosition)
      return `${t("dates.months." + startM)} ${startY} - ${t("experiences.current_position")}`;
    else if (startDate?.getUTCFullYear() === endDate?.getUTCFullYear()) {
      if(startM === endM) {
        return `${t("dates.months." + startM)} ${endY}`;
      } else {
        return `${t("dates.months." + startM)} - ${t("dates.months." + endM)} ${endY}`;
      }
    } else {
      return `${t("dates.months." + startM)} ${startY} - ${t("dates.months." + endM)} ${endY}`;
    }
  }

  return (
    <div className={styles.experiences}>
      {[...experiences].reverse().map(experience => (
        <div className={styles.experience}>
          <h4>{t(experience.positionName)}</h4>
          <h5>{t(experience.companyName) + " - " + t("experiences.contract_types." + experience.contractType)}</h5>
          <h5>{experience.location + " | " + computeDateString(experience.periods)}</h5>
          <p>{t(experience.description)}</p>
        </div>
      ))}
    </div>
  );
}

export default ExperienceSection;