import Utilities from '../Utilities';

class Tribe {
  properties = {
    name: '',
    color: null,
    losses: 0,
    wins: 0,
    camp: { // Probably ought to be its own variable.
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

    return {
      properties: this.properties,
      assets: assets,
      players,
    }
  }

  load(tribe_info, players) {
    if (tribe_info.hasOwnProperty("properties")) {
      for (const property in tribe_info.properties) {
        if (this.properties.hasOwnProperty(property)) {
          this.properties[property] = tribe_info.properties[property];
        }
      }
    }
    if (tribe_info.players) {
      tribe_info.players.forEach(key => {
        const loaded_player = players.find(player => player.getID() === tribe_info.players[key]);
        if (loaded_player) {
          this.addPlayer(loaded_player);
        }
      })
    }
  }

  addPlayer(player) {
    this.players.push(player);
    player.setTribe(this);
  }

  addPlayers(players = []) {
    players.forEach(player => this.addPlayer(player));
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

  getTextColor() {
    return this.properties.color.hasOwnProperty("dark") && this.properties.color.dark === true ? "white" : "black";
  }

  setColor(color) {
    this.properties.color = color;
  }
}

export default Tribe;
