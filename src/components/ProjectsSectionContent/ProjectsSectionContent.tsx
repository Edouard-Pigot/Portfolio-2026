import styles from './ProjectsSectionContent.module.scss';

import ProjectDisplay from '@/components/Project/ProjectDisplay';

import { projects } from '@data/projects';

function ProjectsSectionContent() {
  return (
    <>
      <div id={styles['projects-grid']}>
        {projects.map(project => (
          <ProjectDisplay key={project.id} {...project} />
        ))}
      </div>
    </>
  )
}

export default ProjectsSectionContent;