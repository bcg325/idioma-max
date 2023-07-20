"use client";

import DiscoverSetsSection from "@/components/cards/DiscoverSetsSection";
import { useQuery } from "@tanstack/react-query";
import { getDiscoverSets } from "@/app/store/cards";

import { useCourse } from "@/hooks/useCourse";
const DiscoverPage = () => {
  const { courses, course } = useCourse();
  const discoverSets = useQuery({
    queryKey: ["discoverSets", "all"],
    queryFn: () => getDiscoverSets(course!.id),
  });

  if (discoverSets.isLoading) {
    return <div>Loading...</div>;
  }

  if (!discoverSets.data) {
    return;
  }

  return (
    <div className="container h-full pt-5 max-w-5xl">
      <DiscoverSetsSection
        count={discoverSets.data.count}
        cardSets={discoverSets.data.sets}
      />
    </div>
  );
};
export default DiscoverPage;
