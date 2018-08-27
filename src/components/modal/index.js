import React from 'react'

const Modal = () => {
  return (
    <div className="overlay">
      <div className="modal-wrapper">
        {this.props.children}
      </div>
    </div>
  )
}

export default Modal;