import { Component } from 'react';
import Utilities from '../Utilities';

class Alliance extends Component {
  properties = {
    players: [],
  }

  render() {
    return Utilities.arrayToString(this.properties.players);
  }

}

export default Alliance;
