import React, { Component } from 'react';
import moment from 'moment';
import uuid from 'uuid/v1';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import 'emoji-mart/css/emoji-mart.css';
import { Picker, Emoji } from 'emoji-mart';
import './styles.css';

export class CardForm extends Component {
  state = {
    emoji: 'calendar',
    value: '',
    selectedDate: null,
    showMart: false
  };

  static getDerivedStateFromProps(props, state) {
    if (!props.isShowing) {
      return {
        emoji: 'calendar',
        value: '',
        selectedDate: null,
        showMart: false
      }
    }
    if (props.currentEvent) {
      return {
        emoji: props.currentEvent.emoji,
        value: props.currentEvent.name,
        selectedDate: moment(props.currentEvent.date)
      }
    }
    return {}
  }

  toggleMart = () => {
    this.setState( (currentState) => {
      return {showMart: !currentState.showMart}
    });
  }

  addEmoji = (emoji) => {
    this.setState ({
      emoji: emoji,
      showMart: false
    });
  }

  
  handleNameChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleDateChange = (date) => {
    this.setState({
      selectedDate: date
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const myEvent = {
      id: uuid(),
      emoji: this.state.emoji,
      name: this.state.value, 
      date: this.state.selectedDate.format("MMM D YYYY"), 
      daysUntil: moment(this.state.selectedDate).fromNow()
    }
    this.props.handleSubmit(myEvent);
    this.resetForm();
  }

  resetForm = () => {
    this.setState({
      value: '',
      selectedDate: null,
      showMart: false,
      emoji: 'calendar',
    });
  }

  render() {
    return (
      <form className="add-entry" onSubmit={this.handleSubmit}>
        <label>Emoji</label>
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
        <label>Name</label>
        <input
          ref={ (htmlNode) => {this.props.innerRef(htmlNode)} }
          className="input-name"
          type="text"
          value={this.state.value}
          onChange={this.handleNameChange}
          placeholder="Name"
          />
          <label>Date</label>
          <DatePicker
            selected={this.state.selectedDate}
            onChange={this.handleDateChange}
            placeholderText="Date"
            calendarClassName="untilCal"
            dateFormat="MMM D YY"
            minDate={moment().add(1, 'days')}
          />
        <button type="submit" className="btn-submit" disabled={!this.state.value ||this.state.selectedDate === null}>Add</button>
      </form>
    )
  }
}

export default CardForm
