
class Description {
  properties = {
    slot: '',
    name: '',
    description: '',
    effects: [],
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
    return this.properties.description;
  }
}

export default Description;
