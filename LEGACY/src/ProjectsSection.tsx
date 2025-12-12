import './ProjectsSection.css'

import GridSection from './GridSection';
import ScrollingBanner from './ScrollingBanner';
import Card from './Card';

import { useTranslation } from "react-i18next";

import projectsData from './assets/data/projects_data.json';
import type { JSX } from 'react';

interface Project {
  title: string;
  imageSrc: string;
}

function ProjectsSection() {
  const { t } = useTranslation();

  let projects = JSON.parse(JSON.stringify(projectsData));

  let cards : JSX.Element[] = [];

  projects.forEach((project: Project) => {
    cards.push(<Card key={project.title} title={project.title} contentSrc={project.imageSrc} />);
  });

  return (
    <>
      <GridSection className='projects-section'>
        <ScrollingBanner text={t(`projects-banner`)} textJP={"私のプロジェクト"} direction={1} />
        <div id="projects-cards-container">
          {cards}
        </div>
      </GridSection>
    </>
  )
}

export default ProjectsSection;
