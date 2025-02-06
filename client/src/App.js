import './App.css';
import { useState } from "react";
import Season from "./Season/Season";
import Interface from "./Interface/Interface";
import seedrandom from 'seedrandom';
import Utilities from './Utilities';

let debug = true;

const current_season = new Season({debug});
const random_seed = "Random Seed";

seedrandom(random_seed, { global: true});

const test_player = current_season.createPlayer();
const test_tribe = current_season.createTribe('Testers');
test_tribe.addPlayer(test_player);

function App() {

  const [log, setLog] = useState([]);
  const logger = {
    addToLog : (message) => {
      setLog([ message, ...log ]);
    }
  };

  if (log.length < 1) {
    logger.addToLog("A new season begins!");
  }
  if (log.length === 1) {
    logger.addToLog("Welcome new players.");
  }

  return (
    <div className="App">
      <header className="App-header">
        <Interface logger={ logger } season={ current_season } timePerTic={10} debug={ debug } log={ log }>
        </Interface>
      </header>
    </div>
  );
}

export default App;
