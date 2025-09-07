import Occupation from './Property/Occupation';
import Origin from './Property/Origin';
import Appearance from './Property/Appearance';
import Relationship from './Property/Relationship';
import Stats from './Property/Stats';
import Library from './Property/Library';
import PlayerInventory from './Property/PlayerInventory';
import Trait from './Property/Trait';
import Utilities from '../Utilities';

import Linktext from '../Interface/Components/Linktext';
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
    isControlled: false,
  };
  tribe = null;

  gender = null;
  origin = null;
  occupation = null;
  appearance = null;
  stats = null;
  inventory = null;
  library = null;

  scene = null;

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
    this.library = new Library();
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
    const library = this.library.save();

    this.alliances.forEach(alliance => {
      alliances.push(alliance.save());
    });

    return {
      properties: this.properties,
      gender: this.gender,
      origin: this.origin.save(),
      occupation: this.occupation.save(),
      appearance: this.appearance.save(),
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

    if (player_info.hasOwnProperty("appearance")) {
      this.appearance = new Appearance(player_info.appearance);
    }
    else {
      throw new Error("Load Corruption: Trying to load a player with no Appearance.");
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

  setControlled() {
    this.properties.isControlled = true;
  }

  getAge() {
    return this.properties.age;
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
      if (this.relationships[key].target.getId() === playerID) {
        return this.relationships[key].target;
      }
    });

    // No relationship was found with that Player.
    return false;
  }

  modRelationship(player, value, mod) {
    let targetRelationship = this.getRelationship(player.getId());
    if (!targetRelationship) {
      targetRelationship = new Relationship({ player });
    }
    targetRelationship.modValue(value, mod);
  }

  getId() {
    return this.properties.id;
  }

  getTraits() {
    return this.traits;
  }

  addTrait(trait) {
    this.traits.push(trait);
  }

  getStats() {
    return this.stats;
  }

  getStat(stat) {
    return this.stats.getBase(stat);
  }

  getSkill(skill) {
    return this.stats.getSkill(skill);
  }

  getNeed(need) {
    return this.stats.getNeed(need);
  }

  getNeeds() {
    return this.stats.getNeeds();
  }

  getScene() {
    return this.scene;
  }

  setScene(scene) {
    if (this.scene !== null) {
      this.scene.removePlayerById(this.getId());
    }
    this.scene = scene;
    scene.addPlayer(this);
  }

  toPlayerCard() {
    return (
      <PlayerCard player={ this } />
    )
  }

  toLinkText(short = false) {
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
    this.appearance = new Appearance();
    this.appearance.randomlyGenerate(this.getGender().machine_name, this.getAge());
    this.stats = new Stats({ random: true });
    this.traits = [
      new Trait({ name: 'Athletic' }),
      new Trait({ name: 'Paranoid' }),
    ];

  }

}

export default Player;
