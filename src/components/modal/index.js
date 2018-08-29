import React from 'react';
import './styles.css';

const Modal = (props) => {
  return (
    <div className={`overlay ${props.isShowing ? 'is-showing' : ''}`}>
      <div className="modal-wrapper">
        {props.children}
        <button onClick={props.handleClose}>Close</button>
      </div>
    </div>
  )
}

export default Modal;