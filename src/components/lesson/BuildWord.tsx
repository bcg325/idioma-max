interface BuildWordProps {
  word: string;
  disabled: boolean;
  className?: string;
  id: number;
  onClick: (clickedWord: string, wordId: number) => void;
}

const BuildWord: React.FC<BuildWordProps> = ({
  word,
  disabled,
  className,
  id,
  onClick,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={() => onClick(word, id)}
      className={`
      py-1
      px-2
      border-2 
      rounded-xl
      h-fit
      text-lg
      ${className}
      ${
        disabled
          ? "bg-gray/50 border-gray/50 "
          : "bg-white   border-primary400/50 hover:bg-primary100/50 shadow-md "
      }
      `}
    >
      <span className={`${disabled ? "invisible" : "visible"}`}>{word}</span>
    </button>
  );
};
export default BuildWord;
