"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Auth = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login");
    },
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
};
export default Auth;
