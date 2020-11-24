const applyEffects = (stat, value, effects) => {
  return effects.reduce(
    (value, effect) => (effect[stat]?.scalar ?? 1) * value + (effect[stat]?.offset ?? 0),
    value
  );
};
const reverseEffects = (stat, value, effects) => {
  return effects
    .reverse()
    .reduce(
      (value, effect) => (value - (effect[stat]?.offset ?? 0)) / (effect[stat]?.scalar ?? 1),
      value
    );
};

class Character {
  constructor({
    name,
    characterClass,
    bonusStats: {
      health: bonuseHealth,
      mana: bonusMana,
      strength: bonuseStrength,
      defense: bonusDefense,
    } = {},
    bonusAbilities = [],
  }) {
    const stats = {
      maxHealth: characterClass.generateStat('health') + (bonuseHealth ?? 0),
      maxMana: characterClass.generateStat('health') + (bonusMana ?? 0),
      strength: characterClass.generateStat('strength') + (bonuseStrength ?? 0),
      defense: characterClass.generateStat('defense') + (bonusDefense ?? 0),
    };

    let health = stats.maxHealth;
    let mana = stats.maxMana;

    const abilities = new Map([
      ...characterClass.abilities.concat(bonusAbilities).map((ability) => [ability.name, ability]),
    ]);
    let effects = [];

    Object.defineProperties(this, {
      name: {
        value: name,
      },
      stats: {
        value: Object.defineProperties(
          {},
          {
            health: {
              get() {
                return applyEffects('health', health, effects);
              },
              set(value) {
                health = Math.max(reverseEffects('health', value, effects), 0);
              },
            },
            mana: {
              get() {
                return applyEffects('mana', mana, effects);
              },
              set(value) {
                mana = Math.max(reverseEffects('mana', value, effects), 0);
              },
            },
            strength: {
              get() {
                return applyEffects('strength', stats.strength, effects);
              },
            },
            defense: {
              get() {
                return applyEffects('strength', stats.defense, effects);
              },
            },
          }
        ),
      },
      baseStats: {
        value: new Proxy(stats, {
          set(obj, prop, value) {
            if (!Reflect.has(stats, prop)) Reflect.set(...arguments);
            if (value == null) throw new TypeError('cannot set stat to null or undefined');
            switch (typeof value) {
              case 'number': {
                if (value <= 0) throw new RangeError('cannot set stat to negative number');
                obj[prop] = value;
                break;
              }
              default: {
                Reflect.set(...arguments);
                break;
              }
            }
          },
        }),
      },
      abilities: {
        value: abilities,
      },
      effects: {
        get: () => effects,
        set(value) {
          if (!Array.isArray(value)) throw TypeError('effects must be an array');
          effects = value;
        },
      },
    });
  }

  get isAlive() {
    return this.stats.health > 0;
  }

  useAbility(abilityName, victim) {
    if (!this.abilities.has(abilityName)) {
      console.log(`${this.name} is cocky and decided to do nothing.`);
      return;
    }
    this.abilities.get(abilityName).apply(this, victim);
  }

  updateEffects(dt = 1) {
    this.effects = this.effects.filter((effect) => {
      if (effect.duration == null) return true;
      if (effect.isNew) {
        effect.isNew = false;
        return true;
      } else {
        effect.duration -= dt;
        if (effect.duration > 0) return true;
        effect.onDispel();
        return false;
      }
    });
  }

  toString() {
    return `Character<${this.name}, HP:${this.stats.health}, MP:${this.stats.mana}, STR:${this.stats.strength}, DEF:${this.stats.defense}>`;
  }
}

module.exports = Character;
