import ItemBase from './ItemBase';

class FoodItem extends ItemBase{
  type_properties = {
    concealable: false,
    need: "hunger",
    base_value: 10,
  };
  age = 0;

  constructor(machine_name, name, need_satisfied, value = '') {
    super(machine_name, name, "food");
    this.type_properties.need = need_satisfied;
    this.type_properties.value = value;
  }

  getNeed() {
    return this.type_properties.need;
  }

  getValue() {
    return this.type_properties.hasOwnProperty("value") ? this.type_properties.value : this.type_properties.base_value;
  }

  use(playerTarget) {
    playerTarget.modNeed(this.getNeed(), this.getValue());
  }

}

export default FoodItem;
