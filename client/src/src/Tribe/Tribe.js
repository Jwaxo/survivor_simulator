import Utilities from '../Utilities';
import LinkText from '../Interface/Components/Linktext';
import TribeFlag from './Components/Tribeflag';

/**
 * Defines the Tribe class.
 *
 * Tracks information for a particular team of Players that live and work
 * together. Doesn't do a lot other than define name and color, but that carries
 * a lot of weight. After merging, there should only be one tribe.
 *
 * @todo: split "camp" to its own class.
 * @todo: move random generators from Season to this class.
 * @todo: rewrite props generator to no just go through all props; that was lazy.
 *
 * Required arguments:
 * - name (string)
 * - color (array)
 *
 * Optional arguments:
 */

class Tribe {
  properties = {
    name: '',
    color: null,
    losses: 0,
    wins: 0,
    camp: { // Probably ought to be its own class.
      freshwater: false,
      saltwater: false,
      food: 0, // 1 food is enough for one Player to eat for one Day.
      available_food: 100,
      fishable: false,
      has_fire: false,
      has_water: false,
      shelter_quality: 0, // Range from 0 - 10.
    }
  }
  assets = [];
  players = [];

  constructor(props) {
    if (props) {
      for (const property in props) {
        if (this.properties.hasOwnProperty(property)) {
          this.properties[property] = props[property];
        }
      };
    }
    if (this.getName() === '') {
      throw new Error("Attempting to create a tribe without a name! Please ensure you are setting a color and name for the tribe.");
    }
    if (this.getColor() === null) {
      throw new Error("Attempting to create a tribe without a color! Please ensure you are setting a color and name for the tribe.");
    }
  }

  save() {
    const players = [];
    const assets = [];

    // For saving Players, we just need to remember their ID. All Player info
    // is otherwise saved in the players key of the saving object.
    this.players.forEach(player => {
      players.push(player.getID());
    });

    console.log(`Saving ${this.getName()} with ${this.players.length} players`);

    return {
      properties: this.properties,
      assets: assets,
      players,
    }
  }

  load(tribe_info, players) {
    Utilities.loadPropertiesFromObject(this, tribe_info);
    if (tribe_info.players) {
      tribe_info.players.forEach((playerID) => {
        const loaded_player = players.find((player) => player.getID() === playerID);
        if (loaded_player) {
          this.addPlayer(loaded_player);
        }
      })
    }
    console.log(`Loaded ${this.getName()} with ${this.players.length} players`);
  }

  addPlayer(player) {
    this.players.push(player);
    player.setTribe(this);
  }

  addPlayers(players = []) {
    players.forEach(player => this.addPlayer(player));
  }

  getPlayers() {
    return this.players;
  }

  getName() {
    return this.properties.name;
  }

  setName(name) {
    this.properties.name = name;
  }

  getColor() {
    return this.properties.color;
  }

  getColorName() {
    return this.properties.color.name;
  }

  getColorDarkness() {
    return this.properties.color.hasOwnProperty("dark") ? "dark" : "light";
  }

  setColor(color) {
    this.properties.color = color;
  }

  toPlayerList() {
    return (
      <ul>
        { this.getPlayers().map((player, index) => {
          return (
            <li key={ index } >
              { player.toLinkText() }
            </li>
          )
        }) }
      </ul>
    )
  }

  toLinkText() {
    return (
      <LinkText popup={this.toPlayerList()} color={this.getColorName()} outline={this.getColorDarkness() === 'light'}>{ this.getName() }</LinkText>
    )
  }

  toTribeFlag() {
    return (
      <TribeFlag tribe={this} />
    );
  }
}

export default Tribe;
