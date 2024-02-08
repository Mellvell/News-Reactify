import React from "react";
import styles from "./styles.module.css";

export default function Pagination({
  totalPages,
  handelNextPage,
  handelPreviousPage,
  handelPageClick,
  currentPage,
}) {
  return (
    <div className={styles.pagination}>
      <button
        className={styles.arrow}
        onClick={() => handelPreviousPage(currentPage)}
        disabled={currentPage <= 1}
      >
        {"<"}
      </button>
      <div className={styles.list}>
        {[...Array(totalPages)].map((_, index) => {
          return (
            <button
              key={index}
              onClick={() => handelPageClick(index + 1)}
              className={styles.pageNumber}
              disabled={index + 1 === currentPage}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
      <button
        className={styles.arrow}
        onClick={() => handelNextPage(currentPage)}
        disabled={currentPage >= 10}
      >
        {">"}
      </button>
    </div>
  );
}
