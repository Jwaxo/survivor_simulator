import Player from './../Player/Player';
import Tribe from '../Tribe/Tribe';
import Utilities from '../Utilities';

const tribeColors = require('../../lib/tribe/colors.json');
const tribeNames = require('../../lib/tribe/names.json');

// All player names taken from https://github.com/aruljohn/popular-baby-names/tree/master/1985,
// which is an awesome library I should consider using for more year-accurate
// names.
const playerNames = {
  "first": {
    "male": require("../../lib/player/firstnames_male.json").names,
    "female": require("../../lib/player/firstnames_female.json").names,
    "any": require("../../lib/player/firstnames_any.json").names,
  },
  "last": require("../../lib/player/lastnames.json").names,
  "nick": {
    "male": require("../../lib/player/nicknames_male.json").names,
    "female": require("../../lib/player/nicknames_female.json").names,
    "any": require("../../lib/player/nicknames_any.json").names,
  },
}

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

  // How many minutes each tic is worth.
  timePerTic = 10;
  timestamp = 0;
  timestring = '';

  current_day = 0;
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
    // this.advanceTime((60 / this.timePerTic) * 7);
    this.updateTimestring();
  }

  advanceTime(tics = 1) {
    console.log(`Advancing time by ${tics} ${ tics > 1 ? "tics" : "tic"}`)
    this.timestamp += tics * this.timePerTic;
    this.updateTimestring();
    console.log(`Time is now ${this.getTimestring()}`);
  }

  updateTimestring() {
    const decimalHours = this.timestamp / 60;
    const hours = Math.floor(decimalHours);
    const twelveHour = (hours % 12 === 0 ? '12' : hours % 12).toString();
    let minutes = (this.timestamp % 60).toString();
    if (minutes.length < 2) {
      minutes += "0";
    }
    const amPm = hours % 24 < 12 ? "AM" : "PM";
    this.timestring = `${twelveHour}:${minutes} ${amPm}`;
  }

  getTimestring() {
    return this.timestring;
  }

  getDay() {
    return this.current_day;
  }

  addToLog(message = '') {
    this.state.log.push(message);
    return this.state.log;
  }

  getLog() {
    return this.state.log;
  }

  createTribe(players = []) {
    const tribe = new Tribe({
      color: this.pickTribeColor(),
      name: this.pickTribeName(),
    });
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

  pickTribeColor(colors = tribeColors.colors, depth = 0) {
    let pickedColor = colors.splice(Utilities.pickFromRange(colors.length), 1)[0];
    if (pickedColor.hasOwnProperty("variants")) {
      pickedColor = this.pickTribeColor(pickedColor.variants, depth + 1);
    }
    return pickedColor;
  }

  pickTribeName(names = tribeNames.names) {
    return names.splice(Utilities.pickFromRange(names.length), 1)[0];
  }

  generateTribes() {
    const tribe_size = this.properties.starting_player_count / this.properties.tribe_count;
    if (this.properties.starting_player_count % this.properties.tribe_count > 0) {
      throw new Error(`Players per tribe is ${tribe_size}, an impossible player count.`);
    }
    console.log(`Generating ${this.properties.tribe_count} tribes out of ${this.properties.starting_player_count} players, with ${tribe_size} players per tribe.`)
    for (let i = 0;i < this.properties.tribe_count;i++) {
      const players = [];
      for (let j = 0;j < tribe_size;j++) {
        players.push(this.createPlayer());
      }
      console.log(`Creating new tribe with ${players.length} players`);
      this.createTribe(players);
    }
  }

  pickPlayerName(gender) {
    if (!gender) {
      throw new Error("Attempting to name player without having set a gender first.");
    }
    let genderKey = gender.machine_name
    if (genderKey === "nb") {
      genderKey = "any";
    }

    // When picking names (or anything random) we generally remove the picked
    // item so that it won't appear again.
    return [
      playerNames.first[genderKey].splice(Utilities.pickFromRange(playerNames.first[genderKey]), 1)[0],
      playerNames.last.splice([Utilities.pickFromRange(playerNames.last.length)], 1)[0],
      null,
    ];
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

    if (!new_player.getName()) {
      new_player.setName(...this.pickPlayerName(new_player.getGender()));
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
