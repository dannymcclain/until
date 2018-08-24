import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ActionButton from './components/actionButton';
import EventItem from './components/eventItem';
import './App.css';

class App extends Component {
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
    const myEvent = {
      name: this.state.value, 
      date: this.state.selectedDate.format("MMM D"), 
      daysUntil: Math.round(this.state.selectedDate.diff(moment(), 'days', true)) + ' days'
    }
    this.setState({
      myDates: [myEvent, ...this.state.myDates],
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
        <div className={`content-container ${this.state.showForm ? "content-container__is-open" : ""}`}>
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
              dateFormat="MMM D YY"
              minDate={moment().add(1, 'days')}
            />
            <input type="submit" value="Add" />
          </form>
          <div className="event-list">
          <ReactCSSTransitionGroup
          transitionName="fadeIn"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={100}>        
              {this.state.myDates.map((event) => (
                <EventItem
                  key={event.name}
                  {...event}
                  handleDelete={() => this.removeItem(event.name)}
                />
              ))}
            </ReactCSSTransitionGroup>
            </div>
          </div>
      </div>
    );
  }
}

export default App;
