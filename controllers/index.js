/**
 * @callback IDetermineControllerAction
 * @param {import('../Character')} character - Character to control
 * @param {object} state - state used to determine action
 */

/**
 * @typedef {object} CharacterController
 * @property {IDetermineControllerAction} getNextAction - returns the next action for the character given current state
 */

export { Humanoid } from './Humanoid.js';
export { Player } from './Player.js';
