import Occupation from './Property/Occupation';
import Origin from './Property/Origin';
import Race from './Property/Race';
import Relationship from './Property/Relationship';
import Stats from './Property/Stats';
import Trait from './Property/Trait';

class Player {
  id = 0;
  name = {
    first: '',
    nick: '',
    last: '',
  };
  properties = {
    age: 0,
    origin: null,
    occupation: null,
    race: null,
    tribe: null,
    stats: null,
    description: [],
    traits: [],
    relationships: [],
    alliances: [],
    injuries: [],
    effects: [],
  };
  debug = false;

  constructor(props) {
    if (!props || !props.id) {
      throw new Error("Trying to create Player without ID");
    }
    if (props.name) {
      this.name.first = props.name.first ?? '';
      this.name.nick = props.name.nick ?? '';
      this.name.last = props.name.last ?? '';
    }
    if (props.age) {
      this.properties.age = props.age;
    }
    if (props.debug) {
      this.debug = true;
    }
  }

  setDebug(debug) {
    this.debug = debug;
  }

  nameToString() {
    return this.name.first + ' ' + (this.name.nick ? '"' + this.name.nick + '" ' : '') + this.name.last;
  }

  getNick() {
    return this.name.nick ?? this.name.first;
  }

  getTribe() {
    return this.properties.tribe;
  }

  setTribe(tribe) {
    this.properties.tribe = tribe;
  }

  getOccupation() {
    return this.properties.occupation;
  }

  getRelationship(playerID) {
    this.properties.relationships.forEach(key => {
      if (this.properties.relationships[key].target.getID() === playerID) {
        return this.properties.relationships[key].target;
      }
    });

    // No relationship was found with that Player.
    return false;
  }

  modRelationship(player, value, mod) {
    let targetRelationship = this.getRelationship(player.getID);
    if (!targetRelationship) {
      targetRelationship = new Relationship({ player });
    }
    targetRelationship.modValue(value, mod);
  }

  getID() {
    return this.properties.id;
  }

  getTraits() {
    return this.properties.traits;
  }

  addTrait(trait) {
    this.properties.traits.push(trait);
  }

  randomlyGenerate() {
    if (this.name.first) {
      throw new Error('Trying to generate a player that has already been defined!');
    }
    this.name.first = "Adam";
    this.name.nick = "A-Dog";
    this.name.last = "Aaronson";
    this.properties.age = 24;
    this.properties.origin = new Origin({ city: "Portland", state: "Oregon", state_initial: "OR"})
    this.properties.occupation = new Occupation({ name: 'Student' });
    this.properties.race = new Race({ name: "White"});
    this.properties.stats = new Stats({ random: true });
    this.properties.traits = [
      new Trait({ name: 'Athletic' }),
      new Trait({ name: 'Paranoid' }),
    ];

  }

}

export default Player;
