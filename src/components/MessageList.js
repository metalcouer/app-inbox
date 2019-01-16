import React from 'react';
import Message from './Message.js';
import '../App.css';

const MessageList = (props) => {
    return (
            props.messages.map(message => {
                return <Message 
                message={message} 
                messageRead={props.messageRead} 
                messageSelected={props.messageSelected}
                messageStarred={props.messageStarred}
                starred={message.starred}
                subject={message.subject}
                labels={message.labels}
                body={message.body}
                read={message.read}
                key={message.id}>
                </Message>
            })
            
        
    );
  
}

export default MessageList;
