import { createContext, Dispatch, SetStateAction } from "react";

interface UserAnswerContextType {
  userAnswer: string;
  setUserAnswer: Dispatch<SetStateAction<string>>;
}

interface UserAnswerProviderProps {
  userAnswer: string;
  setUserAnswer: Dispatch<SetStateAction<string>>;
  children: React.ReactNode;
}
export const UserAnswerContext = createContext<UserAnswerContextType>({
  userAnswer: "",
  setUserAnswer: () => {},
});

const UserAnswerProvider: React.FC<UserAnswerProviderProps> = ({
  userAnswer,
  setUserAnswer,
  children,
}) => {
  return (
    <UserAnswerContext.Provider value={{ userAnswer, setUserAnswer }}>
      {children}
    </UserAnswerContext.Provider>
  );
};
export default UserAnswerProvider;
