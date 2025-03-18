import { useState, useEffect, useRef } from 'react';
import ActionBox from './Actionbox';
import EnviroBox from './Envirobox';
import InfoBox from './Infobox';
import PlayerBox from './Playerbox';
import StatusBox from './Statusbox';

import Utilities from '../Utilities';

import Action from '../Action/Action';
import LinkText from './Linktext';
import LogItem from './Logitem';

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
  const [frozen, setFrozen] = useState(false);

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
    if (typeof message === Array) {
      message = message.join();
    }
    if (message !== "") {
      season.addToLog(message, stateRef.time.day, stateRef.time.timestring);
      setLog([...season.getLog()]);
    }
  }

  function addMultipleToLog(messages = [], delay = 1000) {
    if (messages.length > 0) {
      if (messages.length === 1) {
        addToLog(messages[0]);
      }
      else {
        // Prevent input until logs are all displayed.
        setFrozen(true);
        logLoop(messages, delay, () => {
          setFrozen(false);
        });
      }
    }
  }

  function logLoop(messages, delay, finalCallback) {
    // Need to have some way of LogItem reporting back when it's done rendering
    // so that Interface knows to add the next item. Until then, maybe best to
    // not add multiple messages at once.
    addToLog(messages[0]);
    if (messages[1]) {
      setTimeout(() => {
        messages.shift();
        logLoop(messages, delay, finalCallback);
      }, delay);
    }
    else {
      finalCallback();
    }
    return;
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
          label: 'Test Fight',
          callback: () => {
            const testPlayers = [...players];
            let player1 = testPlayers.splice(Utilities.pickFromRange(players.length), 1);
            player1 = player1[0];
            const player2 = testPlayers[Utilities.pickFromRange(players.length)];
            const player1result = player1.stats.checkSkill('fight', 0);
            const player2result = player2.stats.checkSkill('fight', 0);
            let winner = null;
            let loser = null;
            let winningscore = null;
            let losingscore = null;
            if (player1result > player2result) {
              winner = player1;
              loser = player2;
              winningscore = player1result;
              losingscore = player2result;
            }
            else {
              winner = player2;
              loser = player1;
              winningscore = player2result;
              losingscore = player1result;
            }
            addMultipleToLog([
              (
                <>
                  { player1.toLinktext()} is going to fight { player2.toLinktext() }!
                </>
              ),
              (
                <>
                  { winner.toLinktext() } wins, with a score of { winningscore }. { loser.toLinktext() } loses with a score of { losingscore },
                </>
              )
            ]);
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
          <ActionBox disabled={ frozen } actions={ actions } addAction={ addActions } prompt={ prompt } debug={ debug } />
        </div>
      </div>
    </div>
  )
}
