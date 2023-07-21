"use client";
import { useState, useEffect, useCallback } from "react";
import ProgressTopBar from "@/components/ui/ProgressTopBar";
import ReviewCard from "@/components/cards/ReviewCard";
import Button from "@/components/ui/Button";
import { PiShuffleBold } from "react-icons/pi";
import { BsArrowRightShort } from "react-icons/bs";
import { BsArrowLeftShort } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import shuffle from "@/utils/shuffle";
import { getCardSet } from "@/app/store/cards";
import { Card } from "@/types";
import { useRouter } from "next-intl/client";

interface SetReviewPage {
  params: {
    setId: string;
  };
}

const SetReviewPage: React.FC<SetReviewPage> = ({ params }) => {
  const { setId } = params;
  const router = useRouter();
  const [reviewCards, setReviewCards] = useState<null | Card[]>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const {
    isLoading,
    error,
    data: cardSet,
  } = useQuery({
    queryKey: ["cardSet", setId],
    queryFn: () => getCardSet(setId),
    onSuccess: (data) => setReviewCards(data.cards),
  });

  useEffect(() => {
    setIsFlipped(false);
  }, [reviewCards]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();
      if (event.code === "Space") {
        setIsFlipped((isFlipped) => !isFlipped);
      }
      if (event.code === "ArrowLeft") {
        handlePreviousCard();
      }
      if (event.code === "ArrowRight") {
        handleNextCard();
      }
    },
    [currentCardIndex, isFlipped]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !cardSet) {
    return;
  }

  if (!reviewCards) {
    return;
  }

  const shuffleCards = () => {
    const remainingCards = reviewCards.slice(currentCardIndex);
    shuffle(remainingCards);
    if (remainingCards.length < reviewCards.length) {
      const pastCards = reviewCards.slice(0, currentCardIndex);
      setReviewCards(pastCards.concat(remainingCards));
      return;
    }
    setReviewCards(remainingCards);
  };

  const handleFlip = () => {
    setIsFlipped((isFlipped) => !isFlipped);
  };

  const handleNextCard = () => {
    if (currentCardIndex === reviewCards.length - 1) {
      router.push(`/cards/sets/${setId}`);
      return;
    }
    setIsFlipped(false);
    setCurrentCardIndex((prev) => prev + 1);
  };

  const handlePreviousCard = () => {
    if (currentCardIndex === 0) {
      return;
    }
    setIsFlipped(false);
    setCurrentCardIndex((prev) => prev - 1);
  };

  return (
    <div className="container min-h-fit h-full lg:max-w-4xl">
      <ProgressTopBar
        closeLink={`/cards/sets/${setId}`}
        current={currentCardIndex + 1}
        total={reviewCards.length}
      />
      <div className="flex flex-col justify-center h-full">
        <div className="my-5 w-full flex items-center">
          <ReviewCard
            front={reviewCards[currentCardIndex].frontText}
            back={reviewCards[currentCardIndex].backText}
            isFlipped={isFlipped}
            handleFlip={handleFlip}
          />
        </div>
        <div>
          <Button
            onClick={shuffleCards}
            rounding="rounded-full"
            className=" bg-transparent shadow-none border-2 p-1 hover:bg-grayLight active:bg-gray/50"
          >
            <PiShuffleBold size={24} />
          </Button>
        </div>
        <div className=" w-full  flex justify-center items-center">
          <div className="flex justify-between gap-20">
            <Button
              disabled={currentCardIndex === 0}
              onClick={handlePreviousCard}
              rounding="rounded-lg rounded-l-3xl"
              color="bg-primary400"
              className="text-white"
            >
              <BsArrowLeftShort size={40} />
            </Button>
            <Button
              onClick={handleNextCard}
              rounding="rounded-lg rounded-r-3xl"
              color="bg-primary400"
              className="text-white"
            >
              <BsArrowRightShort
                size={40}
                color="bg-primary400"
                className="text-white"
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SetReviewPage;
