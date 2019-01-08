import React from 'react';
import Message from './Message.js';
import '../App.css';

const MessageList = (props) => {
    return (
            props.messages.map(message => {
                return <Message message={message} messageRead={props.messageRead} messageSelected={props.messageSelected}></Message>
            })
            
        
    );
  
}

export default MessageList;
