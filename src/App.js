import React, { Component } from 'react';
import moment from 'moment';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ActionButton from './components/actionButton';
import AddCard from './components/addCard';
import EventItem from './components/eventItem';
import CardForm from './components/cardForm';
import Modal from './components/modal';
import './App.css';

class App extends Component {
  state = {
      myDates: {},
      showForm: false,
      currentEvent: null
  }

  componentDidMount() {
    const localState = localStorage.getItem("state");
    if (localState){
      this.setState({
        myDates: JSON.parse(localState)
      })
    }

    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        this.setState({
          showForm: false
        })
      }
    });
  }

  componentWillUnmount() {
    document.addEventListener('keydown');
  }

  componentDidUpdate() {
    localStorage.setItem("state", JSON.stringify(this.state.myDates));
  }

  handleSubmit = (myEvent) => {
    this.setState({
      myDates: {
        ...this.state.myDates,
        [myEvent.id]: myEvent
      },
      showForm: false,
      currentEvent: null
    });
  }

  toggleEditing = () => {
    this.setState( (currentState) => {
      return {
        showForm: !currentState.showForm,
        currentEvent: null
      }
    }, () => {
      this.state.showForm && this.nameInput.focus()
    });
  }

  bindInnerRef = (htmlNode) => {
    this.nameInput = htmlNode;
  }

  removeItem = ({id}) => {
    const datesCopy = {...this.state.myDates};
    delete datesCopy[id];
    this.setState ({
      myDates: datesCopy
    })
  }

  handleEdit = (event) => {
    this.setState({
      currentEvent: event,
      showForm: true
    });
  }

  eventFormatter = (event) => {
    let eventOverrides = {};
    let eventDate = moment(event.date, 'MMM D, YYYY');
    let today = moment();
    if (eventDate.isBefore(today, 'day')) {
      eventOverrides.status = 'past';
    } else if (eventDate.isSame(today, 'day')){
      eventOverrides.status = 'present';
      eventOverrides.daysUntil = 'Today!';
    } else {
      eventOverrides.status = 'future';
    }

    return {
      ...event, 
      ...eventOverrides
    }
  }

  eventReorder = (event1, event2) => {
    return moment.utc(event1.date, "MMM D, YYYY").diff(moment.utc(event2.date, "MMM D, YYYY"))
  }
  

  render() {
    return (
      <div>
        <Modal
          isShowing={this.state.showForm}
          handleClose={this.toggleEditing} >
            <CardForm 
            innerRef={this.bindInnerRef}
            handleSubmit={this.handleSubmit} 
            isShowing={this.state.showForm}
            currentEvent={this.state.currentEvent}
            />
        </Modal>
          
        <header>
          <div className="container">
            <h1>Until</h1>
            <ActionButton 
              handleClick={this.toggleEditing} 
              isActive={this.state.showForm}
            />
          </div>
        </header>
        { Object.keys(this.state.myDates).length > 0 ? 
          <div className="event-list">
          <ReactCSSTransitionGroup
          transitionName="cardAnimate"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={200}>
          {Object.values(this.state.myDates).map(this.eventFormatter).sort(this.eventReorder).map((event) => (
            <EventItem
              key={event.id}
              {...event}
              handleDelete={() => this.removeItem(event)}
              handleEdit={() => this.handleEdit(event)}
              eventStatus={event.staus}
            />
          ))}
          <AddCard handleClick={this.toggleEditing}
            isActive={this.state.showForm}
          />
          </ReactCSSTransitionGroup>
          </div>
          :  
          <div className="event-list no-events">
            <span>
            <h1>Add one ya dummy.</h1>
            <AddCard handleClick={this.toggleEditing}
              isActive={this.state.showForm}
            />
            </span>
          </div>
        }
        
        
      </div>
    );
  }
}

export default App;
