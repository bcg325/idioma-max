import { useMemo } from "react";
import BuildWord from "./BuildWord";
interface BlankSentenceProps {
  sentence: string;
  fillWord: string | undefined;
  fillWordId: number;
  onClick: (lickedWord: string, wordId: number) => void;
}

const BlankSentence: React.FC<BlankSentenceProps> = ({
  sentence,
  fillWord,
  fillWordId,
  onClick,
}) => {
  const splitSentence = sentence.trim().split(" ");

  return (
    <div className="flex justify-center text-2xl w-full mb-16">
      {splitSentence.map((word, index) =>
        word === "~" ? (
          <span
            key={index}
            className="flex justify-center align-center bg-gray/50 rounded-xl mx-2 w-16 min-w-fit pb-3 border-2 border-gray/50 h-10 text-2xl "
          >
            {fillWord && (
              <BuildWord
                id={fillWordId}
                disabled={false}
                word={fillWord}
                onClick={onClick}
              />
            )}
          </span>
        ) : (
          <span key={index}>{word}</span>
        )
      )}
    </div>
  );
};
export default BlankSentence;
