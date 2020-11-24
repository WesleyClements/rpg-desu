const Character = require('../Character');
const { Warrior } = require('../classes');
const { MageArmor, Shrink } = require('../abilities');

const name = 'Timmy';
const stats = Warrior.generateStats();

const createCharacter = () => new Character({ name, stats });

it('throws a TypeError when no props are provided', () => {
  expect(() => void new Character()).toThrow(TypeError);
});
it('throws a TypeError when name and characterClass are not provided', () => {
  expect(() => void new Character({})).toThrow(TypeError);
});
it('throws a TypeError when name is not provided', () => {
  expect(() => void new Character({ stats })).toThrow(TypeError);
});
it('throws a TypeError when stats is not provided', () => {
  expect(() => void new Character({ name })).toThrow(TypeError);
});
it('returns a new instance of Character when name and stats are provided', () => {
  expect(new Character({ name, stats })).toEqual(expect.any(Character));
});
it('has a property name which is a string', () => {
  expect(createCharacter()).toHaveProperty('name', expect.any(String));
});

it('has a property stats which is an object', () => {
  expect(createCharacter()).toHaveProperty('stats', expect.any(Object));
});
it('has a property stats.health with the value of a number', () => {
  expect(createCharacter()).toHaveProperty('stats.health', expect.any(Number));
});
it('has a property stats.health that can be set to be any valid number', () => {
  const char = createCharacter();
  char.stats.health = 0;
  expect(char).toHaveProperty('stats.health', 0);
  char.stats.health = 20;
  expect(char).toHaveProperty('stats.health', 20);
  char.stats.health = -20;
  expect(char).toHaveProperty('stats.health', -20);
});
it('throws a TypeError when setting stats.health to something other than a number', () => {
  expect(() => {
    const char = createCharacter();
    char.stats.health = true;
  }).toThrow(TypeError);
  expect(() => {
    const char = createCharacter();
    char.stats.health = 'hey';
  }).toThrow(TypeError);
});
it('throws a RangeError when setting stats.health to NaN', () => {
  expect(() => {
    const char = createCharacter();
    char.stats.health = NaN;
  }).toThrow(RangeError);
});

it('has a property stats.mana with the value of a number', () => {
  expect(createCharacter()).toHaveProperty('stats.mana', expect.any(Number));
});
it('has a property stats.mana that can be set to be any valid number', () => {
  const char = createCharacter();
  char.stats.mana = 0;
  expect(char).toHaveProperty('stats.mana', 0);
  char.stats.mana = 20;
  expect(char).toHaveProperty('stats.mana', 20);
  char.stats.mana = -20;
  expect(char).toHaveProperty('stats.mana', -20);
});
it('throws a TypeError when setting stats.mana to something other than a number', () => {
  expect(() => {
    const char = createCharacter();
    char.stats.mana = true;
  }).toThrow(TypeError);
  expect(() => {
    const char = createCharacter();
    char.stats.mana = 'hey';
  }).toThrow(TypeError);
});
it('throws a RangeError when setting stats.mana to NaN', () => {
  expect(() => {
    const char = createCharacter();
    char.stats.mana = NaN;
  }).toThrow(RangeError);
});

it('has a property stats.strength with the value of a number', () => {
  expect(createCharacter()).toHaveProperty('stats.strength', expect.any(Number));
});
it('has a property stats.defense with the value of a number', () => {
  expect(createCharacter()).toHaveProperty('stats.defense', expect.any(Number));
});

it('has a property baseStats which is an object', () => {
  expect(createCharacter()).toHaveProperty('baseStats', expect.any(Object));
});

it('has a property baseStats.maxHealth with the value of a number', () => {
  expect(createCharacter()).toHaveProperty('baseStats.maxHealth', expect.any(Number));
});
it('has a property baseStats.maxHealth that can be set to a positive number', () => {
  const char = createCharacter();
  char.baseStats.maxHealth = 20;
  expect(char).toHaveProperty('baseStats.maxHealth', 20);
});
it('throws a TypeError when setting baseStats.maxHealth to a type other than number', () => {
  expect(() => {
    const char = createCharacter();
    char.baseStats.maxHealth = null;
  }).toThrow(TypeError);
  expect(() => {
    const char = createCharacter();
    char.baseStats.maxHealth = undefined;
  }).toThrow(TypeError);
});
it('throws a RangeError when setting baseStats.maxHealth to a negative number or 0', () => {
  expect(() => {
    const char = createCharacter();
    char.baseStats.maxHealth = 0;
  }).toThrow(RangeError);
  expect(() => {
    const char = createCharacter();
    char.baseStats.maxHealth = -1;
  }).toThrow(RangeError);
});

it('has a property baseStats.maxMana with the value of a number', () => {
  expect(createCharacter()).toHaveProperty('baseStats.maxMana', expect.any(Number));
});
it('has a property baseStats.maxMana that can be set to a positive number', () => {
  const char = createCharacter();
  char.baseStats.maxMana = 20;
  expect(char).toHaveProperty('baseStats.maxMana', 20);
});
it('throws a TypeError when setting baseStats.maxMana to a type other than number', () => {
  expect(() => {
    const char = createCharacter();
    char.baseStats.maxMana = null;
  }).toThrow(TypeError);
  expect(() => {
    const char = createCharacter();
    char.baseStats.maxMana = undefined;
  }).toThrow(TypeError);
});
it('throws a RangeError when setting baseStats.maxMana to a negative number or 0', () => {
  expect(() => {
    const char = createCharacter();
    char.baseStats.maxMana = 0;
  }).toThrow(RangeError);
  expect(() => {
    const char = createCharacter();
    char.baseStats.maxMana = -1;
  }).toThrow(RangeError);
});

