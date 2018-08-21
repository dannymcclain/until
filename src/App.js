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
      selectedDate: moment(),
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
    // console.log(this.state.value + ' ' + this.state.selectedDate.format("MMM Do YY"));
    const eventName = this.state.value;
    const eventDate = this.state.selectedDate.format("MMM Do YY");
    const myDateList = {name: eventName, date: eventDate}
    this.setState({
      myDates: [...this.state.myDates, myDateList]
    })
    console.log(myDateList);
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

      </form>
      </div>
    );
  }
}

export default App;
