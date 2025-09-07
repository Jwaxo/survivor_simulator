import KnowledgeBase from "../Knowledge/KnowledgeBase";

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

class Library {

  bank = [];
  keys = {
    example: [],
  };

  constructor(props) {
    return this;
  }

  save() {
    throw new Error("Library.js has not implemented a save function yet!");
  }

  load() {
    throw new Error("Library.js has not implemented a load function yet!");
  }

  addKnowledge(knowledge) {
    // Add the knowledge to our general bank.
    const storage_id = this.bank.push(knowledge);
    // Also add it to the banks of each key.
    knowledge.getTags().forEach(tag => {
      const tag_name = tag.getName();
      if (!this.keys.hasOwnProperty(tag_name)){
        this.keys[tag_name] = [];
      }
      // Set storage_id to the knowledge's location in the keys array, so when
      // the knowledge is removed, it can also be removed from the keys it
      // belongs to.
      // .push() returns length, so subtract 1 to get index.
      // We could do this by looping through every key and deleting if it
      // matches, but this should be a lot quicker.
      tag.setStorageId(this.keys[tag_name].push(knowledge) - 1);

    });
  }

  removeKnowledge(index) {
    const knowledge = this.bank.splice(index, 1);
    knowledge.getTags().forEach(tag => {
      this.keys.splice(tag.getStorageId(),1);
    })
  }
}

export default Library;
