import React, { useEffect, useState } from "react";
import axios from "axios";

import checkHeadings from "./checkHeadings";
import tBody from "./tBody";
import tHead from "./tHead";
import sortData from "./sortData";

// paginations
import Pagination from "./Pagination/Index";
import { getTotalPage } from "./Pagination/paginationFunctions";

import "./style.css";

const Table = ({ tableData, hide, limitPage }) => {
  const [data, setData] = useState([]);
  const [headings, setheadings] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSorted, setIsSorted] = useState(false);

  // Pagination
  const [pageLimit, setPageLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  function errorFunc(msg) {
    setError(true);
    setErrorMessage(msg);
  }

  const headClicked = (e) => {
    sortData(data, e.target.id, isSorted).then(setIsSorted(!isSorted));
  };

  useEffect(() => {
    async function init() {
      if (typeof tableData === "string") {
        axios
          .get(tableData)
          .then((res) => {
            setData(res.data);

            checkHeadings(res.data, hide).then((resData) =>
              setheadings(resData)
            );
            getTotalPage(res.data.length, pageLimit).then((totalPage) =>
              setTotalPages(Math.ceil(totalPage))
            );
          })
          .catch(() => {
            errorFunc("Api Problem");
            return console.log("api problem");
          });
      }
      if (typeof tableData === "object") {
        try {
          setData(tableData);
          checkHeadings(tableData, hide).then((res) => setheadings(res));
        } catch (err) {
          errorFunc("Api or Object Problem");
          return console.log("api or Object problem");
        }
      }
    }

    init();
    // eslint-disable-next-line
  }, [tableData, hide]);

  useEffect(() => {
    if (limitPage) {
      try {
        setPageLimit(parseInt(limitPage));
      } catch (err) {
        console.log("Error: Page Limit !");
      }
    }
  }, [limitPage]);

  const onPageChange = (page) => {
    setCurrentPage(parseInt(page));
  };

  // GET CURRENT DATA FROM PAGINATION
  const indexOfLastData = parseInt(currentPage) * parseInt(pageLimit);
  const indexOfFirstData = indexOfLastData - parseInt(pageLimit);
  const currentData = data.slice(indexOfFirstData, indexOfLastData);

  return (
    <div>
      <h1>Table test</h1>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
      <table>
        <thead>
          <tr>{tHead(headings, headClicked)}</tr>
        </thead>
        {!error ? (
          <tbody>{tBody(currentData, headings)}</tbody>
        ) : (
          <div>{errorMessage}</div>
        )}
      </table>
    </div>
  );
};

export default Table;

// Hide must be array or string
// if string only 1 header
// if multi header must be in array

// {
/*
<DataTable
tableData="https://api.mocki.io/v1/3c79305f"
hide={["id", "email", "last_name"]}
/>

<DataTable tableData={testData} hide="id" /> 
*/
// }
