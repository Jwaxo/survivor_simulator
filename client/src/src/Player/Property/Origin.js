
import Utilities from './../../Utilities';

const playerOrigins = require("../../../lib/player/origins.json").states;

class Origin {
  properties = {
    city: '',
    state: {
      name: '',
      abbreviation: '',
    },
  }

  constructor(props) {
    if (props) {
      if (props.city) {
        this.properties.city = props.city;
      }
      if (props.state) {
        this.properties.state = props.state;
      }
    }
    else {
      // Randomly generate origin!
      const pickedState = playerOrigins[Utilities.pickFromRange(playerOrigins.length)];
      this.properties.state.name = pickedState.name;
      this.properties.state.abbreviation = pickedState.abbreviation;
      this.properties.city = pickedState.cities[Utilities.pickFromRange(pickedState.cities.length)];
    }
  }

  save() {
    return this.properties;
  }

  render() {
    return this.properties.city + ", " + this.properties.state.abbreviation;
  }

}

export default Origin;
