import { useState, useEffect } from 'react';

import Utilities from '../../Utilities';

export default function LinkText({children, popup, color, outline}) {
  const [message, setMessage] = useState('');
  const [hidden, setHidden] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const hidden_class = "hidden";

  useEffect(() => {
    if (typeof children === "string") {
      Utilities.unhideString(children, setMessage, setHidden);
    }
    else if (children.props?.children) {
      Utilities.unhideChildren(children.props.children, 0);
    }
  }, [children]);

  const classes = [
    "linktext",
    isOpen ? "open" : null,
  ].join(' ').trim();

  const textClasses = [
    "linktext--text",
    color ?? '',
    outline ? 'outline' : '',
  ].join(' ').trim();

  function toggleIsOpen() {
    const newState = !isOpen;
    setIsOpen(newState);
  }

  return (
    <span className={ classes }>
      <span className={ textClasses } onClick={ toggleIsOpen }>{ message }<span className={ hidden_class }>{ hidden }</span></span>
      <span className="linktext--popup">{ popup }</span>
    </span>
  )
}
