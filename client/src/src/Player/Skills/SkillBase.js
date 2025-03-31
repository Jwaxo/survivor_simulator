
import Utilities from '../../Utilities';

export default class SkillBase {
  properties = {
    name: '', // Machine name.
    label: '', // User-friendly name.
    experience: 0,
    level: 0, // Each level adds 1 mod to skill checks. Easy-peasy.
    attribute: '',
  }

  constructor(props) {
    if (props.name) {
      this.name = props.name;
    }
    if (props.label) {
      this.label = props.label;
    }
    if (props.attribute) {
      this.attribute = props.attribute;
    }
  }

  save() {
    return this.properties;
  }

  getXP() {
    return this.properties.experience;
  }

  setXP(value) {
    this.properties.experience = value;
  }

  getLevel() {
    return this.properties.level;
  }

  setLevel(value) {
    this.properties.level = value
  }

  // You must pass an object of base stats to the Skill to check properly.
  check(stats) {
    let mod = 0;
    if (this.attribute !== '' && stats[this.attribute]) {
      // To determine the modifier of an attribute, divide by 2, round down,
      // and subtract 5.
      mod = Math.floor(stats[this.attribute] / 2) - 5;
    }
    return Utilities.rollD20(this.level + mod);
  }
}
