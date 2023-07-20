import { UserAnswerContext } from "@/app/[locale]/course/lesson/[lessonId]/page";
import { useState, useContext, useEffect } from "react";

import BuildWord from "./BuildWord";

interface BuildProps {
  options: string[];
}

type wordObjType = {
  word: string;
  chosen: boolean;
  id: number;
};

const Build: React.FC<BuildProps> = ({ options }) => {
  const { userAnswer, setUserAnswer } = useContext(UserAnswerContext);
  const [selectedWords, setSelectedWords] = useState<wordObjType[]>([]);
  const [wordList, setWordList] = useState<wordObjType[]>(
    options.map((option, index) => ({
      word: option,
      chosen: false,
      id: index,
    }))
  );

  const handleWordClick = (clickedWord: string, wordId: number) => {
    if (selectedWords.find((wordObj) => wordObj.id === wordId)) {
      setSelectedWords((selectedWords) =>
        selectedWords.filter((wordObj) => wordObj.id !== wordId)
      );

      setWordList((wordList) => {
        return wordList.map((wordObj) => {
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
      setSelectedWords((selectedWords) => [...selectedWords, newWordObj]);

      setWordList((wordList) => {
        return wordList.map((wordObj) => {
          if (wordObj.id === wordId) {
            return { ...wordObj, chosen: true };
          }
          return wordObj;
        });
      });
    }
  };

  useEffect(() => {
    const tempUserAnswer = Object.keys(selectedWords).map((key) => {
      const temp = selectedWords[parseInt(key)].word;
      return temp;
    });

    setUserAnswer(tempUserAnswer.join(" "));
  }, [selectedWords, setUserAnswer]);

  return (
    <div className="flex flex-col h-full w-full justify-center gap-6 max-w-lg  ">
      <div className="flex flex-wrap gap-1.5 py-1 px-4 justify-start items-center bg-gray/40 rounded-xl h-24 overflow-y-auto">
        {selectedWords.map((wordObj) => (
          <BuildWord
            key={wordObj.id}
            id={wordObj.id}
            disabled={false}
            word={wordObj.word}
            onClick={handleWordClick}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5 justify-center">
        {wordList.map((wordObj) => (
          <BuildWord
            key={wordObj.id}
            id={wordObj.id}
            disabled={wordObj.chosen}
            word={wordObj.word}
            onClick={handleWordClick}
          />
        ))}
      </div>
    </div>
  );
};
export default Build;
