import Image from "next/image";
import Link from "next-intl/link";
import { TbCards } from "react-icons/tb";

interface CardSetType {
  id: string;
  title: string;
  cardCount: number;
  imageUrl: string;
}

const CardSet: React.FC<CardSetType> = ({ id, title, cardCount, imageUrl }) => {
  return (
    <Link
      href={`/cards/sets/${id}`}
      className="bg-white w-full border-2 border-gray/80 rounded-xl p-2 flex gap-3 shadow-md"
    >
      <Image
        src={imageUrl || "/placeholder.jpg"}
        alt="Card Set Image"
        width={60}
        height={60}
        className="rounded-md"
      />
      <div className="flex flex-col justify-between">
        <h3 className="line-clamp-1 text-lg font-semibold">{title}</h3>
        <div className="flex items-center gap-1">
          <TbCards size={16} />
          <span className="text-sm">{cardCount}</span>
        </div>
      </div>
    </Link>
  );
};
export default CardSet;
