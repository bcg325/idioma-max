import Image from "next/image";
import Button from "@/components/ui/Button";
import { FiPlus } from "react-icons/fi";
import { BsFillPlayFill } from "react-icons/bs";
import { TbCards } from "react-icons/tb";
import { BsThreeDots } from "react-icons/bs";
import Link from "next/link";
import Card from "@/components/cards/Card";
import Sort from "@/components/ui/Sort";

import { useRef } from "react";

const setData = {
  id: "1",
  title: "Days of the week",
  imageUrl: "/language.jpg",
  cards: [
    { id: "1", frontText: "Lunes", backText: "Monday" },
    { id: "2", frontText: "Martes", backText: "Tuesday" },
    { id: "3", frontText: "Miercoles", backText: "Wednesday" },
    { id: "4", frontText: "Jueves", backText: "Thursday" },
    { id: "5", frontText: "Viernes", backText: "Friday" },
    { id: "6", frontText: "Sabado", backText: "Saturday" },
    { id: "7", frontText: "Domingo", backText: "Sunday" },
  ],
};
const SetPage = () => {
  return (
    <div className="container h-full pt-7 lg:max-w-4xl">
      <div className="flex flex-col items-center gap-3">
        <Image
          src={setData.imageUrl}
          width={150}
          height={150}
          alt="cardSet photo"
          className="rounded-xl"
        />
        <div className="text-center">
          <h1 className="text-2xl font-bold">{setData.title}</h1>
          <span className="flex items-center justify-center gap-2">
            <TbCards size={20} />
            {setData.cards.length} cards
          </span>
        </div>
      </div>
      <div className="flex gap-2 my-2">
        <div className="flex gap-2">
          <Link
            // rounding="rounded-2xl"
            href={`/cards/sets/${setData.id}/review`}
            className="bg-secondary400 rounded-2xl flex items-center gap-2 text-white px-4"
          >
            <BsFillPlayFill size={20} className="relative left-[1px]" />
            <span>Review</span>
          </Link>
          <Button className="text-black bg-transparent shadow-none hover:bg-gray/20 transition delay-50 ease-in-out">
            <BsThreeDots size={24} />
          </Button>
          {/* <Sort options={["A-Z", ""]} /> */}
        </div>
      </div>
      <div>
        <Button
          color="white border-2 border-primary500"
          rounding="rounded-3xl"
          className="text-primary500 w-full text-md rounded-3xl py-1 "
        >
          <div className="flex items-center justify-center space-x-2 ">
            <FiPlus size={22} className="" />
            <span>New Card</span>
          </div>
        </Button>
      </div>
      <div className="flex flex-col gap-3 mt-6">
        {setData.cards.map((card) => (
          <Card front={card.frontText} back={card.backText} />
        ))}
      </div>
    </div>
  );
};
export default SetPage;
