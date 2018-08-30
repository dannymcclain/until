import React from 'react';
import './styles.css';

const DeleteButton = ({onDelete}) => (
  <button
    className="delete"
    onClick={onDelete}>Delete</button>
)

export default DeleteButton;