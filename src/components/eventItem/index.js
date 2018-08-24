import React from 'react';
import DeleteButton from './../deleteButton';

const EventItem = ({name, date, daysUntil, handleDelete}) => (
  <div className="event-item">
    <div className="event-left">
      <p className="event-name">{name}</p>
      <p className="event-date">{date}</p>
    </div>
    <div className="event-right">
      <p className="days-until">{daysUntil}</p>
      <DeleteButton
        onDelete={handleDelete}
      />
    </div>
  </div>
)

export default EventItem;