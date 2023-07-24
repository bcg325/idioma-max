import Image from "next/image";
import Link from "next-intl/link";
import { BsCheckLg } from "react-icons/bs";
import { BiLockAlt } from "react-icons/bi";
import { BsFillPlayFill } from "react-icons/bs";

import Button from "../ui/Button";

interface LessonCardProps {
  url: string;
  title: string;
  description: string;
  status: string;
  order: number;
}

interface LinkWrapperProps {
  href: string;
  className: string;
  children: React.ReactNode;
}

const LinkWrapper: React.FC<LinkWrapperProps> = ({
  href,
  className,
  children,
  ...props
}) => {
  if (href == "#") {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }
  return (
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  );
};

const LessonCard: React.FC<LessonCardProps> = ({
  title,
  description,
  status,
  url,
  order,
}) => {
  let icon;
  switch (status) {
    case "completed":
      icon = <BsCheckLg size={30} className="text-Dark" />;
      break;
    case "current":
      icon = (
        <Button rounding="rounded-2xl" className="text-white">
          <BsFillPlayFill size={20} className="relative left-[1px]" />
        </Button>
      );
      break;
    case "locked":
      icon = <BiLockAlt size={26} className="text-grayDark" />;
      break;
    default:
      icon = <span className="loading loading-spinner loading-sm"></span>;
  }

  return (
    <LinkWrapper
      className={`cursor-pointer flex justify-between bg-white border-t-2 border-gray p-3 px-4 ${
        status === "locked" || status === "loading" ? "bg-gray/10" : ""
      }`}
      href={status === "locked" || status === "loading" ? "#" : url}
    >
      <div>
        <h3 className="text-lg font-semibold block">
          {order}. {title}
        </h3>
        <p className="line-clamp-2">{description}</p>
      </div>
      <div className="flex items-center justify-center px-2">{icon}</div>
    </LinkWrapper>
  );
};
export default LessonCard;
