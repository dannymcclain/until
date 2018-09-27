import React from 'react';
import './styles.css';

const Modal = props => {
  return (
    <div className={`overlay ${props.isShowing ? 'is-showing' : ''}`}>
      <div className="modal-wrapper">
        <button onClick={props.handleClose} className="modal-close">
          Cancel
        </button>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
