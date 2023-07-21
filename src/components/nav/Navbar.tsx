"use client";
import NavLink from "./NavLink";
import { usePathname } from "next-intl/client";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { BiLogIn } from "react-icons/bi";
import Link from "next-intl/link";
import Image from "next/image";

const Navbar = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const t = useTranslations("Nav");
  const { data: session, status } = useSession();
  const user = session?.user;

  const cardSetReviewPath = new RegExp("/cards/sets/\\w+/review");
  if (pathname.includes("/lesson/") || cardSetReviewPath.test(pathname)) {
    return children;
  }
  return (
    <div>
      <nav className="fixed bottom-0 z-20 w-full h-16 bg-primary400 text-white sm:sticky sm:top-0 sm:h-11 ">
        <div className="h-full sm:container flex sm:justify-between">
          <div className="hidden font-semibold text-lg self-center p-2 mr-10 sm:block cursor-pointer">
            <Link href="/">
              <Image
                src="/im-logo.svg"
                width={35}
                height={35}
                alt="IdiomaMax logo"
              />
            </Link>
          </div>
          <ul className="w-full flex sm:w-fit">
            <NavLink
              key={"Course"}
              label={t("course")}
              url={"/course"}
              active={pathname === "/course"}
              iconSvg={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                >
                  <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
                </svg>
              }
            />
            <NavLink
              key={"Cards"}
              label={t("cards")}
              url={"/cards"}
              active={pathname === "/cards"}
              iconSvg={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                >
                  <path d="m21.47 4.35-1.34-.56v9.03l2.43-5.86c.41-1.02-.06-2.19-1.09-2.61m-19.5 3.7L6.93 20a2.01 2.01 0 0 0 1.81 1.26c.26 0 .53-.05.79-.16l7.37-3.05c.75-.31 1.21-1.05 1.23-1.79.01-.26-.04-.55-.13-.81L13 3.5a1.954 1.954 0 0 0-1.81-1.25c-.26 0-.52.06-.77.15L3.06 5.45a1.994 1.994 0 0 0-1.09 2.6m16.15-3.8a2 2 0 0 0-2-2h-1.45l3.45 8.34" />
                </svg>
              }
            />
            {user ? (
              <NavLink
                key={"Profile"}
                label={t("profile")}
                url={"/profile"}
                active={pathname === "/profile"}
                iconSvg={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5em"
                    height="1.5em"
                  >
                    <path d="M8 7a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm0 6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5H8Z" />
                  </svg>
                }
              />
            ) : (
              <NavLink
                key={"Login"}
                label={t("login")}
                url="/login"
                active={pathname === "/login" || pathname === "/signup"}
                iconSvg={<BiLogIn size={24} />}
              />
            )}
          </ul>
        </div>
      </nav>
      {children}
      <div className="pb-20 md:pb-10 bg-grayLight"></div>
    </div>
  );
};

export default Navbar;
