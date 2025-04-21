
class Item {
  type_properties = {};
  properties = {
    id: 0,
    original: '',
    name: '',
    type: '',
  };

  getId() {
    return this.properties.id;
  }
  getOriginal() {
    return this.properties.original;
  }
  getName() {
    return this.properties.name;
  }

  getOwner() {
    return this.owner;
  }
  setOwner(player) {
    this.owner = player;
  }

  getConcealable() {
    if (this.type_properties.hasOwnProperty("concealable")) {
      return this.type_properties.concealable;
    }
    else {
      throw new Error("Tried to get concealable on an item type that does not have a concealable type property.");
    }
  }

  save() {
    return {
      type_properties: this.type_properties,
      properties: this.properties,
      owner: this.owner.getId(),
    }
  }
  load(saved_item) {
    this.type_properties = saved_item.type_properties;
    this.properties = saved_item.properties;
  }
}

export default Item;
