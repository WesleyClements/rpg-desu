const inquirer = require('inquirer');

const selectTarget = ({ message, choices }) => {
  return choices.length > 1
    ? inquirer.prompt({
        type: 'list',
        name: 'target',
        message,
        choices: [
          ...choices.map((target) => ({ name: target.name, value: target })),
          { name: 'Go Back', value: null },
        ],
      })
    : { target: choices[0] };
};

module.exports = {
  async getAction(character, state) {
    const action = {};
    while (!action.type && !action.targets) {
      if (!action.type) {
        const { actionType } = await inquirer.prompt({
          type: 'list',
          name: 'actionType',
          message: `What should ${character.name} do?`,
          choices: [
            { name: 'Attack', value: 'attack' },
            { name: 'Use Ability', value: 'ability' },
            { name: 'Use Item', value: 'item' },
          ],
        });
        if (actionType === 'item') {
          console.log(`${character.name} doesn't know how to use items...`);
          continue;
        }
        action.type = actionType;
      }
      switch (action.type) {
        case 'attack': {
          action.type = 'ability';
          action.ability = 'Basic Attack';
          const { target } = await selectTarget({
            message: `Who does ${character.name} attack?`,
            choices: state.enemies,
          });
          if (target == null) {
            delete action.type;
            delete action.ability;
            continue;
          }
          action.targets = [target];
          return action;
        }
        case 'ability': {
          if (!action.ability) {
            const { ability } = await inquirer.prompt({
              type: 'list',
              name: 'ability',
              message: `What ability should ${character.name} use?`,
              choices: [
                ...[...character.abilities.values()]
                  .filter(({ name }) => name !== 'Basic Attack')
                  .map((ability) => ({ name: ability.name, value: ability })),
                { name: 'Go Back', value: null },
              ],
            });
            if (ability == null) {
              delete action.type;
              delete action.ability;
              continue;
            }
            action.ability = ability;
          }
          switch (action.ability.target) {
            case 'self': {
              action.targets = [];
              break;
            }
            case 'friendly': {
              break;
            }
            case 'enemy': {
              const { target } = await selectTarget({
                message: `Who does ${character.name} target with ${action.ability.name}?`,
                choices: state.enemies,
              });
              if (target == null) {
                delete action.type;
                delete action.ability;
                continue;
              }
              action.targets = [target];
              break;
            }
            case 'any': {
              break;
            }
          }
          action.ability = action.ability.name;
          return action;
        }
        default: {
          delete action.type;
          delete action.ability;
        }
      }
    }
    return action;
  },
};
