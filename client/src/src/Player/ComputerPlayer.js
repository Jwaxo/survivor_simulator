import NeedPlan from './Plan/NeedPlan';
import Player from './Player';
import Utilities from '../Utilities';

/**
 * Defines the ComputerPlayer class.
 *
 * A tracker for NPC Survivors in the game.
 *
 * @todo: fill out the constructor to actually let custom Players.
 * @todo: allow RandomlyGenerate to fill in missing info, instead of just
 * halting when age is defined.
 *
 * Required arguments:
 * - id (int)
 *
 * Optional arguments:
 * - gender (Gender)
 * - name (object)
 * - age (int)
 */

class ComputerPlayer extends Player {

  need_plans = [];

  constructor(props) {
    super(props);

    this.getNeeds().forEach(need => {
      this.addPlan(new NeedPlan(need.getMachineName(), ))
    });
  }

  addNeedPlan(plan) {
    // Needs are kept in their own array because they need to be re-weighed
    // every time a new Plan is chosen.
    this.need_plans.push(plan);
  }

  addPlan(plan) {
    this.plans.push(plan);
  }

  reweighNeeds() {
    this.need_plans.forEach(plan => {
      plan.reweightWeight();
    });
  }

  pickPlan() {
    this.reweighNeeds();

    const pickable_plans = [
      ...this.need_plans,
      ...this.plans
    ];
    const pick_array = [];

    pickable_plans.forEach(plan => {
      for (i = 0;i < plan.getWeight();i++) {
        pick_array.push(plan);
      }
    })

    return Utilities.pickFromArray(pick_array);

  }

}

export default ComputerPlayer;
