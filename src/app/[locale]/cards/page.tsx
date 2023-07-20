"use client";
import { useSession } from "next-auth/react";
import { useCourse } from "@/hooks/useCourse";
import { useQuery } from "@tanstack/react-query";
import { getUserSets, getDiscoverSets } from "@/app/store/cards";
import MySetsSection from "@/components/cards/MySetsSection";
import DiscoverSetsSection from "@/components/cards/DiscoverSetsSection";

const CardsPage = () => {
  const { data: session, status } = useSession();
  const { courses, course } = useCourse();

  const userSets = useQuery({
    queryKey: ["userSets"],
    queryFn: () => getUserSets(course!.id, 6),
  });

  const discoverSets = useQuery({
    queryKey: ["discoverSets"],
    queryFn: () => getDiscoverSets(course!.id, 6),
  });

  if (userSets.isLoading || discoverSets.isLoading) {
    return <div>Loading...</div>;
  }

  if (!userSets.data || !discoverSets.data) {
    return;
  }

  return (
    <div className="container h-full pt-5 max-w-5xl">
      {session?.user && userSets.data && (
        <>
          <MySetsSection
            count={userSets.data.count}
            cardSets={userSets.data.sets}
          />
          <div className="w- bg-gray h-[1px] rounded-full my-8"></div>
        </>
      )}
      <DiscoverSetsSection
        count={discoverSets.data.count}
        cardSets={discoverSets.data.sets}
      />
    </div>
  );
};
export default CardsPage;
