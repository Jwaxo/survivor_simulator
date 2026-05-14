import { useEffect } from 'react';
import LogItem from './Logitem';

export default function InfoBox({ log }) {
  let logEnd = null;

  useEffect(() => {
    logEnd.scrollIntoView();
  }, [log])

  return (
    <div className="info-box">
      {log.map((messageinfo, index) => {
        return (
          <LogItem key={ index } active={ index === (log.length - 1) } day={ messageinfo.day} time={ messageinfo.time }>{ messageinfo.message }</LogItem>
        )
      })}
      <div ref={el => { logEnd = el}}></div>
    </div>
  )

}
