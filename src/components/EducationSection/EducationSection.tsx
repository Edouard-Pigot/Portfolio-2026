import styles from './EducationSection.module.scss';

import TimelineItem from '../TimelineItem/TimelineItem';

import { education } from '@data/education';

import { useTranslation } from 'react-i18next';

function EducationSection() {
  const { t } = useTranslation();

  return (
    <div className={styles.education}>
      {[...education].reverse().map(school => (
        <TimelineItem 
          key={t(school.diplomaName)}
          timelineDates={school.diplomaYear} 
          location={school.location} 
          title={t(school.diplomaName)} 
          subtitle={t(school.schoolName)}
          description={t(school.description)}
          list={school.tasks ? t(school.tasks).split('\\') : undefined}
          />
      ))}
    </div>
  );
}

export default EducationSection;