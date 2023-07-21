"use client";
import { useSession, signOut } from "next-auth/react";
import Button from "@/components/ui/Button";
import Auth from "@/components/auth/Auth";
import { useQuery } from "@tanstack/react-query";
import { useCourse } from "@/hooks/useCourse";
import { getUserProgressPercent } from "@/app/store/courses";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const { courses, course } = useCourse();

  const userProgress = useQuery({
    queryKey: ["courseProgress", session?.user.id, course!.id, "percent"],
    queryFn: () => getUserProgressPercent(course!.id),
    enabled: status === "authenticated" && !!session.user && !!course,
    refetchOnMount: false,
  });

  console.log(userProgress.data);
  if (userProgress.isLoading) {
    return;
  }

  if (!userProgress.data) {
    return;
  }
  return (
    <Auth>
      <div className="container pt-5 max-w-5xl">
        <div className="w-full flex flex-col ">
          <h1 className="text-2xl font-bold">{user?.name}</h1>
          <p>{user?.email}</p>
          <div className="my-6 border-2 border-gray rounded-lg p-5 shadow-md">
            <span className="text-sm font-normal">Course Progress</span>
            <h3 className="text-xl font-semibold">{course?.name}</h3>
            <div className="my-3">
              <h4 className="text-lg font-medium">Lessons</h4>
              <p>
                {userProgress.data.completed} completed /{" "}
                {userProgress.data.total} total
              </p>
              <div className="my-3 bg-gray/60 rounded-full h-2">
                <div
                  className="bg-primary300 h-full rounded-full transition ease-in "
                  style={{ width: `${userProgress.data.percent * 100}%` }}
                ></div>
              </div>
            </div>
            {userProgress.data.lastCompletedDate && (
              <div className="mt-3">
                <h4 className="text-lg font-medium">Last Completed</h4>
                <p>
                  {new Date(userProgress.data.lastCompletedDate).toDateString()}
                </p>
              </div>
            )}
          </div>

          <Button className="text-white w-44 mt-1" onClick={() => signOut()}>
            Log out
          </Button>
        </div>
      </div>
    </Auth>
  );
};

export default ProfilePage;
