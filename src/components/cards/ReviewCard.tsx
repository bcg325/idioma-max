"use client";
interface ReviewCardProps {
  front: string;
  back: string;
  isFlipped: boolean;
  handleFlip: () => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  front,
  back,
  isFlipped,
  handleFlip,
}) => {
  return (
    <div
      onClick={handleFlip}
      className={`
      cursor-pointer
      border-2
      p-3 
      rounded-2xl 
      flex 
      items-center 
      justify-center 
      border-grayDark/80
      h-[23rem]
      max-h-full
      w-full
      shadow-xl
      text-center
      transition-all 
      duration-300
      [perspective:1000px]
      [transform-style:preserve-3d]
      rotate-0
      ${
        isFlipped ? "[transform:rotateY(180deg)] " : "[transform:rotateY(0deg)]"
      }
      `}
    >
      <div
        className={`
        h-full w-full
        [backface-visibility:hidden]
        flex flex-col items-center justify-center
        [transform-style:preserve-3d]
        transition-all 
        duration-300
        ${
          isFlipped
            ? "[transform:rotateY(180deg)]"
            : "[transform:rotateY(0deg)]"
        }
      `}
      >
        {isFlipped ? (
          <div
            className={`flex flex-col h-full w-full
         `}
          >
            <h1 className="text-xl font-medium w-full h-fit  pb-2 mt-1 mb-2 ">
              {front}
            </h1>
            <div className="flex w-full items-center justify-center flex-1">
              <h2 className="relative bottom-6 text-3xl font-semibold">
                {back}
              </h2>
            </div>
          </div>
        ) : (
          <h1 className="text-3xl font-semibold ">{!isFlipped && front}</h1>
        )}
      </div>
    </div>
  );
};
export default ReviewCard;
