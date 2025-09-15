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

class DeliverPlan extends PlanBase {
  player = null;
  storage = {
  };

  constructor(item, target, player) {
    super(`deliver_${item.getMachineName()}`, `Deliver ${item.getMachineName()} to ${target.getMachineName()}`, 0);
    this.addTasks([

    ]);
    this.player = player;
  }

  storeLocation({location, item}) {
    this.storage.need_location = location;
    this.storage.need_item = item;
  }
}

export default DeliverPlan;
