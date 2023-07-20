"use client";
import MySetsSection from "@/components/cards/MySetsSection";
import { useQuery } from "@tanstack/react-query";
import { getUserSets } from "@/app/store/cards";
import { useSession } from "next-auth/react";
import { useCourse } from "@/hooks/useCourse";
import Auth from "@/components/auth/Auth";
const MySetsPage = () => {
  const { data: session, status } = useSession();
  const { courses, course } = useCourse();

  const userSets = useQuery({
    queryKey: ["userSets", "all"],
    queryFn: () => getUserSets(course!.id),
  });

  if (userSets.isLoading) {
    return <div>Loading...</div>;
  }

  if (!userSets.data) {
    return;
  }

  return (
    <Auth>
      <div className="container h-full pt-5 max-w-5xl">
        <MySetsSection
          count={userSets.data.count}
          cardSets={userSets.data.sets}
        />
      </div>
    </Auth>
  );
};
export default MySetsPage;
