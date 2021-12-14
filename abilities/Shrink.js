import { canUse } from './util/index.js';
/**
 * @type {import('.').Ability}
 */
export const Shrink = {
  name: 'Shrink',
  manaCost: 1,
  targeting: 'enemy',
  apply(user, victim) {
    if (!canUse(user, this.manaCost)) {
      console.log(`${user.name} lack the magical energy to cast Shrink...`);
      return;
    }
    if (victim.stats.health > 20) {
      victim.effects.push({
        isNew: true,
        duration: 5,
        attributeModifiers: {
          strength: { scalar: 0.5 },
          defense: { scalar: 0.5 },
        },
        onComplete: () => {
          console.log(`${victim.name} regrew in size...`);
        },
      });
      console.log(`${victim.name} is significantly diminished in size.`);
    } else console.log(`${user.name}'s spell fizzles doing nothing...`);
  },
};
