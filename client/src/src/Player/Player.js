import Occupation from './Property/Occupation';
import Origin from './Property/Origin';
import Race from './Property/Race';
import Relationship from './Property/Relationship';
import Stats from './Property/Stats';
import Trait from './Property/Trait';
import Utilities from '../Utilities';

// All names taken from https://github.com/aruljohn/popular-baby-names/tree/master/1985,
// which is an awesome library I should consider using for more year-accurate
// names.
const playerNames = {
  "first": {
    "male": require("../../lib/player/firstnames_male.json").names,
    "female": require("../../lib/player/firstnames_female.json").names,
    "any": require("../../lib/player/firstnames_any.json").names,
  },
  "last": require("../../lib/player/lastnames.json").names,
  "nick": {
    "male": require("../../lib/player/nicknames_male.json").names,
    "female": require("../../lib/player/nicknames_female.json").names,
    "any": require("../../lib/player/nicknames_any.json").names,
  },
}

const playerGenders = require("../../lib/player/genders.json");

class Player {
  id = 0;
  name = {
    first: '',
    nick: '',
    last: '',
  };
  properties = {
    age: 0,
    gender: null,
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
    this.id = props.id;
    if (props.gender) {
      this.properties.gender = props.gender;
    }
    else {
      this.setGender(this.pickGender());
    }
    if (props.name) {
      this.name.first = props.name.first ?? '';
      this.name.nick = props.name.nick ?? '';
      this.name.last = props.name.last ?? '';
    }
    else {
      this.setName(...this.pickName());
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

  setName(first, last, nick = null) {
    this.name = {
      "first": first,
      "last": last,
    };
    if (nick) {
      this.name.nick = nick;
    }
  }

  nameToString() {
    return this.name.first + ' ' + (this.name.nick ? '"' + this.name.nick + '" ' : '') + this.name.last;
  }

  getNick() {
    return this.name.nick ?? this.name.first;
  }

  pickName(names = playerNames) {
    const gender = this.getGender();
    if (!gender) {
      throw new Error("Attempting to name player without having set a gender first.");
    }
    let genderKey = gender.machine_name
    if (genderKey === "nb") {
      genderKey = "any";
    }
    let firstNames = names.first[genderKey];
    if (genderKey !== "any") {
      firstNames.merge(names.first["any"]);
    }

    console.log(`Naming player ${this.getID()} with gender ${this.getGenderString()}`);
    const name = [
      firstNames[Utilities.pickFromRange(firstNames.length)],
      names.last[Utilities.pickFromRange(names.last.length)],
      null,
    ];
    console.log(`Player ${this.getID()} has been named ${name.join(' ')}`)
    return name;
  }

  getGender() {
    return this.properties.gender;
  }

  getGenderString() {
    return this.getGender().descriptive;
  }

  setGender(gender) {
    this.properties.gender = gender;
  }

  pickGender(genders = playerGenders.genders) {
    const pickedGender = genders[Utilities.pickFromRange(genders.length)];
    return pickedGender;
  }

  getTribe() {
    return this.properties.tribe;
  }

  setTribe(tribe) {
    this.properties.tribe = tribe;
  }

  getColor() {
    return this.properties.tribe.getColorName();
  }

  getTextColor() {
    return this.properties.tribe.getTextColor();
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
    return this.id;
  }

  getTraits() {
    return this.properties.traits;
  }

  addTrait(trait) {
    this.properties.traits.push(trait);
  }

  randomlyGenerate() {
    if (this.properties.age) {
      throw new Error('Trying to generate a player that has already been defined!');
    }
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
