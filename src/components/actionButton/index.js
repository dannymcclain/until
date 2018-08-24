import React from 'react';

const ActionButton = ({handleClick, isActive}) => (
  <button 
    onClick={handleClick}
    className={`add-button ${isActive ? "is-active" : ""}`}
    >
    <div className="plus-icon">
    <span className="stick" /><span className="stick" />
    </div>
  </button>
)

export default ActionButton;