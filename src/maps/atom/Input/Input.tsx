import React from "react";
type InputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const Input = ({ value, onChange, onKeyPress }: InputProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      placeholder="검색어 입력"
      className="border p-2 flex-grow"
    />
  );
};

export default Input;
