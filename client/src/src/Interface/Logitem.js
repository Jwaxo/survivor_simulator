import { useState, useEffect } from 'react';

import Utilities from '../Utilities';

export default function LogItem({active, day, time, children}) {
  const [message, setMessage] = useState('');
  const [hidden, setHidden] = useState('');
  const hidden_class = "hidden";
  const prefix = `Day ${day}, ${time}: `;

  useEffect(() => {
    if (typeof children === "string") {
      Utilities.unhideString(prefix + children, setMessage, setHidden);
    }
    else if (children.props?.children) {
      console.log(children.props.children);
      Utilities.unhideChildren([prefix].concat(children.props.children), setMessage, setHidden);
    }
  }, [children]);

  const classes = [
    "info-box-log",
    active ? "info-box-log--active" : '',
  ].join(' ').trim();

  return (
    <div className={ classes }>
      { message }<span className={ hidden_class }>{ hidden }</span>
    </div>
  )

}
