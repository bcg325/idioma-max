"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Error from "@/components/ui/Error";
import Link from "next-intl/link";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
import { toast } from "react-hot-toast";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const t = useTranslations("Auth");
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

    try {
      t("signedUp");
    } catch (err) {
      notFound();
    }

    if (!res.ok) {
      setServerError(resData.message);
    }
    if (res.ok) {
      toast.success(t("signedUp"));
    }
  });

  return (
    <div className="py-5">
      <div className="bg-white mx-auto w-10/12 xs:w-96 flex flex-col gap-3 border-2 border-gray/50 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-dark text-center">
          {t("signup")}
        </h1>
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
              label={t("name")}
              error={!!errors?.name?.message}
              {...register("name", {
                required: t("nameRequired"),
                maxLength: {
                  value: 50,
                  message: t("nameInvalid"),
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
            {t("signup")}
          </Button>
          <span>
            {t("haveAccount")}
            <Link
              href="/login"
              className="underline text-dark font-medium ml-2"
            >
              {t("login")}
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
export default SignUp;
