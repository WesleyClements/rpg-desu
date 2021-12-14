import { applyEffects, reverseEffects } from './effects.js';

/**
 * @typedef CharacterAttributes
 * @type {object}
 * @property {number} health - the Character's health points
 * @property {number} mana - the Character's mana points
 * @property {number} strength - the Character's strength value
 * @property {number} defense - the Character's defense value
 */

/**
 * @typedef CharacterProps
 * @type {object}
 * @property {string} name - the name of the Character
 * @property {CharacterAttributes} stats - the Character's attributes
 */

/**
 * @class
 */
class Character {
  #name;
  #stats;
  #baseStats;
  /**
   * @type {Map<string,Ability>}
   */
  #abilities;
  #effects;
  /**
   * Create a character
   * @param {CharacterProps} props - The properties of the character
   */
  constructor(props) {
    if (props == null) throw new TypeError('no props were provided');

    const { name } = props;
    if (name == null) throw new TypeError('name was not provided');
    if (props.stats == null) throw new TypeError('stats was not provided');

    this.#name = name;
    const stats = {
      ...props.stats,
      maxHealth: props.stats.health,
      maxMana: props.stats.mana,
    };
    this.#stats = Object.defineProperties(
      {},
      {
        health: {
          get: () => applyEffects('health', stats.health, this.#effects),
          set: (value) => {
            if (typeof value !== 'number')
              throw new TypeError('health must be a number ' + typeof value);
            if (Number.isNaN(value)) throw new RangeError('health must be a number: ' + value);
            stats.health = reverseEffects('health', value, this.#effects);
          },
        },
        mana: {
          get: () => applyEffects('mana', stats.mana, this.#effects),
          set: (value) => {
            if (typeof value !== 'number')
              throw new TypeError('mana must be a number: ' + typeof value);
            if (Number.isNaN(value)) throw new RangeError('mana must be a number: ' + value);
            stats.mana = reverseEffects('mana', value, this.#effects);
          },
        },
        strength: {
          get: () => applyEffects('strength', stats.strength, this.#effects),
        },
        defense: {
          get: () => applyEffects('defense', stats.defense, this.#effects),
        },
      }
    );
    this.#baseStats = new Proxy(stats, {
      set(obj, prop, value) {
        if (!Reflect.has(stats, prop)) Reflect.set(...arguments);
        if (typeof value !== 'number') throw new TypeError('cannot set stat to anything but a number: ' + typeof value);
        if (value <= 0) throw new RangeError('cannot set stat to negative number');
        obj[prop] = value;
      },
    });

    this.#abilities = new Map(props.abilities?.map((ability) => [ability.name, ability]));
    this.#effects = [];
  }

  /**
   * the name of this Character
   * @type {string}
   */
  get name() {
    return this.#name;
  }

  /**
   * this Character's stats after applying effect
   * @type {CharacterAttributes}
   */
  get stats() {
    return this.#stats;
  }

  /**
   * this Character's stats before applying effect
   * @type {CharacterAttributes}
   */
  get baseStats() {
    return this.#baseStats;
  }

  get abilities() {
    return [...this.#abilities.values()];
  }

  get effects() {
    return this.#effects;
  }

  set effects(value) {
    if (!Array.isArray(value)) throw TypeError('effects must be an array');
    this.#effects = value;
  }

  get isAlive() {
    return this.stats.health > 0;
  }

  useAbility(abilityName, victim) {
    if (!this.#abilities.has(abilityName)) return false;
    this.#abilities.get(abilityName).apply(this, victim);
    return true;
  }

  updateEffects(dt = 1) {
    this.#effects = this.#effects.filter((effect) => {
      if (effect.duration == null) return true;
      if (effect.isNew) {
        effect.isNew = false;
        return true;
      }
      effect.duration -= dt;
      if (effect.duration > 0) return true;
      effect.onComplete();
      return false;
    });
  }

  toString() {
    return `Character<${this.name}, HP:${Math.max(this.stats.health, 0)}, MP:${Math.max(
      this.stats.mana,
      0
    )}, STR:${this.stats.strength}, DEF:${this.stats.defense}>`;
  }
}

export default Character;
