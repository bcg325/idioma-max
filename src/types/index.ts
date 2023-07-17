export type Exercise = {
  id: string;
  term: string;
  answer: string;
  options: string[];
  imageUrl?: string;
  readingPageId?: string;
  exerciseType: {
    name: string;
  };
};

export type Lesson = {
  id: string;
  name: string;
  description: string;
  status?: string;
  exercises?: Exercise[];
};

export type Unit = {
  id: string;
  name: string;
  description?: string;
  lessons: Lesson[];
};

export type Course = {
  id: string;
  name: string;
  description?: string;
  fromLanguageId?: string;
  learningLanguageId?: string;
  units: Unit[];
};

export type CardSet = {
  id: string;
  name: string;
  imageUrl?: string;
  _count: {
    cards: number;
  };
  cards: Card[];
};

export type Card = {
  id: string;
  frontText: string;
  backText: string;
};
