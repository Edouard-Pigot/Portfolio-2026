import styles from './AboutSectionContent.module.scss';

import ContentRow from '@components/ContentRow/ContentRow';
import ContentCell from '@components/ContentCell/ContentCell';


function AboutSectionContent() {
  return (
    <ContentRow>
      <ContentCell width={60}>
        <p id={styles['about-section-content']}>
          Hello! I'm a software developer with a passion for creating innovative solutions and learning new technologies. With experience in full-stack development, I enjoy working on projects that challenge me to grow and expand my skill set. In my free time, I love exploring the outdoors, playing video games, and experimenting with new recipes in the kitchen.
        </p>
      </ContentCell>
    </ContentRow>
  );
}

export default AboutSectionContent;