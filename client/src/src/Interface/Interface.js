import { useState, useEffect, useRef } from 'react';
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

export default function Interface({season, timePerTic, debug}) {
  const [time, setTime] = useState('12:00 AM');
  const [actions, setActions] = useState([]);
  const [log, setLog] = useState([]);
  const [players, setPlayers] = useState(() => season.getPlayers());
  const stateRef = useRef();
  stateRef.log = log;
  stateRef.actions = actions;

  function advanceTime() {
    season.advanceTime();
    setTime(season.getTimestring());
  }

  function addAction(label = 'Action', callback = () => {
    console.log("No callback set for this action.")
  }, type = 'button') {
    setActions([...stateRef.actions, <Action label={ label } type={ type } callback={ callback }/>
    ]);
  }

  function addActions(newActions = []) {
    setActions([...stateRef.actions,
      ...newActions.map(action => (
        <Action label={ action.label } type={ action.type } callback={ action.callback }/>
      ))
    ]);
  }

  function addToLog(message = "") {
    if (message !== "") {
      season.addToLog(message);
      setLog([...stateRef.log, message]);
    }
  }

  // Functions to run on first render.
  useEffect(() => {
    if (stateRef.actions?.length < 1) {
      addActions([
        {
          label: 'Advance Time',
          callback: () => {
            advanceTime();
          },
          type: 'button'
        },
        {
          label: 'Add Action',
          type: 'button',
          callback: () => {
            addAction('Add Message', () => {
              addToLog("Adding a new log entry");
            })
          }
        }
      ]);
    }
  }, []);

  return (
    <div className="interface">
      <div className="interface-inner">
        <div className="interface-panel interface-top">
          <StatusBox day={0} time={ time } weather="Sunny" tribe="Default" phase="Morning" debug={ debug } />
        </div>
        <div className="interface-panel interface-main">
          <EnviroBox />
          <InfoBox log={ log }/>
        </div>
        <div className="interface-panel interface-side">
          <PlayerBox players={ players } />
        </div>
        <div className="interface-panel interface-bottom">
          <ActionBox actions={ actions } addAction={ addActions } />
        </div>
      </div>
    </div>
  )
}
