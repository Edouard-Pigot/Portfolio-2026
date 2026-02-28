const getMediaUrl = (projectId: number, mediaId: number, ext: 'webp' | 'webm') => {
  return new URL(`../assets/projects_media/${projectId}_${mediaId}.${ext}`, import.meta.url).href;
};

export interface ProjectMedia {
  url: string;
  type: 'image' | 'video';
}

export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  media: ProjectMedia[];
  link?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Tank physics",
    description: "Premier véritable projet sous Unity qui consistait a créé un système complet de contrôle de char avec \
    principalement les rotations des roues, le déplacement des suspensions et des chenilles, ainsi que les contrôles horizontaux \
    et verticaux du canon et le tir. Les déplacements du char sont gérés par le moteur physique d'Unity. Les chenilles sont animées \
    avec des os, rajoutés avec Blender, raccordés aux positions des roues et une texture dont l'offset varie en fonction de la \
    vitesse du char.",
    techStack: ["C#", "Unity", "Blender"],
    media: [
      { url: getMediaUrl(1, 1, 'webp'), type: 'image' },
      { url: getMediaUrl(1, 2, 'webp'), type: 'image' }
    ],
    link: "https://github.com/Edouard-Pigot/Tank-Physics"
  },
  {
    id: 2,
    title: "Modélisation 3D",
    description: "Projets scolaires d'introduction à la modélisation sous Blender. Réalisation d'un katana avec un patron et d'un \
    poulpe grâce aux courbes de Bézier.",
    techStack: ["Blender"],
    media: [
      { url: getMediaUrl(2, 1, 'webp'), type: 'image' }
    ],
  },
  {
    id: 3,
    title: "Tank shooter",
    description: "Prototype de top shooter sous Unity avec une gestion de la physique des projectiles pour avoir un système de \
    ricochets sur les obstacles. Le clavier contrôle les déplacements du tank tandis que la tourelle est dirigée vers le curseur \
    de la souris. Un générateur de maillage permet de laisser la trace du passage des chenilles sur le sol et le châssis du char \
    se tourne automatiquement pour suivre la direction demandée par le joueur.",
    techStack: ["C#", "Unity", "Blender"],
    media: [
      { url: getMediaUrl(3, 1, 'webm'), type: 'video' },
      { url: getMediaUrl(3, 2, 'webp'), type: 'image' }
    ],
    link: "https://github.com/Edouard-Pigot/Tank-Shooter"
  },
  {
    id: 4,
    title: "Epées procédurales",
    description: "Écriture d'un script Python sous Blender permettant la génération automatique d'armes \
    (épées, poignards, lances, ...) en fonction de paramètres indiqués par l'utilisateur comme la longueur et l'épaisseur de la \
    lame, la longueur du manche, la largeur de la garde, ...",
    techStack: ["Python", "Blender"],
    media: [
      { url: getMediaUrl(4, 1, 'webp'), type: 'image' }
    ],
  },
  {
    id: 5,
    title: "Détecteur de faces",
    description: "Scripts Python sous Blender qui parcours le maillage d'un objet 3D et va colorer les faces en fonction de \
    différents paramètres.",
    techStack: ["Python", "Blender"],
    media: [
      { url: getMediaUrl(5, 1, 'webp'), type: 'image' },
      { url: getMediaUrl(5, 2, 'webp'), type: 'image' }
    ],
  },
  {
    id: 6,
    title: "Animation scriptée",
    description: "Script Python permettant l'animation d'un véhicule.",
    techStack: ["Python", "Blender"],
    media: [
      { url: getMediaUrl(6, 1, 'webm'), type: 'video' }
    ],
  },
  {
    id: 7,
    title: "Blitz",
    description: "Projet de fin de L3 Informatique réalisé à 4. Il s'agit du jeu de carte Blitz. Disponible sur navigateur \
    il permet de jouer en multijoueur en temps réel avec un lobby pour créer et rejoindre des parties, se connecter ou créer \
    un compte. Le site et le jeu sont 100 % en HTML/CSS/NodeJS ce qui permet une compatibilité avec tous les appareils et une \
    plus grande simplicité d'utilisation. L'interface est intuitive et incorpore une fonction de chat lors d'une partie.",
    techStack: ["HTML", "CSS", "JavaScript", "NodeJS"],
    media: [
      { url: getMediaUrl(7, 1, 'webp'), type: 'image' },
      { url: getMediaUrl(7, 2, 'webp'), type: 'image' }
    ],
    link: "https://github.com/Edouard-Pigot/Blitz"
  },
  {
    id: 8,
    title: "Controleur d'ascenseur",
    description: "Projet de génie logiciel demandant d'implémenter une interface et un système modulaire de gestion d'une cage \
    d'ascenseur.",
    techStack: ["Java", "JavaFX"],
    media: [
      { url: getMediaUrl(8, 1, 'webm'), type: 'video' },
      { url: getMediaUrl(8, 2, 'webp'), type: 'image' }
    ],
    link: "https://github.com/Edouard-Pigot/Ascenseur"
  },
  {
    id: 9,
    title: "Pacman",
    description: "Second projet de génie logiciel. Il fallait créer un jeu de type Pacman. Nous avons recréé le Pacman de 1980 \
    avec les mêmes graphismes, la même carte et les mêmes IA pour les fantômes. Le jeu est codé en utilisant massivement les \
    Design Patterns afin de séparer chaque fonctionnalité et séparer la partie gameplay de la partie moteur.",
    techStack: ["Java", "JavaFX"],
    media: [
      { url: getMediaUrl(9, 1, 'webm'), type: 'video' },
      { url: getMediaUrl(9, 2, 'webp'), type: 'image' },
      { url: getMediaUrl(9, 3, 'webp'), type: 'image' }
    ],
    link: "https://github.com/Edouard-Pigot/Pacman"
  },
  {
    id: 10,
    title: "Lumipic",
    description: "Logiciel de création d'albums photo réalisé dans le cadre d'un cours d'Interface Homme-Machine. L'interface \
    reprend la thématique de l'explorateur de fichier de Windows 10 et possède un thème sombre et un thème clair. Le programme \
    permet d'explorer les dossiers contenus sur l'ordinateur et affiche seulement les fichiers image dans le répertoire courant. \
    La création d'un album passe par la sélection puis l'ajout de plusieurs images dans un groupe que l'utilisateur peut nommer \
    et supprimer.",
    techStack: ["C++", "Qt", "CSS"],
    media: [
      { url: getMediaUrl(10, 1, 'webp'), type: 'image' },
      { url: getMediaUrl(10, 2, 'webp'), type: 'image' },
      { url: getMediaUrl(10, 3, 'webp'), type: 'image' },
      { url: getMediaUrl(10, 4, 'webp'), type: 'image' },
      { url: getMediaUrl(10, 5, 'webp'), type: 'image' }
    ],
    link: "https://github.com/Edouard-Pigot/Lumipic"
  },
  {
    id: 11,
    title: "Simulateur d'inondation",
    description: "Projet de TER (Travail en Environnement de Recherche) en lien avec l'IPGR. Le projet consiste à créer un \
    simulateur d'inondation de musée afin d'apporter un élément pédagogique à la formation du personnel de musées dans le cadre \
    de catastrophes comme une crue, une infiltration d'eau ou une rupture de canalisation. Développé sous Unity afin d'avoir une \
    bonne compatibilité et la possibilité de déploiement de l'application sur le web. Le défi majeur est l'équilibre entre \
    performance et qualité de rendu afin d'avoir une simulation la plus proche du réel tout en pouvant la faire fonctionner \
    sur les machines les moins véloces. \
    Développé en binôme, ce projet a été continué en dehors du cadre scolaire sous la forme d'un stage de juin à juillet 2020.",
    techStack: ["Unity", "C#", "Blender"],
    media: [
      { url: getMediaUrl(11, 1, 'webp'), type: 'image' }
    ],
    link: "https://github.com/Edouard-Pigot/TER"
  },
  {
    id: 12,
    title: "Portfolio",
    description: "Création de ce site afin de regrouper et présenter mes projets en un seul endroit dans le cadre de ma recherche \
    de stage pour l'année 2021.",
    techStack: ["HTML", "CSS", "Javascript", "JQuery"],
    media: [
      { url: getMediaUrl(12, 1, 'webp'), type: 'image' }
    ],
  },
  {
    id: 13,
    title: "Emetteur de particules",
    description: "Projet d'Animation et Rendu. Création d'un système de particules qui émet de la fumée. \
    Cette fumée peut recevoir des paramètres comme la couleur de la texture, le temps de vie et la fréquence \
    d'émission d'une nouvelle particule. La texture est animée grâce à un atlas qui est découpé dans un shader \
    qui y rajoute la couleur passée en paramètre.",
    techStack: ["C++", "OpenGL", "GLSL", "Qt"],
    media: [
      { url: getMediaUrl(13, 1, 'webm'), type: 'video' },
      { url: getMediaUrl(13, 2, 'webp'), type: 'image' }
    ],
    link: "https://github.com/Edouard-Pigot/Smoke-Particule"
  },
  {
    id: 14,
    title: "Boids",
    description: "Second projet d'Animation et Rendu consistant à créer une IA de poisson grâce aux boids. \
    Intégration d'obstacles et de prédateurs sous la forme de sphères que les poissons évitent.",
    techStack: ["C++", "OpenGL", "GLSL", "Qt"],
    media: [
      { url: getMediaUrl(14, 1, 'webm'), type: 'video' },
      { url: getMediaUrl(14, 2, 'webp'), type: 'image' }
    ],
    link: "https://github.com/Edouard-Pigot/Boids"
  },
  {
    id: 15,
    title: "Chorégraphie de drones",
    description: "Projet d'Animation et Rendu. Réalisation d'un visualisateur de Chorégraphie de drones en \
    WebGL. Un fichier de keyframes est lu et permet de mettre en place des modèles de drones dont la lecture \
    de l'animation est contrôlée par l'utilisateur. Il peut choisir d'afficher ou non une grille, les repères \
    des axes, les trajectoires des drones, une ligne qui va du drone au sol, le nom de chaque drones, et il \
    peut jouer ou stopper l'animation. Le programme permet également de détecter les collisions et les \
    vitesses trop élevées des drones.",
    techStack: ["WebGL", "JavaScript", "JQuery", "HTML", "CSS"],
    media: [
      { url: getMediaUrl(15, 1, 'webp'), type: 'image' }
    ],
  },
  {
    id: 16,
    title: "Introduction aux shaders",
    description: "Cours d'introduction au langage GLSL et à l'écritre de shaders sur le site shadertoy.com. \
    Réalisation d'un fragment shader permettant l'affichage d'un cycle jour/nuit au dessus de la mer.",
    techStack: ["GLSL"],
    media: [
      { url: getMediaUrl(16, 1, 'webm'), type: 'video' }
    ],
  },
  {
    id: 17,
    title: "Portfolio V2",
    description: "Mise à jour du design et du contenu de mon portfolio, avec notamment l'ajout d'un mode jour/nuit",
    techStack: ["HTML", "CSS", "JavaScript", "JQuery"],
    media: [
      { url: getMediaUrl(17, 1, 'webp'), type: 'image' }
    ],
  },
  {
    id: 18,
    title: "Catan",
    description: "Expériementation pour la recréation du jeu de société Catan en 3D. Inclus la génération procédurales \
    du plateau de jeu en hexagonale, la gestion des ressources, et de la boucle de jeu au tour par tour.",
    techStack: ["Unity", "C#"],
    media: [
      { url: getMediaUrl(18, 1, 'webp'), type: 'image' }
    ],
  },
  {
    id: 19,
    title: "Portfolio V3",
    description: "En cours.",
    techStack: ["React", "TypeScript", "Vite", "SCSS"],
    media: [
      { url: getMediaUrl(19, 1, 'webp'), type: 'image' }
    ],
  }
];