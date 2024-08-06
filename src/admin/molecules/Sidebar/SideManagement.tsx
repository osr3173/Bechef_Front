import Panel from "../../atom/Sidebar/SidePanel";
import PanelTitle, { PanelTitleProps } from "../../atom/Sidebar/SidePanelTitle";
import PanelLayout, { PanelLayoutProps } from "./SidePanelLayout";

export type ManagementProps = {
  panelTitle: PanelTitleProps;
  panelLayout: PanelLayoutProps;
};

const Management = ({ panelTitle, panelLayout }: ManagementProps) => {
  return (
    <div>
      <div className="mb-8">
        <PanelTitle {...panelTitle} />
        <PanelLayout {...panelLayout} />
      </div>
    </div>
  );
};
// panels={[{ panelName: "메뉴등록" }, { panelName: "재고관리" }]
export default Management;
