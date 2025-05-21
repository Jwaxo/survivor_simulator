import { Component } from 'react';
import Utilities from '../../Utilities';

const playerAppearance = require("../../../lib/player/appearance.json");

class Appearance extends Component {
  properties = {
    race: {
      name: "",
      machine_name: "",
      skintone: "",
      is_minority: null
    },
    hair: {
      color: "",
      length: "",
      texture: "",
      style: ""
    },
    height: "",
    eye_color: "",
  }

  constructor(props) {
    super(props);
    if (props) {
      for (const property in props)  {
        if (this.properties.hasOwnProperty(property)) {
          this.properties[property] = props[property];
        }
      }
    }
  }

  save() {
    return this.properties;
  }

  randomlyGenerate(gender, age) {
    const pickedRace = Utilities.pickFromArray(playerAppearance.races);

    this.properties.race = {
      name: pickedRace.name,
      machine_name: pickedRace.machine_name,
      is_minority: pickedRace.is_minority,
      skintone: Utilities.pickFromArray(pickedRace.skintones),
    }

    const pickedHairColor = Utilities.pickFromArray(playerAppearance.hair_colors, {
      "player.gender": gender,
      "player.race": this.properties.race.machine_name,
      "player.age": age,
    });

    const pickedHairLength = Utilities.pickFromArray(playerAppearance.hair_lengths, {
      "player.gender": gender,
    });
    const pickedHairStyle = Utilities.pickFromArray(playerAppearance.hair_styles, {
      "player.hair.length" : pickedHairLength.machine_name,
    });
    const pickedHairTexture = Utilities.pickFromArray(playerAppearance.hair_textures);

    this.properties.hair = {
      color: pickedHairColor.name,
      length: pickedHairLength.name,
      style: pickedHairStyle.name,
      texture: pickedHairTexture.name,
    }

    if (pickedHairStyle.hasOwnProperty("prefix")) {
      this.properties.hair.prefix = pickedHairStyle.prefix;
    }

    this.properties.height = Utilities.pickFromArray(playerAppearance.heights).name;
    this.properties.eye_color = Utilities.pickFromArray(playerAppearance.eye_colors).name;
  }

  renderRace() {
    let skintone = this.properties.race.skintone;
    if (!skintone.includes("skin")) {
      skintone = `${skintone} skin`;
    }

    return `${this.properties.race.name}, ${skintone}`;
  }

  renderHair() {
    const hairlength = this.properties.hair.length;
    const hairtexture = this.properties.hair.texture;
    const haircolor = this.properties.hair.color;
    let hairstyle = this.properties.hair.style;
    if (this.properties.hair.hasOwnProperty("prefix")) {
      hairstyle = `${this.properties.hair.prefix} ${this.properties.hair.style}`;
    }

    return `${Utilities.capitalizeString(hairlength)} and ${hairtexture} ${haircolor} hair, ${hairstyle}`;
  }

  renderDetails() {
    return `${Utilities.capitalizeString(this.properties.height)} with ${this.properties.eye_color} eyes`;
  }

  render() {
    return `${this.renderRace()}, ${this.renderHair()}`;
  }
}

export default Appearance;
