/*const getMediaUrl = (schoolingId: number) => {
  return new URL(`../assets/schooling_media/${schoolingId}.webp`, import.meta.url).href;
};*/

export interface Schooling {
  diplomaName: string;
  schoolName: string;
  location: string;
  diplomaYear: number;
  description: string;
  techStack?: string[];
}

export const schooling: Schooling[] = [
  {
    diplomaName: "schooling.details.bac.name",
    schoolName: "schooling.details.bac.school",
    location: "Digne-les-bains",
    diplomaYear: 2016,
    description: "schooling.details.bac.description"
  },
  {
    diplomaName: "schooling.details.dut.name",
    schoolName: "schooling.details.dut.school",
    location: "Aix-en-Provence",
    diplomaYear: 2018,
    description: "schooling.details.dut.description"
  },
  {
    diplomaName: "schooling.details.licence.name",
    schoolName: "schooling.details.licence.school",
    location: "Marseille",
    diplomaYear: 2019,
    description: "schooling.details.licence.description"
  },
  {
    diplomaName: "schooling.details.master.name",
    schoolName: "schooling.details.master.school",
    location: "Marseille",
    diplomaYear: 2021,
    description: "schooling.details.master.description"
  }
];