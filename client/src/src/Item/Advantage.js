import Item from './Item';

class Advantage extends Item {
  type_properties = {
    hidden: false,
    concealable: false,
  };

  constructor(props) {
    super(props);
    this.properties.type = "advantage";
  }

}

export default Advantage;
