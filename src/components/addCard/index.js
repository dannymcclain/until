import React from 'react';
import './styles.css';

const AddCard = ({ handleClick, isActive }) => {
  return (
    <button
      onClick={handleClick}
      className={`add-card ${isActive ? 'is-active' : ''}`}
    >
      + Add Event
    </button>
  );
};

export default AddCard;
