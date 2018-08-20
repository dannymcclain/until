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
      startDate: moment()
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
      startDate: date
    });
  }

  handleSubmit(event) {
    console.log(this.state.value + this.state.startDate._d);
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input className="add-entry" type="text" value={this.state.value} onChange={this.handleNameChange} />
        </label>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleDateChange}
        />
        <input type="submit" value="Add" />
      </form>
      </div>
    );
  }
}

export default App;
