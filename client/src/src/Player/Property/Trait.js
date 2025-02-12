import { Component } from 'react';

class Trait extends Component{
  properties = {
    name: '',
    effect: {
      type: '',
    }
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
    return this.properties.name;
  }

}

export default Trait;
