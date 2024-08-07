import React from "react";
import TableCell from "../../atom/Member/TableCell";
import Button from "../../atom/Member/Button";

export type Member = {
  member_idx: number;
  member_name: string;
  member_id: string;
  member_email: string;
  member_phone: string;
  member_address: string;
};

type UserTableRowProps = {
  member: Member;
  onDelete: (member_idx: number) => void;
};

const UserTableRow = ({ member, onDelete }: UserTableRowProps) => (
  <tr>
    <TableCell>{member.member_name}</TableCell>
    <TableCell>{member.member_id}</TableCell>
    <TableCell>{member.member_email}</TableCell>
    <TableCell>{member.member_address}</TableCell>
    <TableCell>
      <Button
        onClick={() => onDelete(member.member_idx)}
        className="bg-red-500 hover:bg-red-700 text-white"
      >
        탈퇴
      </Button>
    </TableCell>
  </tr>
);

export default UserTableRow;
