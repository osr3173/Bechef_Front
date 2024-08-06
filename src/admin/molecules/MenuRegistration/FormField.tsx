import React from "react";

type FormFieldProps = {
  label: string;
  children: React.ReactNode;
};

const FormField: React.FC<FormFieldProps> = ({ label, children }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">
      {label}
    </label>
    {children}
  </div>
);

export default FormField;
