import React, { Component } from 'react';
import '../App.css';

const Toolbar = (props) => {

    const messageCount = props.messages.filter(message => !message.read).length


    return (
        <div className='toolbar'>
                <div className="row toolbar">
                <div className="col-md-12">
                <p className="pull-right">
                    <span const className="badge badge">{messageCount}</span>
                    unread messages
                </p>
            
                <button className="btn btn-default" onClick={props.selectAll}>
                    <i className={props.numOfSelected === props.messages.length
                    ? "fa fa-check-square-o" 
                    : props.numOfSelected === 0 
                      ? "fa fa-minus-o"
                      :"fa fa-minus-square-o"
                    }
                   ></i>
                </button>
            
                <button onClick={props.markAsReadButtonClicked} className="btn btn-default">
                    Mark As Read
                </button>
             
                <button onClick={props.unReadButtonClicked}className="btn btn-default">
                    Mark As Unread
                </button>
            
                <select className="form-control label-select">
                    <option>Apply label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>
            
                <select className="form-control label-select">
                    <option>Remove label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>
            
                <button onClick={props.deleteButton}className="btn btn-default">
                    <i className="fa fa-trash-o"></i>
                </button>
                </div>
            </div>
        

      </div>
    );
    
  }


export default Toolbar;