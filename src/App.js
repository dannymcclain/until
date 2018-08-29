import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import 'emoji-mart/css/emoji-mart.css';
import { Picker, Emoji } from 'emoji-mart';
import uuid from 'uuid/v1';
import ActionButton from './components/actionButton';
import AddCard from './components/addCard';
import EventItem from './components/eventItem';
import CardForm from './components/cardForm';
import Modal from './components/modal';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emoji: 'wave',
      value: '',
      selectedDate: null,
      myDates: [],
      showForm: true,
      showMart: false
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
      id: uuid(),
      emoji: this.state.emoji,
      name: this.state.value, 
      date: this.state.selectedDate.format("MMM D"), 
      daysUntil: moment(this.state.selectedDate).fromNow()
    }
    this.setState({
      myDates: [myEvent, ...this.state.myDates],
      value: '',
      selectedDate: null,
      showMart: false,
      emoji: 'wave',
    });
  }

  toggleEditing = () => {
    this.setState( (currentState) => {
      return {showForm: !currentState.showForm}
    });
  }

  removeItem = ({id}) => {
    const filteredDates = this.state.myDates.filter( (item) => item.id !== id);
    this.setState ({
      myDates: filteredDates
    })
  }

  addEmoji = (emoji) => {
    this.setState ({
      emoji: emoji,
      showMart: false
    }, () => console.log(emoji));
  }

  toggleMart = () => {
    this.setState( (currentState) => {
      return {showMart: !currentState.showMart}
    });
  }

  render() {
    return (
      <div>
        <Modal
          isShowing={this.state.showForm}
          handleClose={this.toggleEditing}
        >
          <form className="add-entry container" onSubmit={this.handleSubmit}>
            <Emoji emoji={this.state.emoji} size={32} onClick={this.toggleMart}/>
            <Picker
              title=''
              showPreview={false}
              style={
                {
                position: 'absolute', 
                top: '85px', 
                left: '0',
                zIndex: '10',
                visibility: `${this.state.showMart ? 'visible' : 'hidden'}`,
                }
              }
              color='#0099FF'
              perLine='7'
              onSelect={this.addEmoji}
            />
            <input
              className="input-name"
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
            <button type="submit" className="btn-submit">Add</button>
          </form>
        </Modal>
          
        <header>
          <div className="container">
              <ActionButton 
                  handleClick={this.toggleEditing} 
                  isActive={this.state.showForm}
              />
            <h1>Until</h1>
            <div></div>
          </div>
        </header>
        
            
            <div className="event-list">     
                {this.state.myDates.map((event) => (
                  <EventItem
                    key={event.id}
                    {...event}
                    handleDelete={() => this.removeItem(event)}
                  />
                ))}
                <AddCard handleClick={this.toggleEditing} 
                  isActive={this.state.showForm}
                />
              </div>
            </div>
    );
  }
}

export default App;
