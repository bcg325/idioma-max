"use client";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getLessonById, updateCourseProgress } from "@/app/store/courses";
import ExerciseInput from "@/components/lesson/ExerciseInput";
import ProgressTopBar from "@/components/ui/ProgressTopBar";
import ExerciseHeader from "@/components/lesson/ExerciseHeader";
import Button from "@/components/ui/Button";
import FeedbackModal from "@/components/lesson/FeedbackModal";
import { formatFillBlankAnswer } from "@/utils/formatFillBlankAnswer";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import LessonCompleted from "@/components/lesson/LessonCompleted";
import Loading from "@/components/ui/Loading";
import { Exercise } from "@/types";
import shuffle from "@/utils/shuffle";
import UserAnswerProvider from "@/components/lesson/UserAnswerProvider";

type FeedbackType = {
  isCorrect: boolean;
} | null;

type ProgressData = {
  [key: string]: {
    [key: string]: boolean;
  };
};

interface LessonPageProps {
  params: {
    lessonId: string;
  };
}

const LessonPage: React.FC<LessonPageProps> = ({ params }) => {
  const t = useTranslations("Lesson");
  const queryClient = useQueryClient();
  const { data: session, status } = useSession();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currExerciseIndex, setCurrExerciseIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [lessonComplete, setLessonComplete] = useState<boolean>(false);

  const {
    isLoading,
    error,
    data: lessonData,
  } = useQuery({
    queryKey: ["lesson", params.lessonId],
    queryFn: () => getLessonById(params.lessonId),
    refetchOnMount: false,
  });

  useEffect(() => {
    if (lessonData?.exercises && exercises.length <= 0) {
      const exercisesCopy = lessonData.exercises;

      shuffle(exercisesCopy);
      setExercises(exercisesCopy);
    }
  }, [lessonData, exercises]);

  const courseProgressMutation = useMutation({
    mutationFn: () =>
      updateCourseProgress(lessonData.unit.courseId, lessonData.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "courseProgress",
          session?.user.id,
          lessonData.unit.courseId,
        ],
      });
    },
  });

  if (isLoading || exercises.length <= 0) {
    return <Loading />;
  }

  const currentExercise = exercises[currExerciseIndex];

  const handleLessonCompletion = () => {
    if (session?.user.id) {
      courseProgressMutation.mutate();
    } else {
      const localCourseProgress = localStorage.getItem("courseProgress");
      if (!localCourseProgress) {
        const progress: ProgressData = {
          [lessonData.unit.courseId]: {
            [lessonData.id]: true,
          },
        };
        localStorage.setItem("courseProgress", JSON.stringify(progress));
      } else {
        const currentProgress: ProgressData = JSON.parse(localCourseProgress);
        if (currentProgress[lessonData.unit.courseId]) {
          currentProgress[lessonData.unit.courseId][lessonData.id] = true;
          localStorage.setItem(
            "courseProgress",
            JSON.stringify(currentProgress)
          );
        } else {
          const newCourseProgress = {
            ...currentProgress,
            [lessonData.unit.courseId]: {
              [lessonData.id]: true,
            },
          };
          localStorage.setItem(
            "courseProgress",
            JSON.stringify(newCourseProgress)
          );
        }
      }
    }
  };
  const nextExercise = () => {
    setUserAnswer("");
    setFeedback(null);

    if (currExerciseIndex < exercises.length - 1) {
      setCurrExerciseIndex((prev) => prev + 1);
    } else {
      setLessonComplete(true);
      handleLessonCompletion();
    }
  };

  const handleCheckAnswer = () => {
    const correct = userAnswer === currentExercise.answer;
    setFeedback({ isCorrect: correct });
    if (correct) {
      setCorrectCount((prev) => prev + 1);
    } else {
      setWrongCount((prev) => prev + 1);
    }
  };

  const correctAnswer =
    currentExercise.exerciseType.name === "sentence_blank" &&
    !feedback?.isCorrect
      ? formatFillBlankAnswer(currentExercise.term, currentExercise.answer)
      : currentExercise.answer;

  return (
    <div className="container flex flex-col justify-between min-h-fit h-screen lg:max-w-4xl">
      <UserAnswerProvider userAnswer={userAnswer} setUserAnswer={setUserAnswer}>
        {!lessonComplete ? (
          <>
            <FeedbackModal
              isOpen={!!feedback}
              isCorrect={feedback?.isCorrect || false}
              correctAnswer={correctAnswer}
              onClose={nextExercise}
            />
            <ProgressTopBar
              current={currExerciseIndex + 1}
              total={exercises?.length || 0}
              closeLink="/"
            />
            <ExerciseHeader
              term={currentExercise.term}
              exerciseType={currentExercise.exerciseType.name}
              imageUrl={currentExercise.imageUrl || ""}
              termLang={currentExercise.termLang || "EN"}
            />
            <ExerciseInput
              term={currentExercise.term}
              termLang={currentExercise.termLang || "EN"}
              exerciseType={currentExercise.exerciseType.name}
              answer={currentExercise.answer}
              options={currentExercise.options}
              optionsLang={currentExercise.optionsLang || "EN"}
              imageUrl={currentExercise.imageUrl || ""}
            />
            <div className="flex justify-center w-full my-3">
              <Button
                disabled={!userAnswer}
                className="text-white w-44"
                onClick={handleCheckAnswer}
              >
                {t("check")}
              </Button>
            </div>
          </>
        ) : (
          <LessonCompleted
            correctAnswers={correctCount}
            wrongAnswers={wrongCount}
          />
        )}
      </UserAnswerProvider>
    </div>
  );
};
export default LessonPage;
