import React from 'react';

function LogItem({active, day, time, children}) {

  const classes = [
    "info-box-log",
    active ? "info-box-log--active" : '',
  ].join(' ').trim();

  return (
    <div className={ classes }>
      Day { day }, { time }: { children }
    </div>
  )

}

export default LogItem;
