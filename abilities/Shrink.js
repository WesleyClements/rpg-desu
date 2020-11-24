const { canUse } = require('./util');
module.exports = {
  name: 'Shrink',
  manaCost: 1,
  target: 'enemy',
  apply(user, victim) {
    if (!canUse(user, this.manaCost)) {
      console.log(`${user.name}'s spell fizzled in their face...`);
      return;
    }
    if (victim.stats.health > 20) {
      victim.effects.push({
        isNew: true,
        duration: 5,
        strength: { scalar: 0.5 },
        defense: { scalar: 0.5 },
        onDispel: () => {
          console.log(`${victim.name} regrew in size...`);
        },
      });
      console.log(`${victim.name} is significantly diminished in size.`);
    } else console.log(`${user.name}'s spell fizzles doing nothing...`);
  },
};
