import React, { Component } from 'react';

class LogItem extends Component {
  active = true;
  message = "";

  constructor(props) {
    super(props);
    if (props.active !== null) {
      this.active = props.active;
    }
    if (props.message) {
      this.message = props.message;
    }
  }

  render() {
    const classes = [
      "infobox-log",
      this.active ? "infobox-log--active" : '',
    ].join(' ').trim();
    return (
      <div className={ classes }>
        {this.message}
      </div>
    )
  }

}

export default LogItem;
