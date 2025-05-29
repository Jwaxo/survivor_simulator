import './style/app.css';
import Season from "./src/Season/Season";
import Interface from "./src/Interface/Interface";
import seedrandom from 'seedrandom';

const season = new Season();
const random_seed = "Random Seed";

seedrandom(random_seed, { global: true });

season.generateTribes();
season.generateTestScenes();
season.setControlledPlayer(season.getPlayerByID(1));

function App() {

  return (
    <div className="App">
      <Interface season={ season }>
      </Interface>
    </div>
  );
}

export default App;
