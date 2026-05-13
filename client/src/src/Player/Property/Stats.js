import Utilities from './../../Utilities';
import SkillBase from './../Skills/SkillBase';
import Need from './Need';

class Stats {
  // Base stats are between 0 and 20.
  base = {
    str: 0,
    dex: 0,
    end: 0,
    int: 0,
    wis: 0,
    cha: 0,
  };
  skills = {
    athletics: new SkillBase({name: 'athletics', label: 'Athletics', attribute: 'str'}),
    climbing: new SkillBase({name: 'climbing', label: 'Climbing', attribute: 'dex'}),
    construction: new SkillBase({name: 'construction', label: 'Construction', attribute: 'str'}),
    cooking: new SkillBase({name: 'cooking', label: 'Cooking', attribute: 'wis'}),
    fight: new SkillBase({name: 'fight', label: 'Fight', attribute: 'str'}),
    finesse: new SkillBase({name: 'finesse', label: 'Finesse', attribute: 'dex'}),
    fishing: new SkillBase({name: 'fishing', label: 'Fishing', attribute: 'wis'}), // Maybe not WIS.
    focus: new SkillBase({name: 'focus', label: 'Focus', attribute: 'end'}),
    gathering: new SkillBase({name: 'gathering', label: 'Gathering', attribute: 'int'}),
    improvisation: new SkillBase({name: 'improvisation', label: 'Improvisation', attribute: 'wis'}), // Also used for puzzle-solving?
    intimidation: new SkillBase({name: 'intimidation', label: 'Intimidation', attribute: 'str'}),
    medicine: new SkillBase({name: 'medicine', label: 'Medicine', attribute: 'int'}),
    memory: new SkillBase({name: 'memory', label: 'Memory', attribute: 'int'}),
    orienteering: new SkillBase({name: 'orienteering', label: 'Orienteering', attribute: 'wis'}),
    persuasion: new SkillBase({name: 'persuasion', label: 'Persuasion', attribute: 'cha'}), // Doubles as public speaking.
    seduction: new SkillBase({name: 'seduction', label: 'Seduction', attribute: 'cha'}),
    social_stealth: new SkillBase({name: 'social_stealth', label: 'Social Stealth', attribute: 'cha'}),
    stealth: new SkillBase({name: 'stealth', label: 'Stealth', attribute: 'dex'}),
    swimming: new SkillBase({name: 'swimming', label: 'Swimming', attribute: 'end'}),
  };
  mods = {
    aggression: 0, // Maybe doubles as "competitiveness"?
    attractiveness: 0, // As in: are they traditionally attractive?
    body: 0, // As in: are they heavily muscled? May not be tied to strength.
    bravery: 0,
    ego: 0,
    gullability: 0,
    orientation: [0, 1, 2], // which genders this person is attracted to.
  };
  // Most needs drain (or fill) automatically, but naturally some needs may have
  // their values changed by external forces.
  needs = {
    food: new Need({
      name: "food",
      label: "Food",
      base_change_per_tic: -1 * (100 / Utilities.ticPerDay()),
      base_plan_threshold: 25,
      attribute: 'end',
      summary: "eat something",
    }), // Empty stomach every 24 hours.
    water: new Need({
      name: "water",
      label: "Water",
      base_change_per_tic: -1 * (100 / Utilities.ticPerDay()),
      base_plan_threshold: 95,
      attribute: 'end',
      summary: "drink something",
    }), // Empty water every ~2 hours.
    happy: new Need({
      name: "happy",
      label: "Happiness",
      base_change_per_tic: -1 * (200 / Utilities.ticPerDay()),
      base_plan_threshold: 25,
      attribute: 'cha',
      summary: "feel happier"
    }), // Empty happy every 48 hours.
    energy: new Need({
      name: "energy",
      label: "Energy",
      base_change_per_tic: -1 * (50 / Utilities.ticPerDay()),
      base_plan_threshold: 10,
      attribute: 'end',
      summary: "get some sleep"
    }), // Empty energy every 12 hours.
    health: new Need({
      name: "health",
      label: "Health",
      base_change_per_tic: 0,
      base_plan_threshold: 50,
      attribute: 'end',
      summary: "heal",
    }),
    // new Need("Bladder", "bladder", 0, 8 / Utilities.ticPerDay(), "empty bladder"), // Full bladder every 2 hours.
  };

  constructor(props) {
    if (props?.random) {
      this.randomlyGenerate();
    }
    
    for (const need in this.needs) {
      this.needs[need].baseMod(this.base);
    }
  }

  save() {
    const skills = {};
    const needs = {};
    for (const skill in this.skills) {
      skills[skill] = this.skills[skill].save();
    }
    for (const need in this.needs) {
      needs[need] = this.needs[need].save();
    }
    return {
      base: this.base,
      mods: this.mods,
      skills,
      needs,
    }
  }

  load(stats_info) {
    if (stats_info.hasOwnProperty("base")) {
      this.base = stats_info.base;
    }
    if (stats_info.hasOwnProperty("mods")) {
      this.mods = stats_info.mods;
    }
    if (stats_info.hasOwnProperty("needs")) {
      this.needs = stats_info.needs;
      for (const need in stats_info.needs) {
        const need_info = stats_info.needs[need];
        this.needs[need] = new Need({
          name: need_info.name,
          label: need_info.label,
          attribute: need_info.attribute,
          base_change_per_tic: need_info.change_per_tic,
          base_plan_threshold: need_info.base_plan_threshold,
          summary: need_info.summary,
        });
        this.needs[need].baseMod(this.base);
      }
    }
    if (stats_info.hasOwnProperty("skills")) {
      for (const skill in stats_info.skills) {
        const skill_info = stats_info.skills[skill];
        this.skills[skill] = new SkillBase({name: skill_info.name, label: skill_info.label, attribute: skill_info.attribute});
        this.skills[skill].setXP(skill_info.experience);
        this.skills[skill].setLevel(skill_info.level);
      }
    }
  }

  getBase(name) {
    return this.base[name];
  }

  getSkill(skill) {
    return this.skills[skill];
  }

  getNeeds() {
    return this.needs;
  }

  getNeed(need) {
    return this.needs[need];
  }

  modNeed(need_name, mod) {
    return this.getNeed(need_name).modValue(mod);
  }

  processTic(tics = 1) {
    for (let i = 0;i < this.needs.length;i++) {
      this.needs[i].processTic(tics);
    }
  }

  randomlyGenerate() {
    for (const property in this.base) {
      this.base[property] = Utilities.rollD20();
    }
  }

  renderBaseStats() {
    return Utilities.objectToList(this.base);
  }
  renderNeeds() {
    return Utilities.objectRenderToList(this.needs);
  }

  checkSkill(skillName, inherentMod = 0) {
    return this.skills[skillName].check(this.base) + inherentMod;
  }

  render() {
    return (
      <ul className="stats">
        <li key="base"><strong>Base Stats:</strong>
          { this.renderBaseStats() }
        </li>
        <li key="status"><strong>Needs:</strong>
          { this.renderNeeds() }
        </li>
      </ul>
    );
  }

}

export default Stats;
