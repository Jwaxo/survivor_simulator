import React, { Component } from 'react';
import Utilities from './../../Utilities';

class PlayerCard extends Component {

  player = null;

  debug = false;

  constructor(props) {
    super(props);

    if (props.player) {
      this.player = props.player;
    }
  }

  render() {
    if (!this.player) return "";
    return (
      <div className="player-card">
        <h3>{ this.player.nameToString() }</h3>
        <div className="player-info">
          <ul>
            <li key="occupation">{ this.player.properties.occupation.render() }</li>
            <li key="origin">{ this.player.properties.origin.render() }</li>
            <li key="tribe">{ this.player.properties.tribe.getName() }</li>
            { this.player.properties.injuries.length > 0 ? (
              <li key="injuries">{ Utilities.arrayToList(this.player.properties.injuries) } </li>
            ) : '' }
            { this.debug === true ? (
              <>
                <li key="stats">{ this.player.properties.stats.render() }</li>
                <li key="traits">{ Utilities.arrayToString(this.player.properties.traits) }</li>
                <li key="alliances">{ Utilities.arrayToList(this.player.properties.alliances) }</li>
                <li key="relationships">{ Utilities.arrayToList(this.player.properties.relationships) }</li>
              </>
            ) : '' }
          </ul>
        </div>
      </div>
    )
  }

}

export default PlayerCard;
