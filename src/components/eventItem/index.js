import React from 'react';
import DeleteButton from './../deleteButton';

const EventItem = ({name, date, daysUntil, handleDelete}) => (
  <div>
    <p className="event-name">{name}
      <span className="event-date">{date}</span>
    </p>
    <p className="days-until">{daysUntil}</p>
    <DeleteButton
      onDelete={handleDelete}
    />
  </div>
)

export default EventItem;