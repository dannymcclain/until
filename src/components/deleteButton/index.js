import React from 'react';
import './styles.css';

const DeleteButton = ({onDelete}) => (
  <a
    className="delete"
    onClick={onDelete}>
    <svg width="12" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M3 11h2V7c0-.5522847.447715-1 1-1s1 .4477153 1 1v4h2V7c0-.5522847.447715-1 1-1s1 .4477153 1 1v5c0 .5522847-.447715 1-1 1H2c-.552285 0-1-.4477153-1-1V7c0-.5522847.447715-1 1-1s1 .4477153 1 1v4zM1 3h10c.552285 0 1 .4477153 1 1s-.447715 1-1 1H1c-.552285 0-1-.4477153-1-1s.447715-1 1-1zm2 0c0-1.6568542 1.343146-3 3-3s3 1.3431458 3 3H7c0-.5522847-.447715-1-1-1s-1 .4477153-1 1H3z" fill="#C6CACC" fillRule="nonzero"/></svg>
  </a>
)

export default DeleteButton;