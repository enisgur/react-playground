import React, { useEffect, useState } from "react";

// style
import "./style.css";

const Index = ({ currentPage, totalPages, pageBreaker, onPageChange }) => {
  const [pageNumbers, setPageNumbers] = useState([]);

  const [breaker, setBreaker] = useState(3);
  const [isPrevBreaker, setIsPrevBreaker] = useState(null);
  const [isNextBreaker, setIsNextBreaker] = useState(null);

  async function getNeighboards(currentPage, totalPages, breaker) {
    if (parseInt(totalPages) > 4) {
      const isPrevNeigboard =
        1 <= parseInt(currentPage) - parseInt(breaker) ? true : false;
      const isNextNeigboard =
        parseInt(currentPage) + parseInt(breaker) > parseInt(totalPages)
          ? false
          : true;

      setIsPrevBreaker(isPrevNeigboard);
      setIsNextBreaker(isNextNeigboard);
    } else {
      setIsPrevBreaker(false);
      setIsNextBreaker(false);
    }
  }

  useEffect(() => {
    function getPageNumbers() {
      let pages = [];
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return setPageNumbers(pages);
    }

    getPageNumbers();
    getNeighboards(currentPage, totalPages, breaker);
    // eslint-disable-next-line
  }, [totalPages]);

  useEffect(() => {
    if (pageBreaker) {
      setBreaker(parseInt(pageBreaker));
    }
  }, [pageBreaker]);

  useEffect(() => {
    getNeighboards(currentPage, totalPages, breaker);
    // eslint-disable-next-line
  }, [currentPage]);

  // useEffect(() => {
  //   getNeighboards(currentPage, totalPages, breaker);
  // }, [pageNumbers]);

  const pageClicked = (e) => {
    getNeighboards(currentPage, totalPages, breaker).then(() => {
      onPageChange(e.target.id);
    });
  };

  const onNextClicked = () => {
    if (currentPage < totalPages) {
      getNeighboards(currentPage, totalPages, breaker).then(() => {
        onPageChange(parseInt(currentPage) + 1);
      });
    }
  };

  const onPrevClicked = () => {
    if (currentPage > 1) {
      getNeighboards(currentPage, totalPages, breaker).then(() => {
        onPageChange(parseInt(currentPage) - 1);
      });
    }
  };

  if (
    totalPages === null ||
    totalPages === "null" ||
    !totalPages ||
    totalPages === "undefined" ||
    totalPages === 1
  ) {
    return null;
  }
  return (
    <div className="pagination">
      <div onClick={onPrevClicked} className="btn-prev">
        Previus
      </div>
      <ul>
        {isPrevBreaker && (
          <div className="breaker">
            <div className="breaker-page" id={1} onClick={pageClicked}>
              1
            </div>
            <div className="breaker-dot">...</div>
          </div>
        )}
        {pageNumbers.map((page) => {
          if (
            parseInt(page) > parseInt(currentPage) - parseInt(breaker) &&
            parseInt(page) < parseInt(currentPage) + parseInt(breaker)
          ) {
            return (
              <li
                className={
                  parseInt(page) === parseInt(currentPage) ? "active" : null
                }
                key={page}
                id={page}
                onClick={pageClicked}
              >
                {page}
              </li>
            );
          }
          return null;
        })}
        {isNextBreaker && (
          <div className="breaker">
            <div className="breaker-dot">...</div>
            <div className="breaker-page" id={totalPages} onClick={pageClicked}>
              {totalPages}
            </div>
          </div>
        )}
      </ul>
      <div className="btn-next" onClick={onNextClicked}>
        Next
      </div>
    </div>
  );
};

export default Index;
