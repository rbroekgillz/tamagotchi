const prompt = require('prompt');
const {Tamagotchi} = require('./Tamagotchi');

const name = process.argv[2] || 'Gordon';
const pet = new Tamagotchi(name);


const commands = {
    snack: 's',
    meal: 'm',
    scold: 'x',
    toilet: 't',
    pickLeft: 'l',
    pickRight: 'r',
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
 "${commands.pickLeft}" to play a game with ${name} and pick left.
 "${commands.pickRight}" to play a game with ${name} and pick right.
 "${commands.quit}" to stop playing.
 `;
}

function userGivesCommand(err, {command}) {
    console.log(menuMessage(name));
    if (err) {
        console.log('There has been an error. Quiting...');
        process.exit();

    }

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
        case commands.pickLeft:
            pet.play('left');
            break;
        case commands.pickRight:
            pet.play('right');
            break;
        case commands.quit:
            console.log('You quit the game');
            process.exit();
            break;
        default:
            console.log(`Please enter a valid command for ${name}`);
            break;
    }

    pet.progress();

    if (pet.shouldDie()) {
        process.exit();
    }

    prompt.get(['command',], userGivesCommand);
}

console.log(menuMessage(name));
pet.hatch();
prompt.start();
prompt.get(['command',], userGivesCommand);