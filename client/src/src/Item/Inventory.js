
import Clothing from "./Clothing";
import Advantage from "./Advantage";
import Clue from "./Clue";
import Food from "./Food";
import Tool from "./Tool";

/**
 * Defines the Inventory class.
 *
 * Used for any general container of items.
 *
 * @todo: test and utilize this class.
 *
 * Required arguments:
 *
 * Optional arguments:
 */

class Inventory {

  storage = [];

  save() {
    const storage = [];
    storage.forEach(item => {
      storage.push(item.save());
    });
    return {
      storage,
    };
  }

  load(storage) {
    storage.forEach(saved_item => {
      let item = null;

      switch (saved_item.properties.type) {
        case 'advantage':
          item = new Advantage(saved_item);

          break;
        case 'clothing':
          item = new Clothing(saved_item);

          break;
        case 'clue':
          item = new Clue(saved_item);

          break;
        case 'food':
          item = new Food(saved_item);

          break;
        case 'tool':
          item = new Tool(saved_item);

          break;

        default:
          break;
      }

      if (item !== null) {
        this.storage.push(item.load(saved_item));
      }
      else {
        throw new Error("Inventory Load Corruption: Loading item with invalid Type.");
      }
    });
  }
}

export default Inventory;
