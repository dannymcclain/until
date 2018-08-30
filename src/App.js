import React, { Component } from 'react';
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
    }, (state) => {
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
        <div className="event-list">
            {Object.values(this.state.myDates).map((event) => (
              <EventItem
                key={event.id}
                {...event}
                handleDelete={() => this.removeItem(event)}
                handleEdit={() => this.handleEdit(event)}
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
