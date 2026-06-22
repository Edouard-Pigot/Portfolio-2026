import styles from './ExperienceSection.module.scss';

import TimelineItem from '../TimelineItem/TimelineItem';

import { experiences } from '@data/experiences';

import { useTranslation } from 'react-i18next';

function ExperienceSection() {
  const { t } = useTranslation();

  return (
    <div className={styles.experiences}>
      {[...experiences].reverse().map(experience => (
        <TimelineItem 
          key={t(experience.companyName)}
          timelineDates={experience.periods} 
          location={experience.location} 
          title={t(experience.companyName)} 
          subtitle={t(experience.positionName)} 
          subtitleInfo={t("experiences.contract_types." + experience.contractType)} 
          description={t(experience.description)} 
          list={experience.tasks ? t(experience.tasks).split('\\') : []}
          techStack={experience.techStack} />
      ))}
    </div>
  );
}

export default ExperienceSection;