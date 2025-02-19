import './style/app.css';
import { useState } from "react";
import Season from "./src/Season/Season";
import Interface from "./src/Interface/Interface";
import seedrandom from 'seedrandom';
import Utilities from './src/Utilities';

let debug = true;

const season = new Season({debug});
const random_seed = "Random Seed";

seedrandom(random_seed, { global: true});

season.generateTribes();

if (season.state.log.length < 1) {
  season.addToLog("A new season begins!");
}
if (season.state.log.length === 1) {
  season.addToLog("Welcome new players.");
}

// Advance Time isn't bubbling up to the StatusBox as expected.
// Updating time changes the State of Season--but since Season isn't rendering
// StatusBox, that doesn't matter. Interface handling Time would update
// everything accordingly. So maybe Interface handles moving the information
// about based on player interaction, and state tracks that info--but doesn't
// bubble it back up to Interface.


function App() {

  return (
    <div className="App">
      <Interface season={ season } timePerTic={10} debug={ debug }>
      </Interface>
    </div>
  );
}

export default App;
