import React, { Component } from 'react';
import Toolbar from './components/Toolbar.js';
import MessageList from './components/MessageList.js';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      // allSelected: true
    }
  }

  async componentDidMount(){
    let response = await fetch('http://localhost:8082/api/messages')
    let messages = await response.json()
    let addSelected = messages.map(message => {
        if(!message.selected) 
          message.selected = false
        return message
      })
      this.setState({messages: addSelected})
      return messages
  }
  update = async (idArr, command, prop, value) => {
      let message = {
        messageIds: idArr,
        command: command,
        [prop] : value
        // "messageIds": [1],
        // "command": "read",
        // "read" : false
      }
      await fetch ('http://localhost:8082/api/messages', {
        method: 'PATCH',
        body: JSON.stringify(message),
        headers: {
          'Content-Type' : 'application/json',
          'Accept' : 'application/json'
        }
      })
      .catch( error => console.error(error))
    
    }

  markAsReadButtonClicked = () => {
    console.log("markAsReadButtonClicked")

    const selectedMessages = this.state.messages.filter(message =>  message.selected === true)
    console.log("selectedMessages", selectedMessages)
    selectedMessages.forEach( message => this.messageRead(message.id))
  }
  
  messageSelected = (id) => {
    console.log("messageSelected", id)


    const updatedMessages = this.state.messages.map(message => {
      if (message.id === id) {
        message.selected =!message.selected;
      }
      return message;
    })
  
    this.setState({
        messages: updatedMessages
      })
      this.update([id],"selected", "selected", true)
  }

  selectAll = (id) => {
    
    const numOfSelected =  this.state.messages.filter(message => message.selected === true)
    const allMessages = this.state.messages.map(message => {
      numOfSelected.length === this.state.messages.length
      ?message.selected = false
      :message.selected = true
      return message;
    })
    this.setState({
      messages: allMessages
    })
   
  }
 

  messageRead = (id) => {
   
     const updatedMessages = this.state.messages.map(message => {
       console.log(message)
      if (message.id === id) 
        message.read = true;
        
      
      return message;
    })

    this.setState({
      messages: updatedMessages
    }) 
    this.update([id], "read", "read", true )
  }

  messageStarred = (id) => {
    const updateStar = this.state.messages.map(message => {
      if (message.id === id) 
        message.starred = !message.starred
      
      return message 
    })


    this.setState({
      messages: updateStar
    })
  }


  render() {
    const numOfSelected = this.state.messages.filter(message => message.selected === true).length

    return (
      <div className="App">
        <Toolbar 
        markAsReadButtonClicked={this.markAsReadButtonClicked}
        numOfSelected={numOfSelected}
        messages={this.state.messages}
        messageRead={this.messageRead}
        messageSelected={this.messageSelected}
        messageStarred={this.messageStarred}
        selectAll={this.selectAll}>
        </Toolbar>
        <MessageList
          messages={this.state.messages}
          messageRead={this.messageRead}
          messageSelected={this.messageSelected}
          messageStarred={this.messageStarred}>
        </MessageList>
      </div>
    );
  
  }
}

  


export default App;
