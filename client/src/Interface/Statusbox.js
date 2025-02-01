import React, { Component } from 'react';

class StatusBox extends Component {
  values = {
    day: 0,
    time: '',
    weather: '',
    tribe: '',
    phase: '',
  }
  debug = false;

  constructor(props) {
    super(props);

    for (let key in props) {
      if (this.values.hasOwnProperty(props[key])) {
        this.values = props[key];
      }
    }
    if (props.debug) {
      this.debug = true;
    }
  }

  render() {
    return (
      <ul className="status-box">
        <li className="status-box-day">
          <span className="label">Day</span>
          <span className="value">{ this.day }</span>
        </li>
        <li className="status-box-time">
          <span className="label">Time</span>
          <span className="value">{ this.time }</span>
        </li>
        <li className="status-box-weather">
          <span className="label">Weather</span>
          <span className="value">{ this.weather }</span>
        </li>
        <li className="status-box-tribe">
          <span className="label">Tribe</span>
          <span className="value">{ this.tribe }</span>
        </li>
        <li className="status-box-phase">
          <span className="label">Phase</span>
          <span className="value">{ this.phase }</span>
        </li>
      </ul>
    )
  }

}

export default StatusBox;
