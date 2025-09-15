import PlanBase from '../PlanBase';
import LocateTask from '../Task/LocateTask';
import GotoTask from '../Task/GotoTask';
import AcquireTask from '../Task/AcquireTask';
import UseTask from '../Task/UseTask';
import PlaceTask from '../Task/PlaceTask';

/**
 * A Plan that should be straightforward to accomplish and repeat endlessly.
 *
 * Properties:
 * - machine_name (string)
 * - summary (string)
 * - player (Player)
 */

class UsePlan extends PlanBase {
  player = null;
  storage = {
  }

  constructor(item, player) {
    super(`use_${item.getMachineName()}`, `use ${item.getMachineName()}`, 0);
    this.addTasks([

    ]);
    this.player = player;
  }

  completePlan() {
    // Basically, start over.
    this.tasks = this.completed_tasks;
    this.completed_tasks = [];
  }
}

export default UsePlan;
