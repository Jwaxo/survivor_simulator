import ItemBase from './ItemBase';

class ClothingItem extends ItemBase {
  type_properties = {
    concealing: false,
  }
  slot = 0;

  constructor(props) {
    super(props);
    this.properties.type = "clothing";
  }

  getSlot() {
    return this.slot;
  }
}

export default ClothingItem;
