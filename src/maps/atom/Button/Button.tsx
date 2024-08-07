import React from "react";

type ButtonProps = {
  onClick: () => void;
  text: string;
  className?: string;
};

const Button = ({ onClick, text, className }: ButtonProps) => {
  return (
    <button onClick={onClick} className={` p-2  rounded ${className}`}>
      {text}
    </button>
  );
};

export default Button;
