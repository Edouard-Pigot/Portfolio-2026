export interface Skills {
  category: string,
  skills: string[]
}

export const skills: Skills[] = [
  {
    category: "skills.groups.frontend",
    skills: ['HTML', 'CSS', 'SASS', 'JavaScript', 'TypeScript', 'React', 'JQuery',  'ThreeJS']
  },
  {
    category: "skills.groups.backend",
    skills: ['SQL', 'MySQL', 'PHP', 'Node.js', 'Python',  'PostgreSQL']
  },
  {
    category: "skills.groups.software",
    skills: ['C++', 'Unity', 'C#', 'Qt', 'Blender']
  },
  {
    category: "skills.groups.tools",
    skills: ['Git', 'GitHub', 'Visual Studio Code', 'Visual Studio 2019', 'Vite', 'Jira']
  }
];