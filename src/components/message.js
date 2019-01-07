import React, { Component } from 'react';
import '../App.css';

let Message = (props) =>  {
    return (
        <div clasName="messageList">
            <div className={props.message.read ? "row message read" : "row message unread" }onClick={() => props.messageRead(props.message.id)}>
                <div className="col-xs-1">
                    <div className="row">
                        <div className="col-xs-2">
                            <input type="checkbox" 
                                onChange={() => this.props.markAsSelected(this.props.message.id)}
                                checked={() => this.props.message.selected ? "checked" : ""}
                            />
                        </div>
                        <div className="col-xs-2">
                            <i
                            
                            className= {props.message.star ? "star fa fa-star-o" : "star fa fa-star"}onClick={() => props.messageStarred(props.message)}></i>
                        </div>
                    </div>
                </div>
                <div className="col-xs-11">
                    <a href="#">
                        {props.message.subject}
                    </a>
                </div>
            </div>
        </div>
    );
  }


export default Message;