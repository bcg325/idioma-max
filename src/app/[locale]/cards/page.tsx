"use client";
import { useSession } from "next-auth/react";
import { useCourse } from "@/hooks/useCourse";
import { useQuery } from "@tanstack/react-query";
import { getUserSets, getDiscoverSets } from "@/app/store/cards";
import MySetsSection from "@/components/cards/MySetsSection";
import DiscoverSetsSection from "@/components/cards/DiscoverSetsSection";
import Loading from "@/components/ui/Loading";

const CardsPage = () => {
  const { data: session, status } = useSession();
  const { courses, course } = useCourse();

  const userSets = useQuery({
    queryKey: ["userSets"],
    queryFn: () => getUserSets(course!.id, 9),
  });

  const discoverSets = useQuery({
    queryKey: ["discoverSets"],
    queryFn: () => getDiscoverSets(course!.id, 12),
  });

  if (userSets.isLoading && discoverSets.isLoading) {
    return <Loading />;
  }

  if (!userSets.data && !discoverSets.data) {
    return;
  }

  return (
    <div className="container h-full pt-5 max-w-5xl">
      {session && userSets?.data && (
        <>
          <MySetsSection
            count={userSets.data.count}
            cardSets={userSets.data.sets}
          />
          <div className="w- bg-gray h-[1px] rounded-full my-8"></div>
        </>
      )}
      {discoverSets.data && (
        <DiscoverSetsSection
          count={discoverSets.data.count}
          cardSets={discoverSets.data.sets}
        />
      )}
    </div>
  );
};
export default CardsPage;
