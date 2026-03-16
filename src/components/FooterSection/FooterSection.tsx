import styles from './FooterSection.module.scss';

import Section from '@components/Section/Section';

import { useTranslation } from 'react-i18next';

export default function FooterSection() {
  const { t } = useTranslation();

  let year = new Date().getUTCFullYear();

  return (
    <Section index="footer">
      <div className={styles["footer"]}>
        {"© 2021 - " + year + t("footer.copyright")}
      </div>
    </Section>
  );
}