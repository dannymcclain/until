import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ActionButton from './components/actionButton';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      selectedDate: null,
      myDates: [],
      showForm: false
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const localState = localStorage.getItem("state");
    if (localState){
      this.setState({
        myDates: JSON.parse(localState)
      })
    }
  }
  componentDidUpdate() {
    localStorage.setItem("state", JSON.stringify(this.state.myDates));
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
      daysUntil: Math.round(this.state.selectedDate.diff(moment(), 'days', true)) + ' days'
    }
    this.setState({
      myDates: [...this.state.myDates, myDateList],
      value: '',
      selectedDate: null
    });
  }

  toggleMenu = () => {
    this.setState( (currentState) => {
      return {showForm: !currentState.showForm}
    });
  }

  render() {
    return (
      <div className="container">
        <header>
          <ActionButton 
            handleClick={this.toggleMenu} 
            isActive={this.state.showForm}
          />
          <h1>Days until...</h1>
        </header>
        <ReactCSSTransitionGroup
          transitionName="scaleDown"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>
          {this.state.showForm &&
          <form className="create-event" onSubmit={this.handleSubmit}>
            <input
              className="add-entry"
              type="text"
              value={this.state.value}
              onChange={this.handleNameChange}
              placeholder="Name"
              />
            <DatePicker
              selected={this.state.selectedDate}
              onChange={this.handleDateChange}
              placeholderText="Date"
              calendarClassName="untilCal"
              dateFormat="MMM D"
            />
            <input type="submit" value="Add" />
          </form>}
          </ReactCSSTransitionGroup>  
        <div className="event-list">
            {this.state.myDates.map((event, index) => (
              <div key={event.name}>
                <p className="event-name">{event.name} <span className="event-date">{event.date}</span></p>
                <p className="days-until">{event.daysUntil}</p>
              </div>
            ))}
          </div>
      </div>
    );
  }
}

export default App;
