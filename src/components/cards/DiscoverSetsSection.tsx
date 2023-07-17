import Link from "next/link";
import { IoMdArrowDropright } from "react-icons/io";
import CardSet from "@/components/cards/CardSet";
import SearchBar from "@/components/ui/SearchBar";
import { CardSet as CardSetType } from "@/types";

interface DiscoverSetsSectionProps {
  cardSets: CardSetType[];
}
const DiscoverSetsSection: React.FC<DiscoverSetsSectionProps> = ({
  cardSets,
}) => {
  return (
    <section>
      <div className="items-center flex flex-col gap-2 xs:flex-row justify-between">
        <Link href={`/cards/discover`} className="w-fit">
          <h1 className="text-2xl font-bold flex items-center">
            <span>Discover</span>
            <IoMdArrowDropright
              size={20}
              className="relative top-[1.5px] text-primary400"
            />
          </h1>
        </Link>

        <div className="w-full xs:w-80">
          <SearchBar />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 mt-5 sm:grid-cols-2 lg:grid-cols-3">
        {cardSets.slice(0, 4).map((cardSet) => (
          <CardSet
            id={cardSet.id}
            title={cardSet.name}
            cardCount={cardSet._count.cards}
            imageUrl={cardSet.imageUrl || "/placeholder.jpg"}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <Link
          href={`/cards/discover`}
          className="bg-white mt-5 border-2 border-primary400 text-primary500 w-fit text-center p-1 px-5 rounded-full font-medium"
        >
          See all
        </Link>
      </div>
    </section>
  );
};
export default DiscoverSetsSection;
