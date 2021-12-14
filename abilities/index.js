/**
 * @callback IApplyAbility
 * @param {import('../Character')} user - Character using this ability
 * @param {import('../Character')} [target] - Character this ability is being used on
 */


/**
 * @typedef {object} Ability
 * @property {string} name - the name of this Ability
 * @property {'enemy'|'self'} targeting - what this ability can target
 * @property {number} manaCost - how much mana this ability costs to use
 * @property {IApplyAbility} apply - applies this ability
 */

export { BasicAttack } from './BasicAttack.js';
export { MageArmor } from './MageArmor.js';
export { Shrink } from './Shrink.js';