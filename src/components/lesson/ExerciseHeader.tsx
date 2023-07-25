import Image from "next/image";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import useTTS from "@/hooks/useTTS";
import { useTranslations } from "next-intl";

interface ExerciseHeaderProps {
  imageUrl: string;
  term: string;
  termLang: string;
  exerciseType: string;
}

const ExerciseHeader: React.FC<ExerciseHeaderProps> = ({
  imageUrl,
  termLang,
  term,
  exerciseType,
}) => {
  const t = useTranslations("Lesson.exercises");
  const playSound = useTTS();

  let title = "";

  if (exerciseType === "vocab") {
    title = t("translate");
  }

  if (exerciseType === "fill_blank") {
    title = t("fillBlank");
  }

  if (exerciseType === "grammar") {
    title = t("buildSentence");
  }

  return (
    <div className="w-full flex flex-col items-center mb-4">
      <h1 className="text-2xl font-semibold text-center">{title}</h1>
      <div className="relative flex justify-center h-150">
        <Image
          key={imageUrl}
          src={imageUrl || "/placeholder.jpg"}
          alt="language"
          width={190}
          height={150}
          className="rounded-xl shadow-md my-4 transition-opacity opacity-0 duration-50"
          priority={true}
          onLoadingComplete={(image) => image.classList.add("opacity-100")}
        />
      </div>

      {!(exerciseType === "fill_blank") && (
        <button
          onClick={() => playSound(term, termLang)}
          className=" flex flex-col items-center gap-0.5 text-2xl text-medium text-center rounded-xl px-2.5 hover:bg-primary200/10"
        >
          <span className="after:content-[attr(after)]">{term}</span>
          <HiOutlineSpeakerWave
            className="inline after text-primary400"
            color=""
            size={19}
          />
        </button>
      )}
    </div>
  );
};
export default ExerciseHeader;
