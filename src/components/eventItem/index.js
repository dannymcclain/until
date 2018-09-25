import React from 'react';
import DeleteButton from './../deleteButton';
import './styles.css';

const EventItem = ({
  name,
  date,
  daysUntil,
  handleDelete,
  handleEdit,
  status
}) => (
  <div className={`event-item ${status}`}>
    <p className="event-name">{name}</p>
    <div className="card-content">
      <div className="event-info">
        <p className="days-until">{daysUntil}</p>
        <p className="event-date">{date}</p>
      </div>
      <div className="card-actions">
        <button className="edit-button" onClick={handleEdit}>
          Edit
        </button>
        <DeleteButton onDelete={handleDelete} />
      </div>
    </div>
  </div>
);

export default EventItem;
