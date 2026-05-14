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
      { player !== null ? (
        <>
          <ul className="status-box-needs">
            <li className="status-box-need status-box-food">
              <span className="label">Hunger</span>
              <span className="value">{ player.getNeed('food').getValueClean() }</span>
            </li>
            <li className="status-box-need status-box-water">
              <span className="label">Thirst</span>
              <span className="value">{ player.getNeed('water').getValueClean() }</span>
            </li>
            <li className="status-box-need status-box-energy">
              <span className="label">Energy</span>
              <span className="value">{ player.getNeed('energy').getValueClean() }</span>
            </li>
            <li className="status-box-need status-box-health">
              <span className="label">Health</span>
              <span className="value">{ player.getNeed('health').getValueClean() }</span>
            </li>
            <li className="status-box-need status-box-happy">
              <span className="label">Happiness</span>
              <span className="value">{ player.getNeed('happy').getValueClean() }</span>
            </li>
          </ul>
          <div className="status-box-inventory">
            <span className="label">Inventory</span>
            { player.getInventory().getStorage().length > 0 ? (
              player.getInventory().render()
            ) : ( <span className="value">Empty</span> )}
          </div>
        </>
      ) : null }
      <div className="status-box-gamestate">
        <button className="gamestate-save" onClick={ () => { save(); } }>Save</button>
        <button className="gamestate-load" onClick={ () => { load(); } }>Load</button>
      </div>
    </div>
  )
}

export default StatusBox;
