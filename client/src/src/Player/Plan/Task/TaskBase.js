
/**
 * A Task is a single step of a Plan.
 *
 * reqs (array): a list of tests that need to pass for this Task to be pursued.
 *
 */

class TaskBase {
  name = "task01"; // The machine name.
  summary = "";
  reqs = [];

  constructor(name, summary, player, reqs, storage = () => { throw new Error("Plan Corruption: no storage function set for Task results!")}) {
    this.name = name;
    this.summary = summary;
    this.player = player;
    this.reqs = reqs;
    this.storage = storage;
  }

  /**
   * @returns any|bool: data that might be used by the parent Plan to determine
   *  if this task succeeded or failed. If the task can determine, TRUE if task
   *  succeded, FALSE if task needs to run again.
   */
  execute() {
    return true;
  }

  putInStorage(info) {
    this.storage(info);
  }

}

export default TaskBase;
