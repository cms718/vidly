import React, { useState, useEffect } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "../common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "../common/listgroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState();
  const [genres, setGenres] = useState([]);
  const [sortColumn, setSortColumn] = useState({
    category: "title",
    order: "asc",
  });

  useEffect(() => {
    setMovies(getMovies());
    setGenres(getGenres());
  }, []);

  const handleDelete = (id) => {
    const newMovies = movies.filter((movie) => movie._id !== id);
    setMovies(newMovies);
  };

  const handleLike = (movie) => {
    const newMovies = [...movies];
    const index = newMovies.indexOf(movie);
    newMovies[index].isLiked = !newMovies[index].isLiked;
    setMovies(newMovies);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const getPageData = () => {
    const filteredMovies = selectedGenre
      ? movies.filter((movie) => movie.genre._id === selectedGenre._id)
      : movies;

    const sorted = _.orderBy(
      filteredMovies,
      [sortColumn.category],
      [sortColumn.order]
    );
    const newMovies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filteredMovies.length, data: newMovies };
  };

  const { totalCount, data: newMovies } = getPageData();

  return (
    <div className="row">
      <div className="col-3">
        <ListGroup
          onItemSelect={handleGenreSelect}
          items={genres}
          selectedItem={selectedGenre}
        />
      </div>
      <div className="col">
        {totalCount === 0 && <h2> There are no movies in the database.</h2>}
        {totalCount > 0 && (
          <h2> Showing {totalCount} movies in the database.</h2>
        )}
        {totalCount > 0 && (
          <MoviesTable
            newMovies={newMovies}
            onLike={handleLike}
            onDelete={handleDelete}
            onSort={handleSort}
            sortColumn={sortColumn}
          />
        )}
        <Pagination
          itemCount={totalCount}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
