import React, { Component } from 'react';
import Player from './Player';

class Relationship extends Component {
  properties = {
    target: null, // Player.
    like: 5, // All properties from 0 - 10.
    trust: 5,
    rival: 5,
  }


  constructor(props) {
    super(props);
    if (!props.target || typeof props.target != Player) {
      throw new Error("Creating Relationship without target!");
    }
  }

  getTarget() {
    return this.properties.target;
  }

  modValue(name, mod) {
    if (!this.properties[name]) {
      throw new Error("Trying to mod a nonexistent Relationship value!");
    }
    this.properties[name] += mod;
    if (this.properties[name] <= 0) {
      this.properties[name] = 0;
    }
    else if (this.properties[name] >= 10) {
      this.properties[name] = 10;
    }
  }

  render() {
    return (
      <>
        { this.properties.target.getNick() }: Like { this.properties.like }, Trust { this.properties.trust }, Rival { this.properties.rival }
      </>
    )
  }

}

export default Relationship;
