import KnowledgeBase from "../Knowledge/KnowledgeBase";

/**
 * Defines the Library class.
 *
 * Tracks the Knowledge that a Player has accumulated.
 *
 * This class has two properties:
 * - bank: a database of all pieces of Knowledge this Player has.
 * - keys: an indexed database of those Knowledge items, sorted based off of
 *   tags for easy retrieval. For more information see the KnowledgeBase class.
 *   Each "key" is an array of Knowledge. Each Knowledge should track its index
 *   in the Bank and in each Keys array in its StorageId properties.
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
    knowledge.setStorageId(storage_id);
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

  getKnowledge() {
    // Mostly used for debugging;
    return this.bank;
  }

  getKnowledgeByIndex(index) {
    // You better know what you're doing because you're not likely to need to
    // get this.
    return this.bank[index];
  }

  getKnowledgeArrayByTag(tag) {
    // Note: returns an array! Do additional processing to determine which piece
    // of Knowledge is relevant.
    return this.keys[tag];
  }
}

export default Library;
