import React from "react";
import _ from "lodash";
export default function TableBody({ data, columns }) {
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
