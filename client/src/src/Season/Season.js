import Player from './../Player/Player';
import Tribe from '../Tribe/Tribe';
import Utilities from '../Utilities';
import Config from '../../Config';
import Scene from '../Scene/Scene';

/**
 * Defines the Season class.
 *
 * A "Season" is a single playthrough of the game Survivor Simulator. All info
 * relevant to that gameplay is contained within the Season. You can think of
 * a Season as a save file, or as a general manager for the rest of the game.
 *
 * @todo: move some generation functions to the relevant classes, like Tribe.
 *
 * Optional arguments:
 * - days
 * - starting_player_count
 * - final_player_count
 * - tribe_count
 * - jury_size
 * - current_day
 * - nickname
 */

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
    days: Config.default_season.days ?? 39,
    starting_player_count: Config.default_season.starting_player_count ?? 18,
    final_player_count: Config.default_season.final_player_count ?? 3,
    tribe_count: Config.default_season.tribe_count ?? 2,
    jury_size: Config.default_season.jury_size ?? 9,
    current_day: Config.default_season.current_day ?? 0,
    nickname: Config.default_season.nickname ?? "Default Season",
  };
  controlledPlayer = null;
  location = null;
  state = {
    log: [],
  };

  // How many minutes each tic is worth.
  timePerTic = Config.timePerTic;
  timestamp = 0;
  timestring = '';

  current_day = 0;

  players = [];
  // @todo: something I'm not doing yet is actually having a defined player
  // character, at the least so I know where the "camera" is and what the
  // interface can see. I need to set this up.
  tribes = [];
  scenes = [];
  active_scene = null;

  constructor(props) {
    if (props) {
      for (const property in props)  {
        if (this.properties.hasOwnProperty(property)) {
          this.properties[property] = props[property];
        }
      };
    }
    // this.advanceTime((60 / this.timePerTic) * 7);
    this.updateTimestring();
  }

  save() {
    const tribes = [];
    const players = [];
    const log = [];

    console.log(`Saving ${this.tribes.length} tribes...`);
    this.tribes.forEach(tribe => {
      tribes.push(tribe.save());
    });

    console.log(`Saving ${this.getPlayerCount()} players...`);
    this.players.forEach(player => {
      players.push(player.save());
    });

    console.log(`Saving ${this.state.log.length} log items...`);
    this.state.log.forEach(logitem => {
      log.push(logitem);
    })

    return {
      properties: this.properties,
      location: this.location !== null ? this.location.save() : null,
      timestamp: this.timestamp,
      current_day: this.current_day,
      controlled_player: this.controlledPlayer.getID(),
      players,
      tribes,
      log,
    }
  }

  load(season_info) {
    this.players = [];
    this.tribes = [];
    this.state.log = [];
    if (season_info.hasOwnProperty("controlled_player")) {
      this.controlledPlayer = this.getPlayerByID(season_info.controlled_player);
    }
    if (season_info.hasOwnProperty("properties")) {
      for (const property in season_info.properties) {
        if (this.properties.hasOwnProperty(property)) {
          this.properties[property] = season_info.properties[property];
        }
      }
    }
    if (season_info.hasOwnProperty("players")) {
      for (const player in season_info.players) {
        console.log("Creating new Player from state...");
        console.log(season_info.players[player]);
        const new_player = this.createPlayer(season_info.players[player]);
        new_player.load(season_info.players[player]); // Process existing injuries/relationships/etc.
      }
    }
    if (season_info.hasOwnProperty("tribes")) {
      for (const tribe in season_info.tribes) {
        const new_tribe = new Tribe(season_info.tribes[tribe].properties);
        new_tribe.load(season_info.tribes[tribe], this.getPlayers());
      }
    }
    if (season_info.hasOwnProperty("log")) {
      for (const logitem in season_info.log) {
        this.addToLog(season_info.log[logitem].message, season_info.log[logitem].day, season_info.log[logitem].time);
      }
    }
  }

  advanceTime(tics = 1) {
    this.timestamp += tics * this.timePerTic;
    this.updateTimestring();
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

  addToLog(message = '', day, time) {
    this.state.log.push({
      day,
      time,
      message
    });
    return this.state.log;
  }

  getLog() {
    return this.state.log;
  }

  createTribeFromPlayers(players = []) {
    const tribe = new Tribe({
      color: this.pickTribeColor(),
      name: this.pickTribeName(),
      config: this.config,
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
      this.tribes.push(this.createTribeFromPlayers(players));
    }
  }

  addScene(scene) {
    this.scenes.push(scene);
  }

  addScenes(scenes) {
    this.scenes = this.scenes + scenes;
  }

  getScenes() {
    return this.scenes;
  }

  getScenesCount() {
    return this.scenes.length;
  }

  setActiveScene(scene) {
    if (!typeof scene === "Scene") {
      throw new Error("Scene Management: Trying to setActiveScene with " + (typeof scene));
    }
    this.active_scene = scene;
  }

  setActiveSceneByIndex(sceneIndex) {
    if (!this.scenes[sceneIndex]) {
      throw new Error("Scene Management: Trying to setActiveSceneByIndex with invalid index of " + sceneIndex)
    }
    this.active_scene = this.scenes[sceneIndex];
  }

  setActiveSceneById(sceneId) {

  }

  getActiveScene() {
    return this.active_scene;
  }

  generateTestScenes() {
    this.getTribes().forEach(tribe => {
      const props = {
        id: this.getScenesCount(),
        name: `${tribe.getName()} Beach`,
        description: `Gentle waves wash against the shore. Placed firmly in the sand is a ${tribe.getColorName()} flag, bearing the name ${tribe.getName()}.`,
      };
      const tribeBeach = new Scene(props);
      this.addScene(tribeBeach);
      const tribeCamp = new Scene({
        id: this.getScenesCount(),
        name: `${tribe.getName()} Camp`,
        description: `A small firepit sits here, neglected. To the side is a bundle of sticks, blankets, and a tarp that one might generously call a shelter.`
      });
      this.addScene(tribeCamp);
      tribeBeach.addConnection(tribeCamp);
      tribeCamp.addConnection(tribeBeach);
      this.setActiveSceneByIndex(0);
    });
  }

  pickPlayerName(gender) {
    if (!gender) {
      throw new Error("Attempting to name player without having set a gender first.");
    }
    let genderKey = gender.machine_name
    if (genderKey === "nonbinary") {
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
    const id = (props && props.hasOwnProperty("id")) ? props.id : this.getPlayerCount() + 1; // Should always go up by one, as long
    // as players can't be removed.

    // If there are no desired props, we randomly generate them.
    if (props === null) {
      console.log(`Randomly generating new player with ID ${id}`);
      new_player = new Player({ id: id});
      new_player.randomlyGenerate();
    }
    else {
      props.id = id; // Just in case props didn't have it.
      console.log(`Generating new player with id ${id} from props ${props}`);
      new_player = new Player(props);
    }

    if (!new_player.getName()) {
      new_player.setName(...this.pickPlayerName(new_player.getGender()));
    }

    this.addPlayer(new_player);
    return new_player;
  }

  addPlayer(player) {
    this.players.push(player);
  }

  getPlayers() {
    return this.players;
  }

  getPlayerByID(id) {
    return this.players.find(player => player.getID() === id);
  }

  getControlledPlayer() {
    return this.controlledPlayer;
  }

  setControlledPlayer(player) {
    this.controlledPlayer = player;
  }

  getPlayerCount() {
    return this.players.length;
  }

  getNick() {
    return this.properties.nickname;
  }

}

export default Season;
