import styles from './HeroSection.module.scss'

import Section from '@components/Section/Section';

import { useTranslation } from 'react-i18next';

function HeroSection() {

  const { t } = useTranslation();

  let decoratorSVG = (
    <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M 37 50 H 63 37 M 50 37 V 50 63" fill='none' />
    </svg>
  )

  let chevronSVG = (
    <svg className={styles.chevron} width="100%" height="100%" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M 0 0 L 100 100 L 200 0" fill='none' />
    </svg>
  )

  return (
    <>
      <Section className={styles.heroSection} index="home">
        <div className={styles.heroDecorator}>
          {decoratorSVG}
        </div>
        <div className={styles.heroDecorator}>
          {decoratorSVG}
        </div>
        <div id={styles.title}>
          <h1>EDOUARD PIGOT</h1>
          <div><span/><span/><span/><span/></div>
          <h2>{t('home.subtitle')}</h2>
        </div>
        <div className={styles.heroDecorator}>
          {decoratorSVG}
        </div>
        <div id={styles.chevronsContainer}>
          <div id={styles.chevrons}>
            {chevronSVG}
            {chevronSVG}
            {chevronSVG}
          </div>
        </div>
        <div className={styles.heroDecorator}>
          {decoratorSVG}
        </div>
      </Section>
    </>
  )
}

export default HeroSection
