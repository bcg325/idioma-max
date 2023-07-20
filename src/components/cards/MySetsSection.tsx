"use client";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { FiPlus } from "react-icons/fi";
import { IoMdArrowDropright } from "react-icons/io";
import CardSet from "@/components/cards/CardSet";
import { CardSet as CardSetType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCardSet } from "@/app/store/cards";
import { useCourse } from "@/hooks/useCourse";
import { usePathname } from "next/navigation";

interface MySetsSectionProps {
  count: number;
  cardSets: CardSetType[];
  fullPage?: boolean;
}

const MySetsSection: React.FC<MySetsSectionProps> = ({ count, cardSets }) => {
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { courses, course } = useCourse();

  const newSetMutation = useMutation({
    mutationFn: () => createCardSet(course!.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userSets"],
      });
    },
  });

  const handleNewSet = () => {
    newSetMutation.mutate();
  };

  return (
    <section>
      <div className="flex flex-col gap-2 xs:flex-row justify-between">
        <Link className="w-fit" href={`/cards/my-sets`}>
          <h1 className="text-2xl font-bold flex items-center ">
            <span>My Sets</span>
            <span className="ml-2 text-base font-normal">{count}</span>
            <IoMdArrowDropright
              size={20}
              className="relative top-[1.5px] text-primary400"
            />
          </h1>
        </Link>

        <Button
          onClick={handleNewSet}
          color=""
          rounding="rounded-3xl"
          className="text-white w-full xs:w-40 text-md py-1 "
        >
          <div className="flex items-center justify-center space-x-2">
            <FiPlus size={22} className="" />
            <span>New Set</span>
          </div>
        </Button>
      </div>
      {cardSets.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 mt-5 sm:grid-cols-2 lg:grid-cols-3">
          {cardSets.map((cardSet) => (
            <CardSet
              key={cardSet.id}
              id={cardSet.id}
              title={cardSet.name}
              cardCount={cardSet._count.cards}
              imageUrl={cardSet.imageUrl || "/placeholder.jpg"}
            />
          ))}
        </div>
      ) : (
        <div className="mt-5">No card sets</div>
      )}
      {pathname !== "/cards/my-sets" && (
        <div className="flex justify-center">
          <Link
            href={`/cards/my-sets`}
            className="bg-white mt-5 border-2 border-primary400 text-primary500  w-fit text-center p-1 px-5 rounded-full font-medium"
          >
            See all
          </Link>
        </div>
      )}
    </section>
  );
};
export default MySetsSection;
