import React from 'react';
import { Emoji } from './../../../node_modules/emoji-mart'
import DeleteButton from './../deleteButton';

const EventItem = ({emoji, name, date, daysUntil, handleDelete}) => (
  <div className="event-item">
    <Emoji emoji={emoji} size={32} />
    <p className="event-name">{name}</p>
    <p className="event-date">{date}</p>
    <p className="days-until">{daysUntil}</p>
    <DeleteButton
      onDelete={handleDelete}
    />
  </div>
)

export default EventItem;