import React from "react";
import _ from "lodash";
import auth from "../services/authService";

const user = auth.getCurrentUser();

export default function TableBody({ data, columns: allColumns }) {
  const columns =
    user && user.isAdmin
      ? allColumns
      : allColumns.filter((column) => column.key !== "delete");

  const renderCell = (item, column) => {
    if (column.content) {
      return column.content(item);
    }
    return _.get(item, column.category);
  };

  const createKey = (item, column) => {
    return item._id + (column.category || column.key);
  };
  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {columns.map((column) => (
            <td key={createKey(item, column)}>{renderCell(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
