import React from "react";
import './Pagination.css';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  // 100 / 8 = 13

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination-nav">
      <ol className='pagination'>
        {
        pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <button onClick={() => paginate(number)} className='page-button'>
              {number}
            </button>
          </li>
        ))
        }
      </ol>
    </nav>
  );
};

export default Pagination;
