import React, { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";

const WorkoutPagination = ({ totalPages, cardPerPage, paginate }) => {
  const [currentPage, setCurrentPage] = useState(0);
  console.log(totalPages);

  const pageNumber = [];
  for (let i = 0; i < totalPages; i++) {
    pageNumber.push(i);
  }

  useEffect(() => {
    paginate(currentPage);
  }, [paginate, currentPage]);

  return (
    <>
      <Pagination>
        <Pagination.First onClick={() => setCurrentPage(0)} />
        <Pagination.Prev
          disabled={currentPage <= 0}
          onClick={() => setCurrentPage(currentPage - 1)}
        />
        {pageNumber.map((number) => {
          return (
            <Pagination.Item
              onClick={() => setCurrentPage(number)}
              key={number}
              active={number === currentPage}
            >
              {number + 1}
            </Pagination.Item>
          );
        })}
        {/* <Pagination.Ellipsis />

        <Pagination.Ellipsis /> */}
        <Pagination.Next
          disabled={currentPage === pageNumber[pageNumber.length - 1]}
          onClick={() => setCurrentPage(currentPage + 1)}
        />
        <Pagination.Last
          onClick={() => setCurrentPage(pageNumber[pageNumber.length - 1])}
        />
      </Pagination>
    </>
  );
};

export default WorkoutPagination;
