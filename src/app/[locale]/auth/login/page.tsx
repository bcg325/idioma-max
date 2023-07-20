"use client";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Error from "@/components/ui/Error";
import Link from "next/link";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
import { toast } from "react-hot-toast";

type FormData = {
  email: string;
  password: string;
};

const LogIn = () => {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/course");
    }
  });

  const onSubmit = handleSubmit(async (data) => {
    setServerError("");
    setIsLoading(true);

    const signInResult = await signIn("credentials", {
      ...data,
      redirect: false,
      callbackUrl: searchParams?.get("from") || "/course",
    });

    setIsLoading(false);

    if (signInResult?.error) {
      setServerError(signInResult.error);
    }

    toast.success("Logged in successfully!");
  });

  return (
    <div>
      <div className="bg-white mx-auto w-10/12 xs:w-96 flex flex-col gap-3 border-2 border-grayLight rounded-lg shadow-xl p-6">
        <h1 className="text-3xl font-bold text-dark text-center">Login</h1>
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-4 items-center mt-2"
        >
          {serverError && <Error message={serverError} />}

          <div className="w-full">
            <Input
              id="email"
              className="w-full"
              type="email"
              label="Email"
              error={!!errors?.email?.message}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors?.email?.message && <Error message={errors.email.message} />}
          </div>
          <div className="w-full">
            <Input
              id="password"
              className="w-full"
              type="password"
              label="Password"
              error={!!errors?.password?.message}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters",
                },
              })}
            />
            {errors?.password?.message && (
              <Error message={errors.password.message} />
            )}
          </div>
          <Button className="w-full text-white bg-secondary400">Log In</Button>
          <span>
            Don&apos;t have an account?
            <Link
              href="/auth/signup"
              className="underline text-dark font-medium ml-2"
            >
              Sign Up
            </Link>
          </span>
        </form>
        <p className="text-center">or</p>
        <div className="">
          <GoogleSignInButton />
        </div>
      </div>
    </div>
  );
};
export default LogIn;
