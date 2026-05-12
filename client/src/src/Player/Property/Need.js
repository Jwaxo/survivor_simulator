/**
 * Defines the Need class.
 *
 */

import Utilities from "../../Utilities";

class Need {
  label = "Default Need";
  name = "default_need";
  base_value = 100;
  value = 100;
  base_change_per_tic = -1;
  change_per_tic = -1;
  weight = 0; // How heavily the matching plan for this need is considered. Generally goes from 0 - 100.
  base_plan_threshold = 50;
  plan_threshold = 50; // When the value is below this threshold NPCs create a Plan to handle it.
  summary = "";

  constructor(props) {
    if (props.name) {
      this.name = props.name;
    }
    if (props.label) {
      this.label = props.label;
    }
    if (props.attribute) {
      this.attribute = props.attribute;
    }
    if (props.base_value) {
      this.base_value = props.base_value;
      this.value = props.base_value;
    }
    if (props.base_change_per_tic) {
      this.base_change_per_tic = props.base_change_per_tic;
      this.change_per_tic = props.base_change_per_tic;
    }
    if (props.base_plan_threshold) {
      this.base_plan_threshold = props.base_plan_threshold;
      this.plan_threshold = props.base_plan_threshold;
    }
    if (props.summary) {
      this.summmary = props.summary;
    }

  }

  getName() {
    return this.name;
  }

  getLabel() {
    return this.label;
  }

  getSummary() {
    return this.summary;
  }

  getValue() {
    return this.value;
  }

  baseMod(base) {
    const mod = Utilities.getD20Mod(base[this.attribute]);
    // Thresholds increase/decrease with a flat D20mod based on the governing attribute.
    this.plan_threshold = this.base_plan_threshold + mod;
    // Change-Per-Tic increases/decreases a small amount based on governing attribute.
    this.change_per_tic = this.base_change_per_tic + (mod / Utilities.ticPerDay());
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

  getThreshold() {
    return this.plan_threshold;
  }

  setThreshold(value) {
    this.plan_threshold = value;
  }

  getWeight() {
    return this.weight;
  }

  reweighWeight() {
    this.weight = Math.abs(this.base_value - this.value);
  }

  save() {
    return {
      label: this.label,
      name: this.name,
      attribute: this.attribute,
      value: this.value,
      base_change_per_tic: this.base_change_per_tic, // Gets recalculated on load.
      base_plan_threshold: this.base_plan_threshold, // Gets recalculated on load.
      weight: this.weight,
      summary: this.summary,
    }
  }

  render() {
    return (
      <>
        <strong>{ this.getLabel() }</strong>: { Math.round(this.getValue()) }
      </>
    );
  }

}

export default Need;
