import React, { useState } from 'react';
import ActionBox from './Actionbox';
import EnviroBox from './Envirobox';
import InfoBox from './Infobox';
import PlayerBox from './Playerbox';
import StatusBox from './Statusbox';

import Action from '../Action/Action';

/**
 * The main Interface class holds all UX components within it, and passes any
 * and all user interaction down to the individual components or functions.
 * A typical interaction might look like this:
 * 1. User clicks "advance time one tic".
 * 2. Interface tells the Season to advance time.
 * 3. Interface gets the new time back.
 * 4. Interface updates its own time state.
 * 5. StatusBox naturally updates with the new time.
 */

function Interface({season, timePerTic, debug}) {
  const [time, setTime] = useState('12:00 AM');
  const [actions, setActions] = useState([]);

  if (actions?.length < 1) {
    addAction('Advance Time', () => {
      advanceTime();
    });
  }

  function advanceTime() {
    season.advanceTime();
    setTime(season.getTimestring());
  }

  function addAction(label = 'Action', callback = () => {
    console.log("No callback set for this action.")
  }, type = 'button') {
    setActions([...actions, <Action label={ label } type={ type } callback={ callback }/>
    ]);
  }

  return (
    <div className="interface">
      <div className="interface-inner">
        <div className="interface-panel interface-top">
          <StatusBox day={0} time={ time } weather="Sunny" tribe="Default" phase="Morning" debug={ debug } />
        </div>
        <div className="interface-panel interface-main">
          <EnviroBox />
          <InfoBox log={ season.state.log }/>
        </div>
        <div className="interface-panel interface-side">
          <PlayerBox players={ season.getPlayers() } />
        </div>
        <div className="interface-panel interface-bottom">
          <ActionBox actions={ actions } addAction={ addAction } />
        </div>
      </div>
    </div>
  )
}

export default Interface;
