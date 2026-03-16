const getMediaUrl = (schoolingId: number) => {
  return new URL(`../assets/schooling_media/${schoolingId}.webp`, import.meta.url).href;
};

export interface Schooling {
  diplomaName: string;
  schoolName: string;
  location: string;
  diplomaDate: number;
  description: string;
  techStack?: string[];
  media: string;
}

export const schooling: Schooling[] = [
  {
    diplomaName: "schooling.details.bac.name",
    schoolName: "schooling.details.bac.school",
    location: "Digne-les-bains",
    diplomaDate: 1467331199,
    description: "schooling.details.bac.description",
    media: getMediaUrl(1)
  },
  {
    diplomaName: "schooling.details.dut.name",
    schoolName: "schooling.details.dut.school",
    location: "Aix-en-Provence",
    diplomaDate: 1530403199,
    description: "schooling.details.dut.description",
    media: getMediaUrl(2)
  },
  {
    diplomaName: "schooling.details.licence.name",
    schoolName: "schooling.details.licence.school",
    location: "Marseille",
    diplomaDate: 1561939199,
    description: "schooling.details.licence.description",
    media: getMediaUrl(3)
  },
  {
    diplomaName: "schooling.details.master.name",
    schoolName: "schooling.details.master.school",
    location: "Marseille",
    diplomaDate: 1630454400,
    description: "schooling.details.master.description",
    media: getMediaUrl(4)
  }
];