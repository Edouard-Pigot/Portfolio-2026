/*const getMediaUrl = (experienceId: number) => {
  return new URL(`../assets/experiences_media/${experienceId}.webp`, import.meta.url).href;
};*/

export type ContractType = 'internship' | 'temporary' | 'permanent';

export interface Date {
  month: number | undefined;
  year: number;
}

export interface Experience {
  positionName: string;
  companyName: string;
  contractType: ContractType;
  location: string;
  periods: {start: Date, end: Date} | {start: Date, end: Date}[];
  description: string;
  tasks?: string;
  techStack?: string[];
}

export const experiences: Experience[] = [
  {
    positionName: "experiences.details.credit_mutuel.position",
    companyName: "experiences.details.credit_mutuel.company",
    contractType: "temporary",
    location: "Marseille",
    periods: {start:{month: 7, year: 2016}, end:{month: 7, year: 2016}},
    description: "experiences.details.credit_mutuel_1.description",
    tasks: "experiences.details.credit_mutuel_1.tasks"
  },
  {
    positionName: "experiences.details.fiducial_cloud.position",
    companyName: "experiences.details.fiducial_cloud.company",
    contractType: "internship",
    location: "Aix-en-Provence",
    periods: {start:{month: 4, year: 2018}, end:{month: 6, year: 2018}},
    description: "experiences.details.fiducial_cloud.description",
    tasks: "experiences.details.fiducial_cloud.tasks",
    techStack: ["PHP", "Smarty", "SQL", "Python", "HTML", "CSS"]
  },
  {
    positionName: "experiences.details.credit_mutuel.position",
    companyName: "experiences.details.credit_mutuel.company",
    contractType: "temporary",
    location: "Marseille",
    periods: [{start:{month: 7, year: 2018}, end:{month: 8, year: 2018}}, {start:{month: 7, year: 2019}, end:{month: 8, year: 2019}}, {start:{month: 7, year: 2020}, end:{month: 8, year: 2020}}],
    description: "experiences.details.credit_mutuel_2.description",
    tasks: "experiences.details.credit_mutuel_2.tasks"
  },
  {
    positionName: "experiences.details.ipgr.position",
    companyName: "experiences.details.ipgr.company",
    contractType: "internship",
    location: "Marseille",
    periods: {start:{month: 6, year: 2020}, end:{month: 7, year: 2020}},
    description: "experiences.details.ipgr.description",
    tasks: "experiences.details.ipgr.tasks",
    techStack: ["Unity", "C#", "Blender", "GitHub"]
  },
  {
    positionName: "experiences.details.dassault_systemes.position",
    companyName: "experiences.details.dassault_systemes.company",
    contractType: "internship",
    location: "Vélizy-Villacoublay",
    periods: {start:{month: 4, year: 2021}, end:{month: 9, year: 2021}},
    description: "experiences.details.dassault_systemes_1.description",
    tasks: "experiences.details.dassault_systemes_1.tasks",
    techStack: ["C++", "Agile Scrum", "Jira"]
  },
  {
    positionName: "experiences.details.dassault_systemes.position",
    companyName: "experiences.details.dassault_systemes.company",
    contractType: "permanent",
    location: "Vélizy-Villacoublay",
    periods: {start:{month: 1, year: 2022}, end:{month: 10, year: 2025}},
    description: "experiences.details.dassault_systemes_2.description",
    tasks: "experiences.details.dassault_systemes_2.tasks",
    techStack: ["C++", "JavaScript", "TypeScript", "JSON Schema", "HTML", "CSS", "SASS", "Agile Scrum", "Jira"]
  }
];