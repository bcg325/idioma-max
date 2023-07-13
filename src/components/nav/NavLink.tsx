import Link from "next/link";

interface Props {
  label: string;
  url: string;
  iconSvg: string;
  active: boolean;
}

const NavLink = ({ label, url, iconSvg, active }: Props) => {
  return (
    <li className="w-full">
      <Link
        href={url}
        className={`h-full flex flex-col items-center justify-center hover:bg-primary500 sm:flex-row sm:space-x-2
        ${active ? "fill-white" : "fill-primary100 text-primary100"}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em">
          <path d={iconSvg} />
        </svg>
        <span>{label}</span>
      </Link>
    </li>
  );
};

export default NavLink;
