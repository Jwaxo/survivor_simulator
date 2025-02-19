import React from 'react';
import LogItem from './Logitem';

function InfoBox({ log }) {

  return (
    <div className="infobox">
      {log.map((message, index) => {
        return (
          <LogItem key={ index } active={ index === 0 } message={ message } />
        )
      })}
    </div>
  )

}

export default InfoBox;
