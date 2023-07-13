"use client";
import NavLink from "./NavLink";
import { usePathname } from "next/navigation";

const tabs = [
  {
    label: "Home",
    url: "/",
    icon: "m21.743 12.331l-9-10c-.379-.422-1.107-.422-1.486 0l-9 10a.998.998 0 0 0-.17 1.076c.16.361.518.593.913.593h2v7a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-4h4v4a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-7h2a.998.998 0 0 0 .743-1.669z",
  },
  {
    label: "Course",
    url: "/course",
    icon: "M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z",
  },
  {
    label: "Cards",
    url: "/cards",
    icon: "m21.47 4.35-1.34-.56v9.03l2.43-5.86c.41-1.02-.06-2.19-1.09-2.61m-19.5 3.7L6.93 20a2.01 2.01 0 0 0 1.81 1.26c.26 0 .53-.05.79-.16l7.37-3.05c.75-.31 1.21-1.05 1.23-1.79.01-.26-.04-.55-.13-.81L13 3.5a1.954 1.954 0 0 0-1.81-1.25c-.26 0-.52.06-.77.15L3.06 5.45a1.994 1.994 0 0 0-1.09 2.6m16.15-3.8a2 2 0 0 0-2-2h-1.45l3.45 8.34",
  },
  {
    label: "Profile",
    url: "/profile",
    icon: "M8 7a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm0 6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5H8Z",
  },
];

const Navbar = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const cardSetReviewPath = new RegExp("/cards/sets/\\w+/review");
  if (pathname.includes("/lesson/") || cardSetReviewPath.test(pathname)) {
    return children;
  }
  return (
    //sticky flex justify-between
    <div>
      <nav className="fixed bottom-0 z-50 w-full h-16 bg-primary400 text-white sm:sticky sm:top-0 sm:h-11 ">
        <div className="h-full sm:container flex align-middle sm:justify-between">
          <div className="hidden font-semibold text-lg self-center p-2 mr-10 sm:block cursor-pointer">
            IM
          </div>
          <ul className="w-full flex sm:w-2/3 lg:w-1/2 xl:2/5">
            {tabs.map((tab, index) => (
              <NavLink
                key={index}
                label={tab.label}
                url={tab.url}
                iconSvg={tab.icon}
                active={pathname === tab.url}
              />
            ))}
          </ul>
        </div>
      </nav>
      {children}
      <div className="pb-20 md:pb-10 bg-grayLight"></div>
    </div>
  );
};

export default Navbar;
