import React from "react";
import "./Pagination.css";
import Btn from "../Btn/Btn";
const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage, setCurrentPage }) => {
  const maxPage = Math.ceil(totalPosts / postsPerPage);

  const pageNumbers = [];
  // 100 / 8 = 13

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  function prevPage() {
    if (currentPage - 1 < 1) return;
    setCurrentPage(currentPage - 1);
  }
  function nextPage() {
    if (currentPage + 1 > maxPage) return;
    setCurrentPage(currentPage + 1);
  }

  function handleChange(e) {
    if (e.target.value > 0 && e.target.value <= maxPage) {
      setCurrentPage(parseInt(e.target.value));
    }
  }

  return (
    <nav className="pagination-nav">
      <button text="Prev" onClick={prevPage}>
        <img
          style={{
            transform: "rotate(90deg)",
          }}
          src="https://img.icons8.com/external-those-icons-lineal-color-those-icons/96/000000/external-arrow-arrows-those-icons-lineal-color-those-icons-1.png"
        />
        Anterior
      </button>
      <p>
        {" "}
        {currentPage} de {maxPage}{" "}
      </p>
      <select className="select" onChange={(e) => handleChange(e)} value={currentPage}>
        {pageNumbers.map((number) => (
          <option key={number} value={number}>
            {number}
          </option>
        ))}
      </select>
      <button text="Next" onClick={nextPage}>
        Siguiente
        <img
          style={{
            transform: "rotate(-90deg)",
          }}
          src="https://img.icons8.com/external-those-icons-lineal-color-those-icons/96/000000/external-arrow-arrows-those-icons-lineal-color-those-icons-1.png"
        />
      </button>
    </nav>
  );
};

export default Pagination;

// import React from "react";
// import './Pagination.css';

// const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
//   const pageNumbers = [];
//   // 100 / 8 = 13

//   for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <nav className="pagination-nav">
//       <ol className='pagination'>
//         {
//         pageNumbers.map(number => (
//           <li key={number} className='page-item'>
//             <button onClick={() => paginate(number)} className='page-button'>
//               {number}
//             </button>
//           </li>
//         ))
//         }
//       </ol>
//     </nav>
//   );
// };

// export default Pagination;
