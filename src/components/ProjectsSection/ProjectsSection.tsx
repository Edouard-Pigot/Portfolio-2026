import styles from './ProjectsSection.module.scss';

import ProjectItem from '@/components/ProjectItem/ProjectItem';

import { projects } from '@data/projects';

function ProjectsSection() {
  return (
    <>
      <div id={styles['projects-grid']}>
        {projects.slice().reverse().map(project => (
          <ProjectItem key={project.id} {...project} />
        ))}
      </div>
    </>
  )
}

export default ProjectsSection;