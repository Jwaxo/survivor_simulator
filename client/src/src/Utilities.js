import React from 'react';
import Config from '../Config';

const Utilities = {

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
  }

}

export default Utilities;
