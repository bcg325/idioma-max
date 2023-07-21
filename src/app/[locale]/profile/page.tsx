"use client";
import { useSession, signOut } from "next-auth/react";
import Button from "@/components/ui/Button";
import Auth from "@/components/auth/Auth";
const ProfilePage = () => {
  const { data: session, status } = useSession();
  const user = session?.user;

  return (
    <Auth>
      <div className="container h-full pt-5 max-w-5xl">
        <div className="w-full flex flex-col items-center">
          <h1 className="text-2xl font-bold">Profile</h1>
          <p>
            Logged in as <span className="font-medium">{user?.name}</span>
          </p>
          <p>{user?.email}</p>
          <Button className="text-white" onClick={() => signOut()}>
            Log out
          </Button>
        </div>
      </div>
    </Auth>
  );
};

export default ProfilePage;
