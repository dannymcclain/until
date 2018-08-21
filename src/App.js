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
    const myDateList = {
      name: this.state.value, 
      date: this.state.selectedDate.format("MMM Do YY"), 
      daysUntil: Math.round(this.state.selectedDate.diff(moment(), 'days', true))
    }
    this.setState({
      myDates: [...this.state.myDates, myDateList]
    });
    // console.log(myDateList);
    console.log(this.state.myDates);
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
          calendarClassName="untilCal"
        />
        <input type="submit" value="Add" />

      </form>
      </div>
    );
  }
}

export default App;
