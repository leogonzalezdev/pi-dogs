import React, { useRef } from 'react'

export const useDogs = () => {

  const [loading, setLoading] = useState(false);
  const paginaRef = useRef(0);

  const nextPage = () => {
    paginaRef.current++;
  }
  const prevPage = () => {
    if (paginaRef.current > 1) {
      paginaRef.current--;
    }
  }
  return {
    paginaRef,
    nextPage,
    prevPage
  }
}
