import React, { Component } from 'react';

class ActionButton extends Component {
  render() {
    return (
      <button 
        onClick={this.props.handleClick}
        className={`add-button ${this.props.isActive ? "is-active" : ""}`}
        >
        <span className="stick" /><span className="stick" />
      </button>
    );
  }
}

export default ActionButton;