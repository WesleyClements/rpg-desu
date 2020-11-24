const inquirer = require('inquirer');

module.exports = {
  async getAction(character, state) {
    const action = {};
    if (Math.random() < 0.2) return action;
    action.type = 'ability';
    action.ability = [...character.abilities.keys()][
      Math.floor(Math.random() * character.abilities.size)
    ];
    return action;
  },
};
