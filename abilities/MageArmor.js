const { canUse } = require('./util');
module.exports = {
  name: 'Mage Armor',
  manaCost: 1,
  target: 'self',
  apply(user) {
    if (!canUse(user, this.manaCost)) {
      console.log(`${user.name}'s spell fizzled in their face...`);
      return;
    }
    if (user.stats.health < 20) {
      user.effects.push({
        isNew: true,
        duration: 2,
        defense: { offset: 300 },
        onDispel: () => {
          console.log(`${user.name}'s magic cloak vanished...`);
        },
      });
      console.log(`${user.name} is surrounded by a powerful, magic defensive cloak!`);
    } else console.log(`${user.name}'s spell fizzles doing nothing...`);
  },
};
