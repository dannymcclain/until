import React, { Component } from 'react';
import plus from './plus.svg';


class ActionButton extends Component {
  render() {
    return (
      <button 
        onClick={this.props.handleClick}
        className={`add-button ${this.props.isActive ? "is-active" : ""}`}
        >
        <img src={plus} /> 
      </button>
    );
  }
}

export default ActionButton;