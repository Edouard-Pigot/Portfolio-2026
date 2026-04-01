import styles from './ProjectsSection.module.scss';

import ProjectDisplay from '@/components/ProjectDisplay/ProjectDisplay';

import { projects } from '@data/projects';

function ProjectsSection() {
  return (
    <>
      <div id={styles['projects-grid']}>
        {projects.slice().reverse().map(project => (
          <ProjectDisplay key={project.id} {...project} />
        ))}
      </div>
    </>
  )
}

export default ProjectsSection;