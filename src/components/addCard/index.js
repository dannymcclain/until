import React from 'react';
import './styles.css';

const AddCard = ({handleClick, isActive}) => {
  return (
    <button 
    onClick={handleClick}
    className={`add-card ${isActive ? "is-active" : ""}`}
    >
    <div className="plus-icon">
    <span className="stick" /><span className="stick" />
    </div>
  </button>
  )
}

export default AddCard
