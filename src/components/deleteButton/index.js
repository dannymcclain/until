import React from 'react';

const DeleteButton = ({onDelete}) => (
  <a
    className="delete"
    onClick={onDelete}>
    Delete
  </a>
)

export default DeleteButton;