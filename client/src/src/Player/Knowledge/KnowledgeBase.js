class KnowledgeBase {
  tags = []; // Array of strings that classify this information.
  storage = {}; // An arbitrary collection of information. "{Greg} {has a/an} {idol}".
  summary = () => {}; // A function to return a string describing the knowledge.

  constructor(tags = [], storage = {}, summary = () => {return "This Knowledge has not implemented a summary function."}) {
    tags.forEach(tag => this.addTag(tag));
    this.storage = {};
    this.summary = summary;
  }

  getTags() {
    return this.tags;
  }

  addTag(name) {
    this.tags.push(new KnowledgeTag(name));
  }

  setTagStorageId(name, id) {
    // Stores the index of this knowledge in its Player's library.
    this.tags.find((tag => name === tag.getName())).setStorageId(id);
  }

  getStorage() {
    return this.storage;
  }

  getSummary() {
    return this.summary();
  }
}

class KnowledgeTag {
  name = '';
  storageId = 0;

  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  getStorageId() {
    return this.storageId;
  }
  setStorageId(id) {
    this.storageId = id;
  }
}

export default KnowledgeBase;
