import React from 'react';
import { Emoji } from './../../../node_modules/emoji-mart'
import DeleteButton from './../deleteButton';
import './styles.css';

const EventItem = ({emoji, name, date, daysUntil, handleDelete}) => (
  <div className="event-item">
    <div>
    <Emoji emoji={emoji} size={32} />
    <p className="event-name">{name}</p>
    </div>
    <div>
    <p className="days-until">{daysUntil}</p>
    <p className="event-date">{date}</p>
    </div>
    <DeleteButton
      onDelete={handleDelete}
    />
  </div>
)

export default EventItem;