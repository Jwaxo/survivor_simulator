import './App.css';
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

const debugData = Utilities.arrayToList(current_season.getPlayers());

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Interface season={ current_season } timePerTic={10} debug={ debug }>
          { debug ? debugData : '' }
        </Interface>
      </header>
    </div>
  );
}

export default App;
