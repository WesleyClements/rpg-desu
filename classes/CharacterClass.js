/**
 * @typedef {import('../abilities/.').Ability} Ability
 */

/**
 * @typedef {import('../Character').CharacterAttributes} CharacterAttributes
 */

/**
 * @typedef {object} CharacterAttributeRange
 * @property {number} min - minimum attribute value
 * @property {number} max - maximum attribute value
 */

/**
 * @typedef {object} CharacterClassAttributeRanges
 * @property {CharacterAttributeRange} health - the CharacterClass's health attribute range
 * @property {CharacterAttributeRange} mana - the CharacterClass's mana attribute range
 * @property {CharacterAttributeRange} strength - the CharacterClass's strength attribute range
 * @property {CharacterAttributeRange} defense - the CharacterClass's defense attribute range
 */

/**
 * @typedef {object} CharacterClassProps
 * @property {string} name - the name of this CharacterClass
 * @property {CharacterClassAttributeRanges} stats - this CharacterClass's attribute ranges
 * @property {Array<Ability>} abilities - this CharacterClass's default abilities
 */

class CharacterClass {
  /**
   * 
   * @param {CharacterClassProps}
   */
  constructor({ name, stats: { health, mana, strength, defense } = {}, abilities = [] }) {
    /**
     * the name of this CharacterClass
     * @type {string}
     */
    this.name = name;
    /**
     * this CharacterClass's attribute ranges
     * @type {CharacterClassAttributeRanges}
     */
    this.stats = {
      health: { min: 0, max: 0, ...health },
      mana: { min: 0, max: 0, ...mana },
      strength: { min: 0, max: 0, ...strength },
      defense: { min: 0, max: 0, ...defense },
    };
    /**
     * this CharacterClass's default abilities
     * @type {Array<Ability>}
     */
    this.abilities = abilities;
  }

  /**
   * 
   * @param {string} stat - the type of stat to generate
   * @returns {number} a random value in the given stat's range
   */
  #generateStat(stat) {
    if (this.stats[stat] == null) throw new Error(`no such stat ${stat}`);
    const min = this.stats[stat].min ?? 0;
    const max = this.stats[stat].max ?? 0;
    return min + Math.floor((max - min) * Math.random());
  }

  /**
   * 
   * @param {CharacterAttributes} bonuses - amounts to add to each generated stat
   * @returns {CharacterAttributes} randomly varied CharacterAttributes
   */
  generateStats({ health, mana, strength, defense } = {}) {
    return {
      health: this.#generateStat('health') + (health ?? 0),
      mana: this.#generateStat('mana') + (mana ?? 0),
      strength: this.#generateStat('strength') + (strength ?? 0),
      defense: this.#generateStat('defense') + (defense ?? 0),
    };
  }
}
export default CharacterClass;
