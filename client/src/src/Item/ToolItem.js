import ItemBase from './ItemBase';

class ToolItem extends ItemBase {
  type_properties = {
    concealable: false,
  };

  constructor(props) {
    super(props);
    this.properties.type = "tool";
  }

}

export default ToolItem;
