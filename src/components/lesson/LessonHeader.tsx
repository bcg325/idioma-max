import Image from "next/image";
import Button from "../ui/Button";
import { useCallback } from "react";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import useTTS from "@/hooks/useTTS";
interface LessonHeaderProps {
  title: string;
  imageUrl: string;
  term: string;
  isFillBlank: boolean;
  lang: string;
}

const LessonHeader: React.FC<LessonHeaderProps> = ({
  title,
  imageUrl,
  term,
  isFillBlank,
  lang,
}) => {
  const playSound = useTTS();

  return (
    <div className=" w-full flex flex-col items-center mb-4">
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

      {!isFillBlank && (
        <button
          onClick={() => playSound(term, lang)}
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
export default LessonHeader;
