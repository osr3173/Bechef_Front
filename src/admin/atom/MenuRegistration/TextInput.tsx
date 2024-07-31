import React from "react";

export type TextInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  className?: string;
  noUpDown?: boolean;
};

const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  name,
  placeholder,
  type = "text",
  required = false,
  className = "",
  noUpDown = false,
}) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    name={name}
    placeholder={placeholder}
    required={required}
    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className} ${
      noUpDown ? "no-spinner" : ""
    }`}
  />
);

export default TextInput;
