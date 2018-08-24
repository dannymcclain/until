import React from 'react';

const ActionButton = ({handleClick, isActive}) => (
  <button 
    onClick={handleClick}
    className={`add-button ${isActive ? "is-active" : ""}`}
    >
    <span className="stick" /><span className="stick" />
  </button>
)

export default ActionButton;