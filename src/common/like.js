import React from "react";

export default function Like({ isLiked, onClick }) {
  let classes = "fa fa-heart";
  if (!isLiked) {
    classes += "-o";
  }

  return (
    <i
      className={classes}
      aria-hidden="true"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    />
  );
}
