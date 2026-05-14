import React, { Component } from 'react';

/**
 * Defines the Activity class.
 *
 * An individual action that a Player can take part in. Activities can have
 * requirements, and are always a "one in, one out" event: they start by a
 * Player choosing to participate, and end when the event is ended.
 *
 * Required arguments:
 *
 * Optional arguments:
 */

class ActivityBase {

  properties = {
    name: "activity",
    label: "Take part in Activity",
    summary: "",
  }
  requirements = []; // If these reqs are not met, the Activity is greyed out.
  hiddenRequirements = []; // If these reqs are not met, the Activity is hidden.

  playerList = [];

  constructor(name, label, summary = "This Activity has not yet implemented a Summary.") {
    this.name = name;
    this.label = label;
    this.summary = summary;
  }

  getName() {
    return this.name;
  }

  getLabel() {
    return this.label;
  }

  getSummary() {
    return this.summary;
  }

  useActivity(player) {
    // Expected to be overridden when this Activity is defined.
  }

}

export default ActivityBase;