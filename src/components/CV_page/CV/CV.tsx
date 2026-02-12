import styles from './CV.module.scss';

import Experience from '../Experience/Experience';
import Diploma from '../Diploma/Diploma';
import SkillsSection from '../SkillsSection/SkillsSection';

function CV() {
  return (
    <div className={styles.pageWrapper}>
      <article className={styles.a4Page}>
        <div className={styles.mainContainer}>
          <div className={styles.header}>
            <div className={styles.headerBackground}></div>
            <h1 className={styles.title}>Technicien informatique</h1>
            <h2 className={styles.name}>Edouard <span className={styles.surname}>Pigot</span></h2>
            <p className={styles.intro}>Développeur avec une expérience significative chez Dassault Systèmes en tant qu’ingénieur logiciel à la recherche d’une nouvelle opportunité.
Mes compétences clés incluent la programmation web et la programmation objet native , avec un accent sur le travail d'équipe et la communication</p>
          </div>
          <div className={styles.body}>
            <section className={styles.leftColumn}>
              <div className={styles.experienceSection}>
                <h3 className={styles.sectionTitle}>Expériences professionnelles</h3>
                <Experience 
                  date={["jan. 2022", "oct. 2025"]}
                  title="Ingénieur logiciel"
                  contractType="CDI"
                  company="Dassault Systèmes"
                  location="Vélizy-Villacoublay, France"
                  description={[
                    "Maintenance et développement de fonctionnalités sur les composants de l’infrastructure d’UI en Javascript et C++.",
                    "Support personnalisé aux clients internes.",
                    "Écriture des tests et de la documentation liés aux développements.",
                    "Définition des spécifications avec les équipes UX."
                  ]}
                  environment="JavaScript, TypeScript, C++, HTML, CSS, SASS, Jasmine, VS Code VS 2019, Agile Scrum"
                />
                <Experience
                  date={["avr. 2021", "sept. 2021"]}
                  title="Ingénieur logiciel"
                  contractType="Stage"
                  company="Dassault Systèmes"
                  location="Vélizy-Villacoublay, France"
                  description={[
                    "Spécification de méthodes d’interaction avec les UI en réalité virtuelle.",
                    "Développement de ces méthodes dans l’environnement Dassault Systèmes.",
                    "Mise en place d'une infrastructure évolutive permettant l'ajout de boîtes de collision personnalisables.",
                    "Création de layouts immersifs pour la réalité virtuelle."
                  ]}
                  environment="C++, Jasmine, VS 2019, Agile Scrum"
                />
                <Experience
                  date={["juin 2020", "juil. 2020"]}
                  title="Développeur Unity 3D"
                  contractType="Stage"
                  company="Institut de Prévention des Risques Urbains Marseille"
                  location="Marseille, France"
                  description={[
                    "Amélioration d’un simulateur d'inondation de musée sur le moteur Unity.",
                    "Refonte du système de simulation de l’eau en incluant un modèle physique, remplaçant les plans d’eau statiques utilisés par l’équipe de développement précédente.",
                    "Utilisation de la méthode des Marching Cubes pour la modélisation 3D de l’eau."
                  ]}
                  environment="C#, Unity, 100% télé-travail"
                />
                <Experience
                  date={["avr. 2018", "juin 2018"]}
                  title="Développeur full stack"
                  contractType="Stage"
                  company="Fiducial Cloud Aix-en-Provence"
                  location="Aix-en-Provence, France"
                  description={[
                    "Amélioration de l’outil de gestion de projet basé sur SOPlanning en ajoutant des informations de la base de données interne."
                  ]}
                  environment="PHP, SQL"
                />
                <Experience
                  date={["Etés 2016", "2018", "2019", "2020"]}
                  title="Auxiliaire de vacances"
                  contractType="CDD"
                  company="Crédit Mutuel"
                  location="Marseille, France"
                  description={[
                    "Juillet 2016 : agence de la Joliette.",
                    "Etés 2018, 2019, 2020 : plateforme téléphonique Méditerranée.",
                    "Gestion et prise de rendez-vous, remise de carte et chéquiers.",
                    "Gestion des comptes, prêts, moyens de paiement, assurances.",
                    "Assistance à l’utilisation des espaces personnels sur web et application Crédit Mutuel."
                  ]}
                />
              </div>
              <div className={styles.diplomaSection}>
                <h3 className={styles.sectionTitle}>Diplômes et formations</h3>
                <Diploma
                  date="2021"
                  title="Master informatique"
                  institution="Faculté des sciences Marseille Luminy, Aix-Marseille Université"
                  location="Marseille, France"
                  description="Parcours Géométrie et Informatique Graphique (GIG)"
                />
                <Diploma
                  date="2019"
                  title="Licence informatique"
                  institution="Faculté des sciences Marseille Luminy, Aix-Marseille Université"
                  location="Marseille, France"
                  description="Option modélisation 3D"
                />
                <Diploma
                  date="2018"
                  title="DUT informatique"
                  institution="IUT d’Aix-Marseille, Aix-Marseille Université"
                  location="Aix-en-Provence, France"
                />
              </div>
            </section>
            <section className={styles.rightColumn}>
              <div className={styles.coordinatesSection}>
                <h3 className={styles.sectionTitle}>Coordonnées</h3>
                <a href="mailto:pigotedouard@orange.fr">pigotedouard@orange.fr</a>
                <p>+33 6 36 59 55 96</p>
                <p>92370 Chaville</p>
              </div>
              <div className={styles.linksSection}>
                <h3 className={styles.sectionTitle}>Liens</h3>
                <a href="https://www.linkedin.com/in/edouard-pigot/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://github.com/edouard-pigot" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://edouard-pigot.github.io/" target="_blank" rel="noopener noreferrer">Site personnel</a>
              </div>
              <div className={styles.skillsSection}>
                <h3 className={styles.sectionTitle}>Langues</h3>
                <SkillsSection 
                  skills={[
                    "Français : langue maternelle",
                    "Anglais : niveau C1"
                  ]}
                />
                <h3 className={styles.sectionTitle}>Compétences</h3>
                <SkillsSection 
                  title="Savoir-être"
                  skills={[
                    "Travail d'équipe",
                    "Communication",
                    "Relation client",
                    "Organisation du temps de travail"
                  ]}
                />
                <SkillsSection 
                  title="Programmation"
                  skills={[
                    "HTML, CSS, SASS",
                    "JavaScript, TypeScript, Jquery",
                    "React, PHP",
                    "SQL, MySQL",
                    "C++, C# (Unity)",
                    "Java"
                  ]}
                />
                <SkillsSection 
                  title="Outils"
                  skills={[
                    "Git, Github",
                    "Visual Studio Code",
                    "Visual Studio 2019",
                  ]}
                />
                <h3 className={styles.sectionTitle}>Activités annexes</h3>
                <SkillsSection 
                  skills={[
                    "Dépannage informatique",
                    "Création de sites web personnels",
                    "Montage de PC",
                    "Conception graphique"
                  ]}
                />
                <h3 className={styles.sectionTitle}>Centres d'intérêt</h3>
                <SkillsSection 
                  skills={[
                    "Programmation",
                    "Hardware PC, smartphone, consoles",
                    "Jeux vidéo (FPS, MMO, RTS, simulation)",
                    "Musées, monuments et Histoire",
                    "Photographie"
                  ]}
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
