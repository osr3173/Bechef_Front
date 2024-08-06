import React from "react";
import { Member } from "../../page/MemberPage";

type MemberTableProps = {
  members: Member[];
  onDelete: (member_idx: number) => void;
};

const MemberTable: React.FC<MemberTableProps> = ({ members, onDelete }) => {
  if (members.length === 0) {
    return <p className="text-center py-4">회원이 없습니다.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              이름
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              아이디
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              이메일
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              전화번호
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              주소
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              작업
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {members.map((member) => {
            console.log("현재 멤버:", member); // 멤버 객체 전체를 출력하여 구조 확인
            return (
              <tr key={member.member_idx}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {member.member_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {member.member_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {member.member_email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {member.member_phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {member.member_address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onDelete(member.member_idx)}
                    className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out"
                  >
                    삭제
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MemberTable;
