import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ActionButton from './components/actionButton';
import AddCard from './components/addCard';
import EventItem from './components/eventItem';
import CardForm from './components/cardForm';
import Modal from './components/modal';
import './App.css';

class App extends Component {
  state = {
      myDates: [],
      showForm: false,
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
      myDates: [myEvent, ...this.state.myDates],
      showForm: false
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

  render() {
    return (
      <div>
        <Modal
          isShowing={this.state.showForm}
          handleClose={this.toggleEditing} >
          <CardForm handleSubmit={this.handleSubmit} />
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
