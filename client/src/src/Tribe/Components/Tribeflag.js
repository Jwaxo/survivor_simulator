import React, { Component } from 'react';
import Utilities from './../../Utilities';

class TribeFlag extends Component {

  tribe = null;

  debug = false;

  constructor(props) {
    super(props);

    if (props.tribe) {
      this.tribe = props.tribe;
    }
  }

  render() {
    const classes = [
      "tribe",
      "tribe-flag",
      this.tribe.getColorName() ?? '',
      `text--${this.tribe.getTextColor()}`,
    ].join(' ').trim();

    if (!this.tribe) return "No Tribe";
    return (
      <div className={ classes }>
        <h3>{ this.tribe.getName() }</h3>
      </div>
    )
  }

}

export default TribeFlag;
