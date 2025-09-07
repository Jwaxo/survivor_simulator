class PlanBase {
  machine_name = 'Default Plan';
  tasks = [];
  completed_tasks = [];
  summary = '';
  weight = 10;

  constructor(machine_name, summary, initial_weight, tasks) {
    this.machine_name = machine_name;
    this.summary = summary;
    this.weight = initial_weight;
    this.tasks = tasks;
  }

  getWeight() {
    return this.weight;
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

  completePlan() {

  }

  reweighPlan() {
    this.weight = this.need.reweighWeight();
  }

}

export default PlanBase;
