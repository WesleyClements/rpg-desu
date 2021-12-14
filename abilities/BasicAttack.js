/**
 * @type {import('.').Ability}
 */
export const BasicAttack = {
  name: 'Basic Attack',
  targeting: 'enemy',
  apply(user, target) {
    const damage = Math.max(user.stats.strength - target.stats.defense, 0);
    if (damage === 0) console.log(`${user.name}'s sword bounces off of ${target.name}'s shield...`);
    else {
      target.stats.health -= damage;
      console.log(`${user.name} struck ${target.name} for ${damage} damage.`);
    }
  },
};
