import NeedPlan from './Plan/NeedPlan';
import Player from './Player';
import Utilities from '../Utilities';

/**
 * Defines the ComputerPlayer class.
 *
 * A tracker for NPC Survivors in the game. A ComputerPlayer's main action
 * occurs at the start of each Tic, in the "process tic" function.
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
  active_plan = null;

  constructor(props) {
    super(props);

    this.getNeeds().forEach(need => {
      this.addPlan(new NeedPlan(need, this));
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

  hasActivePlan() {
    return this.active_plan !== null;
  }

  getActivePlan() {
    return this.active_plan;
  }

  // Decide what to do! This should automatically run when:
  // - A Player has no current Plans.
  // - A Player completes their previous Plan.
  // - A Player's Plan is interrupted or they gain a new Plan.
  pickPlan() {
    this.reweighNeeds();

    const pickable_plans = [
      ...this.need_plans,
      ...this.plans
    ];
    const pick_array = [];

    pickable_plans.forEach(plan => {
      for (let i = 0;i < plan.getWeight();i++) {
        pick_array.push(plan);
      }
    })

    this.active_plan = Utilities.pickFromArray(pick_array);
  }

  processTic(tics = 1) {
    // Where the magic happens.
    super.processTic(tics);
    console.log(`Processing ${tics} tics for ${this.getNick()}`);
    if (!this.hasActivePlan()) {
      this.pickPlan();
    }
    this.getActivePlan().continueTask();
  }

}

export default ComputerPlayer;
