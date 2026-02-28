import styles from './MainContent.module.scss';

import HeroSection from '@components/HeroSection/HeroSection';
import Section from '@components/Section/Section';
import ScrollBridge from '@components/ScrollBridge/ScrollBridge';
import AboutSectionContent from '@components/AboutSection/AboutSectionContent';
import ProjectsSectionContent from '@components/ProjectsSectionContent/ProjectsSectionContent';

function MainContent() {
  const sections = [
    { index: 'about', title: 'à propos', content: <AboutSectionContent /> },
    { index: 'projects', title: 'projets', content: <ProjectsSectionContent /> },
    { index: 'skills', title: 'compétences', content: null },
    { index: 'experience', title: 'expérience', content: null },
    { index: 'schooling', title: 'parcours', content: null },
    { index: 'contact', title: 'contact', content: null }
  ];

  return (
    <ScrollBridge>
      <HeroSection />
      {sections.map((section, index) => (
        <Section 
          key={section.index}
          className={styles.section} 
          index={section.index} 
          title={section.title}
          number={`0${index + 1}`}
        >
          {section.content}
        </Section>
      ))}
    </ScrollBridge>
  );
}

export default MainContent;