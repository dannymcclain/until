import React from 'react';
import './styles.css';

const CardAction = ({ action, text }) => (
  <button className="card-action" onClick={action}>
    {text}
  </button>
);

export default CardAction;
