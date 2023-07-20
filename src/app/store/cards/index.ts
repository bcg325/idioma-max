import axios from "axios";
import { CardSet } from "@/types";
interface CardSetsData {
  [key: string]: CardSet[];
}

export const getUserSets = async (courseId: string, limit?: number) => {
  const userSets = await axios.get(
    `/api/courses/${courseId}/card-sets/user/${limit ? "?limit=" + limit : ""}`
  );
  return userSets.data;
};

export const getDiscoverSets = async (courseId: string, limit?: number) => {
  const discoverSets = await axios.get(
    `/api/courses/${courseId}/card-sets/discover/${
      limit ? "?limit=" + limit : ""
    }`
  );
  return discoverSets.data;
};

export const getCardSet = async (setId: string) => {
  const cardSet = await axios.get(`/api/card-sets/${setId}`);
  return cardSet.data as CardSet;
};

export const createCardSet = async (courseId: string) => {
  const cardSet: { id: string } = await axios.post("/api/card-sets", {
    courseId,
  });
  return cardSet.id;
};

export const deleteCardSet = async (setId: string) => {
  const res = await axios.delete(`/api/card-sets/${setId}`);
  return res.data;
};

export const updateCardSet = async (setId: string, setName: string) => {
  const res = await axios.patch(`/api/card-sets/${setId}`, {
    setName,
  });
  return res.data;
};

export const saveCardSet = async (setId: string) => {
  const res = await axios.post(`/api/card-sets/${setId}/save`);
  return res.data;
};
export const unsaveCardSet = async (setId: string) => {
  const res = await axios.delete(`/api/card-sets/${setId}/save`);
  return res.data;
};

export const createCard = async (
  setId: string,
  frontText: string,
  backText: string
) => {
  const card = await axios.post(`/api/card-sets/${setId}/cards`, {
    frontText,
    backText,
  });

  return card.data;
};

export const deleteCard = async (setId: string, cardId: string) => {
  const deletedCard = await axios.delete(
    `/api/card-sets/${setId}/cards/${cardId}`
  );
  return deletedCard.data;
};

export const editCard = async (
  setId: string,
  cardId: string,
  frontText: string,
  backText: string
) => {
  const editedCard = await axios.patch(
    `/api/card-sets/${setId}/cards/${cardId}`,
    {
      frontText,
      backText,
    }
  );

  return editedCard.data;
};
