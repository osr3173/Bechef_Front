import React from "react";
import Input from "../atom/Input";
import ErrorMessage from "../atom/ErrorMessage";

type FormFieldProps = {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
};

const FormField = ({
  type,
  value,
  onChange,
  placeholder,
  error,
}: FormFieldProps) => {
  return (
    <div className="pb-5">
      <Input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default FormField;
