import React from "react";
import auth from "../services/authService";
const user = auth.getCurrentUser();

export default function TableHeader({
  onSort,
  columns: allColumns,
  sortColumn,
}) {
  const columns =
    user && user.isAdmin
      ? allColumns
      : allColumns.filter((column) => column.key !== "delete");
  const raiseSort = (category) => {
    const copySortColumn = { ...sortColumn };
    if (copySortColumn.category === category)
      copySortColumn.order = copySortColumn.order === "asc" ? "desc" : "asc";
    else {
      copySortColumn.category = category;
      copySortColumn.order = "asc";
    }
    onSort(copySortColumn);
  };

  const renderSortIcon = (column) => {
    if (column.category !== sortColumn.category) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column.category || column.key}
            onClick={() => raiseSort(column.category)}
            style={{ cursor: "pointer" }}
          >
            {column.label} {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
}
