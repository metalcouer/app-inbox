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
        "messageIds": idArr,
        "command": command,
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
  
  messageSelected = async (id) => {
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

  // messageStarred = (props) => {
  //   const updateStar = this.state.messages.map(message => {
  //     if (message.props === props) {
  //       message.star = !message.star
  //     }
  //     return message 
  //   })

  //   star =(id) => {
  //     this.update([id], "star", "starred")
  //   }

  //   this.setState({
  //     messages: updateStar
  //   })
  // }
  render() {
    return (
      <div className="App">
        <Toolbar markAsReadButtonClicked={this.markAsReadButtonClicked}></Toolbar>
        <MessageList
          messages={this.state.messages}
          messageRead={this.messageRead}
          messageSelected={this.messageSelected}>
        </MessageList>
      </div>
    );
  
  }
}

  


export default App;
