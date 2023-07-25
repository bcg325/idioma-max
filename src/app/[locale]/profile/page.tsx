"use client";
import { useSession, signOut } from "next-auth/react";
import Button from "@/components/ui/Button";
import Auth from "@/components/auth/Auth";
import { useQuery } from "@tanstack/react-query";
import { useCourse } from "@/hooks/useCourse";
import { getUserProgressPercent } from "@/app/store/courses";
import Loading from "@/components/ui/Loading";
import { useTranslations } from "next-intl";

const ProfilePage = () => {
  const t = useTranslations("Profile");
  const { data: session, status } = useSession();
  const user = session?.user;
  const { courses, course } = useCourse();

  const userProgress = useQuery({
    queryKey: ["courseProgress", session?.user.id, course!.id, "percent"],
    queryFn: () => getUserProgressPercent(course!.id),
    enabled: status === "authenticated" && !!session.user && !!course,
    refetchOnMount: false,
  });

  const handleSignOut = () => {
    signOut({ callbackUrl: "/login" });
  };

  if (userProgress.isLoading) {
    return <Loading />;
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
            <span className="text-sm font-normal">{t("courseProgress")}</span>
            <h3 className="text-xl font-semibold">{course?.name}</h3>
            <div className="my-3">
              <h4 className="text-lg font-medium">{t("lessons")}</h4>
              <p>
                {userProgress.data.completed} {t("completed")} /{" "}
                {userProgress.data.total} {t("total")}
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
                <h4 className="text-lg font-medium">{t("lastCompleted")}</h4>
                <p>
                  {new Date(
                    userProgress.data.lastCompletedDate
                  ).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>

          <Button className="text-white w-44 mt-1" onClick={handleSignOut}>
            {t("logOut")}
          </Button>
        </div>
      </div>
    </Auth>
  );
};

export default ProfilePage;
