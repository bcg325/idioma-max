export type Exercise = {
  id: string;
  term: string;
  termLang?: string;
  answer: string;
  options: string[];
  optionsLang?: string;
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
  unit?: Unit;
};

export type Unit = {
  id: string;
  name: string;
  description?: string;
  courseId?: string;
  lessons: Lesson[];
};

export type Course = {
  id: string;
  name: string;
  description?: string;
  fromLanguage: {
    locale: string;
  };
  fromLanguageId?: string;
  learningLanguageId?: string;
  units: Unit[];
};

export type CardSet = {
  id: string;
  creatorId: string;
  name: string;
  imageUrl?: string;
  _count: {
    cards: number;
  };
  cards: Card[];
  saved?: boolean;
};

export type Card = {
  id: string;
  frontText: string;
  backText: string;
};
