/**
 * @type {import('.').CharacterController}
 */
export const Humanoid = {
  async getNextAction(character, _state) {
    const shouldIdle = Math.random() < 0.2;
    if (shouldIdle) return {};
    const abilityIndex = Math.floor(Math.random() * character.abilities.size);
    const ability = [...character.abilities.keys()][abilityIndex];
    return {
      type: 'ability',
      ability
    };
  },
};
