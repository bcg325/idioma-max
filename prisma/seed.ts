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
      units: {
        createMany: {
          data: [
            {
              name: "Introduction",
              position: 0,
              description: "Introduction unit to English course",
            },
            {
              name: "Foundations",
              position: 1,
              description: "Foundations unit to English course",
            },
            {
              name: "Conversations",
              position: 2,
              description: "Conversations unit to English course",
            },
          ],
        },
      },
    },
  });

  const spanishCourse = await prisma.course.create({
    data: {
      name: "Spanish",
      fromLanguageId: english.id,
      learningLanguageId: spanish.id,
      description: "EN_ES",
      units: {
        createMany: {
          data: [
            {
              name: "Spanish unit 1",
              position: 0,
              description: "Introduction to Spanish course",
            },
            {
              name: "Spanish unit 2",
              position: 1,
              description: "Foundations for Spanish course",
            },
            {
              name: "Spanish unit 3",
              position: 2,
              description: "Conversations unit for Spanish course",
            },
          ],
        },
      },
    },
  });

  await prisma.unit.update({
    where: {
      courseId_position: {
        courseId: englishCourse.id,
        position: 0,
      },
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
      courseId_position: {
        courseId: englishCourse.id,
        position: 1,
      },
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
      courseId_position: {
        courseId: englishCourse.id,
        position: 2,
      },
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

  await prisma.unit.update({
    where: {
      courseId_position: {
        courseId: spanishCourse.id,
        position: 0,
      },
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
      courseId_position: {
        courseId: spanishCourse.id,
        position: 1,
      },
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
      courseId_position: {
        courseId: spanishCourse.id,
        position: 2,
      },
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

  //CREATING CARDS
  const weekDaysCardSet = await prisma.cardSet.create({
    data: {
      name: "Days of the week",
      courseId: englishCourse.id,
      creatorId: "cljq35vem0000vcccn8s8bx2t", // bryan user id
      cards: {
        createMany: {
          data: [
            {
              frontText: "Lunes",
              backText: "Monday",
            },
            {
              frontText: "Martes",
              backText: "Tuesday",
            },
            {
              frontText: "Miercoles",
              backText: "Wednesday",
            },
            {
              frontText: "Jueves",
              backText: "Thursday",
            },
            {
              frontText: "Viernes",
              backText: "Friday",
            },
            {
              frontText: "Sabado",
              backText: "Saturday",
            },
            {
              frontText: "Domingo",
              backText: "Sunday",
            },
          ],
        },
      },
    },
  });
  const timesOfDay = await prisma.cardSet.create({
    data: {
      name: "Times of the day",
      courseId: englishCourse.id,
      creatorId: "cljq35vem0000vcccn8s8bx2t", // bryan user id
      cards: {
        createMany: {
          data: [
            {
              frontText: "Morning",
              backText: "Mañana",
            },
            {
              frontText: "Afternoon",
              backText: "Tarde",
            },
            {
              frontText: "Night",
              backText: "Noche",
            },
          ],
        },
      },
    },
  });
  const commonQuestions = await prisma.cardSet.create({
    data: {
      name: "Common questions",
      courseId: englishCourse.id,
      creatorId: "cljq35vem0000vcccn8s8bx2t", // bryan user id
      cards: {
        createMany: {
          data: [
            {
              frontText: "What’s your name?",
              backText: "¿Cómo te llamas?",
            },
            {
              frontText: "What do you do for a living?",
              backText: "¿A qué te dedicas?",
            },
            {
              frontText: "How much is this?",
              backText: "¿Cuánto cuesta?",
            },
            {
              frontText: "What time is it?",
              backText: "¿Qué hora es?",
            },
            {
              frontText: "Can you help me?",
              backText: "¿Me puede ayudar?",
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
