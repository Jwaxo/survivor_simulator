import React from 'react';
import Config from '../Config';

const Utilities = {

  capitalizeString: string => {
    return string.charAt(0).toUpperCase() + string.substring(1);
  },

  arrayToString: properties => {
    return (
      <>
       { properties.join(', ') }
      </>
    );
  },

  arrayToList: properties => {
    return (
      <ul>
        { properties.map((property, index) => (
          <li key={ index }>{ property.render() }</li>
        ))}
      </ul>
    )
  },

  arrayToLabelledList: properties => {
    return (
      <ul>
        { properties.map((property, index) => (
          <li key={ index }><strong>{ index }</strong>: { property.render() }</li>
        )) }
      </ul>
    )
  },

  objectToList: object => {
    const items = [];
    for (const property in object) {
      items.push(<li key={ property }><strong>{ property }</strong>: { object[property] }</li>);
    }

    return (
      <ul>
        { items }
      </ul>
    )
  },

  ticPerDay: () => {
    return 24 * 60 / Config.timePerTic;
  },

  /**
   * Determines character count of a nested React component.
   *
   * This is split into two functions to complete the recursion, so that a dev
   * can either feed Setup an array of Components or directly feed it a
   * Components' children.
   *
   * @param {Array} children
   *   An array mixing both strings and React components.
   * @returns {int}
   *   Total characters in all combined strings.
   */
  characterCountSetup: (children) => {
    let characters = 0;
    // Determine length message needs to render before displaying next message
    // by using same formula Logitem.js uses:
    // (characters_in_strings_count + component_count) * letterFrameLength
    for (let i = 0;i < children.length;i++) {
      characters += Utilities.characterCountLoop(children[i]);
    }

    return characters;
  },

  characterCountLoop: (children) => {
    let characters = 0;
    if (typeof children === 'string') {
      // Easy-peasy: this message is just a string, so we only need its
      // total characters to know how long it will take to render.
      characters += children.length;
    }
    else if (children.props?.children) {
      // This message is probably composed of strings and React components,
      // so we will need to count each of them.
      characters += Utilities.characterCountSetup(children.props.children);
    }

    return characters;
  },

  loadPropertiesFromObject: (destination, source) => {
    if (source.hasOwnProperty("properties")) {
      for (const property in source.properties) {
        if (destination.properties.hasOwnProperty(property)) {
          destination.properties[property] = source.properties[property];
        }
      }
    }
  },

  /**
   * Advance one letter along this LogItem's string, unhiding this character.
   * @param {string} original
   * @param {int} activeLetter
   * @param {int} previous_extra
   *   If the previous child or letter requested a delay before resuming, add.
   */
  unhideString: (original, setMessage, setHidden, activeLetter = 0, previous_extra = 0) => {
    setMessage(original.substring(0, activeLetter));
    setHidden(original.substring(activeLetter));
    if (activeLetter < original.length) {
      setTimeout(() => {
        Utilities.unhideString(original, setMessage, setHidden, activeLetter + 1);
      }, Config.infobox.letterFrameLength + previous_extra);
    }
  },

  /**
   * Advance one child of this LogItem's children array, unhiding this child.
   * @param {*} originalChildren
   * @param {*} activeChild
   */
  unhideChildren: (originalChildren, setMessage, setHidden, activeChild = 0, previous_extra = 0) => {
    const newMessages = originalChildren.slice(0, activeChild);
    const newHidden = originalChildren.slice(activeChild);

    setMessage(newMessages);
    setHidden(newHidden);

    const activeElement = originalChildren[activeChild];
    if (activeChild < originalChildren.length) {
      if (typeof activeElement === "string") {
        // This child is a string, so advance through it to reveal all, then
        // move on to the next child.
        Utilities.unhideChildString(newMessages, newHidden, activeElement, setMessage, setHidden, 0, () => {
          Utilities.unhideChildren(originalChildren, setMessage, setHidden, activeChild + 1);
        }, previous_extra);
      }
      else {
        // This child is probably a React component, so determine its length.
        // @todo: Figure ou
        let extra_length = 0;
        if (activeElement.props?.children) {
          extra_length = Utilities.characterCountLoop(activeElement.props.children);
        }
        setTimeout(() => {
          Utilities.unhideChildren(originalChildren, setMessage, setHidden, activeChild + 1, extra_length * Config.infobox.letterFrameLength);
        }, Config.infobox.letterFrameLength);
      }
    }
  },

  unhideChildString: (originalMessages, originalHidden, originalText, setMessage, setHidden, activeLetter = 0, callback = () => {}, previous_extra = 0) => {
    setMessage(originalMessages.concat([originalText.substring(0, activeLetter)]));
    setHidden([originalText.substring(activeLetter)].concat(originalHidden.slice(1)));

    if (activeLetter < originalText.length) {
      setTimeout(() => {
        Utilities.unhideChildString(originalMessages, originalHidden, originalText, setMessage, setHidden, activeLetter + 1, callback);
      }, Config.infobox.letterFrameLength + previous_extra)
    }
    else {
      callback();
    }
  },

  rollD20: (mod = 0) => {
    return Math.floor(Math.random() * 20) + mod;
  },

  pickFromRange: (length = 100, min = 0) => {
    const max = length - 1;
    return Math.floor(Math.random() * (max - min)) + min;
  },

  /**
   * Given an array, randomly pick an item from that array.
   *
   * @todo: Reqs only work as an OR search. We need to allow AND, or nested
   * reqs.
   *
   * @param {Array} originArray | An array of objects with optional "chance", "reqs",
   * and "variants" parameters.
   * @param {object} reqs | A unique object of values that can be checked against
   * by potential values to remove specific options.
   */
  pickFromArray: (originArray, reqs) => {
    const pickingArray = [];
    let chosen = null;

    for (let element of originArray) {
      // If the reqs are not met by the reqs array, skip this option.
      let has_reqs = true;
      if (element.hasOwnProperty("reqs")) {
        has_reqs = false;
        for (let requirement of element.reqs) {
          if (!requirement.hasOwnProperty("property")) {
            throw new Error("Requirement check: Requirement does not define property to check against.");
          }
          else if (!reqs.hasOwnProperty(requirement.property)) {
            throw new Error("Requirement check: pickFromArray not passed necessary property to check against.");
          }
          if (!requirement.hasOwnProperty("value")) {
            throw new Error("Requirement check: Requirement does not define values to look for.");
          }

          switch (requirement.function) {
            case "equals":
              if (Array.isArray(requirement.value)) {
                if (requirement.value.includes(reqs[requirement.property])) {
                  has_reqs = true;
                }
              }
              else if (reqs[requirement.property] !== requirement.value) {
                has_reqs = true;
              }

              break;

            case "greater":
              if (reqs[requirement.property] <= requirement.value) {
                has_reqs = true;
              }

              break;

            default:
              throw new Error("Requirement check: Requirement missing function, or function not accounted for in Utilities.pickFromArray()!");
          }

          if (has_reqs === true) {
            break;
          }
        };
      }
      if (has_reqs === true) {
        // By default, add a single copy of each element to the picking array.
        // In general, I try to structure the picking array to have a maximum of
        // around 100 elements, so an element with a chance of 10 has a 10%
        // chance of being chosen.
        let loopTotal = 1;
        if (element.hasOwnProperty("chance") && element.chance > 0) {
          loopTotal = element.chance;
        }
        for (let i = 0;i < loopTotal;i++) {
          pickingArray.push(element);
        }
      }
    };
    if (pickingArray.length < 1) {
      throw new Error("Generation error: picking from an empty array! Maybe there are too many reqs?");
    }
    else if (pickingArray.length === 1) {
      chosen = pickingArray[0];
    }
    else {
      chosen = pickingArray[Utilities.pickFromRange(pickingArray.length)];
    }
    if (chosen.hasOwnProperty("variants")) {
      // ...here we go again.
      // Alternately: we have to go deeper!
      const chosen_variant = Utilities.pickFromArray(chosen.variants, reqs);

      // Any properties a variant does not define, that the parent has, needs to
      // be copied down to the variant before sending us back up the recursion.
      for (let prop in chosen) {
        if (prop !== "variants" && !chosen_variant.hasOwnProperty(prop)) {
          chosen_variant[prop] = chosen[prop];
        }
      }
      chosen = chosen_variant;

    }

    return chosen;
  }

}

export default Utilities;
