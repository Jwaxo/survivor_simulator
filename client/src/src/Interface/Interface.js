import { useState, useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';
import ActionBox from './Actionbox';
import EnviroBox from './Envirobox';
import InfoBox from './Infobox';
import PlayerBox from './Playerbox';
import StatusBox from './Statusbox';

import Utilities from '../Utilities';
import Config from '../../Config';

import ActionCategory from '../Action/ActionCategory';
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

export default function Interface({season}) {
  const [time, setTime] = useState({
    timestring: '12:00 AM',
    day: 0,
  });
  const [actionCategories, setActionCategories] = useState([]);
  const [log, setLog] = useState([]);
  const [players, setPlayers] = useState(() => season.getPlayers());
  const [prompt, setPrompt] = useState("");
  const [frozen, setFrozen] = useState(false);
  const [activeScene, setActiveScene] = useState();

  // @todo: Add ability to save and load more than one season, and allow
  // special characters in names (spaces currently break it).
  const season_name = "Test";

  const [cookies, setCookie] = useCookies([season_name]);

  // Basically any States that callbacks might need to reference need to be
  // stored in stateRef so that the callbacks see their ACTUAL values instead of
  // the values at the time of the callback's creation.
  const stateRef = useRef();
  stateRef.log = log;
  stateRef.actionCategories = actionCategories;
  stateRef.time = time;
  stateRef.prompt = prompt;

  function save() {
    console.log("Saving...");
    const saved_season = season.save();
    setCookie(season_name, saved_season);

    console.log(cookies);
  }

  function load() {
    console.log("Loading...");
    console.log(cookies);
    const loaded_season = cookies[season_name];
    season.load(loaded_season);
  }

  function loadActiveScene(scene) {
    setActiveScene(scene);
  }

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
    setActionCategories(
      [
        ...stateRef.actionCategories,
        <Action label={ label } type={ type } callback={ callback }/>
      ]
    );
  }

  function addActions(category = 'debug', newActions = []) {
    const tempActions = [...stateRef.actionCategories];
    const existingCategory = tempActions.findIndex(x => x.category === category);
    if (existingCategory >= 0) {
      tempActions[existingCategory].push(...newActions);
    }
    else {
      tempActions.push(new ActionCategory(category, newActions));
    }
    setActionCategories(tempActions);
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

  function addMultipleToLog(messages = []) {
    if (messages.length > 0) {
      if (messages.length === 1) {
        addToLog(messages[0]);
      }
      else {
        // Prevent input until logs are all displayed.
        setFrozen(true);
        logAddLoop(messages, () => {
          setFrozen(false);
        });
      }
    }
  }

  function logAddLoop(messages, finalCallback) {
    addToLog(messages[0]);
    if (messages[1]) {
      let delay = Config.infobox.multipleLogDelay;

      delay += (Utilities.characterCountLoop(messages[0]) * Config.infobox.letterFrameLength)
      setTimeout(() => {
        messages.shift();
        logAddLoop(messages, finalCallback);
      }, delay);
    }
    else {
      finalCallback();
    }
    return;
  }

  // Functions to run on first render.
  useEffect(() => {
    if (Config.debug === true) {
      addActions('debug', [
        new Action(
          'Advance Time', () => {
            addToLog("Time passes...");
            advanceTime();
          }
        ),
        new Action(
          'Advance Time (x2)',
          () => {
            addMultipleToLog(['Time passes a lot...', 'For real...']);
            advanceTime();
            advanceTime();
          }
        ),
        new Action(
          'Test Fight',
          () => {
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
                  { winner.toLinktext() } wins, with a score of { winningscore }. { loser.toLinktext() } loses with a score of { losingscore }.
                </>
              )
            ]);
          }
        )
      ]);
      setPrompt("Choose a test action:");
    }
    setActiveScene(season.getActiveScene());
  }, [players, season]);

  return (
    <div className="interface">
      <div className="interface-inner">
        <div className="interface-panel interface-top">
          <StatusBox day={ time.day } time={ time.timestring } weather="Sunny" tribe="Default" phase="Morning" save={ save } load={ load }/>
          <EnviroBox scene={ activeScene } />
        </div>
        <div className="interface-panel interface-main">
          <InfoBox log={ log } />
        </div>
        <div className="interface-panel interface-side">
          <PlayerBox players={ players } />
        </div>
        <div className="interface-panel interface-bottom">
          <ActionBox disabled={ frozen } categories={ actionCategories } addAction={ addActions } prompt={ prompt } />
        </div>
      </div>
    </div>
  )
}
