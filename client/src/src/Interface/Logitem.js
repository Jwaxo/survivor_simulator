import React from 'react';

function LogItem({active, message}) {

  const classes = [
    "infobox-log",
    active ? "infobox-log--active" : '',
  ].join(' ').trim();

  return (
    <div className={ classes }>
      {message}
    </div>
  )

}

export default LogItem;
