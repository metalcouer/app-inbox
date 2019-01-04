import React, { Component } from 'react';
import Toolbar from './components/Toolbar.js';
import MessageList from './components/MessageList.js';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: [1,2,3]
    }
  }

  componentDidMount(){
    fetch('http://localhost:8082/api/messages')
    .then(function(response){
      return response.json()
    })
    .then(myJson => {
      this.setState({
        messages: myJson
      })
    });
  }

  messageRead = (id) => {
    console.log('messageRead', id)
    const updateMessages = this.state.messages.map(message => {
      if (message.id === id) {
        message.read = !message.read
      }
      return message
    })


    this.setState({
      messages: updateMessages
    })
  }

  messageStarred = (props) => {
    const updateStar = this.state.messages.map(message => {
      if (message.props === props) {
        message.star = !message.star
      }
      return message 
    })

    this.setState({
      messages: updateStar
    })

  }

  render() {
    return (
      <div className="app">
        <Toolbar></Toolbar>
        <MessageList
          messages={this.state.messages}
          messageRead={this.messageRead}
          messageStarred={this.messageStarred}>
        </MessageList>
      </div>
    );
  }
}

export default App;
