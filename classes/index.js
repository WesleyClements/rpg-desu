const CharacterClass = require('./CharacterClass');
const { BasicAttack } = require('../abilities');

module.exports = {
  Warrior: new CharacterClass({
    name: 'Warrior',
    stats: {
      health: { min: 20, max: 30 },
      mana: { min: 20, max: 30 },
      strength: { min: 20, max: 30 },
      defense: { min: 20, max: 30 },
    },
    abilities: [BasicAttack],
  }),
};
