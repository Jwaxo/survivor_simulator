import './style/app.css';
import { useState } from "react";
import Season from "./src/Season/Season";
import Interface from "./src/Interface/Interface";
import seedrandom from 'seedrandom';
import Utilities from './src/Utilities';

let debug = true;

const config = {
  infobox: {
    multipleLogDelay: 1000,
    letterFrameLength: 20,
  }
};

const season = new Season({ debug, config });
const random_seed = "Random Seed";

seedrandom(random_seed, { global: true});

season.generateTribes();

function App() {

  return (
    <div className="App">
      <Interface season={ season } timePerTic={10} config={ config } debug={ debug }>
      </Interface>
    </div>
  );
}

export default App;
