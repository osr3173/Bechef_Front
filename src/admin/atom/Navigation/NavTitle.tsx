import React from "react";

type TitleProps = {
  TitleName: string; 
  className?: string;
};

const Title = ({ TitleName, className }: TitleProps) => {
  return <div className={`text-white p-4 ${className}`}>{TitleName}</div>;
};

export default Title;
