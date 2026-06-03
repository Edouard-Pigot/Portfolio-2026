const getMediaUrl = (projectId: number, mediaId: number, ext: 'webp' | 'webm') => {
  return new URL(`../assets/projects_media/${projectId}_${mediaId}.${ext}`, import.meta.url).href;
};

export interface ProjectMedia {
  url: string;
  type: 'image' | 'video';
  poster?: string;
}

export interface Date {
  month: number | undefined;
  year: number;
}

export interface Project {
  id: number;
  title: string;
  dates: {start: Date, end: Date};
  description: string;
  techStack: string[];
  media: ProjectMedia[];
  link?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "projects.details.tank_physics.title",
    dates: {start:{month: 3, year: 2017}, end:{month: 7, year: 2017}},
    description: "projects.details.tank_physics.description",
    techStack: ["C#", "Unity", "Blender"],
    media: [
      { url: getMediaUrl(1, 1, 'webm'), type: 'video', poster: getMediaUrl(1, 1, 'webp') },
      { url: getMediaUrl(1, 2, 'webm'), type: 'video', poster: getMediaUrl(1, 2, 'webp') },
      { url: getMediaUrl(1, 3, 'webm'), type: 'video', poster: getMediaUrl(1, 3, 'webp') },
      { url: getMediaUrl(1, 4, 'webp'), type: 'image' },
      { url: getMediaUrl(1, 5, 'webp'), type: 'image' }
    ],
    link: "https://github.com/Edouard-Pigot/Tank-Physics"
  },
  {
    id: 2,
    title: "projects.details.modeling_3d.title",
    dates: {start:{month: 1, year: 2019}, end:{month: 1, year: 2019}},
    description: "projects.details.modeling_3d.description",
    techStack: ["Blender"],
    media: [{ url: getMediaUrl(2, 1, 'webp'), type: 'image' }]
  },
  {
    id: 3,
    title: "projects.details.tank_shooter.title",
    dates: {start:{month: 2, year: 2019}, end:{month: 2, year: 2019}},
    description: "projects.details.tank_shooter.description",
    techStack: ["C#", "Unity", "Blender"],
    media: [
      { url: getMediaUrl(3, 1, 'webm'), type: 'video', poster: getMediaUrl(3, 1, 'webp') },
      { url: getMediaUrl(3, 2, 'webp'), type: 'image' }
    ],
    link: "https://github.com/Edouard-Pigot/Tank-Shooter"
  },
  {
    id: 4,
    title: "projects.details.procedural_swords.title",
    dates: {start:{month: 3, year: 2019}, end:{month: 3, year: 2019}},
    description: "projects.details.procedural_swords.description",
    techStack: ["Python", "Blender"],
    media: [{ url: getMediaUrl(4, 1, 'webp'), type: 'image' }]
  },
  {
    id: 5,
    title: "projects.details.face_detector.title",
    dates: {start:{month: 3, year: 2019}, end:{month: 3, year: 2019}},
    description: "projects.details.face_detector.description",
    techStack: ["Python", "Blender"],
    media: [
      { url: getMediaUrl(5, 1, 'webp'), type: 'image' },
      { url: getMediaUrl(5, 2, 'webp'), type: 'image' }
    ]
  },
  {
    id: 6,
    title: "projects.details.scripted_animation.title",
    dates: {start:{month: 4, year: 2019}, end:{month: 4, year: 2019}},
    description: "projects.details.scripted_animation.description",
    techStack: ["Python", "Blender"],
    media: [{ url: getMediaUrl(6, 1, 'webm'), type: 'video', poster: getMediaUrl(6, 1, 'webp') }]
  },
  {
    id: 7,
    title: "projects.details.blitz.title",
    dates: {start:{month: 5, year: 2019}, end:{month: 5, year: 2019}},
    description: "projects.details.blitz.description",
    techStack: ["HTML", "CSS", "JavaScript", "NodeJS"],
    media: [
      { url: getMediaUrl(7, 1, 'webm'), type: 'video', poster: getMediaUrl(7, 1, 'webp') },
    ],
    link: "https://github.com/Edouard-Pigot/Blitz"
  },
  {
    id: 8,
    title: "projects.details.elevator_controller.title",
    dates: {start:{month: 10, year: 2019}, end:{month: 10, year: 2019}},
    description: "projects.details.elevator_controller.description",
    techStack: ["Java", "JavaFX"],
    media: [
      { url: getMediaUrl(8, 1, 'webm'), type: 'video', poster: getMediaUrl(8, 1, 'webp') },
      { url: getMediaUrl(8, 2, 'webp'), type: 'image' }
    ],
    link: "https://github.com/Edouard-Pigot/Ascenseur"
  },
  {
    id: 9,
    title: "projects.details.pacman.title",
    dates: {start:{month: 12, year: 2019}, end:{month: 12, year: 2019}},
    description: "projects.details.pacman.description",
    techStack: ["Java", "JavaFX"],
    media: [
      { url: getMediaUrl(9, 1, 'webm'), type: 'video', poster: getMediaUrl(9, 1, 'webp') },
    ],
    link: "https://github.com/Edouard-Pigot/Pacman"
  },
  {
    id: 10,
    title: "projects.details.lumipic.title",
    dates: {start:{month: 2, year: 2020}, end:{month: 2, year: 2020}},
    description: "projects.details.lumipic.description",
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
    title: "projects.details.flood_simulator.title",
    dates: {start:{month: 5, year: 2020}, end:{month: 7, year: 2020}},
    description: "projects.details.flood_simulator.description",
    techStack: ["Unity", "C#", "Blender"],
    media: [
      { url: getMediaUrl(11, 1, 'webp'), type: 'image' },
      { url: getMediaUrl(11, 2, 'webp'), type: 'image' }
    ],
    link: "https://github.com/Edouard-Pigot/TER"
  },
  {
    id: 12,
    title: "projects.details.portfolio_v1.title",
    dates: {start:{month: 10, year: 2020}, end:{month: 10, year: 2020}},
    description: "projects.details.portfolio_v1.description",
    techStack: ["HTML", "CSS", "Javascript", "JQuery"],
    media: [
      { url: getMediaUrl(12, 1, 'webp'), type: 'image' },
      { url: getMediaUrl(12, 2, 'webp'), type: 'image' }
    ],
    link: "https://github.com/Edouard-Pigot/Edouard-Pigot.github.io/tree/630f56b0bc9efb7f7297c872552b830c1e809202"
  },
  {
    id: 13,
    title: "projects.details.particle_emitter.title",
    dates: {start:{month: 10, year: 2020}, end:{month: 10, year: 2020}},
    description: "projects.details.particle_emitter.description",
    techStack: ["C++", "OpenGL", "GLSL", "Qt"],
    media: [
      { url: getMediaUrl(13, 1, 'webm'), type: 'video', poster: getMediaUrl(13, 1, 'webp') },
      { url: getMediaUrl(13, 2, 'webp'), type: 'image' }
    ],
    link: "https://github.com/Edouard-Pigot/Smoke-Particule"
  },
  {
    id: 14,
    title: "projects.details.boids.title",
    dates: {start:{month: 10, year: 2020}, end:{month: 11, year: 2020}},
    description: "projects.details.boids.description",
    techStack: ["C++", "OpenGL", "GLSL", "Qt"],
    media: [
      { url: getMediaUrl(14, 1, 'webm'), type: 'video', poster: getMediaUrl(14, 1, 'webp') },
      { url: getMediaUrl(14, 2, 'webp'), type: 'image' }
    ],
    link: "https://github.com/Edouard-Pigot/Boids"
  },
  {
    id: 15,
    title: "projects.details.drone_choreography.title",
    dates: {start:{month: 12, year: 2020}, end:{month: 12, year: 2020}},
    description: "projects.details.drone_choreography.description",
    techStack: ["WebGL", "JavaScript", "JQuery", "HTML", "CSS"],
    media: [{ url: getMediaUrl(15, 1, 'webp'), type: 'image' }]
  },
  {
    id: 16,
    title: "projects.details.shader_intro.title",
    dates: {start:{month: 12, year: 2020}, end:{month: 12, year: 2020}},
    description: "projects.details.shader_intro.description",
    techStack: ["GLSL"],
    media: [{ url: getMediaUrl(16, 1, 'webm'), type: 'video', poster: getMediaUrl(16, 1, 'webp') }],
    link: "https://www.shadertoy.com/view/wdVfRw"
  },
  {
    id: 17,
    title: "projects.details.portfolio_v2.title",
    dates: {start:{month: 5, year: 2021}, end:{month: 5, year: 2021}},
    description: "projects.details.portfolio_v2.description",
    techStack: ["HTML", "CSS", "JavaScript", "JQuery"],
    media: [
      { url: getMediaUrl(17, 1, 'webp'), type: 'image' },
      { url: getMediaUrl(17, 2, 'webp'), type: 'image' },
      { url: getMediaUrl(17, 3, 'webp'), type: 'image' },
      { url: getMediaUrl(17, 4, 'webp'), type: 'image' },
      { url: getMediaUrl(17, 5, 'webp'), type: 'image' },
      { url: getMediaUrl(17, 6, 'webp'), type: 'image' }
    ],
    link: "https://github.com/Edouard-Pigot/Edouard-Pigot.github.io/tree/f2ba30f74355a3f9dd1cc49ccc7263d53053f0f9"
  },
  {
    id: 18,
    title: "projects.details.catan.title",
    description: "projects.details.catan.description",
    dates: {start:{month: 3, year: 2021}, end:{month: 3, year: 2021}},
    techStack: ["Unity", "C#"],
    media: [{ url: getMediaUrl(18, 1, 'webp'), type: 'image' }]
  },
  {
    id: 19,
    title: "projects.details.portfolio_v3.title",
    dates: {start:{month: 1, year: 2026}, end:{month: 5, year: 2026}},
    description: "projects.details.portfolio_v3.description",
    techStack: ["React", "TypeScript", "Vite", "SASS", "ThreeJS", "GLSL", "GSAP", "i18next"],
    media: [{ url: getMediaUrl(19, 1, 'webp'), type: 'image' }]
  },
  {
    id: 20,
    title: "projects.details.visit_paris.title",
    dates: {start:{month: 11, year: 2025}, end:{month: -1, year: -1}},
    description: "projects.details.visit_paris.description",
    techStack: ["React", "TypeScript", "Vite", "SASS", "PostGreSQL", "ExpressJS", "NodeJS"],
    media: [{ url: getMediaUrl(20, 1, 'webp'), type: 'image' }]
  }
];