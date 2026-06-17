import { prisma } from "@/lib/prisma";

export async function getCbeCurriculum(schoolId: string) {
  return prisma.cbeLearningArea.findMany({
    where: { schoolId },
    include: {
      strands: {
        include: { competencies: true },
        orderBy: { code: "asc" },
      },
    },
    orderBy: { code: "asc" },
  });
}

export async function createLearningArea(
  schoolId: string,
  data: { name: string; code: string; gradeLevel?: string }
) {
  return prisma.cbeLearningArea.create({
    data: { schoolId, name: data.name, code: data.code.toUpperCase(), gradeLevel: data.gradeLevel },
  });
}

export async function createStrand(
  schoolId: string,
  data: { learningAreaId: string; name: string; code: string }
) {
  const area = await prisma.cbeLearningArea.findFirst({
    where: { id: data.learningAreaId, schoolId },
  });
  if (!area) throw new Error("Learning area not found");

  return prisma.cbeStrand.create({
    data: { learningAreaId: data.learningAreaId, name: data.name, code: data.code.toUpperCase() },
  });
}

export async function createCompetency(
  schoolId: string,
  data: { strandId: string; name: string; code: string }
) {
  const strand = await prisma.cbeStrand.findFirst({
    where: { id: data.strandId, learningArea: { schoolId } },
  });
  if (!strand) throw new Error("Strand not found");

  return prisma.cbeCompetency.create({
    data: { strandId: data.strandId, name: data.name, code: data.code.toUpperCase() },
  });
}

export async function seedDefaultCbeCurriculum(schoolId: string) {
  const existing = await prisma.cbeLearningArea.count({ where: { schoolId } });
  if (existing > 0) return { seeded: false };

  const defaults = [
    {
      name: "Mathematics",
      code: "MATH",
      strands: [
        { name: "Numbers", code: "NUM", competencies: [{ name: "Count and order", code: "C1" }] },
        { name: "Measurement", code: "MEA", competencies: [{ name: "Compare lengths", code: "C1" }] },
      ],
    },
    {
      name: "English",
      code: "ENG",
      strands: [
        { name: "Listening", code: "LIS", competencies: [{ name: "Follow instructions", code: "C1" }] },
        { name: "Reading", code: "REA", competencies: [{ name: "Decode words", code: "C1" }] },
      ],
    },
    {
      name: "Kiswahili",
      code: "KIS",
      strands: [
        { name: "Kusoma", code: "KUS", competencies: [{ name: "Soma maneno", code: "C1" }] },
      ],
    },
  ];

  for (const area of defaults) {
    const la = await prisma.cbeLearningArea.create({
      data: { schoolId, name: area.name, code: area.code },
    });
    for (const strand of area.strands) {
      const st = await prisma.cbeStrand.create({
        data: { learningAreaId: la.id, name: strand.name, code: strand.code },
      });
      for (const comp of strand.competencies) {
        await prisma.cbeCompetency.create({
          data: { strandId: st.id, name: comp.name, code: comp.code },
        });
      }
    }
  }

  return { seeded: true };
}

export async function assessCbeCompetency(
  schoolId: string,
  data: {
    studentId: string;
    learningArea: string;
    level: string;
    term: string;
    academicYear: string;
    competencyCode?: string;
    evidence?: string;
  }
) {
  return prisma.cbeAssessment.create({
    data: {
      schoolId,
      studentId: data.studentId,
      learningArea: data.learningArea,
      level: data.level,
      term: data.term,
      academicYear: data.academicYear,
    },
  });
}
