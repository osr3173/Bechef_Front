import React from "react";

type LogoProps = {
  LogoName: string; 
  className?: string;
};

const Logo = ({ LogoName, className }: LogoProps) => {
  return <div className={`text-white p-4 ${className}`}>{LogoName}</div>;
};

export default Logo;
