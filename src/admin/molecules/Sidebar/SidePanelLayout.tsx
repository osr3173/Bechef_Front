import React, { ReactNode } from "react";
import Panel from "../../atom/Sidebar/SidePanel";

export type PanelLayoutProps = {
  panels: Array<{ panelName: ReactNode }>;
};

const PanelLayout = ({ panels }: PanelLayoutProps) => {
  return (
    <ul className="space-y-2">
      {panels.map((v, index) => (
        <Panel key={index} panelName={v.panelName} />
      ))}
    </ul>
  );
};

export default PanelLayout;
