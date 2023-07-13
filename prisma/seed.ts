import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.course.deleteMany();
  await prisma.language.deleteMany();
  await prisma.exerciseType.deleteMany();

  //create languages English and Spanish
  const english = await prisma.language.create({
    data: { name: "English" },
  });
  const spanish = await prisma.language.create({
    data: { name: "Spanish" },
  });

  if (!(spanish && english)) return;
  //create ES_EN and EN_ES courses
  const englishCourse = await prisma.course.create({
    data: {
      name: "English",
      fromLanguageId: spanish.id,
      learningLanguageId: english.id,
      description: "ES_EN",
    },
  });
  const spanishCourse = await prisma.course.create({
    data: {
      name: "Spanish",
      fromLanguageId: english.id,
      learningLanguageId: spanish.id,
      description: "EN_ES",
    },
  });

  if (!englishCourse) return;
  //create units for english course
  await prisma.unit.createMany({
    data: [
      {
        name: "Introduction",
        position: 0,
        description: "Introduction unit to English course",
        courseId: englishCourse.id,
      },
      {
        name: "Foundations",
        position: 1,
        description: "Foundations unit to English course",
        courseId: englishCourse.id,
      },
      {
        name: "Conversations",
        position: 2,
        description: "Conversations unit to English course",
        courseId: englishCourse.id,
      },
    ],
  });

  //find all units in English course
  const units = await prisma.unit.findMany({
    where: {
      courseId: englishCourse.id,
    },
    orderBy: {
      position: "asc",
    },
    select: {
      id: true,
      name: true,
      position: true,
    },
  });

  if (!units) return;
  //create lessons for each unit
  await prisma.unit.update({
    where: {
      id: units[0].id,
    },
    data: {
      lessons: {
        createMany: {
          data: [
            {
              name: "Lesson 1",
              description: "lesson 1 description",
              position: 0,
            },
            {
              name: "Lesson 2",
              description: "lesson 2 description",
              position: 1,
            },
            {
              name: "Lesson 3",
              description: "lesson 3 description",
              position: 2,
            },
            {
              name: "Lesson 4",
              description: "lesson 4 description",
              position: 3,
            },
          ],
        },
      },
    },
  });

  await prisma.unit.update({
    where: {
      id: units[1].id,
    },
    data: {
      lessons: {
        createMany: {
          data: [
            {
              name: "First lesson",
              description: "lesson 1 description",
              position: 0,
            },
            {
              name: "Second lesson",
              description: "lesson 2 description",
              position: 1,
            },
          ],
        },
      },
    },
  });

  await prisma.unit.update({
    where: {
      id: units[2].id,
    },
    data: {
      lessons: {
        createMany: {
          data: [
            {
              name: "1st lesson",
              description: "lesson 1 description",
              position: 0,
            },
            {
              name: "2nd lesson",
              description: "lesson 2 description",
              position: 1,
            },
            {
              name: "3rd lesson",
              description: "lesson 3 description",
              position: 2,
            },
          ],
        },
      },
    },
  });

  //create exercise types
  const vocabExercise = await prisma.exerciseType.create({
    data: {
      name: "vocab",
    },
  });
  const fillBlankExercise = await prisma.exerciseType.create({
    data: {
      name: "fill_blank",
    },
  });
  const grammarExercise = await prisma.exerciseType.create({
    data: {
      name: "grammar",
    },
  });

  if (!(vocabExercise && grammarExercise && grammarExercise)) return;
  //get unit 1 id
  const unit1 = await prisma.unit.findUnique({
    where: {
      courseId_position: {
        courseId: englishCourse.id,
        position: 0,
      },
    },
  });

  if (!unit1) return;

  //add exercises to English course, unit 1, lesson 1
  await prisma.lesson.update({
    where: {
      unitId_position: {
        unitId: unit1?.id,
        position: 0,
      },
    },
    data: {
      exercises: {
        createMany: {
          data: [
            {
              position: 0,
              term: "How are you?",
              answer: "Como estas?",
              options: ["Estas como?", "Estas bien?", "Tu estas?"],
              exerciseTypeId: vocabExercise.id,
            },
            {
              position: 1,
              term: "My name is",
              answer: "mi nombre es",
              options: ["mi", "nombre", "es", "otra", "dia", "hola", "nada"],
              exerciseTypeId: grammarExercise.id,
            },
            {
              position: 2,
              term: "Good morning",
              answer: "Buenos dias",
              options: ["Buenas noches", "Buenas tardes", "Buena dia"],
              exerciseTypeId: vocabExercise.id,
            },
            {
              position: 3,
              term: "yo ~ español",
              answer: "hablo",
              options: ["perdon", "bebo", "como"],
              exerciseTypeId: fillBlankExercise.id,
            },
            {
              position: 4,
              term: "goodbye",
              answer: "adiós",
              options: ["hola", "por favor", "gracias"],
              exerciseTypeId: vocabExercise.id,
            },
          ],
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
