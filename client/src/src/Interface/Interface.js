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
  const [time, setTime] = useState({
    timestring: '12:00 AM',
    day: 0,
  });
  const [actions, setActions] = useState([]);
  const [log, setLog] = useState([]);
  const [players, setPlayers] = useState(() => season.getPlayers());
  const [prompt, setPrompt] = useState("");

  // Basically any States that callbacks might need to reference need to be
  // stored in stateRef so that the callbacks see their ACTUAL values instead of
  // the values at the time of the callback's creation.
  const stateRef = useRef();
  stateRef.log = log;
  stateRef.actions = actions;
  stateRef.time = time;
  stateRef.prompt = prompt;

  function advanceTime() {
    season.advanceTime();
    setTime({
      day: season.getDay(),
      timestring: season.getTimestring(),
    });
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
        <Action label={ action.label } type={ action.type ?? 'button' } callback={ action.callback }/>
      ))
    ]);
  }

  function addToLog(message = "") {
    if (message !== "") {
      message = `Day ${stateRef.time.day}, ${stateRef.time.timestring}: ${message}`;
      season.addToLog(message);
      setLog([...season.getLog()]);
    }
  }

  // Functions to run on first render.
  useEffect(() => {
    if (stateRef.actions?.length < 1) {
      addActions([
        {
          label: 'Advance Time',
          callback: () => {
            addToLog("Time passes...");
            advanceTime();
          },
          type: 'button'
        },
        {
          label: 'Add Message',
          callback: () => {
            addToLog("This is a test message!");
          }
        }

      ]);
      setPrompt("Choose a test action:");
    }
  }, []);

  return (
    <div className="interface">
      <div className="interface-inner">
        <div className="interface-panel interface-top">
          <StatusBox day={ time.day } time={ time.timestring } weather="Sunny" tribe="Default" phase="Morning" debug={ debug } />
          <EnviroBox description="It's a sunny day on Challenge Beach. Jeff Probst is here in a resplendent navy blue shirt." debug={ debug } />
        </div>
        <div className="interface-panel interface-main">
          <InfoBox log={ log } debug={ debug } />
        </div>
        <div className="interface-panel interface-side">
          <PlayerBox players={ players } debug={ debug } />
        </div>
        <div className="interface-panel interface-bottom">
          <ActionBox actions={ actions } addAction={ addActions } prompt={ prompt } debug={ debug } />
        </div>
      </div>
    </div>
  )
}
