class Tamagotchi {
    name;
    birthDate;
    isHatched = false;
    gender = "m";
    family = "Zork";
    hunger = 0;
    happiness = 5;
    discipline = 5;
    numberOfPoops = 0;
    MAX_HUNGER = 10;
    MAX_HAPPINESS = 10;
    MAX_DISCIPLINE = 10;
    MAX_POOPS = 20;
    currentLifeCycle = 0;
    LIFE_CYCLES = ['Baby', 'Child', 'Teen', 'Adult',];
    isPottyTrained = false;
    isIll = false;
    isIllMessageHasBeenSent = false;

    constructor(name) {
        this.name = name;
        this.birthDate = new Date();
    }

    toilet() {
        this.numberOfPoops = 0;
        console.log(`${this.name} has been to the toilet.`);

        if (Math.random() < 0.1) {
            this.isPottyTrained = true;
            console.log(`${this.name} is now potty trained!`);
        }
    }

    feed(food) {
        if (this.hunger <= 0) {
            return console.log(`${this.name} is not hungry.`);
        }

        if (food === 'meal') {
            this.hunger -= 1;
            console.log(`${this.name} has eaten a meal.`);
        }

        if (food === 'snack') {
            this.hunger -= 1;
            this.happiness += 1;
            this.isIll = Math.random() < 0.1;
            console.log(`${this.name} has eaten a snack.`);
        }

        if (this.isIll && !this.isIllMessageHasBeenSent) {
            console.log(`Oh no! ${this.name} has gotten ill!`);
            this.isIllMessageHasBeenSent = true;
        }
    }

    scold() {
        if (this.discipline < this.MAX_DISCIPLINE) {
            this.happiness -= 1;
            this.discipline += 1;
            return console.log(`You scold ${this.name}.`);
        }
        console.log(`${this.name} is very disciplined and does not need scolding.`);
    }

    play(direction) {
        console.log(`You play a game with ${this.name} and you picked ${direction}.`);

        if (Math.random() > 0.5) {
            this.happiness += 1;
            return console.log(`${this.name} also picks ${direction}! ${this.name}'s happiness has increased.`);
        }

        console.log(`${this.name} did not pick ${direction}...`);
    }

    hatch() {
        console.log('Our egg is hatching! The miracle of life!');
        this.isHatched = true;
    }

    grow() {
        if (this.currentLifeCycle < this.LIFE_CYCLES.length - 1) {
            this.currentLifeCycle += 1;
            return console.log(`Hurray! ${this.name} has grown into a ${this.LIFE_CYCLES[this.currentLifeCycle]}!`);
        }
    }

    poop() {
        this.hunger += 1;

        if (!this.isPottyTrained) {
            this.numberOfPoops += 1;
        }
        console.log(`${this.name} is getting hungry. ${!this.isPottyTrained ? `Uh oh, ${this.name} has pooped.` : ''}`);
    }

    progress() {
        if (this.hunger < 2 && this.happiness >= 8 && this.discipline >= 5) {
            this.grow();
        }

        if (Math.random() < 0.8) {
            this.poop();
        }

        this.printStatus();
    }

    kill() {
        this.hunger = 0;
        this.happiness = 0;
        this.discipline = 0;
        console.log(`As cruel as you are, you kill ${this.name}`);
    }

    shouldDie() {
        if (this.hunger >= 10) {
            console.log(`Very sad news. ${this.name} has died from starvation.`);
            return true;
        }

        if (this.happiness <= 0) {
            console.log(`Very sad news. ${this.name} has died from depression.`);
            return true;
        }

        if (this.numberOfPoops >= 20) {
            console.log(`Very sad news. ${this.name} has died from dirtiness.`);
            return true;
        }

        if (this.currentLifeCycle === this.LIFE_CYCLES.length - 1) {
            console.log(`${this.name} has died of old age :(`);
            return true;
        }

        return false;
    }

    printStatus() {
        console.log(`
    ${this.name} stats: 
    Lifecycle: ${this.LIFE_CYCLES[this.currentLifeCycle]}
    happiness ${this.happiness}/${this.MAX_HAPPINESS}
    hunger ${this.hunger}/${this.MAX_HUNGER}
    poops ${this.numberOfPoops}/${this.MAX_POOPS}
    discipline ${this.discipline}/${this.MAX_DISCIPLINE}
    is ill? ${this.isIll ? 'yes' : 'no'}
        `);
    }

}

module.exports = {Tamagotchi};