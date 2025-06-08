
/**
 * A Task is a single step of a Plan.
 *
 * reqs (array): an list of tests that need to pass for this Task to be pursued.
 * done ()
 *
 */

class TaskBase {
  name = "task01";
  summary = "";
  reqs = [];

  constructor(name, summary, player, callback, reqs, storage = () => { throw new Error("Plan Corruption: no storage location set for Task results!")}) {
    this.name = name;
    this.summary = summary;
    this.callback = callback;
    this.reqs = reqs;
    this.storage = storage;
  }

  putInStorage(info) {
    this.storage(info);
  }

}

export default TaskBase;
