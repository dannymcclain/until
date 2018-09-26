import React from 'react';
import CardAction from './../cardAction';
import './styles.css';

const EventItem = ({
  name,
  date,
  daysUntil,
  handleDelete,
  handleEdit,
  status
}) => (
  <li className={`event-item ${status}`}>
    <div className="card-content">
      <p className="event-name">{name}</p>
      <p className="days-until">{daysUntil}</p>
    </div>

    <div className="card-footer">
      <p className="event-date">
        {date} / <CardAction action={handleEdit} text="Edit" /> /{' '}
        <CardAction action={handleDelete} text="Remove" />
      </p>
    </div>
  </li>
);

export default EventItem;
