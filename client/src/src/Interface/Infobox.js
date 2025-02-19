import React from 'react';
import LogItem from './Logitem';

function InfoBox({ log }) {

  return (
    <div className="info-box">
      {log.map((message, index) => {
        return (
          <LogItem key={ index } active={ index === (log.length - 1) } message={ message } />
        )
      })}
    </div>
  )

}

export default InfoBox;
