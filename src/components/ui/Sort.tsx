interface SortProps {
  options: string[];
  onSelect: (option: string) => void;
}

const Sort: React.FC<SortProps> = ({ options, onSelect }) => {
  return (
    <select name="sort">
      {options.map((options, index) => (
        <option key={index} value={options} />
      ))}
    </select>
  );
};
export default Sort;
