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
  summary = '';
  weight = 10;

  constructor(machine_name, summary, initial_weight, tasks = []) {
    this.machine_name = machine_name;
    this.summary = summary;
    this.weight = initial_weight ? initial_weight : this.weight;
    this.tasks = tasks;
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
    if (this.tasks[0]) {
      this.tasks[0].callback();
    }
    else {
      this.completePlan();
    }
  }

  completeTask(index = 0) {
    if (this.tasks[index]) {
      this.completed_tasks.push(this.tasks.splice(index, 1));
    }
    else {
      throw new Error("Plan Corruption: Attempting to complete nonexistant task!");
    }
    if (this.tasks.length === 0) {
      this.completePlan();
    }
  }

  startPlan() {
    this.getNextTask();
  }

  completePlan() {

  }

  reweighPlan() {
    this.weight = this.need.reweighWeight();
  }

}

export default PlanBase;
