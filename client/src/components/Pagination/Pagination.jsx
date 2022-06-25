import React from "react";

const Pagination = ({pageRef, totalPagesRef}) => {

  const prevPage = () => {
    if (pageRef.current > 1) {
      pageRef.current--;
      console.log(pageRef.current);
    }
  };
  
  const nextPage = () => {
    if (totalPagesRef.current > pageRef.current) {
      pageRef.current++;
      console.log(pageRef.current);
    }
  };

  return (
    <div className="pagination">
      <button onClick={() => prevPage()} className="" disabled={pageRef < 1}>
        Prev
      </button>
      <button onClick={() => nextPage()} className="">
        Next
      </button>
    </div>
  );
};

export default Pagination;
