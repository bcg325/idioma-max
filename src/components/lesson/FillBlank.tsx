import { UserAnswerContext } from "@/app/[locale]/course/lesson/[lessonId]/page";
import { useState, useContext, useEffect } from "react";
import useTTS from "@/hooks/useTTS";
import BuildWord from "./BuildWord";
import shuffle from "../../utils/shuffle";
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
  lang: string;
}

const FillBlank: React.FC<FillBlankProps> = ({
  sentence,
  options,
  answer,
  lang,
}) => {
  const [selectedWord, setSelectedWord] = useState<wordObjType | null>(null);
  const [wordList, setWordList] = useState<wordObjType[]>();
  const { userAnswer, setUserAnswer } = useContext(UserAnswerContext);
  const playSound = useTTS();

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
      playSound(clickedWord, lang);
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
