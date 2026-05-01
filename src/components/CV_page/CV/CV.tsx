import styles from './CV.module.scss';

import SkillsSection from '../SkillsSection/SkillsSection';
import TimelineItem from '../TimelineItem/TimelineItem';

import { dev_cpp } from '../data/dev_cpp';
import { dev_web } from '../data/dev_web';
import { technicien_IT } from '../data/technicien_IT';

function CV() {
  const jobs = [dev_cpp, dev_web, technicien_IT];
  const targeted_job = jobs[0];

  return (
    <div className={styles.pageWrapper}>
      <article className={styles.a4Page}>
        <div className={styles.mainContainer}>
          <div className={styles.header}>
            <h1 className={styles.title}>{targeted_job.title}</h1>
            <h2 className={styles.name}>Edouard <span className={styles.surname}>Pigot</span></h2>
          </div>
          <div className={styles.body}>
            <section className={styles.leftColumn}>
              <div className={styles.experienceSection}>
                <h3 className={styles.sectionTitle}>{targeted_job.experiences.title}</h3>
                <div className={styles.experienceList}>
                  {[...targeted_job.experiences.timeline].reverse().map((experience, index) => (
                    <TimelineItem
                      key={index}
                      timelineDates={experience.periods}
                      title={experience.positionName}
                      titleInfo={experience.contractType}
                      subtitle={experience.companyName}
                      subtitleInfo={experience.location}
                      description={experience.description}
                      techStack={experience.techStack}
                    />
                  ))}
                </div>
              </div>
              <div className={styles.diplomaSection}>
                <h3 className={styles.sectionTitle}>{targeted_job.schooling.title}</h3>
                <div className={styles.schoolingList}>
                  {[...targeted_job.schooling.timeline].reverse().map((schooling, index) => (
                    <TimelineItem
                      key={index}
                      timelineDates={schooling.diplomaDate}
                      title={schooling.diplomaName}
                      subtitle={schooling.schoolName}
                      subtitleInfo={schooling.location}
                      description={schooling.description}
                    />
                  ))}
                </div>
              </div>
            </section>
            <section className={styles.rightColumn}>
              <div className={styles.coordinatesSection}>
                <h3 className={styles.sectionTitle}>{targeted_job.contacts.title}</h3>
                <a href={`mailto:${targeted_job.contacts.email}`}>{targeted_job.contacts.email}</a>
                <p>{targeted_job.contacts.phone}</p>
                <p>{targeted_job.contacts.address}</p>
              </div>
              {targeted_job.links && (
                <div className={styles.linksSection}>
                  <h3 className={styles.sectionTitle}>{targeted_job.links.title}</h3>
                  <a href={targeted_job.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  <a href={targeted_job.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                  <a href={targeted_job.links.portfolio.link} target="_blank" rel="noopener noreferrer">
                    {targeted_job.links.portfolio.text}
                  </a>
                </div>
              )}
              <div className={styles.skillsSection}>
                <h3 className={styles.sectionTitle}>{targeted_job.languages.title}</h3>
                <SkillsSection 
                  skills={targeted_job.languages.list.map(lang => lang.name + " : " + lang.level)}
                />
                <h3 className={styles.sectionTitle}>{targeted_job.skills.title}</h3>
                {targeted_job.skills.sections.map((section, index) => {
                  let skillList: string[] = [];
                  section.list.map(skill => skillList.push(skill.join(", ")));
                  return (
                  <SkillsSection 
                      key={index}
                      title={section.title}
                      skills={skillList}
                    />
                  )
                })}
                <h3 className={styles.sectionTitle}>{targeted_job.activities.title}</h3>
                <SkillsSection
                  skills={targeted_job.activities.list}
                />
                <h3 className={styles.sectionTitle}>{targeted_job.interests.title}</h3>
                <SkillsSection
                  skills={targeted_job.interests.list}
                />
              </div>
            </section>
          </div>
        </div>
      </article>
    </div>
  )
};

export default CV;
