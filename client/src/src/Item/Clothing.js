
class Clothing extends Item {
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
