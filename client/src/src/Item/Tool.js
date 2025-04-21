import Item from './Item';

class Tool extends Item {
  type_properties = {
    concealable: false,
  };

  constructor(props) {
    super(props);
    this.properties.type = "tool";
  }

}

export default Tool;
