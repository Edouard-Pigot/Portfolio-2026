const getMediaUrl = (experienceId: number) => {
  return new URL(`../assets/experiences_media/${experienceId}.webp`, import.meta.url).href;
};

export type ContractType = 'internship' | 'temporary' | 'permanent';

export interface Experience {
  positionName: string;
  companyName: string;
  contractType: ContractType;
  location: string;
  periods: number[][];
  description: string;
  techStack?: string[];
}

export const experiences: Experience[] = [
  {
    positionName: "experiences.details.credit_mutuel.position",
    companyName: "experiences.details.credit_mutuel.company",
    contractType: "temporary",
    location: "Marseille",
    periods: [[1467331200, 1470009599]],
    description: "experiences.details.credit_mutuel_1.description"
  },
  {
    positionName: "experiences.details.fiducial_cloud.position",
    companyName: "experiences.details.fiducial_cloud.company",
    contractType: "internship",
    location: "Aix-en-Provence",
    periods: [[1522540800, 1530403199]],
    description: "experiences.details.fiducial_cloud.description",
    techStack: ["PHP", "Smarty", "SQL", "Python", "HTML", "CSS"]
  },
  {
    positionName: "experiences.details.ipgr.position",
    companyName: "experiences.details.ipgr.company",
    contractType: "internship",
    location: "Marseille",
    periods: [[1590969600, 1596239999]],
    description: "experiences.details.ipgr.description",
    techStack: ["Unity", "C#", "Blender", "GitHub"]
  },
  {
    positionName: "experiences.details.credit_mutuel.position",
    companyName: "experiences.details.credit_mutuel.company",
    contractType: "temporary",
    location: "Marseille",
    periods: [[1530403200, 1535759999], [1561939200, 1567295999], [1593561600, 1598918399]],
    description: "experiences.details.credit_mutuel_2.description"
  },
  {
    positionName: "experiences.details.dassault_systemes.position",
    companyName: "experiences.details.dassault_systemes.company",
    contractType: "internship",
    location: "Vélizy-Villacoublay",
    periods: [[1617235200, 1633046399]],
    description: "experiences.details.dassault_systemes_1.description",
    techStack: ["C++"]
  },
  {
    positionName: "experiences.details.dassault_systemes.position",
    companyName: "experiences.details.dassault_systemes.company",
    contractType: "permanent",
    location: "Vélizy-Villacoublay",
    periods: [[1640995200, -1]],
    description: "experiences.details.dassault_systemes_2.description",
    techStack: ["C++", "JavaScript", "TypeScript", "JSON Schema", "HTML", "CSS", "SASS"]
  }
];