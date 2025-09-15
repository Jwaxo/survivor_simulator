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

class GetPlan extends PlanBase {
  player = null;
  storage = {
    item_item: null, // Item object storage.
    item_scene: null, // Scene storage.
    item_container: null, // Container storage.
  }

  constructor(item, player) {
    super(`get_${item.getMachineName()}`, `get ${item.getMachineName()}`, 0);
    // @todo: figure out how to split up this plan so we have several kinds of NeedPlan:
    // "check status" (ie: do I have water in my canteen? Is the shelter repaired? Do we have food?)
    // "get supplies" (ie: fill canteen, gather fronds, hunt for food)
    // "fulfill need" (ie: use canteen, repair shelter, eat food)
    this.addTasks([
      new LocateTask(`location.${item.getMachineName()}`, player, this.storeLocation),
      new GotoTask(this.storage.need_scene, player),
      new AcquireTask(this.storage.need_item, this.storage.need_container, player),
    ]);
    this.player = player;
  }

  storeLocation({location, item}) {
    this.storage.need_location = location;
    this.storage.need_item = item;
  }
}

export default GetPlan;
