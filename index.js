import inquirer from 'inquirer';
import * as controllers from './controllers/index.js';
import Character from './Character.js';
import { Warrior } from './classes/index.js';
import { BasicAttack, MageArmor, Shrink } from './abilities/index.js';

const getPlayerInfo = () => inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'What is your name?',
    filter: () => 'Timmy',
  }
]);

const player = new Character({
  stats: Warrior.generateStats(),
  abilities: [BasicAttack, MageArmor, Shrink],
  ...(await getPlayerInfo()),
});
const orc = new Character({
  name: 'Balethzar',
  stats: Warrior.generateStats(),
  abilities: [BasicAttack],
});

const participants = [player, orc];

console.log(
  `${player.name} awakes butt-naked in the middle of an orc field. In the distance, ${player.name} sees a hulking figure sprinting full speed towards ${player.name}. It is ${orc.name}. Fight commence. ${player.name} rolls a nat 1 for initiative.`
);

console.log(participants.join('\n'));

while (player.isAlive && orc.isAlive) {
  const [playerAction, enemyAction] = await Promise.all([
    controllers.Player.getNextAction(player, { enemies: [orc] }),
    controllers.Humanoid.getNextAction(orc, { enemies: [player] }),
  ]);
  const actions = [
    {
      actor: player,
      act: () => player.useAbility(playerAction.ability, playerAction.targets[0])
    },
    {
      actor: orc,
      act: () => orc.useAbility(enemyAction.ability, player)
    },
  ];
  if (Math.random() > 0.5) actions.reverse();
  actions.forEach(({ actor, act }) => {
    if (act()) return;
    console.log(`${actor.name} is cocky and decided to do nothing.`);
  });
  player.updateEffects();
  orc.updateEffects();
  console.log(participants.join('\n'));
}
if (player.isAlive) {
  console.log('Timmy survived. This isn\'t possible.');
} else {
  console.log('There is nothing left of timmy.');
}
