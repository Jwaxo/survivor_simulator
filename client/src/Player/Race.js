import { Component } from 'react';

class Race extends Component {
  properties = {
    name: '',
    is_minority: false,
  }

  constructor(props) {
    super(props);
    if (props) {
      for (const property in props)  {
        if (this.properties.hasOwnProperty(property)) {
          this.properties[property] = props[property];
        }
      }
    }
  }

  render() {
    return this.properties.name;
  }
}

export default Race;
