import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      selectedDate: null,
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({value: event.target.value});
  }

  handleDateChange(date){
    this.setState({
      selectedDate: date
    });
  }

  handleSubmit(event) {
    console.log(this.state.value + ' ' + this.state.selectedDate.format("MMM Do YY"));
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
      <form onSubmit={this.handleSubmit}>
        <label>Name:</label>
        <input
          className="add-entry"
          type="text"
          value={this.state.value}
          onChange={this.handleNameChange}
          />
        <label>Date:</label>
    
        <DatePicker
          selected={this.state.selectedDate}
          onChange={this.handleDateChange}
          placeholderText="Date"
        />
        <input type="submit" value="Add" />

        <p>{this.state.selectedDate && this.state.selectedDate.format("MMM Do YY")}</p>
      </form>
      </div>
    );
  }
}

export default App;
