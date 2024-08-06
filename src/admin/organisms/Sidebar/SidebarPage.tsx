// src/organisms/Sidebar/SidebarPage.tsx
import React from "react";
import Management from "../../molecules/Sidebar/SideManagement";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="bg-gray-100 w-64 flex-shrink-0 border-r border-gray-200 overflow-y-auto">
      <div className="p-6">
        <Management
          panelTitle={{ title: "회원관리" }}
          panelLayout={{
            panels: [
              { panelName: <Link to="/admin/user"> 회원 정보 관리</Link> },
            ],
          }}
        />
        <Management
          panelTitle={{ title: "재고관리" }}
          panelLayout={{
            panels: [
              {
                panelName: <Link to="/admin/menu-registration">메뉴등록</Link>,
              },
              { panelName: <Link to="/admin/inventory">재고관리</Link> },
            ],
          }}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
