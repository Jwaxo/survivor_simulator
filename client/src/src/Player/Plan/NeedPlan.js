import PlanBase from './PlanBase';
import TaskLocate from './Task/LocateTask';
import TaskGoto from './Task/GotoTask';
import TaskAcquire from './Task/AcquireTask';
import TaskUse from './Task/UseTask';
import TaskPlace from './Task/PlaceTask';

class NeedPlan extends PlanBase {
  player = null;
  need = "water";
  storage = {
    need_scene: null, // Scene storage.
    need_container: null, // Container storage.
    need_item: null, // ItemBasestorage.
  }

  constructor(need, summary, player) {
    super(`need_${need}`, summary, 0, [
      new TaskLocate(need, this.storeLocation),
      new TaskGoto(this.storage.need_scene),
      new TaskAcquire(this.storage.need_item, this.storage.need_container),
      new TaskUse(this.storage.need_item),
      new TaskPlace(this.storage.need_item, this.storage.need_container),
    ]);
    this.need = need;
    this.player = player;

  }

  storeLocation(location, item) {
    this.storage.need_location = location;
    this.storage.need_item = item;
  }

  completePlan() {
    // Basically, start over.
    this.tasks = this.completed_tasks;
    this.completed_tasks = [];
  }

  reweighPlan(tics = 1) {
    this.weight = this.weight + (tics * this.player.getNeed(need));

  }
}

export default NeedPlan;
