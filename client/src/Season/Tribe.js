class Tribe {
  properties = {
    name: '',
    losses: 0,
    wins: 0,
    assets: [],
    camp: {
      freshwater: false,
      saltwater: false,
      food: 0, // 1 food is enough for one Player to eat for one Day.
      available_food: 100,
      fishable: false,
      has_fire: false,
      has_water: false,
      shelter_quality: 0, // Range from 0 - 10.
    }
  }
  players = [];

  constructor(props) {
    if (props) {
      for (const property in props) {
        if (this.properties.hasOwnProperty(property)) {
          this.properties[property] = props[property];
        }
      };
    }
  }

  addPlayer(player) {
    this.players.push(player);
    player.setTribe(this);
  }

  addPlayers(players) {
    this.players = this.players.merge(players);
    players.forEach(player => {
      player.setTribe(this);
    })
  }

  getName() {
    return this.properties.name;
  }
}

export default Tribe;
