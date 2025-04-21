import Item from './Item';

class Food extends Item {
  type_properties = {
    concealable: false,
    base_value: 10,
  };
  age = 0;

  constructor(props) {
    super(props);
    this.properties.type = "food";
  }

}

export default Food;
