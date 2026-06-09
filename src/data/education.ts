export interface Education {
  diplomaName: string;
  schoolName: string;
  location: string;
  diplomaYear: number;
  description: string;
  tasks: string;
  techStack?: string[];
}

export const education: Education[] = [
  {
    diplomaName: "education.details.bac.name",
    schoolName: "education.details.bac.school",
    location: "Digne-les-bains",
    diplomaYear: 2016,
    description: "education.details.bac.description",
    tasks: "education.details.bac.tasks"
  },
  {
    diplomaName: "education.details.dut.name",
    schoolName: "education.details.dut.school",
    location: "Aix-en-Provence",
    diplomaYear: 2018,
    description: "education.details.dut.description",
    tasks: "education.details.dut.tasks"
  },
  {
    diplomaName: "education.details.licence.name",
    schoolName: "education.details.licence.school",
    location: "Marseille",
    diplomaYear: 2019,
    description: "education.details.licence.description",
    tasks: "education.details.licence.tasks"
  },
  {
    diplomaName: "education.details.master.name",
    schoolName: "education.details.master.school",
    location: "Marseille",
    diplomaYear: 2021,
    description: "education.details.master.description",
    tasks: "education.details.master.tasks"
  }
];