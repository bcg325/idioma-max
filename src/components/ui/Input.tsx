import { ReactNode, forwardRef } from "react";
import { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
}

export type Ref = HTMLInputElement;

const Input = forwardRef<Ref, InputProps>(
  ({ className, type, name, label, error, ...props }, ref) => {
    return (
      <div className="relative flex flex-col">
        <input
          ref={ref}
          type={type}
          name={name}
          placeholder={label}
          {...props}
          className={`${className}  ${
            error
              ? "border-red-600 focus:outline-red-600"
              : "border-gray focus:outline-primary200"
          } border-2 placeholder-transparent block px-3 pt-5 pb-1.5 w-full text-black rounded-lg peer`}
        />
        <label
          htmlFor={name}
          className={`${
            error ? "text-red-600" : " peer-focus:text-primary300"
          }  absolute top-4 scale-75 left-3 z-10 origin-[0] -translate-y-3 transform duration-300 
            peer-placeholder-shown:text-grayDark peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
            peer-focus:scale-75 peer-focus:-translate-y-3 peer-autofill:scale-75 peer-autofill:-translate-y-3`}
        >
          {label}
        </label>
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
