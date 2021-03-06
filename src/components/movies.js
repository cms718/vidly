import React, { useState, useEffect } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Pagination from "../common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "../common/listgroup";
import SearchBar from "../components/searchBar";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
export default function Movies(props) {
  const [movies, setMovies] = useState([]);
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState();
  const [genres, setGenres] = useState([]);
  const [sortColumn, setSortColumn] = useState({
    category: "title",
    order: "asc",
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const retrieveMovies = async () => {
      const { data: movies } = await getMovies();
      setMovies(movies);
    };
    const retrieveGenres = async () => {
      const { data: genres } = await getGenres();
      setGenres(genres);
    };
    retrieveMovies();
    retrieveGenres();
  }, []);
  const { user } = props;

  const handleDelete = async (movie) => {
    const originalMovies = [...movies];
    const newMovies = movies.filter((m) => m._id !== movie._id);
    setMovies(newMovies);
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie has already been deleted");
      }
      setMovies(originalMovies);
    }
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
    setSearchQuery("");
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const handleSearch = (input) => {
    setSearchQuery(input);
    setSelectedGenre();
  };
  const getPageData = () => {
    const filteredMovies = selectedGenre
      ? movies.filter((movie) => movie.genre._id === selectedGenre._id)
      : movies.filter((movie) =>
          movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
        );

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
        {user && (
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ margin: 10 }}
          >
            New Movie
          </Link>
        )}
        {totalCount === 0 && <h2> There are no movies in the database.</h2>}
        {totalCount > 0 && (
          <h2> Showing {totalCount} movies in the database.</h2>
        )}
        <SearchBar
          placeholder="Search..."
          onSearch={handleSearch}
          value={searchQuery}
        />
        {totalCount > 0 && (
          <MoviesTable
            user={user}
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
