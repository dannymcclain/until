import React from 'react';
import DeleteButton from './../deleteButton';

const EventItem = ({name, date, daysUntil, handleDelete}) => (
  <div className="event-item">
    <p className="event-name">{name}</p>
    <p className="event-date">{date}</p>
    <p className="days-until">{daysUntil}</p>
    <DeleteButton
      onDelete={handleDelete}
    />
  </div>
)

export default EventItem;