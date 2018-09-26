import React from 'react';
import './styles.css';

const Modal = props => {
  return (
    <div className={`overlay ${props.isShowing ? 'is-showing' : ''}`}>
      <div className="modal-wrapper">
        <button onClick={props.handleClose} className="modal-close">
          <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.414214 8l5.656854 5.656854c.390524.390525.390524 1.02369 0 1.414214-.390524.390524-1.023689.390524-1.414214 0L8 9.414214l-5.656854 5.656854c-.390525.390524-1.02369.390524-1.414214 0-.390524-.390524-.390524-1.023689 0-1.414214L6.585786 8 .928932 2.343146c-.390524-.390525-.390524-1.02369 0-1.414214.390524-.390524 1.023689-.390524 1.414214 0L8 6.585786 13.656854.928932c.390525-.390524 1.02369-.390524 1.414214 0 .390524.390524.390524 1.023689 0 1.414214L9.414214 8z" />
          </svg>
        </button>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
