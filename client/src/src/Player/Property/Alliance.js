import { Component } from 'react';
import Utilities from '../Utilities';

class Alliance extends Component {

  properties = {
    id: 0,
    string: "",
    color: "",
  }
  players = [];

  save() {
    const players = [];
    this.players.forEach(key => {
      players.push = this.players[key].getId();
    });
    return {
      properties: this.properties,
      players,
    }
  }

  load(alliance_info, players) {
    Utilities.loadPropertiesFromObject(this, alliance_info);
    if (alliance_info.hasOwnProperty("players")) {
      alliance_info.players.forEach(key => {
        const loaded_player = players.find(player => player.getId() === alliance_info.players[key]);
        if (loaded_player) {
          this.players.push(loaded_player);
        }
      })
    }
  }

  render() {
    return Utilities.arrayToString(this.properties.players);
  }

}

export default Alliance;
