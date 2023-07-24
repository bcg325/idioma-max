"use client";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  color?: string;
  rounding?: string;
}

const Button = ({
  children,
  className,
  disabled,
  color,
  rounding,
  onClick,
}: Props) => {
  const styles = `
  active:scale-99
  transition-all
  duration-120
  ease-in-out
  ${disabled ? "bg-grayDark " : color ? color : "bg-secondary400"} 
  ${rounding ? rounding : "rounded-lg"}
    p-1.5 text-lg font-semibold shadow-lg 
   ${className} `;
  return (
    <button onClick={onClick} className={styles} disabled={disabled}>
      {children}
    </button>
  );
};
export default Button;
