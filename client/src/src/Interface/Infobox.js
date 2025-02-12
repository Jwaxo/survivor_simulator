import React, { Component } from 'react';
import LogItem from './Logitem';

class InfoBox extends Component {

  log = [];

  constructor(props) {
    super(props);
    if (props.log) {
      this.log = props.log;
    }
  }

  render() {
    return (
      <div className="infobox">
        {this.log.map((message, index) => {
          return (
            <LogItem key={ index } active={ index === 0 } message={ message } />
          )
        })}
      </div>
    )
  }

}

export default InfoBox;
