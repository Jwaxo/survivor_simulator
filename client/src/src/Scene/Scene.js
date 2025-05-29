import React, { Component } from 'react';
import LinkText from '../Interface/Components/Linktext';

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
    // @todo: Check player stats to see which connections they can see.
    return this.getAllConnections();
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

  removePlayerById(id) {
    this.players.splice(this.getPlayers().findIndex(player => player.getId() === id), 1);
  }

  addActivity(activity) {
    this.activities.push(activity);
  }

  getActivities() {
    return this.activities;
  }

  toLinkText() {
    return (
      <LinkText popup={this.players.length > 0 ? this.toPlayerList() : "Unoccupied"}>{ this.getName() }</LinkText>
    )
  }

  toPlayerList() {
    return (
      <ul>
        { this.getPlayers().map((player, index) => {
          return (
            <li key={ index } >
              { player.toLinkText() }
            </li>
          )
        }) }
      </ul>
    )
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
