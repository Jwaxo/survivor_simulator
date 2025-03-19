import React from 'react';

function StatusBox({day, time, weather, tribe, phase}) {
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
        <li className="status-box-stat status-box-tribe">
          <span className="label">Tribe</span>
          <span className="value">{ tribe }</span>
        </li>
        <li className="status-box-stat status-box-phase">
          <span className="label">Phase</span>
          <span className="value">{ phase }</span>
        </li>
      </ul>
    </div>
  )
}

export default StatusBox;
