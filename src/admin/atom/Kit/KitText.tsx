import React from "react";

type TextProps = {
  content: string;
  className?: string;
};

const KitText = ({ content, className }: TextProps) => (
  <p className={className}>{content}</p>
);

export default KitText;
