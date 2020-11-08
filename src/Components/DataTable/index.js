import React, { useEffect, useState } from "react";
import axios from "axios";

import { checkHeadings, setManualHeadings } from "./checkHeadings";
import tBody from "./tBody";
import tHead from "./tHead";
import sortData from "./sortData";

// paginations
import Pagination from "./Pagination/Index";
import { getTotalPage } from "./Pagination/paginationFunctions";
// Search
import Search from "./Search/Search";

import "./style.css";

const Table = ({
  tableData,
  hide,
  manualHeadings = false,
  limitPage,
  searchable = false,
  actions = false,
}) => {
  const [data, setData] = useState([]);
  const [isManualHeading, setIsManualHeading] = useState(false);
  const [renderManualHeading, setRenderManuelHeading] = useState([]);
  const [headings, setheadings] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSorted, setIsSorted] = useState(false);

  // Pagination
  const [pageLimit, setPageLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const [currentData, setCurrentData] = useState([]);

  function errorFunc(msg) {
    setError(true);
    setErrorMessage(msg);
  }

  const headClicked = (e) => {
    // sortData(data, e.target.id, isSorted).then(setIsSorted(!isSorted));
    sortData(currentData, e.target.id, isSorted).then(setIsSorted(!isSorted));
  };

  useEffect(() => {
    async function init() {
      if (typeof tableData === "string") {
        axios
          .get(tableData)
          .then((res) => {
            setData(res.data);
            if (manualHeadings) {
              setManualHeadings(manualHeadings).then((head) => {
                setRenderManuelHeading(head);
                setIsManualHeading(true);
              });
            } else {
              checkHeadings(res.data, hide).then((resData) =>
                setheadings(resData)
              );
            }
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
          if (manualHeadings) {
            setManualHeadings(manualHeadings).then((head) => {
              setRenderManuelHeading(head);
              setIsManualHeading(true);
            });
          } else {
            checkHeadings(tableData, hide).then((res) => setheadings(res));
          }
          getTotalPage(tableData.length, pageLimit).then((totalPage) =>
            setTotalPages(Math.ceil(totalPage))
          );
        } catch (err) {
          errorFunc("Api or Object Problem");
          return console.log("api or Object problem");
        }
      }
    }

    init();
    return () => {
      setheadings([]);
    };
    // eslint-disable-next-line
  }, [tableData, hide, pageLimit]);

  useEffect(() => {
    if (limitPage) {
      try {
        setPageLimit(parseInt(limitPage));
      } catch (err) {
        console.log("Error: Page Limit !");
      }
    }
  }, [limitPage]);

  useEffect(() => {
    // GET CURRENT DATA FROM PAGINATION
    const indexOfLastData = parseInt(currentPage) * parseInt(pageLimit);
    const indexOfFirstData = indexOfLastData - parseInt(pageLimit);
    setCurrentData(data.slice(indexOfFirstData, indexOfLastData));
    // const currentData = data.slice(indexOfFirstData, indexOfLastData);
  }, [data, currentPage, pageLimit]);

  const onPageChange = (page) => {
    setCurrentPage(parseInt(page));
  };

  const searchCallback = (query) => {
    function search(data, query) {
      // TODO => maybe add here checkHeadings to get all headings like that, because matbe data[0] heading might be different from other data[3] or etc..
      const columns = data[0] && Object.keys(data[0]);
      return data.filter((d) =>
        columns.some(
          (column) =>
            d[column].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        )
      );
    }
    if (searchable) {
      if (query !== "") {
        getTotalPage(search(data, query).length, pageLimit).then((totalPage) =>
          setTotalPages(Math.ceil(totalPage))
        );
        setCurrentPage(1);
        return setCurrentData(search(data, query));
      } else {
        getTotalPage(search(data, query).length, pageLimit).then((totalPage) =>
          setTotalPages(Math.ceil(totalPage))
        );
        setCurrentPage(1);
        const indexOfLastData = parseInt(currentPage) * parseInt(pageLimit);
        const indexOfFirstData = indexOfLastData - parseInt(pageLimit);
        setCurrentData(data.slice(indexOfFirstData, indexOfLastData));
      }
    }
  };

  return (
    <div>
      {searchable && <Search searchCallback={searchCallback} />}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
      <table>
        <thead>
          <tr>
            {tHead(
              headings,
              headClicked,
              actions,
              isManualHeading,
              renderManualHeading
            )}
          </tr>
        </thead>
        {!error ? (
          <tbody>
            {tBody(
              currentData,
              headings,
              actions,
              isManualHeading,
              renderManualHeading
            )}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td>{errorMessage}</td>
            </tr>
          </tbody>
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
