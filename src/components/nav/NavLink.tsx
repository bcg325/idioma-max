import Link from "next-intl/link";

interface Props {
  label: string;
  url: string;
  iconSvg: React.ReactNode;
  active: boolean;
}

const NavLink = ({ label, url, iconSvg, active }: Props) => {
  return (
    <li className="w-full sm:w-fit">
      <Link
        href={url}
        className={`h-full flex flex-col items-center justify-center hover:bg-primary500 sm:flex-row sm:px-3 md:px-5 sm:space-x-2
        ${active ? "fill-white" : "fill-primary100 text-primary100"}`}
      >
        {iconSvg}
        <span className="text-sm sm:text-base">{label}</span>
      </Link>
    </li>
  );
};

export default NavLink;
