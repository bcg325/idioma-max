"use client";
import { useState, createContext, Dispatch, SetStateAction } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getLessonById, updateCourseProgress } from "@/app/store/courses";
import Link from "next/link";
import ExerciseInput from "@/components/lesson/ExerciseInput";
import ProgressTopBar from "@/components/ui/ProgressTopBar";
import Button from "@/components/ui/Button";
import ExerciseModal from "@/components/lesson/FeedbackModal";
import { formatFillBlankAnswer } from "@/utils/formatFillBlankAnswer";
import { useSession } from "next-auth/react";

interface UserAnswerContextType {
  userAnswer: string;
  setUserAnswer: Dispatch<SetStateAction<string>>;
}

type FeedbackType = {
  isCorrect: boolean;
} | null;

type ProgressData = {
  [key: string]: {
    [key: string]: boolean;
  };
};

export const UserAnswerContext = createContext<UserAnswerContextType>({
  userAnswer: "",
  setUserAnswer: () => {},
});

interface LessonPageProps {
  params: {
    lessonId: string;
  };
}

const LessonPage: React.FC<LessonPageProps> = ({ params }) => {
  const queryClient = useQueryClient();
  const { data: session, status } = useSession();

  const [currExerciseIndex, setCurrExerciseIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [lessonComplete, setLessonComplete] = useState<boolean>(false);

  const {
    isLoading,
    error,
    data: lessonData,
  } = useQuery({
    queryKey: ["lesson", params.lessonId],
    queryFn: () => getLessonById(params.lessonId),
  });

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

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (error) {
    return;
  }

  const exercises = lessonData.exercises;
  const currentExercise = exercises[currExerciseIndex];

  const handleLessonCompletion = () => {
    console.log("1", lessonData.unit.courseId, lessonData.id);
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
        currentProgress[lessonData.unit.courseId][lessonData.id] = true;
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
  };

  const correctAnswer =
    currentExercise.exerciseType === "sentence_blank" && !feedback?.isCorrect
      ? formatFillBlankAnswer(currentExercise.word, currentExercise.answer)
      : currentExercise.answer;

  return (
    <UserAnswerContext.Provider value={{ userAnswer, setUserAnswer }}>
      <div className="container min-h-fit h-screen flex flex-col">
        {!lessonComplete ? (
          <>
            <ProgressTopBar
              current={currExerciseIndex + 1}
              total={exercises.length}
              closeLink="/course"
            />
            <ExerciseModal
              isOpen={!!feedback}
              isCorrect={feedback?.isCorrect || false}
              correctAnswer={correctAnswer}
              onClose={nextExercise}
            />
            <ExerciseInput
              term={currentExercise.term}
              exerciseType={currentExercise.exerciseType.name}
              answer={currentExercise.answer}
              options={currentExercise.options}
              imageUrl={currentExercise.imageUrl}
            />
            <div className="flex justify-center w-full py-3">
              <Button
                disabled={!userAnswer}
                className="text-white w-44"
                onClick={handleCheckAnswer}
              >
                Check
              </Button>
            </div>
          </>
        ) : (
          <div>
            <h1 className="text-3xl">Lesson Finished! Great job.</h1>
            <Link href="/course">
              <Button>Finish</Button>
            </Link>
          </div>
        )}
      </div>
    </UserAnswerContext.Provider>
  );
};
export default LessonPage;
