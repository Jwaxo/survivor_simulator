import Occupation from './Property/Occupation';
import Origin from './Property/Origin';
import Race from './Property/Race';
import Relationship from './Property/Relationship';
import Stats from './Property/Stats';
import Trait from './Property/Trait';
import Utilities from '../Utilities';

import Linktext from '../Interface/Linktext';
import PlayerCard from './Components/Playercard';
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
  }

  save() {

    const description = this.description;
    const traits = this.traits;
    const relationships = this.relationships;
    const alliances = this.alliances;
    const injuries = this.injuries;
    const effects = this.effects;

    // @todo: need to go through each Property array above and make save/load.

    this.alliances.forEach(alliance => {
      alliances.push(alliance.save());
    });

    // @todo: none of the .save() functions below work without error.

    return {
      properties: this.properties,
      gender: this.gender.save(),
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
    return this.properties.name.nick ?? this.properties.properties.name.first;
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

  getTextColor() {
    return this.tribe.getTextColor();
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
      <Linktext popup={this.toPlayerCard()} color={this.getTribe().getColorName()} outline={this.getTribe().getTextColor() === 'black'} >{short ? this.getNick() : this.getNameString()}</Linktext>
    )
  }

  randomlyGenerate() {
    if (this.properties.age) {
      throw new Error('Trying to generate a player that has already been defined!');
    }
    this.properties.age = 24;
    this.origin = new Origin()
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
