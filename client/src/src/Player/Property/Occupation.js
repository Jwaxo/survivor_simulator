
import Utilities from './../../Utilities';

const playerOccupations = require("../../../lib/player/occupations.json").occupations;

class Occupation {
  properties = {
    name: '',
    collar: '',
    bonuses: {},
  }

  constructor(props) {
    if (props) {
      if (props.name) {
        this.properties.name = props.name;
      }
      if (props.collar) {
        this.properties.collar = props.collar;
      }
      if (props.bonuses) {
        this.properties.bonuses = props.bonuses;
      }
    }
    else {
      // Randomly pick an occupation!
      // @todo: implement "chance" probability.
      // In case I've forgotten, this should be a number between 1 and 100
      // that indicates likelihood, or unlikelihood, this item gets picked,
      // where 50 indicates "the same chance as anything else".
      // An item with a chance of 1 is 50x less likely than the normal item.
      let pickedOccupation = playerOccupations[Utilities.pickFromRange(playerOccupations.length)];
      if (pickedOccupation.variants?.length > 0) {
        const possibleVariants = [
          pickedOccupation,
          ...pickedOccupation.variants
        ];
        pickedOccupation = possibleVariants[Utilities.pickFromRange(possibleVariants.length)];
      }
      this.properties.name = pickedOccupation.name;
      this.properties.collar = pickedOccupation.collar;
      this.properties.bonuses = pickedOccupation.bonuses;
    }
  }

  save() {
    return this.properties;
  }

  getName() {
    return this.properties.name;
  }

}

export default Occupation;
