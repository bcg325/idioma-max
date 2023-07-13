interface ErrorProps {
  message: string;
}

const Error = ({ message }: ErrorProps) => {
  return <span className="text-red-500 font-medium text-sm">{message}</span>;
};
export default Error;
