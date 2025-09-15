/**
 * Defines the PlanBase class.
 *
 * Defines a set of Tasks for a Player to follow to complete a goal.
 *
 * Properties:
 * - machine_name (string)
 * - summary (string)
 * - initial_weight (int)
 * - tasks (array)
 */

class PlanBase {
  machine_name = 'Default Plan';
  tasks = [];
  completed_tasks = [];
  follow_ups = [];
  summary = '';
  player = null;
  weight = 10;

  constructor(machine_name, summary, player, initial_weight, tasks = []) {
    this.machine_name = machine_name;
    this.summary = summary;
    this.player = player;
    this.weight = initial_weight ? initial_weight : this.weight;
    this.tasks = tasks;
  }

  getName() {
    return this.machine_name;
  }

  getSummary() {
    return this.summary;
  }

  getWeight() {
    return this.weight;
  }

  addTask(task) {
    this.tasks.push(task);
  }

  addTasks(tasks) {
    tasks.forEach(task => this.addTask(task));
  }

  getTasks() {
    return this.tasks;
  }

  getNextTask() {
    let nextTask = null;
    if (this.tasks[0]) {
      nextTask = this.tasks[0];
    }
    return nextTask;
  }

  continueTask() {
    let done = {};
    if (this.tasks[0]) {
      if (this.tasks[0].execute() === true) {
        done = this.completeTask();
      }
    }
    else {
      done = this.completePlan();
    }

    return done;
  }

  completeTask(index = 0) {
    let done = {};
    if (this.tasks[index]) {
      this.completed_tasks.push(this.tasks.splice(index, 1)[0]);
    }
    else {
      throw new Error("Plan Corruption: Attempting to complete nonexistant task!");
    }
    if (this.tasks.length === 0) {
      done = this.completePlan();
    }
    else {
      console.log('still tasks remaining!');
      console.log(this.tasks);
    }

    return done;
  }

  startPlan() {
    this.getNextTask();
  }

  completePlan() {
    let done = {
      complete: true,
    };
    if (this.follow_ups.length > 0) {
      done.follow_ups = this.follow_ups;
    }
    return done;
  }

  reweighPlan() {
    this.weight = this.weight;
  }

}

export default PlanBase;
