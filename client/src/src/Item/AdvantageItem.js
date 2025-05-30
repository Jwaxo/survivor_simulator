import ItemBase from './ItemBase';

class AdvantageItem extends ItemBase {
  type_properties = {
    hidden: false,
    concealable: false,
  };

  constructor(props) {
    super(props);
    this.properties.type = "advantage";
  }

}

export default AdvantageItem;
