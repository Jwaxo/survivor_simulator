import './App.css';
import Season from "./Season/Season";
import Interface from "./Interface/Interface";
import seedrandom from 'seedrandom';

const current_season = new Season();
const random_seed = "Random Seed";

function App() {
  seedrandom(random_seed, { global: true});
  return (
    <div className="App">
      <header className="App-header">
        <Interface season={current_season} />
      </header>
    </div>
  );
}

export default App;
