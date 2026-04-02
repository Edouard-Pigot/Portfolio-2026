import styles from './SchoolingSection.module.scss';

import TimelineItem from '../TimelineItem/TimelineItem';

import { schooling } from '@data/schooling';

import { useTranslation } from 'react-i18next';

function SchoolingSection() {
  const { t } = useTranslation();

  return (
    <div className={styles.schooling}>
      {[...schooling].reverse().map(school => (
        <TimelineItem 
          timelineDates={[school.diplomaDate]} 
          location={school.location} 
          title={t(school.diplomaName)} 
          subtitle={t(school.schoolName)}
          description={t(school.description)}  />
      ))}
    </div>
  );
}

export default SchoolingSection;