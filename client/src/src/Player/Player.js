import Occupation from './Property/Occupation';
import Origin from './Property/Origin';
import Race from './Property/Race';
import Relationship from './Property/Relationship';
import Stats from './Property/Stats';
import PlayerInventory from './Property/PlayerInventory';
import Trait from './Property/Trait';
import Utilities from '../Utilities';

import Linktext from '../Interface/Linktext';
import PlayerCard from './Components/Playercard';

/**
 * Defines the Player class.
 *
 * A tracker for individual Survivors in the game. NPCs are nothing more than
 * their Player class, while PCs are both Players and Users.
 *
 * @todo: fill out the constructor to actually let custom Players.
 * @todo: allow RandomlyGenerate to fill in missing info, instead of just
 * halting when age is defined.
 *
 * Required arguments:
 * - id (int)
 *
 * Optional arguments:
 * - gender (Gender)
 * - name (object)
 * - age (int)
 */

const playerGenders = require("../../lib/player/genders.json");

class Player {
  // Properties are read-only and cannot have additional functionality.
  properties = {
    id: 0,
    age: 0,
    name: {
      first: '',
      nick: '',
      last: '',
    },
  };
  tribe = null;

  gender = null;
  origin = null;
  occupation = null;
  race = null;
  stats = null;
  inventory = null;

  description = [];
  traits = [];
  relationships = [];
  alliances = [];
  injuries = [];
  effects = [];

  constructor(props) {
    if (!props || !props.id) {
      throw new Error("Trying to create Player without ID");
    }
    this.properties.id = props.id;
    if (props.gender) {
      this.gender = props.gender;
    }
    else {
      this.setGender(this.pickGender());
    }
    if (props.name) {
      this.properties.name.first = props.name.first ?? '';
      this.properties.name.nick = props.name.nick ?? '';
      this.properties.name.last = props.name.last ?? '';
    }
    if (props.age) {
      this.properties.age = props.age;
    }
    this.inventory = new PlayerInventory();
  }

  save() {

    // @todo: as I implement these aspects of the game, I need to save them!
    const description = this.description;
    const traits = this.traits;
    const relationships = this.relationships;
    const alliances = this.alliances;
    const injuries = this.injuries;
    const effects = this.effects;
    const inventory = this.inventory.save();

    this.alliances.forEach(alliance => {
      alliances.push(alliance.save());
    });

    return {
      properties: this.properties,
      gender: this.gender,
      origin: this.origin.save(),
      occupation: this.occupation.save(),
      race: this.race.save(),
      stats: this.stats.save(),
      description,
      traits,
      relationships,
      alliances,
      injuries,
      effects,
      inventory,
    }
  }

  load(player_info) {
    if (player_info.hasOwnProperty("properties")) {
      for (const property in player_info.properties) {
        if (this.properties.hasOwnProperty(property)) {
          this.properties[property] = player_info.properties[property];
        }
      }
    }
    else {
      throw new Error("Load Corruption: Trying to load a player without any properties!");
    }

    if (player_info.hasOwnProperty("gender")) {
      this.gender = player_info.gender;
    }
    else {
      throw new Error("Load Corruption: Trying to load a player without any gender (even genderless).");
    }

    if (player_info.hasOwnProperty("origin")) {
      this.origin = new Origin(player_info.origin);
    }
    else {
      throw new Error("Load Corruption: Trying to load a player with no Origin.");
    }

    if (player_info.hasOwnProperty("occupation")) {
      this.occupation = new Occupation(player_info.occupation);
    }
    else {
      throw new Error("Load Corruption: Trying to load a player with no Occupation.");
    }

    if (player_info.hasOwnProperty("race")) {
      this.race = new Race(player_info.race);
    }
    else {
      throw new Error("Load Corruption: Trying to load a player with no Race.");
    }

    if (player_info.hasOwnProperty("stats")) {
      this.stats = new Stats();
      this.stats.load(player_info.stats);
    }
    else {
      throw new Error("Load Corruption: Trying to load a player with no Stats.");
    }

    if (player_info.hasOwnProperty("inventory")) {
      this.inventory = new PlayerInventory();
      this.inventory.load(player_info.inventory.storage, player_info.inventory.slots);
    }
    else {
      throw new Error("Load Corruption: Trying to load a player with no Inventory.");
    }

  }

  setName(first, last, nick = null) {
    this.properties.name = {
      "first": first,
      "last": last,
    };
    if (nick) {
      this.properties.name.nick = nick;
    }
  }

  getNameString() {
    return this.properties.name.first + ' ' + (this.properties.name.nick ? '"' + this.properties.name.nick + '" ' : '') + this.properties.name.last;
  }

  getName() {
    return this.properties.name.first !== '' ? this.properties.name : null;
  }

  getNick() {
    return this.properties.name.nick ?? this.properties.name.first;
  }

  getGender() {
    return this.gender;
  }

  getGenderString() {
    return this.getGender().descriptive;
  }

  setGender(gender) {
    this.gender = gender;
  }

  pickGender(genders = playerGenders.genders) {
    const pickedGender = genders[Utilities.pickFromRange(genders.length)];
    return pickedGender;
  }

  getTribe() {
    return this.tribe;
  }

  setTribe(tribe) {
    this.tribe = tribe;
  }

  getColor() {
    return this.tribe.getColorName();
  }

  getColorDarkness() {
    return this.tribe.getColorDarkness();
  }

  getOccupation() {
    return this.occupation;
  }

  getRelationship(playerID) {
    this.relationships.forEach(key => {
      if (this.relationships[key].target.getID() === playerID) {
        return this.relationships[key].target;
      }
    });

    // No relationship was found with that Player.
    return false;
  }

  modRelationship(player, value, mod) {
    let targetRelationship = this.getRelationship(player.getID());
    if (!targetRelationship) {
      targetRelationship = new Relationship({ player });
    }
    targetRelationship.modValue(value, mod);
  }

  getID() {
    return this.properties.id;
  }

  getTraits() {
    return this.traits;
  }

  addTrait(trait) {
    this.traits.push(trait);
  }

  toPlayerCard() {
    return (
      <PlayerCard player={ this } />
    )
  }

  toLinktext(short = false) {
    return (
      <Linktext popup={this.toPlayerCard()} color={this.getColor()} outline={this.getColorDarkness() === 'light'}>{short ? this.getNick() : this.getNameString()}</Linktext>
    )
  }

  randomlyGenerate() {
    if (this.properties.age) {
      throw new Error('Trying to generate a player that has already been defined!');
    }
    this.properties.age = 24;
    this.origin = new Origin();
    this.occupation = new Occupation();
    this.race = new Race({ name: "White"});
    this.stats = new Stats({ random: true });
    this.traits = [
      new Trait({ name: 'Athletic' }),
      new Trait({ name: 'Paranoid' }),
    ];

  }

}

export default Player;
