// src/atoms/Button/SubmitButton.tsx
import React from "react";

type SubmitButtonProps = {
  text: string;
  className?: string;
  disabled?: boolean;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({
  text,
  className = "",
  disabled = false,
}) => (
  <button
    type="submit"
    className={`w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out ${className} ${
      disabled ? "opacity-50 cursor-not-allowed" : ""
    }`}
    disabled={disabled}
  >
    {text}
  </button>
);

export default SubmitButton;
