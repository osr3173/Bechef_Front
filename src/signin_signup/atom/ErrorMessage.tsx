import React from "react";

type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <span className="text-red-500">{message}</span>;
};

export default ErrorMessage;
