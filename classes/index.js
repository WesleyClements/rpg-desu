import CharacterClass from './CharacterClass.js';
import { BasicAttack } from '../abilities/index.js';

export const Warrior = new CharacterClass({
  name: 'Warrior',
  stats: {
    health: { min: 20, max: 30 },
    mana: { min: 20, max: 30 },
    strength: { min: 20, max: 30 },
    defense: { min: 20, max: 30 },
  },
  abilities: [BasicAttack],
});
