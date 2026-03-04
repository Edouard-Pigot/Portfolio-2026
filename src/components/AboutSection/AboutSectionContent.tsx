import styles from './AboutSectionContent.module.scss';

import ContentRow from '@components/ContentRow/ContentRow';
import ContentCell from '@components/ContentCell/ContentCell';

import { useTranslation } from 'react-i18next';


function AboutSectionContent() {
  const { t } = useTranslation();

  return (
    <ContentRow>
      <ContentCell width={60}>
        <p id={styles['about-section-content']}>
          {t('about')}
        </p>
      </ContentCell>
    </ContentRow>
  );
}

export default AboutSectionContent;