import Link from "next-intl/link";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { BsCheckCircle } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useTranslations } from "next-intl";

interface LessonCompleteProps {
  correctAnswers: number;
  wrongAnswers: number;
}

const LessonCompleted: React.FC<LessonCompleteProps> = ({
  correctAnswers,
  wrongAnswers,
}) => {
  const t = useTranslations("Lesson.completed");

  return (
    <div className="pt-5 container min-h-fit h-screen items-center flex flex-col gap-2">
      <h1 className="text-3xl font-bold text-Dark">{t("title")}</h1>
      <div className="flex flex-col justify-center items-center h-full ">
        <div className="flex flex-col gap-3 mb-3">
          <span className="flex gap-3 items-center text-xl font-medium text-green-900">
            <BsCheckCircle size={21} />
            <span className="text-black">
              {correctAnswers} {t("correct")}
            </span>
          </span>
          <span className="flex gap-3 items-center text-xl font-medium text-red-900">
            <AiOutlineCloseCircle size={22} />
            <span className="text-black">
              {wrongAnswers} {t("incorrect")}
            </span>
          </span>
        </div>
        <Image
          src="/lesson-completed.svg"
          alt="lesson completed"
          width={350}
          height={350}
        />
      </div>
      <Link href="/course">
        <Button className="text-white px-2 mb-3 w-44">{t("finish")}</Button>
      </Link>
    </div>
  );
};
export default LessonCompleted;
