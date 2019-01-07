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

  async componentDidMount(){
    let response = await fetch('http://localhost:8082/api/messages')
    let messages = await response.json()
    let addSelected = messages.map(message => {
        if(!message.selected) {
          message.selected = false
        
        } 
        return message
      })
      this.setState({messages: addSelected})
      return messages
  }

  messageRead = async (id) => {
    console.log('messageRead', id)

    let message = {
      messageIds: [id],
      command: "read",
      "read" : true
    }

     await fetch ('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(message),
      headers: {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json',
      }
    })


    const updatedMessages = this.state.messages.map(message => {
      if (message.id === id) {
        message.read = !message.read
      }
      return message
    })


    this.setState({
      messages: updatedMessages
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
