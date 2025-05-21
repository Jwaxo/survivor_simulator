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

class Activity {

  properties = {
    id: null,
    name: "Take part in Activity",
    description: "",
  }
  requirements = []; // If these reqs are not met, the Activity is greyed out.
  hiddenRequirements = []; // If these reqs are not met, the Activity is hidden.

  playerList = [];

}

export default Activity;