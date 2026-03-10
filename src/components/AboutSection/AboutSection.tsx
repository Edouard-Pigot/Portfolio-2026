import styles from './AboutSection.module.scss';

import { useTranslation } from 'react-i18next';

function AboutSection() {
  const { t } = useTranslation();

  return (
    <div id={styles['about-section']}>
      <div  id={styles['about-section-wrapper']}>
        <p id={styles['about-section-content']}>
          {t('about.description')}
        </p>
      </div>
    </div>
  );
}

export default AboutSection;