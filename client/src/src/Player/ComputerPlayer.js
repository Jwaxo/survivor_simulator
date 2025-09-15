import CheckNeedPlan from './Plan/CheckNeedPlan';
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

  constructor(props, random, nameFunction) {
    super(props);

    // Creates a CheckNeedPlan for each need that never ends.
    // Setting a base threshold of "50" for each need just for testing.
    // @todo: make each need define a threshold which varies Player-to-Player.

    if (random === true) {
      this.randomlyGenerate();
      this.setName(...nameFunction(this.getGender()));
    }

    this.getNeeds().forEach(need => {
      this.addNeedPlan(new CheckNeedPlan(need, this));
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
      plan.reweighPlan();
    });
  }

  hasActivePlan() {
    return this.active_plan !== null;
  }

  getActivePlan() {
    return this.active_plan;
  }

  setActivePlan(plan) {
    this.active_plan = plan;
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

    this.setActivePlan(Utilities.pickFromArray(pick_array));
    this.debugMessage(`Picked new plan: ${this.getActivePlan().getName()}`);
  }

  // Where the magic happens.
  processTic(tics = 1) {
    super.processTic(tics);
    if (!this.hasActivePlan()) {
      // this.debugMessage(`does not have an active plan! Getting a new one.`);
      this.pickPlan();
    }
    const {complete = false, follow_ups = []} = this.getActivePlan().continueTask();
    if (complete === true) {
      // If the completed plan isn't a Need, remove it from our list of plans.
      // It's done!
      if (this.plans.includes(this.getActivePlan())) {
        this.plans.splice(this.plans.indexOf(this.getActivePlan()), 1);
      }
      // If any follow-ups were returned, add them to the Plan list and start
      // doing the first one next tic.
      // Needs don't need to set follow_ups, since they technically never expire
      if (follow_ups.length > 0) {
        follow_ups.forEach(plan => {
          this.addPlan(plan);
        });
        this.setActivePlan(follow_ups[0]);
      }
      // Otherwise we're a free agent and will run pickPlan() next tic.
      else {
        this.setActivePlan(null);
      }
    }
  }

}

export default ComputerPlayer;
