"use client";
import Link from "next/link";
import { IoMdArrowDropright } from "react-icons/io";
import CardSet from "@/components/cards/CardSet";
// import SearchBar from "@/components/ui/SearchBar";
import { CardSet as CardSetType } from "@/types";
import { usePathname } from "next/navigation";

interface DiscoverSetsSectionProps {
  count: number;
  cardSets: CardSetType[];
}
const DiscoverSetsSection: React.FC<DiscoverSetsSectionProps> = ({
  count,
  cardSets,
}) => {
  const pathname = usePathname();

  return (
    <section>
      <div className="items-center flex flex-col gap-2 xs:flex-row justify-between">
        <Link href={`/cards/discover`} className="w-fit">
          <h1 className="text-2xl font-bold flex items-center">
            <span>Discover</span>
            <span className="ml-2 text-base font-normal">{count}</span>
            <IoMdArrowDropright
              size={20}
              className="relative top-[1.5px] text-primary400"
            />
          </h1>
        </Link>
      </div>

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
      {pathname !== "/cards/discover" && (
        <div className="flex justify-center">
          <Link
            href={`/cards/discover`}
            className="bg-white mt-5 border-2 border-primary400 text-primary500 w-fit text-center p-1 px-5 rounded-full font-medium"
          >
            See all
          </Link>
        </div>
      )}
    </section>
  );
};
export default DiscoverSetsSection;
