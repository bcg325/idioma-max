"use client";
import CardSet from "@/components/cards/CardSet";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import { IoMdArrowDropright } from "react-icons/io";
import SearchBar from "@/components/ui/SearchBar";
import { useRef } from "react";

const user = {
  id: "22134",
  cardSets: [
    {
      id: "1",
      title: "Days of the week",
      cards: 7,
      imageUrl: "/language.jpg",
    },
    {
      id: "2",
      title: "Most common words",
      cards: 40,
      imageUrl: "/language.jpg",
    },
    {
      id: "3",
      title: "Times of the day",
      cards: 4,
      imageUrl: "/language.jpg",
    },
    {
      id: "4",
      title: "Numbers",
      cards: 100,
      imageUrl: "/language.jpg",
    },
    {
      id: "5",
      title: "School words",
      cards: 30,
      imageUrl: "/language.jpg",
    },
  ],
};

const discoverSets = [
  {
    id: "1",
    title: "Days of the week",
    cards: 7,
    imageUrl: "/language.jpg",
  },
  {
    id: "2",
    title: "Most common words",
    cards: 40,
    imageUrl: "/language.jpg",
  },
  {
    id: "3",
    title: "Times of the day",
    cards: 4,
    imageUrl: "/language.jpg",
  },
  {
    id: "4",
    title: "Numbers",
    cards: 100,
    imageUrl: "/language.jpg",
  },
  {
    id: "5",
    title: "School words",
    cards: 30,
    imageUrl: "/language.jpg",
  },
];

const CardsPage = () => {
  const searchRef = useRef("");

  const handleNewSet = () => {
    alert("New set modal");
  };
  return (
    <div className=" h-full pt-5">
      <div className=" container">
        <div className="w-fit">
          <Link href={`/cards/sets/user/${user.id}`}>
            <h1 className="text-2xl font-bold flex items-center ">
              <span>My Sets</span>
              <span className="ml-2 text-base font-normal">
                {user.cardSets.length}
              </span>
              <IoMdArrowDropright
                size={20}
                className="relative top-[1.5px] text-primary400"
              />
            </h1>
          </Link>
        </div>
        <div className="flex align-center justify-between my-2">
          {/* <SearchBar />
      <Filter /> */}
        </div>
        <Button
          onClick={handleNewSet}
          color=""
          rounding="rounded-3xl"
          className="text-white w-full text-md py-1 "
        >
          <div className="flex items-center justify-center space-x-2">
            <FiPlus size={22} className="" />
            <span>New Set</span>
          </div>
        </Button>
        <div className="grid grid-cols-1 gap-3 mt-5 sm:grid-cols-2 lg:grid-cols-3">
          {user.cardSets.slice(0, 4).map((cardSet) => (
            <CardSet
              id={cardSet.id}
              title={cardSet.title}
              cardCount={cardSet.cards}
              imageUrl={cardSet.imageUrl}
            />
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href={`/cards/sets/user/${user.id}`}
            className="bg-white mt-5 border-2 border-primary400 text-primary500  w-fit text-center p-1 px-5 rounded-full font-medium"
          >
            See all
          </Link>
        </div>
      </div>
      <div className="w- bg-gray h-[1px] rounded-full my-8"></div>
      <div className="container">
        <div className="w-fit">
          <Link href={`/cards/discover`}>
            <h1 className="text-2xl font-bold flex items-center">
              <span>Discover</span>
              <IoMdArrowDropright
                size={20}
                className="relative top-[1.5px] text-primary400"
              />
            </h1>
          </Link>
        </div>
        <div className="w-full mt-2">
          <SearchBar />
        </div>
        <div className="grid grid-cols-1 gap-3 mt-5 sm:grid-cols-2 lg:grid-cols-3">
          {discoverSets.map((cardSet) => (
            <CardSet
              id={cardSet.id}
              title={cardSet.title}
              cardCount={cardSet.cards}
              imageUrl={cardSet.imageUrl}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <Link
          href={`/cards/discover`}
          className="bg-white mt-5 border-2 border-primary400 text-primary500 w-fit text-center p-1 px-5 rounded-full font-medium"
        >
          See all
        </Link>
      </div>
    </div>
  );
};
export default CardsPage;
