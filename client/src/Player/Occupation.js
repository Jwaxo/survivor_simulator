import { Component } from 'react';

class Occupation extends Component {
  properties = {
    name: '',
    collar: '',
  }

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
    return this.properties.name;
  }
}

export default Occupation;
