import React from "react";

export default function ListGroup({
  onItemSelect,
  items,
  textProperty,
  valueProperty,
  selectedItem,
}) {
  return (
    <div>
      <ul className="list-group" style={{ cursor: "pointer" }}>
        <li
          key=""
          className={
            !selectedItem ? "list-group-item active" : "list-group-item"
          }
          onClick={() => onItemSelect()}
        >
          All Genres
        </li>
        {items.map((item) => (
          <li
            key={item[valueProperty]}
            className={
              item === selectedItem
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => onItemSelect(item)}
          >
            {item[textProperty]}
          </li>
        ))}
      </ul>
    </div>
  );
}
ListGroup.defaultProps = {
  textProperty: "name",
  valueProper: "_id",
};
