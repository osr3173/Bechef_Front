import React from "react";

type ButtonProps = {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
};

const Button = ({ onClick, className = "", children }: ButtonProps) => (
  <button
    onClick={onClick}
    className={`font-bold py-1 px-2 rounded ${className}`}
  >
    {children}
  </button>
);

export default Button;
