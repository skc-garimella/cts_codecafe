import React, { Component } from 'react';




export default (props) => {
    return (
      <li className="list-group-item">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4 className="panel-title text-center text-primary">
            <img src={props.icon} style={{width: 30, height: 30}} />
            <b className="text-primary">{props.title}</b>
          </h4>
          <h5 className="text-right text-primary">{props.compiler_status} | {props.language} </h5>
        </div>
        <div className="panel-body">
            <pre className="s-scroll">
              <code>{props.source_code}</code>
            </pre>
          </div>
        </div>
      </li>
    );
}
