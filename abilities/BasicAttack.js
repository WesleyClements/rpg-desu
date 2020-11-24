const { canUse } = require('./util');

module.exports = {
  name: 'Basic Attack',
  target: 'enemy',
  apply(user, victim) {
    const damage = Math.max(user.stats.strength - victim.stats.defense, 0);
    if (damage === 0) console.log(`${user.name}'s sword bounces off of ${victim.name}'s shield...`);
    else {
      victim.stats.health -= damage;
      console.log(`${user.name} struck ${victim.name} for ${damage} damage.`);
    }
  },
};
