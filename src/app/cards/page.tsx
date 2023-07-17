"use client";
import { useSession } from "next-auth/react";
import { useCourse } from "@/hooks/useCourse";
import { useQuery } from "@tanstack/react-query";
import { getCardSets } from "../store/cards";
import MySetsSection from "@/components/cards/MySetsSection";
import DiscoverSetsSection from "@/components/cards/DiscoverSetsSection";

const CardsPage = () => {
  const { data: session, status } = useSession();
  const { courses, course } = useCourse();

  if (!course) {
    return <div>Loading...</div>;
  }

  const cardSets = useQuery({
    queryKey: ["cardSets", session?.user.id, course.id],
    queryFn: () => getCardSets(course.id),
    refetchOnMount: false,
  });

  if (cardSets.isLoading) {
    return <div>Loading...</div>;
  }

  if (!cardSets.data) {
    return;
  }

  return (
    <div className="container h-full pt-5 max-w-5xl">
      {cardSets.data.userSets && (
        <>
          <MySetsSection cardSets={cardSets.data.userSets} />
          <div className="w- bg-gray h-[1px] rounded-full my-8"></div>
        </>
      )}

      {cardSets.data.discoverSets && (
        <DiscoverSetsSection cardSets={cardSets.data.discoverSets} />
      )}
    </div>
  );
};
export default CardsPage;
