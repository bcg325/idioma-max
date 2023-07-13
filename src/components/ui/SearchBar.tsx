import { BiSearch } from "react-icons/bi";
import { useRef } from "react";
interface SearchBarProps {}

const SearchBar: React.FC<SearchBarProps> = () => {
  const queryRef = useRef();

  return (
    <div className="relative w-full">
      <BiSearch size={20} className="absolute text-grayDark top-3 left-3" />
      <input
        placeholder="Search"
        className="border-2 border-grayDark rounded-xl pl-9 px-3 py-2 outline-0 w-full"
      ></input>
    </div>
  );
};
export default SearchBar;
