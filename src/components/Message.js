import React from 'react';
import '../App.css';

let Message = (props) =>  {
    return (
        <div className="messageList">
            <div className={`row message ${props.message.read ? 'read' : 'unread'} ${props.message.selected ? 'selected' : ''}`} >
                <div className="col-xs-1">
                    <div className="row">
                        <div className="col-xs-2">
                            <input type="checkbox" onChange ={() => props.messageSelected(props.message.id)} checked={(typeof props.message.selected !== "undefined") && props.message.selected === true ? "checked" : ""}/>
                        </div>
                        <div className="col-xs-2">
                            <i className= {props.starred ? "star fa fa-star-o" : "star fa fa-star"} onClick={() => props.messageStarred(props.message.id)}></i>
                        </div>
                    </div>
                </div>
                <div class="col-xs-11">
                <span className={props.message.labels.includes('dev') ? "label label-warning" : 'hidden'}>dev</span>
                <span className={props.message.labels.includes('gschool') ? "label label-warning" : 'hidden'}>gschool</span>
                <span className={props.message.labels.includes('personal') ? "label label-warning" : 'hidden'}>personal</span>
                {/* <div className="col-xs-11" onClick={() => props.messageRead(props.message.id)}> */}
                      <a href="/">
                        {props.message.subject}
                       </a>
                      </div>
                </div>
            </div>
        // </div>
    );
  }


export default Message;
