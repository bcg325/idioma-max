export const formatFillBlankAnswer = (sentence: string, answer: string) => {
  const tempSentence = sentence.trim().split(" ");
  const delimiterIndex = tempSentence.indexOf("~");

  tempSentence.splice(delimiterIndex, 1, answer);
  return tempSentence.join(" ");
};
