import React, { Component } from 'react';
import PlayerCard from './../Player/Components/Playercard';

class PlayerBox extends Component {

  debug = false;

  constructor(props) {
    super(props);

    if (props.players) {
      this.players = props.players;
    }
  }

  render() {
    return (
      <div className="player-box">
        Players ({ this.players.length })
        {this.players.map((player, index) =>
          <PlayerCard player={ player } key={ index } debug={ this.debug } />
        )}
      </div>
    )
  }

}

export default PlayerBox;
