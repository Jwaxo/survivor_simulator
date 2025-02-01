import React, { Component } from 'react';

class StatusBox extends Component {
  state = {
    day: 0,
    time: '',
    weather: '',
    tribe: '',
    phase: '',
  }
  debug = false;

  constructor(props) {
    super(props);

    if (props.day) {
      this.state.day = props.day;
    }
    if (props.time) {
      this.state.time = props.time;
    }
    if (props.weather) {
      this.state.weather = props.weather;
    }
    if (props.tribe) {
      this.state.tribe = props.tribe;
    }
    if (props.phase) {
      this.state.phase = props.phase;
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
          <span className="value">{ this.state.day }</span>
        </li>
        <li className="status-box-time">
          <span className="label">Time</span>
          <span className="value">{ this.state.time }</span>
        </li>
        <li className="status-box-weather">
          <span className="label">Weather</span>
          <span className="value">{ this.state.weather }</span>
        </li>
        <li className="status-box-tribe">
          <span className="label">Tribe</span>
          <span className="value">{ this.state.tribe }</span>
        </li>
        <li className="status-box-phase">
          <span className="label">Phase</span>
          <span className="value">{ this.state.phase }</span>
        </li>
      </ul>
    )
  }

}

export default StatusBox;
