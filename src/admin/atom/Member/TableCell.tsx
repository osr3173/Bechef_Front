import React from "react";

type TableCellProps = {
  children: React.ReactNode;
  className?: string;
};

const TableCell = ({ children, className = "" }: TableCellProps) => (
  <td className={`border px-4 py-2 ${className}`}>{children}</td>
);

export default TableCell;
