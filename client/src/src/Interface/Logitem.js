import React from 'react';

function LogItem({active, message}) {

  const classes = [
    "info-box-log",
    active ? "info-box-log--active" : '',
  ].join(' ').trim();

  return (
    <div className={ classes }>
      {message}
    </div>
  )

}

export default LogItem;
