import React, { useEffect, useState } from 'react';
import Pagination from "react-bootstrap/Pagination";


const WorkoutPagination = ({ totalCard, cardPerPage, paginate }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const pageNumber = [];
  for (let i = 0; i < (totalCard/cardPerPage); i++) {
    pageNumber.push(i);
    
  }

  // const changePage = (page) => {
  //   paginate(currentPage)
  // }
  useEffect(() => {
paginate(currentPage);
  }, [paginate, currentPage])
  

  

  return (
    <>
      <Pagination>
        <Pagination.First onClick={() => setCurrentPage(0)} />
        <Pagination.Prev
          disabled={currentPage<=0}
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
}

export default WorkoutPagination;