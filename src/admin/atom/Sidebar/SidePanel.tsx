import React, { ReactNode } from "react";

export type PanelProps = {
  panelName: ReactNode;
};

const Panel = ({ panelName }: PanelProps) => {
  return (
    <li className="cursor-pointer text-gray-600 hover:text-blue-600 transition-colors duration-300">
      {panelName}
    </li>
  );
};

export default Panel;
