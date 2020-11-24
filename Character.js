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
  constructor(props) {
    if (props == null) throw new TypeError('no props were provided');

    const { name } = props;
    if (name == null) throw new TypeError('name was not provided');
    if (props.stats == null) throw new TypeError('stats was not provided');

    const stats = {
      maxHealth: props.stats.health,
      maxMana: props.stats.mana,
      strength: props.stats.strength,
      defense: props.stats.defense,
    };

    let health = stats.maxHealth;
    let mana = stats.maxMana;

    const abilities = new Map((props.abilities ?? []).map((ability) => [ability.name, ability]));
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
                if (typeof value !== 'number')
                  throw new TypeError('health must be a number ' + typeof value);
                if (Number.isNaN(value)) throw new RangeError('health must be a number: ' + value);
                health = reverseEffects('health', value, effects);
              },
            },
            mana: {
              get() {
                return applyEffects('mana', mana, effects);
              },
              set(value) {
                if (typeof value !== 'number')
                  throw new TypeError('mana must be a number: ' + typeof value);
                if (Number.isNaN(value)) throw new RangeError('mana must be a number: ' + value);
                mana = reverseEffects('mana', value, effects);
              },
            },
            strength: {
              get() {
                return applyEffects('strength', stats.strength, effects);
              },
            },
            defense: {
              get() {
                return applyEffects('defense', stats.defense, effects);
              },
            },
          }
        ),
      },
      baseStats: {
        value: new Proxy(stats, {
          set(obj, prop, value) {
            if (!Reflect.has(stats, prop)) Reflect.set(...arguments);
            switch (typeof value) {
              case 'number': {
                if (value <= 0) throw new RangeError('cannot set stat to negative number');
                obj[prop] = value;
                break;
              }
              default: {
                throw new TypeError('cannot set stat to anything but a number: ' + typeof value);
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
    return `Character<${this.name}, HP:${Math.max(this.stats.health, 0)}, MP:${Math.max(
      this.stats.mana,
      0
    )}, STR:${this.stats.strength}, DEF:${this.stats.defense}>`;
  }
}

module.exports = Character;
