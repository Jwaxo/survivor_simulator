import React, { Component } from 'react';
import Activity from './Activity';

/**
 * Defines the Scene and SceneConnection classes.
 *
 * An individual location or setting that Players can enter and interact with.
 *
 * Required arguments:
 *
 * Optional arguments:
 */

class Scene {

  properties = {
    id: null,
    name: "Scene",
    description: "",
  }

  connections = [];
  players = [];
  activities = [];

  constructor(props) {
    if (props.id !== null) {
      this.properties.id = props.id;
    }
    else {
      throw new Error("Generation Error: Trying to create a Scene without an ID.");
    }
    if (props.name) {
      this.properties.name = props.name;
    }
    else {
      throw new Error("Generation Error: Trying to create a Scene without a name.");
    }

    if (props.description) {
      // It would be cool if the different activities/connections tie into the
      // description, or we have some slightly randomized elements.
      this.properties.description = props.description;
    }

  }

  getId() {
    return this.properties.id;
  }

  getName() {
    return this.properties.name;
  }

  getDescription() {
    return this.properties.description;
  }

  addConnection(scene, hidden = false) {
    const newConnection = new SceneConnection({scene, hidden});
    this.connections.push(newConnection);
  }

  getAllConnections() {
    return this.connections;
  }

  getValidConnections(player) {
    // Check player stats to see which connections they can see.

  }

  addPlayer(player) {
    this.players.push(player);
  }

  addPlayers(players) {
    this.players = this.players + players;
  }

  getPlayers() {
    return this.players;
  }

  addActivity(activity) {
    this.activities.push(activity);
  }

  getActivities() {
    return this.activities;
  }

}

/**
 * Defines a connection between the owner Scene and the target Scene.
 *
 * @todo: make requirements have a purpose.
 */
class SceneConnection {
  scene = null;
  hidden = false;
  requirements = {};

  constructor(props) {
    if (props.scene) {
      this.scene = props.scene;
    }
    else {
      throw new Error("Generation Error: Creating a SceneConnection without a Scene!");
    }
    this.hidden = props.hidden;
  }
}

export default Scene;
