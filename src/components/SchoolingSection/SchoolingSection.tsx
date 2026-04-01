import styles from './SchoolingSection.module.scss';

import TimelineItem from '../TimelineItem/TimelineItem';

import { schooling } from '@data/schooling';

import { useTranslation } from 'react-i18next';

function SchoolingSection() {
  const { t } = useTranslation();


  let computeDateString = function(date: number) {

    let diplomaDate;
    if(date) {
        diplomaDate = new Date(date*1000);
    }

    return diplomaDate?.getUTCFullYear();
  }

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