class CharacterClass {
  constructor({ name, stats: { health, mana, strength, defense } = {}, abilities = [] }) {
    this.name = name;
    this.stats = {
      health: { min: 0, max: 0, ...health },
      mana: { min: 0, max: 0, ...mana },
      strength: { min: 0, max: 0, ...strength },
      defense: { min: 0, max: 0, ...defense },
    };
    this.abilities = abilities;
  }

  generateStat(statName) {
    if (this.stats[statName] == null) throw new Error('no such stat ' + statName);
    const min = this.stats[statName].min ?? 0;
    const max = this.stats[statName].max ?? 0;
    return min + Math.floor((max - min) * Math.random());
  }

  generateStats({ health, mana, strength, defense } = {}) {
    return {
      health: this.generateStat('health') + (health ?? 0),
      mana: this.generateStat('mana') + (mana ?? 0),
      strength: this.generateStat('strength') + (strength ?? 0),
      defense: this.generateStat('defense') + (defense ?? 0),
    };
  }
}
module.exports = CharacterClass;
