import { useState, useEffect } from 'react';

export default function LogItem({active, day, time, children}) {
  const [message, setMessage] = useState('');
  const [hidden, setHidden] = useState('');
  const frame_length = 20;
  const hidden_class = "hidden";
  const prefix = `Day ${day}, ${time}: `;

  useEffect(() => {
    if (typeof children === "string") {
      advanceLetter(prefix + children, 0);
    }
    else if (children.props?.children) {
      advanceChild([prefix].concat(children.props.children), 0);
    }
  }, [children]);

  const classes = [
    "info-box-log",
    active ? "info-box-log--active" : '',
  ].join(' ').trim();

  function advanceLetter(original, activeLetter) {
    setMessage(original.substring(0, activeLetter));
    setHidden(original.substring(activeLetter));
    if (activeLetter < original.length) {
      setTimeout(() => {
        advanceLetter(original, activeLetter + 1);
      }, frame_length)
    }
  }

  function advanceChild(originalChildren, activeChild) {
    const newMessages = originalChildren.slice(0, activeChild);
    const newHidden = originalChildren.slice(activeChild);
    setMessage(newMessages);
    setHidden(newHidden);

    const activeElement = originalChildren[activeChild];
    if (typeof activeElement === "string") {
      advanceChildLetter(newMessages, newHidden, activeElement, 0, () => {
        advanceChild(originalChildren, activeChild + 1);
      });
    }
    else {
      setTimeout(() => {
        advanceChild(originalChildren, activeChild + 1);
      }, frame_length);
    }
  }

  function advanceChildLetter(originalMessages, originalHidden, originalText, activeLetter, callback) {
    setMessage(originalMessages.concat([originalText.substring(0, activeLetter)]));
    setHidden([originalText.substring(activeLetter)].concat(originalHidden.slice(1)));

    if (activeLetter < originalText.length) {
      setTimeout(() => {
        advanceChildLetter(originalMessages, originalHidden, originalText, activeLetter + 1, callback);
      }, frame_length)
    }
    else {
      callback();
    }
  }

  return (
    <div className={ classes }>
      { message }<span className={ hidden_class }>{ hidden }</span>
    </div>
  )

}
