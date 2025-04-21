
class Item {
  type_properties = {};
  properties = {
    id: 0,
    original: '',
    name: '',
    type: '',
  };
  owner = null;

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
}
