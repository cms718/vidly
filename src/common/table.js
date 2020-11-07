import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

export default function Table({ columns, sortColumn, onSort, data }) {
  return (
    <table className="table">
      <TableHeader onSort={onSort} columns={columns} sortColumn={sortColumn} />
      <TableBody data={data} columns={columns} />
    </table>
  );
}
