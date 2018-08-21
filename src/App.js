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
      myDates: []
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
    event.preventDefault();
    const myDateList = {
      name: this.state.value, 
      date: this.state.selectedDate.format("MMM D"), 
      daysUntil: Math.round(this.state.selectedDate.diff(moment(), 'days', true))
    }
    this.setState({
      myDates: [...this.state.myDates, myDateList],
      value: '',
      selectedDate: null
    });
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
          placeholder="Enter a Name"
          />
        <label>Date:</label>
    
        <DatePicker
          selected={this.state.selectedDate}
          onChange={this.handleDateChange}
          placeholderText="Select a Date"
          calendarClassName="untilCal"
          dateFormat="MMM D"
        />
        <input type="submit" value="Add" />

        <div className="event-list">
          {this.state.myDates.map((event, index) => (
              <p key={event.name}>{event.name} {event.date} {event.daysUntil}</p>
          ))}
        </div>
      </form>
      </div>
    );
  }
}

export default App;
