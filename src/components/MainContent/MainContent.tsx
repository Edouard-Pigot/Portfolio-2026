import styles from './MainContent.module.scss';

import HeroSection from '@components/HeroSection/HeroSection';
import Section from '@components/Section/Section';
import AboutSection from '@/components/AboutSection/AboutSection';
import ProjectsSection from '@components/ProjectsSection/ProjectsSection';
import SkillsSection from '@components/SkillsSection/SkillsSection';
import ScrollTrack from '@components/ScrollTrack/ScrollTrack';

import { useTranslation } from 'react-i18next';

function MainContent() {
  const { t } = useTranslation();

  const sections = [
    { index: 'about', title: t("about.section_name"), content: <AboutSection /> },
    { index: 'projects', title: t("projects.section_name"), content: <ProjectsSection /> },
    { index: 'skills', title: t("skills.section_name"), content: <SkillsSection /> },
    { index: 'experience', title: t("experience.section_name"), content: null },
    { index: 'schooling', title: t("schooling.section_name"), content: null },
    { index: 'contact', title: t("contact.section_name"), content: null }
  ];

  return (
      <ScrollTrack>
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
      </ScrollTrack>
  );
}

export default MainContent;