import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

export default function Pagination({
  itemCount,
  pageSize,
  currentPage,
  onPageChange,
}) {
  const pageNumbers = Math.ceil(itemCount / pageSize);
  const pages = _.range(1, pageNumbers + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pageNumbers > 1 &&
          pages.map((page) => (
            <li
              key={page}
              className={
                currentPage === page ? "page-item active" : "page-item"
              }
            >
              <a
                className="page-link"
                onClick={() => onPageChange(page)}
                href="#"
              >
                {page}
              </a>
            </li>
          ))}
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
