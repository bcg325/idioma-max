import Image from "next/image";
import Link from "next/link";
import { BsCheckLg } from "react-icons/bs";
import { BiLockAlt } from "react-icons/bi";
import { BsFillPlayFill } from "react-icons/bs";

import Button from "../ui/Button";

interface LessonCardProps {
  url: string;
  title: string;
  description: string;
  status: string;
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
}) => {
  const icon =
    status === "completed" ? (
      <BsCheckLg size={30} className="text-Dark" />
    ) : status === "current" ? (
      <Button rounding="rounded-2xl" className="text-white">
        <BsFillPlayFill size={20} className="relative left-[1px]" />
      </Button>
    ) : (
      <BiLockAlt size={26} className="text-grayDark" />
    );

  return (
    <LinkWrapper
      className={`cursor-pointer flex justify-between border-t-2 border-gray p-3 px-4 ${
        status === "locked" ? "bg-gray/10" : ""
      }`}
      href={status === "locked" ? "#" : url}
    >
      <div>
        <h3 className="text-lg font-medium block">{title}</h3>
        <p className="line-clamp-2">{description}</p>
      </div>
      <div className="flex items-center justify-center pr-2">{icon}</div>
    </LinkWrapper>
  );
};
export default LessonCard;
