import React from "react";

const UserTableHeader: React.FC = () => (
  <thead>
    <tr>
      <th className="px-4 py-2">이름</th>
      <th className="px-4 py-2">아이디</th>
      <th className="px-4 py-2">이메일</th>
      <th className="px-4 py-2">주소</th>
      <th className="px-4 py-2">작업</th>
    </tr>
  </thead>
);

export default UserTableHeader;
