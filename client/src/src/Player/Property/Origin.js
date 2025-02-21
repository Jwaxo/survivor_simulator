
import Utilities from './../../Utilities';

const playerOrigins = require("../../../lib/player/origins.json").states;

class Origin {
  city = '';
  state = {
    name: '',
    abbreviation: '',
  };

  constructor(props) {
    if (props) {
      if (props.city) {
        this.city = props.city;
      }
      if (props.state) {
        this.state = props.state;
      }
    }
    else {
      // Randomly generate origin!
      this.state = playerOrigins[Utilities.pickFromRange(playerOrigins.length)];
      this.city = this.state.cities[Utilities.pickFromRange(this.state.cities.length)];
    }
  }

  render() {
    return this.city + ", " + this.state.abbreviation;
  }

}

export default Origin;
