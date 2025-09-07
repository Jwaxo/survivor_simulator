import PlanBase from './PlanBase';
import LocateTask from './Task/LocateTask';
import GotoTask from './Task/GotoTask';
import AcquireTask from './Task/AcquireTask';
import UseTask from './Task/UseTask';
import PlaceTask from './Task/PlaceTask';

/**
 * A Plan that should be straightforward to accomplish and repeat endlessly.
 *
 * Properties:
 * - machine_name (string)
 * - summary (string)
 * - player (Player)
 */

class NeedPlan extends PlanBase {
  player = null;
  need = null;
  storage = {
    need_scene: null, // Scene storage.
    need_container: null, // Container storage.
    need_item: null, // ItemBasestorage.
  }

  constructor(need, player) {
    super(`need_${need.getMachineName()}`, need.getSummary(), 0);
    this.addTasks([
      new LocateTask(need.getMachineName(), player, this.storeLocation),
      new GotoTask(this.storage.need_scene, player),
      new AcquireTask(this.storage.need_item, this.storage.need_container, player),
      new UseTask(this.storage.need_item, player),
      new PlaceTask(this.storage.need_item, this.storage.need_container, player),
    ]);
    this.need = need;
    this.player = player;
  }

  getNeed() {
    return this.need;
  }

  storeLocation({location, item}) {
    this.storage.need_location = location;
    this.storage.need_item = item;
  }

  completePlan() {
    // Basically, start over.
    this.tasks = this.completed_tasks;
    this.completed_tasks = [];
  }

  reweighPlan(tics = 1) {
    this.weight = this.weight + (tics * this.player.getNeed(this.need));
  }
}

export default NeedPlan;
