import { CardSet } from "@/types";
interface CardSetsData {
  [key: string]: CardSet[];
}

export const getCardSets = async (courseId: string) => {
  const cardSets = await fetch(`/api/courses/${courseId}/card-sets`);
  const data = await cardSets.json();
  return data as CardSetsData;
};

export const getCardSet = async (cardSetId: string) => {
  const cardSet = await fetch(`/api/card-sets/${cardSetId}`);
  const data = await cardSet.json();
  return data as CardSet;
};
