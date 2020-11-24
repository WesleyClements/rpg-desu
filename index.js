const inquirer = require('inquirer');

const Character = require('./Character');
const { Warrior } = require('./classes');
const { MageArmor, Shrink } = require('./abilities');

const getPlayerInfo = () => {
  return inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'What is your name?',
    filter: () => 'Timmy',
  });
};

const getPlayerAction = () => {
  return inquirer.prompt({
    type: 'list',
    name: 'abilityName',
    message: 'What ability would you like to use?',
    choices: [...player.abilities.values()].map(({ name }) => name),
  });
};

const getEnemyAction = () => {
  if (Math.random() < 0.2) return -1;
  return 'Basic Attack';
};

const loop = () => {
  return Promise.all([getPlayerAction(), getEnemyAction()]).then(
    ([{ abilityName: playerAction }, enemyAction]) => {
      if (Math.random() > 0.5) {
        player.useAbility(playerAction, orc);
        orc.useAbility(enemyAction, player);
      } else {
        orc.useAbility(enemyAction, player);
        player.useAbility(playerAction, orc);
      }
      player.updateEffects();
      orc.updateEffects();
      console.log(player.toString());
      console.log(orc.toString());
      if (player.isAlive && orc.isAlive) return loop();
    }
  );
};

let player;
const orc = new Character({
  name: 'Balethzar',
  characterClass: Warrior,
});
getPlayerInfo()
  .then(({ name }) => {
    player = new Character({
      name,
      characterClass: Warrior,
      bonusAbilities: [MageArmor, Shrink],
    });
    console.log(
      `${player.name} awakes butt-naked in the middle of an orc field. In the distance, ${player.name} sees a hulking figure sprinting full speed towards ${player.name}. It is ${orc.name}. Fight commence. ${player.name} rolls a nat 1 for initiative.`
    );
    return loop();
  })
  .then(() => {
    if (player.isAlive) {
      console.log("Timmy survived. This isn't possible.");
    } else {
      console.log('There is nothing left of timmy.');
    }
  });
