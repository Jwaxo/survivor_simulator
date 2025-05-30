
import ClothingItem from "./ClothingItem";
import AdvantageItem from "./AdvantageItem";
import ClueItem from "./ClueItem";
import FoodItem from "./FoodItem";
import ToolItem from "./ToolItem";

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
          item = new AdvantageItem(saved_item);

          break;
        case 'clothing':
          item = new ClothingItem(saved_item);

          break;
        case 'clue':
          item = new ClueItem(saved_item);

          break;
        case 'food':
          item = new FoodItem(saved_item);

          break;
        case 'tool':
          item = new ToolItem(saved_item);

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
