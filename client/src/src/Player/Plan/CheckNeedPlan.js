import PlanBase from './PlanBase';
import StatCheckTask from './Task/StatCheckTask';
import GetPlan from './General/GetPlan';

/**
 * A simple Plan to evaluate the status of a Need.
 *
 * Properties:
 * - need (string): the machine name of the need to check.
 * - action_threshold (float): if the checked value is below this value, a new
 *   plan is created to handle the deficit.
 * - player (Player): the Player this plan belongs to.
 */

class CheckNeedPlan extends PlanBase {
  need = null;
  storage = {
    current_value: 0,
    action_threshold: 0,
  }

  constructor(need, player) {
    super(`checkneed_${need.getMachineName()}`, `check on my ${need}`, player);
    this.addTasks([
      new StatCheckTask(need.getMachineName(), 'need', player, player, this.storage),
    ]);
    this.storage.action_threshold = need.getThreshold();
    this.need = need;
  }

  getNeed() {
    return this.need;
  }

  continueTask() {
    const done = super.continueTask();

    this.player.debugMessage(`checked ${this.need.getMachineName()} and received ${this.storage.current_value}`);

    return done;
  }

  completeTask() {
    // Since this type of plan only has a single task that it unfailingly
    // executes, there isn't a need to track "completed" tasks. Instead we just
    // complete the plan every time the task executes.
    return this.completePlan();
  }

  completePlan() {
    // Undo all progress, fresh to start again.
    this.player.debugMessage(`Completed CheckNeedPlan ${this.getName()}.`)
    this.tasks = this.completed_tasks;
    this.complete_tasks = [];

    if (this.storage.current_value < this.storage.action_threshold) {
      this.player.debugMessage(`needs higher ${this.need.getMachineName()}, creating GetPlan.`);
      this.player.addPlan(new GetPlan(this.need, this.player));
    }

    return super.completePlan();
  }

  reweighPlan(tics = 1) {
    // Players are more likely to check on their needs the worse those needs get
    // but it is still possible for them to just "not notice" how hungry/thirsty
    // they are if they have more pressing Plans.
    // @todo: mess with this function a bit to make sure Players are fulfilling
    // their needs an appropriate amount.
    this.weight = this.weight + (100 - this.need.getValue());
  }
}

export default CheckNeedPlan;
