import Image from "next/image";
import Button from "../ui/Button";
import { useCallback } from "react";
import { HiOutlineSpeakerWave } from "react-icons/hi2";

interface LessonHeaderProps {
  title: string;
  imageUrl: string;
  term: string;
  isFillBlank: boolean;
}

let speech_voices: SpeechSynthesisVoice[];
if (window) {
  speech_voices = window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    speech_voices = window.speechSynthesis.getVoices();
  };
}

const LessonHeader: React.FC<LessonHeaderProps> = ({
  title,
  imageUrl,
  term,
  isFillBlank,
}) => {
  const playSound = useCallback(() => {
    const msg = new SpeechSynthesisUtterance();

    msg.voice = speech_voices[4];
    msg.text = term;
    // voices[4] for english, voices[7] for spanish
    window.speechSynthesis.speak(msg);
  }, [term]);

  return (
    <div className=" w-full flex flex-col items-center mt-2 mb-4">
      <h1 className="text-2xl font-semibold text-center">{title}</h1>
      <div className="relative flex justify-center">
        <Image
          src={imageUrl || "/placeholder.jpg"}
          alt="language"
          width={200}
          height={200}
          className="rounded-xl shadow-md my-4"
        />
      </div>

      {!isFillBlank && (
        <button
          onClick={playSound}
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
