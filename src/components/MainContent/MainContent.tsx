import HeroSection from '../HeroSection/HeroSection';
import Section from '../Section/Section';

import styles from './MainContent.module.scss';

function MainContent() {
  return (
    <>
      <HeroSection/>
      <Section className={styles.section} index="about" title="À propos"/>
      <Section className={styles.section} index="projects" title="Projets"/>
      <Section className={styles.section} index="experience" title="Expérience"/>
      <Section className={styles.section} index="schooling" title="Parcours"/>
      <Section className={styles.section} index="contact" title="Contact"/>
    </>
  );
}

export default MainContent;