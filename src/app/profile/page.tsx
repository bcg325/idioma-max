"use client";
import { redirect } from "next/navigation";
import { getSession, signOut } from "next-auth/react";
import Button from "@/components/ui/Button";
import Auth from "@/components/auth/Auth";
const ProfilePage = async () => {
  const session = await getSession();

  const user = session?.user;

  //use session seems the correct way on client side
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
