"use client";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { notFound, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Error from "@/components/ui/Error";
import Link from "next-intl/link";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
import { toast } from "react-hot-toast";
import { useTranslations } from "next-intl";
import { useRouter } from "next-intl/client";

type FormData = {
  email: string;
  password: string;
};

const LogIn = () => {
  const session = useSession();
  const router = useRouter();
  const t = useTranslations("Auth");
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
      router.push("/");
    }
  });

  const onSubmit = handleSubmit(async (data) => {
    setServerError("");
    setIsLoading(true);

    const signInResult = await signIn("credentials", {
      ...data,
      redirect: false,
      callbackUrl: "/",
    });

    setIsLoading(false);

    if (signInResult?.error) {
      setServerError(signInResult.error);
      return;
    }

    toast.success(t("loggedIn"));
  });

  return (
    <div className="py-10">
      <div className="bg-white mx-auto w-10/12 xs:w-96 flex flex-col gap-3 border-2 border-gray/50 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-dark text-center">
          {t("login")}
        </h1>
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
              label={t("email")}
              error={!!errors?.email?.message}
              {...register("email", {
                required: t("emailRequired"),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t("emailInvalid"),
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
              label={t("password")}
              error={!!errors?.password?.message}
              {...register("password", {
                required: t("passwordRequired"),
                minLength: {
                  value: 8,
                  message: t("passwordInvalid"),
                },
              })}
            />
            {errors?.password?.message && (
              <Error message={errors.password.message} />
            )}
          </div>
          <Button className="w-full text-white bg-secondary400">
            {t("login")}
          </Button>
          <span>
            {t("noAccount")}
            <Link
              href="/signup"
              className="underline text-dark font-medium ml-2"
            >
              {t("signup")}
            </Link>
          </span>
        </form>
        <p className="text-center">{t("or")}</p>
        <div className="">
          <GoogleSignInButton text={t("google")} />
        </div>
      </div>
    </div>
  );
};
export default LogIn;