it('has a property baseStats.strength with the value of a number', () => {
  expect(createCharacter()).toHaveProperty('baseStats.strength', expect.any(Number));
});
it('has a property baseStats.strength that can be set to a positive number', () => {
  const char = createCharacter();
  char.baseStats.strength = 20;
  expect(char).toHaveProperty('baseStats.strength', 20);
});
it('throws a TypeError when setting baseStats.strength to a type other than number', () => {
  expect(() => {
    const char = createCharacter();
    char.baseStats.strength = null;
  }).toThrow(TypeError);
  expect(() => {
    const char = createCharacter();
    char.baseStats.strength = undefined;
  }).toThrow(TypeError);
});
it('throws a RangeError when setting baseStats.strength to a negative number or 0', () => {
  expect(() => {
    const char = createCharacter();
    char.baseStats.strength = 0;
  }).toThrow(RangeError);
  expect(() => {
    const char = createCharacter();
    char.baseStats.strength = -1;
  }).toThrow(RangeError);
});

it('has a property baseStats.defense with the value of a number', () => {
  expect(createCharacter()).toHaveProperty('baseStats.defense', expect.any(Number));
});
it('has a property baseStats.defense that can be set to a positive number', () => {
  const char = createCharacter();
  char.baseStats.defense = 20;
  expect(char).toHaveProperty('baseStats.defense', 20);
});
it('throws a TypeError when setting baseStats.defense to a type other than number', () => {
  expect(() => {
    const char = createCharacter();
    char.baseStats.defense = null;
  }).toThrow(TypeError);
  expect(() => {
    const char = createCharacter();
    char.baseStats.defense = undefined;
  }).toThrow(TypeError);
});
it('throws a RangeError when setting baseStats.defense to a negative number or 0', () => {
  expect(() => {
    const char = createCharacter();
    char.baseStats.defense = 0;
  }).toThrow(RangeError);
  expect(() => {
    const char = createCharacter();
    char.baseStats.defense = -1;
  }).toThrow(RangeError);
});

it('has a property abilities with the value of a Map', () => {
  expect(createCharacter()).toHaveProperty('abilities', expect.any(Map));
});

it('has a property abilities that contains all of the given abilities', () => {
  const abilities = [MageArmor, Shrink];
  expect(Array.from(new Character({ name, stats, abilities }).abilities.keys())).toEqual(
    expect.arrayContaining(abilities.map(({ name }) => name))
  );
});

it('has a property effects with a value on an empty array', () => {
  expect(createCharacter()).toHaveProperty('effects', expect.arrayContaining([]));
});
it('has a property effects that can be set to an array', () => {
  const char = createCharacter();
  char.effects = [];
});
it('throws a TypeError when setting effects to anything other than an array', () => {
  expect(() => {
    const char = createCharacter();
    char.effects = null;
  }).toThrow(TypeError);
  expect(() => {
    const char = createCharacter();
    char.effects = {};
  }).toThrow(TypeError);
  expect(() => {
    const char = createCharacter();
    char.effects = 23;
  }).toThrow(TypeError);
});

it('returns a modified stats.health value when an effect that modifies health is added', () => {
  const char = createCharacter();
  char.stats.health = 20;
  expect(char).toHaveProperty('stats.health', 20);
  char.effects.push({ health: { scalar: 0.5, offset: 5 } });
  expect(char).toHaveProperty('stats.health', 15);
});
it('returns a modified stats.mana value when an effect that modifies mana is added', () => {
  const char = createCharacter();
  char.stats.mana = 20;
  expect(char).toHaveProperty('stats.mana', 20);
  char.effects.push({ mana: { scalar: 0.5, offset: 5 } });
  expect(char).toHaveProperty('stats.mana', 15);
});
it('returns a modified stats.strength value when an effect that modifies mana is strength', () => {
  const char = createCharacter();
  char.baseStats.strength = 20;
  expect(char).toHaveProperty('stats.strength', 20);
  char.effects.push({ strength: { scalar: 0.5, offset: 5 } });
  expect(char).toHaveProperty('stats.strength', 15);
});
it('returns a modified stats.defense value when an effect that modifies mana is defense', () => {
  const char = createCharacter();
  char.baseStats.defense = 20;
  expect(char).toHaveProperty('stats.defense', 20);
  char.effects.push({ defense: { scalar: 0.5, offset: 5 } });
  expect(char).toHaveProperty('stats.defense', 15);
});

it('has a property isAlive that is a boolean', () => {
  expect(createCharacter()).toHaveProperty('isAlive', expect.any(Boolean));
});

it('has a property isAlive that returns true if "stats.health" > 0', () => {
  const char = createCharacter();
  expect(char.stats.health).toBeGreaterThan(0);
  expect(char).toHaveProperty('isAlive', true);
  char.stats.health = 0;
  expect(char.stats.health).toBe(0);
  expect(char).toHaveProperty('isAlive', false);
});

it('has a method toString that returns a string', () => {
  expect(createCharacter().toString()).toEqual(expect.any(String));
});
