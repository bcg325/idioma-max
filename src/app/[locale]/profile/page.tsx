"use client";
import { redirect } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Button from "@/components/ui/Button";
import Auth from "@/components/auth/Auth";
const ProfilePage = () => {
  const { data: session, status } = useSession();
  const user = session?.user;

  return (
    <Auth>
      <div>
        <h1>Logged in as</h1>
        <p>{user?.name}</p>
        <p>{user?.email}</p>
        <Button onClick={() => signOut()}>Log out</Button>
      </div>
    </Auth>
  );
};

export default ProfilePage;
