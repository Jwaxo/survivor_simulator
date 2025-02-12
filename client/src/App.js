import './style/app.css';
import { useState } from "react";
import Season from "./src/Season/Season";
import Interface from "./src/Interface/Interface";
import seedrandom from 'seedrandom';
import Utilities from './src/Utilities';

let debug = true;

const current_season = new Season({debug});
const random_seed = "Random Seed";

seedrandom(random_seed, { global: true});

current_season.generateTribes();

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
