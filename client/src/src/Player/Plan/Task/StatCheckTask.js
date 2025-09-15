import TaskBase from './TaskBase';

/**
 * Checks a stat value and stores it.
 */

class StatCheckTask extends TaskBase {
  stat = "";
  type = "";
  target = null; // Player.
  storage = () => {throw new Error("No storage function implemented for StatCheckTask instance.")};

  constructor(stat, type, player, target, storage) {
    super(`statcheck_${stat}`, `Check ${target.getNick()}'s ${stat} stat`, player, [], storage);
    this.stat = stat;
    this.type = type;
    this.target = target;
    this.storage = storage;
  }

  execute() {
    // For now, Players only check their own stats, so we don't need to worry
    // about if the target is in the same location (for realism).
    let value = 0;
    switch (this.type) {
      case "base":
        value = this.target.getStat(this.stat).getValue();

        break;

      case "skill":
        value = this.target.getSkill(this.stat).getValue();

        break;

      case "need":
        value = this.target.getNeed(this.stat).getValue();

        break;

    }
    // this.target.debugMessage(`${this.type} ${this.stat} is ${value}`);
    this.storage.current_value = value;

    // It is unlikely for this task to fail, so we always return true.
    return true;
  }

}

export default StatCheckTask;