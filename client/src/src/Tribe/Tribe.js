import Utilities from '../Utilities';

class Tribe {
  properties = {
    name: '',
    color: null,
    losses: 0,
    wins: 0,
    assets: [],
    camp: {
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
