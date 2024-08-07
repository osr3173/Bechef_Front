import React from "react";

type SelectInputProps = {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string | number; label: string }[];
  placeholder?: string;
  required?: boolean;
  className?: string;
  name: string; // 'name' prop 추가
};

const SelectInput: React.FC<SelectInputProps> = ({
  value,
  onChange,
  options,
  placeholder,
  required = false,
  className = "",
  name,
}) => (
  <select
    value={value}
    onChange={onChange}
    required={required}
    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    name={name}
  >
    {placeholder && <option value="">{placeholder}</option>}
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default SelectInput;
