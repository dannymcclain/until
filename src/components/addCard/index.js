import React from 'react'

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
