import styles from './HeroSection.module.scss'

import Section from '@components/Section/Section';
import VolumetricContainer from '../VolumetricContainer/VolumetricContainer';

import { useTranslation } from 'react-i18next';

function HeroSection() {

  const Squares = ({ position }: { position: string }) => (
    <div className={styles.heroDecorator + ' ' + styles['square' + position]}>
      <span /><span /><span /><span />
    </div>
  );

  const { t } = useTranslation();

  let chevronSVG = (
    <svg className={styles.chevron} width="100%" height="100%" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M 0 0 L 100 100 L 200 0" fill='none' />
    </svg>
  )

  return (
    <>
      <VolumetricContainer className={styles.backgroundCanvas} modelPath='models/tank.gltf'/>
      <Section className={styles.heroSection} index="home">
        <Squares position="TopLeft" />
        <Squares position="TopRight" />
        <div id={styles.title}>
          <h1>EDOUARD PIGOT</h1>
          <div><span/><span/><span/><span/></div>
          <h2>{t('home.subtitle')}</h2>
        </div>
        <Squares position="BottomLeft" />
        <div id={styles.chevronsContainer}>
          <div id={styles.chevrons}>
            {chevronSVG}
            {chevronSVG}
            {chevronSVG}
          </div>
        </div>
        <Squares position="BottomRight"/>
      </Section>
    </>
  )
}

export default HeroSection
