import { BsThreeDots } from "react-icons/bs";
import Button from "../ui/Button";
interface CardProps {
  front: string;
  back: string;
  favorite?: boolean;
}

const Card: React.FC<CardProps> = ({ front, back, favorite }) => {
  return (
    <div className="bg-white border-2 border-gray rounded-xl py-2 p-4">
      <div className="flex justify-between">
        <h3 className="line-clamp-1 text-lg font-semibold text-dark line-clamp-1 ">
          {front}
        </h3>
        <Button className="bg-white shadow-none hover:bg-gray/20 transition delay-50 ease-in-out">
          <BsThreeDots size={20} />
        </Button>
      </div>
      <div className="h-[1.75px] w-full bg-gray/30 rounded-full my-1"></div>
      <p className="line-clamp-1">{back}</p>
    </div>
  );
};
export default Card;
