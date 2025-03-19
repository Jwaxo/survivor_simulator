import { useState, useEffect } from 'react';

import Utilities from '../Utilities';

export default function LinkText({children, popup, color, outline}) {
  const [message, setMessage] = useState('');
  const [hidden, setHidden] = useState('');
  const hidden_class = "hidden";

  useEffect(() => {
    if (typeof children === "string") {
      Utilities.unhideString(children, setMessage, setHidden);
    }
    else if (children.props?.children) {
      Utilities.unhideChildren(children.props.children, 0);
    }
  }, [children]);

  if (color === null) {
    color = 'cardinal';
  }

  const classes = [
    "linktext--text",
    color,
    outline ? 'outline' : '',
  ].join(' ').trim();

  return (
    <span className="linktext">
      <span className={ classes }>{ message }<span className={ hidden_class }>{ hidden }</span></span>
      <span className="linktext--popup">{ popup }</span>
    </span>
  )
}
