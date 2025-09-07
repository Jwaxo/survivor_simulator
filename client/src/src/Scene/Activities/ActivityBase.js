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
    machine_name: "activity",
    name: "Take part in Activity",
    summary: "",
  }
  requirements = []; // If these reqs are not met, the Activity is greyed out.
  hiddenRequirements = []; // If these reqs are not met, the Activity is hidden.

  playerList = [];

  constructor(machine_name, name, summary = "This Activity has not yet implemented a Summary.") {
    this.machine_name = machine_name;
    this.name = name;
    this.summary = summary;
  }

  useActivity(player) {
    // Expected to be overridden when this Activity is defined.
  }

}

export default ActivityBase;