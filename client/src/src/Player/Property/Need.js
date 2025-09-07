/**
 * Defines the Need class.
 *
 */
class Need {
  name = "Default Need";
  machine_name = "default_need";
  value = 100;
  change_per_tic = -1;
  weight = 0; // How heavily the matching plan for this need is considered. Generally goes from 0 - 100.
  summary = "";

  constructor(name, machine_name, base_value = 100, change_per_tic = -1, summary = "This Need has not yet implemented a Summary.") {
    this.name = name;
    this.machine_name = machine_name;
    this.value = base_value;
    this.change_per_tic = change_per_tic;
    this.summary = summary;
  }

  getName() {
    return this.name;
  }

  getMachineName() {
    return this.machine_name;
  }

  getSummary() {
    return this.summary;
  }

  getValue() {
    return this.value;
  }

  modValue(mod) {
    let new_value = this.value + mod;
    if (new_value < 0) {
      new_value = 0;
    }
    this.value = new_value;

    return this.value;
  }

  processTic(tics = 1) {
    this.modValue(tics * this.change_per_tic);
    this.reweighWeight();

    return this.value;
  }

  getWeight() {
    return this.weight;
  }

  reweighWeight() {
    this.weight = Math.abs(this.base_value - this.value);
  }

  render() {
    return (
      <>
        <strong>{ this.getName() }</strong>: { this.getValue() }
      </>
    );
  }

}

export default Need;
