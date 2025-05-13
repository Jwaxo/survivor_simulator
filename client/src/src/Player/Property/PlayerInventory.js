import Inventory from "../../Item/Inventory";

/**
 * Defines the PlayerInventory class.
 *
 * Tracks inventory that a Player has on their person and equipped in their
 * Slots.
 *
 * @todo: test and use this class.
 *
 * Required arguments:
 *
 * Optional arguments:
 */

class PlayerInventory extends Inventory {

  slots = {
    0: new InventorySlot({label: "Hat"}),
    1: new InventorySlot({label: "Eyes"}),
    2: new InventorySlot({label: "Necklace", cardinality: -1}),
    3: new InventorySlot({label: "Shoulders"}),
    4: new InventorySlot({label: "Undershirt"}),
    5: new InventorySlot({label: "Shirt"}),
    6: new InventorySlot({label: "Jacket"}),
    7: new InventorySlot({label: "Gloves"}),
    8: new InventorySlot({label: "Belt"}),
    9: new InventorySlot({label: "Underpants"}),
    10: new InventorySlot({label: "Pants"}),
    11: new InventorySlot({label: "Socks", cardinality: 2}),
    12: new InventorySlot({label: "Shoes"}),
    13: new InventorySlot({label: "Cover"}),
    14: new InventorySlot({label: "Suit"}),
  };

  save() {
    const saved_data = super.save();
    saved_data.slots = {};
    for (let slot in this.slots) {
      saved_data.slots[slot] = this.slots[slot].save();
    }
    return saved_data;
  }

  load(storage, slots) {
    super.load(storage);
    for (let slot in slots) {
      const new_slot = new InventorySlot(slots[slot].properties);
      if (new_slot.hasOwnProperty("inventoryId")) {
        new_slot.load(slots[slot].inventoryId);
      };

      this.slots[slot] = new_slot;
    }
  }
}

class InventorySlot {
  properties = {
    label: '',
    cardinality: 1,
  };
  inventoryId = null; // If there is a value here, an item is equipped in this slot.

  constructor(props) {
    if (props.hasOwnProperty("label")) {
      this.properties.label = props.label;
    }
    else {
      throw new Error("InventorySlot Error: No label given for new InventorySlot item.");
    }

    if (props.hasOwnProperty("cardinality")) {
      this.properties.cardinality = props.cardinality;
    }
  }

  getLabel() {
    return this.properties.label;
  }

  getId() {
    return this.inventoryId;
  }

  load(inventoryId) {
    this.inventoryId = inventoryId;
  }
  save() {
    return {
      properties: this.properties,
      inventoryId: this.getId(),
    }
  }
}

export default PlayerInventory;
