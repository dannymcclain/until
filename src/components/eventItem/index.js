import React from 'react';
import { Emoji } from './../../../node_modules/emoji-mart'
import DeleteButton from './../deleteButton';
import './styles.css';

const EventItem = ({emoji, name, date, daysUntil, handleDelete, handleEdit, status}) => (
  <div className={`event-item ${status}`}>
    <div>
      <div className="card-top">
        <Emoji emoji={emoji} size={32} />
          <button className="edit-button" onClick={handleEdit}>Edit</button>
          <DeleteButton onDelete={handleDelete}/>
      </div>
    <p className="event-name">{name}</p>
    </div>
    <div>
    <p className="days-until">{daysUntil}</p>
    <p className="event-date">{date}</p>
    </div>
  </div>
)

export default EventItem;