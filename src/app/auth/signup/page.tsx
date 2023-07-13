"use client";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Error from "@/components/ui/Error";
import Link from "next/link";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async (data) => {
    setServerError("");
    setIsLoading(true);

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(data),
    });

    setIsLoading(false);
    const resData = await res.json();

    if (!res.ok) {
      setServerError(resData.message);
    }
    if (res.ok) {
      toast.success("Signed up successfully!");
    }
  });

  return (
    <div>
      <div className="bg-white mx-auto w-10/12 xs:w-96 flex flex-col gap-3 border-2 border-grayLight rounded-lg shadow-xl p-6">
        <h1 className="text-3xl font-bold text-dark text-center">Sign Up</h1>
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-4 items-center mt-2"
        >
          {serverError && <Error message={serverError} />}
          <div className="w-full">
            <Input
              id="name"
              className="w-full"
              type="text"
              label="Name"
              error={!!errors?.name?.message}
              {...register("name", {
                required: "Name is required",
                maxLength: {
                  value: 50,
                  message: "Name must be fewer than 50 characters",
                },
              })}
            />
            {errors?.name?.message && <Error message={errors.name.message} />}
          </div>
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
          <Button className="w-full text-white bg-secondary400">Sign Up</Button>
          <span>
            Have an account already?
            <Link
              href="/auth/login"
              className="underline text-dark font-medium ml-2"
            >
              Log In
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
export default SignUp;
