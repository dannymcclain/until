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
      myDates: [myDateList, ...this.state.myDates],
      value: '',
      selectedDate: null,
      showForm: false
    });
  }

  toggleMenu = () => {
    this.setState( (currentState) => {
      return {showForm: !currentState.showForm}
    });
  }

  removeItem = (name) => {
    console.log(name);
    const filteredDates = this.state.myDates.filter( (item) => item.name !== name);
    this.setState ({
      myDates: filteredDates
    })
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
        <div className={`${this.state.showForm ? "content-container__is-open" : "content-container"}`}>
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
          </form>
          <div className="event-list">
          <ReactCSSTransitionGroup
          transitionName="fadeIn"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>        
              {this.state.myDates.map((event, index) => (
                <div key={event.name}>
                  <p className="event-name">{event.name} <span className="event-date">{event.date}</span></p>
                  <p className="days-until">{event.daysUntil} <a className="delete" onClick={ () => this.removeItem(event.name)}>Delete</a></p>
                </div>
              ))}
            </ReactCSSTransitionGroup>
            </div>
          </div>
      </div>
    );
  }
}

export default App;
