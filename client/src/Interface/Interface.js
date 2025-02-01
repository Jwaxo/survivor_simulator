import React, { Component } from 'react';
import StatusBox from './Statusbox';

class Interface extends Component {
  season = null;
  // How many minutes each
  timePerTic = 10;
  timestamp = 0;
  timestring = '';
  children = null;
  debug = false;

  constructor(props) {
    super(props);
    if (props.season) {
      this.season = props.season;
    }
    if (props.timePerTic) {
      this.timePerTic = props.timePerTic;
    }
    this.updateTimestring();

    if (props.debug === true) {
      // Set time to 7AM.
      this.debug = true;
      this.advanceTime(6 * 7);
    }
    if (props.children) {
      this.children = props.children;
    }
  }

  advanceTime(tics = 1) {
    this.timestamp += tics * this.timePerTic;
  }

  updateTimestring() {
    const decimal = (this.timestamp * this.timePerTic) / 60;
    const hours = Math.floor(decimal);
    const twelveHour = hours % 12 === 0 ? '12' : hours % 12;
    const minutes = (decimal - hours) * 60;
    const amPm = hours % 24 < 12 ? "AM" : "PM";
    this.timestring = `${twelveHour}:${minutes} ${amPm}`;
  }

  render() {
    return (
      <div className="interface">
        <StatusBox day={0} time={ this.timestring } weather="Sunny" tribe="Default" phase="Morning" debug={ this.debug }/>
        <h2>Welcome to Survivor.</h2>
        <p>This season will be {this.season.properties.days} days long.</p>
        <p>Players this season:</p>
        { this.children }
      </div>
    )
  }

}

export default Interface;
