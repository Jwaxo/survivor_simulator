import Utilities from './../../Utilities';

class Stats {
  properties = {
    base: {
      strength: 0,
      dexterity: 0,
      endurance: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
    },
    skills: {
      athletics: 0,
      swimming: 0,
      climbing: 0,
      cooking: 0,
      orienteering: 0,
      fishing: 0,
      gathering: 0,
      persuasion: 0, // Doubles as public speaking.
      intimidation: 0,
      focus: 0,
      medicine: 0,
      construction: 0,
      seduction: 0,
      stealth: 0, // Mostly social stealth to be honest.
      improvisation: 0,
    },
    status: {
      hunger: 0,
      happy: 100,
      tired: 0,
      clean: 100,
      health: 100,
    }
  }

  constructor(props) {
    if (props.random) {
      this.randomlyGenerate();
    }
  }

  getStat(name) {
    return this.properties[name];
  }

  getBase(name) {
    return this.properties.base[name];
  }

  randomlyGenerate() {
    for (const property in this.properties.base) {
      this.properties.base[property] = Utilities.rollD20();
    }
  }

  renderBaseStats() {
    return Utilities.objectToList(this.properties.base);
  }
  renderStatus() {
    return Utilities.objectToList(this.properties.status);
  }

  render() {
    return (
      <ul>
        <li key="base"><strong>Base Stats:</strong>
          { this.renderBaseStats() }
        </li>
        <li key="status"><strong>Status:</strong>
          { this.renderStatus() }
        </li>
      </ul>
    );
  }

}

export default Stats;
