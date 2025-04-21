import Item from './Item';

class Clue extends Item {
  type_properties = {
    text: "",
  };

  constructor(props) {
    super(props);
    this.properties.type = "clue";
  }

}

export default Clue;
