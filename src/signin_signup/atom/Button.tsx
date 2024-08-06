import React from "react";

type ButtonProps = {
  onClick: (e: React.FormEvent) => Promise<void>;
  text?: string;
};

const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-skipDB text-white rounded mt-2"
    >
      {text}
    </button>
  );
};

export default Button;
