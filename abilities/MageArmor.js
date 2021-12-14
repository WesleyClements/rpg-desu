import { canUse } from './util/index.js';
/**
 * @type {import('.').Ability}
 */
export const MageArmor = {
  name: 'Mage Armor',
  manaCost: 1,
  targeting: 'self',
  apply(user) {
    if (!canUse(user, this.manaCost)) {
      console.log(`${user.name}'s spell fizzled in their face...`);
      return;
    }
    if (user.stats.health < 20) {
      user.effects.push({
        isNew: true,
        duration: 2,
        attributeModifiers: {
          defense: { offset: 300 },
        },
        onComplete: () => {
          console.log(`${user.name}'s magic cloak vanished...`);
        },
      });
      console.log(`${user.name} is surrounded by a powerful, magic defensive cloak!`);
    } else console.log(`${user.name}'s spell fizzles doing nothing...`);
  },
};
