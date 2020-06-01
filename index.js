const prompt = require('prompt');
const Tamagotchi = require('./tamagotchi');

const name = process.argv[2] || 'Gordon';
const pet = new Tamagotchi(name);
pet.hatch();

const commands = {
  snack: 's',
  meal: 'm',
  scold: 'x',
  toilet: 't',
  play: 'p',
  quit: 'q',
  stats: 'st',
  kill: 'k'
};

function menuMessage(name) {
  return `Do an action for ${name}.
 Type any of these commands:
 
 "${commands.snack}" to feed a snack to ${name}.
 "${commands.meal}" to feed a meal to ${name}.
 "${commands.scold}" to scold ${name}.
 "${commands.toilet}" to let ${name} go to the toilet.
 "${commands.play}" to play a game with ${name}.
 "${commands.quit}" to stop playing.
 
 "${commands.stats}" to get stats.
 "${commands.kill}" to kill the ${name}.
 `;
}

function userGivesCommand(err, { command }) {
  if (err) {
    console.log('There has been an error. Quiting...');
    process.exit();
  };

  console.log(menuMessage(name));

  switch (command.toLowerCase()) {
    case commands.snack:
      pet.feed('snack');
      break;
    case commands.meal:
      pet.feed('meal');
      break;
    case commands.scold:
      pet.scold();
      break;
    case commands.toilet:
      pet.toilet();
      break;
    case commands.play:
      pet.play();
      break;
    case commands.quit:
      console.log('You quit the game');
      process.exit();
      break;
    case commands.stats:
      console.log(pet.getStats());
      break;
    case commands.kill:
      pet.kill();
      break;
    default:
      console.log(`Please enter a valid command for ${name}`);
      break;
  }

  const hasDied = pet.progress();
  if (hasDied) process.exit();

  prompt.get(['command',], userGivesCommand);
}
prompt.start();
prompt.get(['command',], userGivesCommand);