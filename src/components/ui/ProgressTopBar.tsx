import Image from "next/image";
import Link from "next/link";

interface ProgressTopBarProps {
  current: number;
  total: number;
  closeLink: string;
}

const ProgressTopBar: React.FC<ProgressTopBarProps> = ({
  current,
  total,
  closeLink,
}) => {
  return (
    <div className="flex py-2 items-center w-full">
      <Link href={closeLink}>
        <Image
          src="/close.svg"
          width={30}
          height={30}
          alt="close window"
          className=""
        />
      </Link>
      <div className=" mx-4 w-full bg-gray/60 rounded-full h-2">
        <div
          className="bg-primary300 h-full rounded-full transition ease-in "
          style={{ width: `${(current / total) * 100}%` }}
        ></div>
      </div>
      <div>
        {current}/{total}
      </div>
    </div>
  );
};
export default ProgressTopBar;
