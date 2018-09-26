import React, { Component } from 'react';
import moment from 'moment';
import uuid from 'uuid/v1';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import './styles.css';

export class CardForm extends Component {
  state = {
    id: null,
    value: '',
    selectedDate: null
  };

  static getDerivedStateFromProps(props, state) {
    if (!props.isShowing) {
      return {
        id: null,
        value: '',
        selectedDate: null
      };
    }
    if (props.currentEvent && props.currentEvent.id !== state.id) {
      return {
        id: props.currentEvent.id,
        value: props.currentEvent.name,
        selectedDate: moment(props.currentEvent.date, 'MMM D, YYYY')
      };
    }
    return {};
  }

  handleNameChange = event => {
    this.setState({ value: event.target.value });
  };

  handleDateChange = date => {
    this.setState({
      selectedDate: date
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const myEvent = {
      id: this.state.id || uuid(),
      name: this.state.value,
      date: this.state.selectedDate.format('MMM D, YYYY'),
      daysUntil: moment(this.state.selectedDate).fromNow()
    };
    this.props.handleSubmit(myEvent);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({
      id: null,
      value: '',
      selectedDate: null
    });
  };

  render() {
    return (
      <form className="add-entry">
        <div className="add-inputs">
          <input
            ref={htmlNode => {
              this.props.innerRef(htmlNode);
            }}
            className="input-name"
            type="text"
            value={this.state.value}
            onChange={this.handleNameChange}
            placeholder="Untitled event"
          />
          <DatePicker
            selected={this.state.selectedDate}
            onChange={this.handleDateChange}
            placeholderText={moment().format('MMM D, YYYY')}
            calendarClassName="untilCal"
            dateFormat="MMM D, YYYY"
            minDate={moment()}
          />
        </div>
        <div className="form-actions">
          <button
            onClick={this.resetForm}
            className="btn-cancel"
            disabled={!this.state.value || this.state.selectedDate === null}
          >
            Cancel
          </button>
          <button
            onClick={this.handleSubmit}
            type="submit"
            className="btn-submit"
            disabled={!this.state.value || this.state.selectedDate === null}
          >
            Save
          </button>
        </div>
      </form>
    );
  }
}

export default CardForm;
