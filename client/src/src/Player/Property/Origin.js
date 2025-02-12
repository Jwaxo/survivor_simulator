import { Component } from 'react';

class Origin extends Component {
  properties = {
    city: '',
    state: '',
    state_initial: '',
  };

  constructor(props) {
    super(props);
    if (props) {
      for (const property in props)  {
        if (this.properties.hasOwnProperty(property)) {
          this.properties[property] = props[property];
        }
      };
    }
  }

  render() {
    return this.properties.city + ", " + this.properties.state_initial;
  }

}

export default Origin;
