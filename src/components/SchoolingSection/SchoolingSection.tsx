import styles from './SchoolingSection.module.scss';

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
        <div className={styles.school}>
          <h4>{t(school.diplomaName)}</h4>
          <h5>{t(school.schoolName)}</h5>
          <h5>{school.location + " | " + computeDateString(school.diplomaDate)}</h5>
          <p>{t(school.description)}</p>
        </div>
      ))}
    </div>
  );
}

export default SchoolingSection;