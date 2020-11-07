import React from "react";

export default function MovieForm({ match, history }) {
  const handleSave = () => {
    // Navigate to /products
    history.push("/movies");
  };
  return (
    <div>
      <h1>Movie Form {match.params.id}</h1>
      <button type="button" onClick={handleSave} className="btn btn-primary">
        Save
      </button>
    </div>
  );
}
