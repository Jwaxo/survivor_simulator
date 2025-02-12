import Utilities from '../Utilities';
const tribeColors = require('../../lib/tribe/colors.json');
const tribeNames = require('../../lib/tribe/names.json');

class Tribe {
  properties = {
    name: '',
    color: '',
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
    if (!this.getName()) {
      this.setName(this.pickName());
    }
    if (!this.getColor()) {
      this.setColor(this.pickColor());
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

  pickName(names = tribeNames.names) {
    const pickedName = names[Utilities.pickFromRange(names.length)];
    return pickedName;
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

  pickColor(colors = tribeColors.colors) {
    let pickedColor = colors[Utilities.pickFromRange(colors.length)];
    if (pickedColor.hasOwnProperty("variants")) {
      pickedColor = this.pickColor(pickedColor.variants);
    }
    return pickedColor;
  }
}

export default Tribe;
