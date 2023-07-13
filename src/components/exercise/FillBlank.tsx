import { UserAnswerContext } from "@/app/course/lesson/[lessonId]/page";
import { useState, useContext, useEffect } from "react";
import BuildWord from "./BuildWord";
import shuffle from "../utils/shuffle";
import BlankSentence from "./BlankSentence";

type wordObjType = {
  word: string;
  chosen: boolean;
  id: number;
};

interface FillBlankProps {
  sentence: string;
  options: string[];
  answer: string;
}

const FillBlank: React.FC<FillBlankProps> = ({ sentence, options, answer }) => {
  const [selectedWord, setSelectedWord] = useState<wordObjType | null>(null);
  const [wordList, setWordList] = useState<wordObjType[]>();
  const { userAnswer, setUserAnswer } = useContext(UserAnswerContext);

  useEffect(() => {
    const optionsCopy = [...options, answer];
    shuffle(optionsCopy);

    const arrOptionsCopy: wordObjType[] = optionsCopy.map((option, index) => ({
      word: option,
      chosen: false,
      id: index,
    }));

    setWordList(arrOptionsCopy);
  }, [options, answer]);

  const handleWordClick = (clickedWord: string, wordId: number) => {
    if (selectedWord && selectedWord.id !== wordId) {
      return;
    }

    if (selectedWord?.id === wordId) {
      setSelectedWord(null);
      setUserAnswer("");

      setWordList((wordList) => {
        return wordList?.map((wordObj) => {
          if (wordObj.id === wordId) {
            return { ...wordObj, chosen: false };
          }
          return wordObj;
        });
      });
    } else {
      const newWordObj: wordObjType = {
        word: clickedWord,
        chosen: true,
        id: wordId,
      };

      setSelectedWord(newWordObj);

      setUserAnswer(clickedWord);

      setWordList((wordList) => {
        return wordList?.map((wordObj) => {
          if (wordObj.id === wordId) {
            return { ...wordObj, chosen: true };
          }
          return wordObj;
        });
      });
    }
  };

  //   const blank = (
  //     <span
  //       key={selectedWord?.id}
  //       className="flex justify-center align-center bg-gray/50 rounded-xl mx-2 w-16 min-w-fit pb-3 border-2 border-gray/50 h-10 text-2xl "
  //     >
  //       {selectedWord && (
  //         <BuildWord
  //           id={selectedWord.id}
  //           disabled={false}
  //           word={selectedWord.word}
  //           onClick={handleWordClick}
  //         />
  //       )}
  //     </span>
  //   );

  //className="flex flex-col h-full w-full  gap-6 max-w-lg
  return (
    <>
      <BlankSentence
        sentence={sentence}
        fillWordId={selectedWord?.id as number}
        fillWord={selectedWord?.word}
        onClick={handleWordClick}
      />

      <div className="flex flex-wrap gap-1.5 justify-center align-center h-full w-full">
        {wordList?.map((wordObj) => (
          <BuildWord
            key={wordObj.id}
            id={wordObj.id}
            disabled={wordObj.chosen}
            word={wordObj.word}
            onClick={handleWordClick}
          />
        ))}
      </div>
    </>
  );
};
export default FillBlank;
