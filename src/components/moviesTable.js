import React from "react";
import { Link } from "react-router-dom";
import Like from "../common/like";
import Table from "../common/table";

export default function MoviesTable(props) {
  const { newMovies, onDelete, onLike, onSort, sortColumn, user } = props;
  const columns = [
    {
      category: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { category: "genre.name", label: "Genre" },
    { category: "numberInStock", label: "Stock" },
    { category: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like isLiked={movie.isLiked} onClick={() => onLike(movie)} />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={newMovies}
      onSort={onSort}
      sortColumn={sortColumn}
    />
  );
}
