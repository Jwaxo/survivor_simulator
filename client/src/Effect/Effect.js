
class Effect {
  properties = {
    name: '',
    description: '',
    stat: '',
    value: 0,
  }

  constructor(props) {
    if (props) {
      for (const property in props)  {
        if (this.properties.hasOwnProperty(property)) {
          this.properties[property] = props[property];
        }
      };
    }
  }

  render() {
    return `${this.properties.name}: ${this.properties.description}`;
  }
}

export default Effect;
