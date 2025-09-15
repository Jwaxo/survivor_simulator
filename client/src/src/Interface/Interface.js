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
  const [controlledPlayer, setControlledPlayer] = useState(null);

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

    const connections = scene.getValidConnections();

    clearActions();

    addActions('Travel to...', connections.map(connected => {
      return new Action(
        connected.scene.toLinkText(),
        () => {
          season.setActiveScene(connected.scene);
          loadActiveScene(connected.scene);
        }
      )
    }));

    if (Config.debug) {
      loadDebugActions();
    }
  }

  function loadDebugActions() {
    addActions('debug', [
      new Action(
        'Advance Time', () => {
          addToLog("Time passes...");
          advanceTime();
          console.log(`Now on tic ${season.timestamp / season.timePerTic}`)
        }
      ),
      new Action(
        'Advance Time (x2)',
        () => {
          addMultipleToLog(['Time passes a lot...', 'For real...']);
          advanceTime();
          console.log(`Now on tic ${season.timestamp / season.timePerTic}`)
          advanceTime();
          console.log(`Now on tic ${season.timestamp / season.timePerTic}`)
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
                { player1.toLinkText()} is going to fight { player2.toLinkText() }!
              </>
            ),
            (
              <>
                { winner.toLinkText() } wins, with a score of { winningscore }. { loser.toLinkText() } loses with a score of { losingscore }.
              </>
            )
          ]);
        }
      )
    ]);
  }

  function advanceTime() {
    season.advanceTime();
    setTime({
      day: season.getDay(),
      timestring: season.getTimestring(),
    });
  }

  /**
   * Add a single action to the actionCategory defined.
   *
   * Creates the Action object for you.
   *
   * @param {string} category
   * @param {string} label
   * @param {function} callback
   * @param {string} type
   */
  function addAction(category = 'debug', label = 'Action', callback = () => {
    console.log("No callback set for this action.")
  }, type = null) {
    addActions(category, [
      new Action(label, callback, type),
    ]);
  }

  /**
   * Add an array of actions to the actionCategory defined.
   *
   * Does not create each Action object for you.
   *
   * @param {string} category
   * @param {Array} newActions
   */
  function addActions(category = 'debug', newActions = []) {
    // Pull down the current categories, process them into a fresh array (to
    // prevent weird React state issues), then set the state AND the stateRef
    // so they don't conflict.
    const existingCategories = [...stateRef.actionCategories];
    const updatedCategories = [];
    let added = false;
    existingCategories.forEach(actionCategory => {
      if (actionCategory.category === category && Array.isArray(actionCategory.actions)) {
        actionCategory.actions.concat(newActions);
        added = true;
      }
      updatedCategories.push(actionCategory);
    });
    if (!added) {
      updatedCategories.push(new ActionCategory(category, newActions));
    }
    stateRef.actionCategories = updatedCategories;
    setActionCategories(updatedCategories);
  }

  function clearActions() {
    stateRef.actionCategories = [];
    setActionCategories([]);
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
    loadActiveScene(season.getActiveScene());
    setControlledPlayer(season.getControlledPlayer());
  }, [players, season]);

  return (
    <div className="interface">
      <div className="interface-inner">
        <div className="interface-panel interface-top">
          <StatusBox day={ time.day } time={ time.timestring } weather="Sunny" tribe="Default" phase="Morning" save={ save } load={ load } player={ controlledPlayer } />
          <EnviroBox scene={ activeScene } />
        </div>
        <div className="interface-panel interface-main">
          <InfoBox log={ log } />
        </div>
        <div className="interface-panel interface-side">
          <PlayerBox players={ activeScene ? activeScene.getPlayers() : [] } />
        </div>
        <div className="interface-panel interface-bottom">
          <ActionBox disabled={ frozen } categories={ actionCategories } addAction={ addActions } prompt={ prompt } />
        </div>
      </div>
    </div>
  )
}
