import React, { Component } from 'react';

class Interface extends Component {
  season = null;

  constructor(props) {
    super(props);
    if (props.season) {
      this.season = props.season;
    }
  }

  render() {
    return (
      <div className="interface">
        <h2>Welcome to Survivor.</h2>
        <p>This season will be {this.season.properties.days} days long.</p>
        <p>Players this season:</p>
        { this.season.render() }
      </div>
    )
  }

}

export default Interface;
