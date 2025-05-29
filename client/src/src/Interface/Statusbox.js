import React from 'react';

function StatusBox({day, time, weather, phase, save, load, player}) {
  return (
    <div className="status-box">
      <ul className="status-box-stats">
        <li className="status-box-stat status-box-day">
          <span className="label">Day</span>
          <span className="value">{ day }</span>
        </li>
        <li className="status-box-stat status-box-time">
          <span className="label">Time</span>
          <span className="value">{ time }</span>
        </li>
        <li className="status-box-stat status-box-weather">
          <span className="label">Weather</span>
          <span className="value">{ weather }</span>
        </li>
        { player !== null ? (
          <>
            <li className="status-box-stat status-box-player">
              <span className="label">Name</span>
              <span className="value">{ player.toLinkText() }</span>
            </li>
            <li className="status-box-stat status-box-tribe">
              <span className="label">Tribe</span>
              <span className="value">{ player.getTribe().toLinkText() }</span>
            </li>
          </>
        ) : '' }
        <li className="status-box-stat status-box-phase">
          <span className="label">Phase</span>
          <span className="value">{ phase }</span>
        </li>
      </ul>
      <div className="status-box-gamestate">
        <button className="gamestate-save" onClick={ () => { save(); } }>Save</button>
        <button className="gamestate-load" onClick={ () => { load(); } }>Load</button>
      </div>
    </div>
  )
}

export default StatusBox;
