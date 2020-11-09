import React from "react";

export default function SearchBar({ placeholder, onSearch, value }) {
  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control my-3"
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        placeholder={placeholder}
        aria-label="Username"
        aria-describedby="addon-wrapping"
      />
    </div>
  );
}
