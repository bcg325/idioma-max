"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Button from "@/components/ui/Button";

interface GoogleSignInButtonProps {
  text: string;
}
const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({ text }) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  return (
    <Button
      onClick={() => signIn("google")}
      className="w-full text-black bg-white border-2 border-grayLight"
    >
      {text}
    </Button>
  );
};
export default GoogleSignInButton;
