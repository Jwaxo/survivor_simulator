import React, { Component } from 'react';
import Occupation from './Property/Occupation';
import Origin from './Property/Origin';
import Race from './Property/Race';
import Relationship from './Property/Relationship';
import Stats from './Property/Stats';
import Trait from './Property/Trait';
import Utilities from '../Utilities';

class Player extends Component {
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
    super(props);
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

  render() {

    // This shouldn't be here; Player should not be a component.
    // Should instead make various Player components: a Card, a Teaser, etc.

    return (
      <div className="player">
        <h3>{ this.nameToString() }</h3>
        <div className="player-info">
          <ul>
            <li key="occupation">{ this.properties.occupation.render() }</li>
            <li key="origin">{ this.properties.origin.render() }</li>
            <li key="tribe">{ this.properties.tribe.getName() }</li>
            { this.properties.injuries.length > 0 ? (
              <li key="injuries">{ Utilities.arrayToList(this.properties.injuries) } </li>
            ) : '' }
            { this.debug === true ? (
              <>
                <li key="stats">{ this.properties.stats.render() }</li>
                <li key="traits">{ Utilities.arrayToString(this.properties.traits) }</li>
                <li key="alliances">{ Utilities.arrayToList(this.properties.alliances) }</li>
                <li key="relationships">{ Utilities.arrayToList(this.properties.relationships) }</li>
              </>
            ) : '' }
          </ul>
        </div>
      </div>
    )
  }

}

export default Player;
