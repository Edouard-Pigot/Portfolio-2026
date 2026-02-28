import styles from './CV.module.scss';

import Experience from '../Experience/Experience';
import Diploma from '../Diploma/Diploma';
import SkillsSection from '../SkillsSection/SkillsSection';

function CV() {
  return (
    <div className={styles.pageWrapper}>
      <article className={styles.a4Page}>
        <div className={styles.mainContainer}>
          <div className={styles.header + " dotted-background"}>
            <h1 className={styles.title}>Développeur C++</h1>
            <h2 className={styles.name}>Edouard <span className={styles.surname}>Pigot</span></h2>
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
                    "Dans la même équipe que le stage de 2021. En méthodologie Agile Scrum.",
                    "Fourniture d'une infrastructure de composants d'interface utilisateur (UI) pour les développeurs de Dassault Systèmes à l'international.",
                    "Maintenance et évolution des composants en C++ et JavaScript.",
                    "En C++ : calcul de contraste entre les textes et les fonds pour ajuster automatiquement les couleurs des textes, correction et amélioration \
                    de la fenêtre de color picker pour gérer les status de couleurs et transparence undefined, conversion des couleurs legacy en RGB (int) en HSV \
                    (double) afin d'améliorer la précision des couleurs, migration du code vers C++ 20 pour profiter des nouvelles fonctionnalités du langage et \
                    corriger les erreurs de compilation, définition des données envoyées entre le serveur et le client pour le mirroring des UI du natif vers le web, \
                    support au stage VR de 2022...",
                    "Support aux clients sur l'utilisation des API et les bonnes pratiques.",
                    "Écriture des tests et des documentations pour les développeurs et les équipes clientes.",
                    "Définition des spécifications avec les équipes UX."
                  ]}
                  environment="C++ 20, JavaScript, TypeScript, HTML, CSS, SASS, Jasmine, Visual Studio Code, Visual Studio 2019, Agile Scrum"
                />
                <Experience
                  date={["avr. 2021", "sept. 2021"]}
                  title="Ingénieur logiciel"
                  contractType="Stage"
                  company="Dassault Systèmes"
                  location="Vélizy-Villacoublay, France"
                  description={[
                    "Intégré dans l'environnement de rendu 3D VR existant, analyse de l'existant et spécification de nouvelles méthodes d'interaction avec les UI en VR.",
                    "Développement de trois nouvelles manières d'interagir avec les UI en VR : par collision entre la manette et les éléments de l'UI, par pointage avec un rayon court émis par la manette, et par liaison automatique entre la manette et l'élément de l'UI le plus proche.",
                    "Création de classes de base contenant les algorithmes de calcul de colission (sphère, boîte) pouvant être associées aux éléments de l'UI et les manettes. Extensibles pour permettre aux utilisateurs de créer leurs propres formes via héritage d'une classe abstraite.",
                    "Ecriture de tests unitaires pour assurer la stabilité du code et faciliter les futures évolutions.",
                  ]}
                  environment="C++ 17, Jasmine, Visual Studio 2019, Agile Scrum"
                />
                <Experience
                  date={["juin 2020", "juil. 2020"]}
                  title="Développeur Unity 3D"
                  contractType="Stage"
                  company="Institut de Prévention des Risques Urbains Marseille"
                  location="Marseille, France"
                  description={[
                    "Reprise d’un projet de simulateur d'inondation de musée sur le moteur Unity en C#.",
                    "Refonte du système de simulation de l’eau en incluant un modèle physique et travail préliminaire sur l'amélioration du rendu.",
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
                    "Amélioration de l’outil de gestion de projet basé sur SOPlanning en incluant des informations de la base de données interne."
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
                    "Accueil et archivage à l'agence de la Joliette.",
                    "Accueil téléphonique au centre d'appels du Prado.",
                  ]}
                />
              </div>
              <div className={styles.diplomaSection}>
                <h3 className={styles.sectionTitle}>Diplômes et formations</h3>
                <Diploma
                  date="2021"
                  title="Master informatique"
                  institution="Faculté des sciences Marseille Luminy"
                  location="Marseille, France"
                  description="Parcours Géométrie et Informatique Graphique (GIG)"
                />
                <Diploma
                  date="2019"
                  title="Licence informatique"
                  institution="Faculté des sciences Marseille Luminy"
                  location="Marseille, France"
                  description="Option modélisation 3D"
                />
                <Diploma
                  date="2018"
                  title="DUT informatique"
                  institution="IUT d’Aix-Marseille"
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
                  title="Programmation"
                  skills={[
                    "C++ 20, C# (Unity)",
                    "SQL, MySQL",
                    "JavaScript, TypeScript, Jquery, React, PHP",
                    "HTML, CSS, SASS",
                  ]}
                />
                <SkillsSection 
                  title="Outils"
                  skills={[
                    "Windows 8/10/11, Linux",
                    "Git, Github",
                    "Vite",
                    "Visual Studio Code, Visual Studio 2019",
                    "Microsoft Office"
                  ]}
                />
                <SkillsSection 
                  title="Savoir-être"
                  skills={[
                    "Travail d'équipe",
                    "Communication",
                    "Relation client",
                    "Organisation du temps de travail"
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
