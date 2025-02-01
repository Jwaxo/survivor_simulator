import { Component } from 'react';
import Player from './../Player/Player';
import Tribe from './Tribe';
import Utilities from './../Utilities';

class Season extends Component {
  properties = {
    days: 39,
    starting_player_count: 18,
    final_player_count: 3,
    tribe_count: 2,
    jury_size: 9,
    location: null,
    current_day_count: 0,
    nickname: "",
  }

  current_day = null;
  players = [];

  constructor(props) {
    super(props);
    if (props) {
      for (const property in props)  {
        if (this.properties.hasOwnProperty(property)) {
          this.properties[property] = props[property];
        }
      };
    }
  }

  render() {
    const test_player = new Player({ id: 1, debug: true });
    const test_tribe = new Tribe({ name: 'Testers' })
    test_player.randomlyGenerate();
    test_tribe.addPlayer(test_player);

    this.players.push(test_player);

    return Utilities.arrayToList(this.players);
  }

}

export default Season;
