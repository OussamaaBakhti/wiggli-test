import React from "react";

import styles from "./pagination.module.scss";

function Pagination({
  setOffset,
  offset,
  totalPages,
  currentPage,
  setCurrentPage,
}) {
  // const [currentPage, setCurrentPage] = useState(currentPage);
  return (
    <div className={styles.container}>
      <div className={styles.currentPage}>total pages: {totalPages}</div>
      {/* <div className={styles.}></div> */}
      <div className={styles.prevnext}>
        <button
          disabled={currentPage === 1}
          className={styles.button}
          onClick={() => {
            offset - 20 >= 0 ? setOffset(offset - 20) : setOffset(0);
            setCurrentPage((prev) => prev - 1);
          }}
        >
          {"<"}
        </button>
        {currentPage}
        <button
          className={styles.button}
          disabled={currentPage === totalPages}
          onClick={() => {
            setOffset((prev) => prev + 20);
            setCurrentPage((prev) => prev + 1);
          }}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default Pagination;
