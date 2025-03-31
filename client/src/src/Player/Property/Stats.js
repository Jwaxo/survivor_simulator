import Utilities from './../../Utilities';
import SkillBase from './../Skills/SkillBase';

class Stats {
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
    swimming: new SkillBase({name: 'swimming', label: 'Swimming', attribute: 'end'}),
    climbing: new SkillBase({name: 'climbing', label: 'Climbing', attribute: 'dex'}),
    cooking: new SkillBase({name: 'cooking', label: 'Cooking', attribute: 'wis'}),
    orienteering: new SkillBase({name: 'orienteering', label: 'Orienteering', attribute: 'wis'}),
    fishing: new SkillBase({name: 'fishing', label: 'Fishing', attribute: 'wis'}), // Maybe not WIS.
    gathering: new SkillBase({name: 'gathering', label: 'Gathering', attribute: 'int'}),
    persuasion: new SkillBase({name: 'persuasion', label: 'Persuasion', attribute: 'cha'}), // Doubles as public speaking.
    intimidation: new SkillBase({name: 'intimidation', label: 'Intimidation', attribute: 'str'}),
    focus: new SkillBase({name: 'focus', label: 'Focus', attribute: 'end'}),
    medicine: new SkillBase({name: 'medicine', label: 'Medicine', attribute: 'int'}),
    memory: new SkillBase({name: 'memory', label: 'Memory', attribute: 'int'}),
    construction: new SkillBase({name: 'construction', label: 'Construction', attribute: 'str'}),
    seduction: new SkillBase({name: 'seduction', label: 'Seduction', attribute: 'cha'}),
    stealth: new SkillBase({name: 'stealth', label: 'Stealth', attribute: 'dex'}),
    social_stealth: new SkillBase({name: 'social_stealth', label: 'Social Stealth', attribute: 'cha'}),
    finesse: new SkillBase({name: 'finesse', label: 'Finesse', attribute: 'dex'}),
    improvisation: new SkillBase({name: 'improvisation', label: 'Improvisation', attribute: 'wis'}), // Also used for puzzle-solving?
    fight: new SkillBase({name: 'fight', label: 'Fight', attribute: 'str'}),
  };
  mods = {
    gullability: 0,
    attractiveness: 0,
    body: 0,
    bravery: 0,
    ego: 0,
    orientation: [0, 1, 2], // which genders this person is attracted to.
    aggression: 0, // Maybe doubles as "competitiveness"?
  };
  status = {
    hunger: 0,
    happy: 100,
    tired: 0,
    clean: 100,
    health: 100,
  };

  constructor(props) {
    if (props?.random) {
      this.randomlyGenerate();
    }
  }

  save() {
    const skills = {};
    for (const skill in this.skills) {
      skills[skill] = this.skills[skill].save();
    }
    return {
      base: this.base,
      mods: this.mods,
      status: this.status,
      skills,
    }
  }

  load(stats_info) {
    if (stats_info.hasOwnProperty("base")) {
      this.base = stats_info.base;
    }
    if (stats_info.hasOwnProperty("mods")) {
      this.mods = stats_info.mods;
    }
    if (stats_info.hasOwnProperty("status")) {
      this.status = stats_info.status;
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

  getStat(name) {
    return this.properties[name];
  }

  getBase(name) {
    return this.base[name];
  }

  randomlyGenerate() {
    for (const property in this.base) {
      this.base[property] = Utilities.rollD20();
    }
  }

  renderBaseStats() {
    return Utilities.objectToList(this.base);
  }
  renderStatus() {
    return Utilities.objectToList(this.status);
  }

  checkSkill(skillName, inherentMod = 0) {
    return this.skills[skillName].check(this.base) + inherentMod;
  }

  render() {
    return (
      <ul>
        <li key="base"><strong>Base Stats:</strong>
          { this.renderBaseStats() }
        </li>
        <li key="status"><strong>Status:</strong>
          { this.renderStatus() }
        </li>
      </ul>
    );
  }

}

export default Stats;
