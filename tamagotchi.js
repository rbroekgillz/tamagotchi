class Tamagotchi {
  constructor(name) {
    this.hunger = 0;
    this.happiness = 5; // 0 to 10
    this.discipline = 5; // 0 to 10
    this.isHatched = false;
    this.numberOfPoops = 0; // 0 to 20
    this.currentLifeCycle = 0;
    this.LIFE_CYCLES = ['Baby', 'Child', 'Teen', 'Adult'];
    this.isPottyTrained = false;
    this.name = name;
    this.isIll = false;
    this.isIllMessageHasBeenSent = false;
    this.isAlive = true;
    this.dateOfBirth = new Date();
    this.gender = Math.random() > 0.5 ? 'f' : 'm';
    this.family = 'Gillz';
  }

  hatch() {
    console.log('Our egg is hatching! The miracle of life!');
    this.isHatched = true;
  }

  poop() {
    this.hunger += 1;
    if (!this.isPottyTrained) this.numberOfPoops += 1;
    console.log(`${this.name} is getting hungry. ${!this.isPottyTrained ? `Uh oh, ${this.name} has pooped. The number of poops is now ${this.numberOfPoops}.` : ''}`);

    if (this.numberOfPoops >= 10) {

    }
  }
  toilet() {
    this.numberOfPoops = 0;
    console.log(`${this.name} has been to the toilet. The number of poops is ${this.numberOfPoops}.`);

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
      console.log(`${this.name} has eaten a meal. ${this.name}'s hunger is now ${this.hunger}.`);
    }

    if (food === 'snack') {
      this.hunger -= 1;
      this.happiness += 1;
      this.isIll = Math.random() < 0.1;
      console.log(`${this.name} has eaten a snack. ${this.name}'s hunger is now ${this.hunger} and ${this.name}'s happiness is ${this.happiness}.`);
    }

    if (this.isIll && !this.isIllMessageHasBeenSent) {
      console.log(`Oh no! ${this.name} has gotten ill!`);
      this.isIllMessageHasBeenSent = true;
    }
  }

  grow() {
    if (this.currentLifeCycle < this.LIFE_CYCLES.length - 1) {
      this.currentLifeCycle += 1;
      return console.log(`Hurray! ${this.name} has grown into a ${this.LIFE_CYCLES[this.currentLifeCycle]}!`);
    }
    console.log(`${this.name} has died of old age :(`);
    this.isAlive = false;
  }

  scold() {
    if (this.discipline < 10) {
      this.happiness -= 1;
      this.discipline += 1;
      return console.log(`You scold ${this.name}. Its happiness is now ${this.happiness} and discipline is ${this.discipline}`);
    }
    console.log(`${this.name} is very disciplined and does not need scolding.`);
  }

  play() {
    const randomBool = Boolean(Math.round(Math.random()));
    const direction = randomBool ? 'left' : 'right';
    console.log(`You play a game with ${this.name} and you picked ${direction}.`)

    if (Math.random() > 0.5) {
      this.happiness += 1;
      return console.log(`${this.name} also picks ${direction}! ${this.name}'s happiness has increased.`);
    }

    console.log(`${this.name} did not pick ${direction}...`);
  }

  progress() {
    if (this.hunger < 2 && this.happiness >= 8 && this.discipline >= 5) {
      this.grow();
    }

    if (Math.random() < 0.8) {
      this.poop();
    }

    return this.shouldDie();
  }

  kill() {
    this.hunger = 0;
    this.happiness = 0;
    this.discipline = 0;
    console.log(`As cruel as you are, you kill ${this.name}`);
  }

  shouldDie() {
    if (this.hunger >= 10) {
      console.log(`Very sad news. ${this.name} has died from starvation.`)
      return true;
    }

    if (this.happiness <= 0) {
      console.log(`Very sad news. ${this.name} has died from depression.`)
      return true;
    }

    if (this.numberOfPoops >= 20) {
      console.log(`Very sad news. ${this.name} has died from dirtiness.`)
      return true;
    }

    return false;
  }

  getStats() {
    return this;
  }

}

module.exports = Tamagotchi;