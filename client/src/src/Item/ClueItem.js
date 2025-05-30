import ItemBase from './ItemBase';

class ClueItem extends ItemBase{
  type_properties = {
    text: "",
  };

  constructor(props) {
    super(props);
    this.properties.type = "clue";
  }

}

export default ClueItem;
