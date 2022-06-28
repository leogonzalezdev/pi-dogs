import React from "react";

const Btn = ({text, background, type, color}) => {

  const stylesBtn = {
    margin: '5px 10px',
    color: 'black',
    textTransform: 'uppercase', 
    cursor: 'pointer',
    background: 'var(--power-cian)',
    border: 'none',
    borderRadius: '14px',
    padding: '10px 15px',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 400ms',
    letterSpacing: '0.5px',
    hoverBackground:'var(--power-cian)'
  }

  return (
    <button style={stylesBtn} type="submit">
      Search
    </button>
  );
};



export default Btn;
