import React from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import DeleteButton from './../deleteButton';

const EventItem = ({name, date, daysUntil, handleDelete}) => (
  <div className="event-item">
    <Picker
      title=''
      showPreview={false}
      style={{ 
        position: 'absolute', 
        top: '180px', 
        left: '10px',
        opacity: '0.5',
        transform: 'translateY(-10%)',
      }}
      color='#0099FF'
      perLine='7'
    />
    <p className="event-name">{name}</p>
    <p className="event-date">{date}</p>
    <p className="days-until">{daysUntil}</p>
    <DeleteButton
      onDelete={handleDelete}
    />
  </div>
)

export default EventItem;