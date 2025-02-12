import Player from './../Player/Player';
import Tribe from '../Tribe/Tribe';

class Season {
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
  state = {
    log: [],
  }

  current_day = null;
  players = [];
  tribes = [];
  debug = false;

  constructor(props) {
    if (props) {
      for (const property in props)  {
        if (this.properties.hasOwnProperty(property)) {
          this.properties[property] = props[property];
        }
      };
    }
    if (props.debug) {
      this.debug = props.debug;
    }
  }

  createTribe(name, players = []) {
    if (this.getTribeByName(name)) {
      throw new Error(`Trying to add a tribe that already exists: ${name}`)
    }
    const tribe = new Tribe({ name: name });
    if (players.length > 0) {
      tribe.addPlayers(players);
    }

    return tribe;
  }

  getTribeByName(name) {
    let target_tribe = null;
    this.tribes.every(tribe => {
      if (tribe.getName() === name) {
        target_tribe = tribe;
        return false;
      }
      return true;
    });
    return target_tribe;
  }

  getTribes() {
    return this.tribes;
  }

  createPlayer(props = null) {
    let new_player = null;
    const id = this.getPlayerCount() + 1; // Should always go up by one, as long
    // as players can't be removed.

    // If there are no desired props, we randomly generate them.
    if (props === null) {
      console.log(`Randomly generating new player with ID ${id}`);
      new_player = new Player({ id: id });
      new_player.randomlyGenerate();
    }
    else {
      props.id = id;
      console.log(`Generating new player from props ${props}`);
      new_player = new Player(props);
    }

    this.addPlayer(new_player);
    return new_player;
  }

  addPlayer(player) {
    if (this.debug) {
      player.setDebug(this.debug);
    }
    this.players.push(player);
  }

  getPlayers() {
    return this.players;
  }

  getPlayerCount() {
    return this.players.length;
  }

}

export default Season;
