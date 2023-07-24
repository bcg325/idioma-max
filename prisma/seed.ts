import { PrismaClient } from "@prisma/client";

import es_en_course from "./es_en_course.json";
import es_en_sets from "./es_en_sets.json";
import en_es_course from "./en_es_course.json";
import en_es_sets from "./en_es_sets.json";

const prisma = new PrismaClient();

type Exercise = {
  term: string;
  termLang: string;
  answer: string;
  options: string[];
  optionsLang: string;
  imageUrl?: string;
  exerciseType: string;
};
type Lesson = {
  name: string;
  description: string;
  exercises: Exercise[];
};
type Unit = {
  name: string;
  description: string;
  lessons: Lesson[];
};
type Course = {
  units: Unit[];
};

type Card = {
  frontText: string;
  backText: string;
};

type CardSet = {
  name: string;
  imageUrl?: string;
  cards: Card[];
};

async function main() {
  //erase all
  await prisma.language.deleteMany();
  await prisma.course.deleteMany();
  await prisma.exerciseType.deleteMany();

  //create languages English and Spanish
  const english = await prisma.language.create({
    data: { name: "English", locale: "en" },
  });
  const spanish = await prisma.language.create({
    data: { name: "Spanish", locale: "es" },
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

  if (!(spanish && english)) return;
  if (!(vocabExercise && fillBlankExercise && grammarExercise)) return;

  //create ES_EN and EN_ES courses
  const englishCourse = await prisma.course.create({
    data: {
      name: "Inglés (ES)",
      fromLanguageId: spanish.id,
      learningLanguageId: english.id,
      description: "Mejore su fluidez en Inglés con nuestro curso interactivo.",
    },
  });

  const spanishCourse = await prisma.course.create({
    data: {
      name: "Spanish (EN)",
      fromLanguageId: english.id,
      learningLanguageId: spanish.id,
      description: "Level up your Spanish fluency with our interactive course.",
    },
  });

  const createCourse = async (course: Course, courseId: string) => {
    for (let i = 0; i < course.units.length; i++) {
      const currentUnit = course.units[i];
      const createdUnit = await prisma.unit.create({
        data: {
          courseId,
          position: i,
          name: currentUnit.name,
          description: currentUnit.description,
        },
      });

      for (let j = 0; j < course.units[i].lessons.length; j++) {
        const currentLesson = currentUnit.lessons[j];
        const createdLesson = await prisma.lesson.create({
          data: {
            unitId: createdUnit.id,
            position: j,
            name: currentUnit.lessons[j].name,
            description: currentUnit.lessons[j].description,
          },
        });

        for (let k = 0; k < course.units[i].lessons[j].exercises.length; k++) {
          const currentExercise = currentLesson.exercises[k];
          let currentExerciseTypeId;

          switch (currentExercise.exerciseType) {
            case "vocab":
              currentExerciseTypeId = vocabExercise.id;
              break;
            case "fillBlank":
              currentExerciseTypeId = fillBlankExercise.id;
              break;
            case "grammar":
              currentExerciseTypeId = grammarExercise.id;
              break;
            default:
              currentExerciseTypeId = vocabExercise.id;
          }

          await prisma.exercise.create({
            data: {
              lessonId: createdLesson.id,
              position: k,
              term: currentExercise.term,
              termLang: currentExercise.termLang,
              answer: currentExercise.answer,
              options: currentExercise.options,
              optionsLang: currentExercise.optionsLang,
              imageUrl: currentExercise.imageUrl,
              exerciseTypeId: currentExerciseTypeId,
            },
          });
        }
      }
    }
  };

  createCourse(es_en_course, englishCourse.id);
  createCourse(en_es_course, spanishCourse.id);

  const createCourseCardSets = async (
    courseCardSets: CardSet[],
    courseId: string
  ) => {
    for (let i = 0; i < courseCardSets.length; i++) {
      const currentCardSet = courseCardSets[i];
      const createdCardSet = await prisma.cardSet.create({
        data: {
          courseId,
          creatorId: "cljq35vem0000vcccn8s8bx2t",
          imageUrl: currentCardSet.imageUrl,
          name: currentCardSet.name,
        },
      });
      for (let j = 0; j < currentCardSet.cards.length; j++) {
        const currentCard = currentCardSet.cards[j];
        const createdCard = await prisma.card.create({
          data: {
            setId: createdCardSet.id,
            frontText: currentCard.frontText,
            backText: currentCard.backText,
          },
        });
      }
    }
  };

  createCourseCardSets(es_en_sets, englishCourse.id);
  createCourseCardSets(en_es_sets, spanishCourse.id);
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
