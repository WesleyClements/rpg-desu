import inquirer from 'inquirer';

/**
 * @typedef {import('../Character.js')} Character
 */

const getNonNullValue = async (provider) => {
  let value;
  do {
    value = await provider();
  } while (value == null);
  return value;
};

/**
 * @typedef {object} TargetPromptParams
 * @property {string} message - the prompt message
 * @property {Array<Character>} choices - the targets to chose from
 */

/**
 * @async
 * @function selectTarget
 * @param {TargetPromptParams} params 
 * @returns {Promise<object>}
 */
const selectTarget = async ({ message, choices }) => {
  if (choices.length == 1) return choices[0];
  const { target } = await inquirer.prompt({
    type: 'list',
    name: 'target',
    message,
    choices: [
      ...choices.map((target) => ({ name: target.name, value: target })),
      { name: 'Go Back', value: null },
    ],
  });
  return target;
};

/**
 * @type {import('.').CharacterController}
 */
export const Player = {
  async getNextAction(character, state) {
    return await getNonNullValue(
      async () => {
        const { actionType } = await inquirer.prompt({
          type: 'list',
          name: 'actionType',
          message: `What should ${character.name} do?`,
          choices: [
            { name: 'Attack', value: 'attack' },
            { name: 'Use Ability', value: 'ability' },
            { name: 'Use Item', value: 'item' },
          ]
        });
        switch (actionType) {
        case 'attack': {
          const target = await selectTarget({
            message: `Who does ${character.name} attack?`,
            choices: state.enemies,
          });
          if (target == null) break;
          return {
            type: 'ability',
            ability: 'Basic Attack',
            targets: [target]
          };
        }
        case 'ability': {
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
          if (ability == null) break;
          const targets = await (async() => {
            switch (ability.targeting) {
            case 'self': {
              return [];
            }
            case 'friendly': {
              break;
            }
            case 'enemy': {
              const target = await selectTarget({
                message: `Who does ${character.name} target with ${ability.name}?`,
                choices: state.enemies,
              });
              if (target == null) break;
              return [target];
            }
            case 'any': {
              break;
            }
            }
            return null;
          })();

          return {
            type: 'ability',
            ability: ability.name,
            targets
          };
        }
        case 'item': {
          console.log(`${character.name} doesn't know how to use items...`);
          break;
        }
        }
        return null;
      }
    );
  },
};
