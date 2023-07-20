import { BsThreeDots } from "react-icons/bs";

export type options = {
  [key: string]: boolean;
};

interface OptionsDropdownProps {
  options: options;
  onSelect: (option: string) => void;
  style?: string;
  width?: string;
}
const OptionsDropdown: React.FC<OptionsDropdownProps> = ({
  options,
  onSelect,
  style,
}) => {
  return (
    <div className={`dropdown ${style ? style : ""}`}>
      <label
        tabIndex={0}
        className="btn btn-square btn-sm bg-transparent border-none"
      >
        <BsThreeDots size={25} />
      </label>
      <ul
        tabIndex={0}
        className="z-40 shadow menu dropdown-content  bg-white p-1 rounded-xl w-40 border-2 border-gray"
      >
        {Object.keys(options).map((option, index) => (
          <li key={index}>
            <a onClick={() => onSelect(option)}>{option}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default OptionsDropdown;
