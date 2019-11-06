/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properties and methods that are defined in their block comments below:
*/
  
/*
  === GameObject ===
  * createdAt
  * name
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method that returns: `${this.name} was removed from the game.`
*/
function GameObject(gameObjectArgs) {
  this.createdAt = gameObjectArgs.createdAt;
  this.name = gameObjectArgs.name;
  this.dimensions = gameObjectArgs.dimensions;
}

GameObject.prototype.destroy = function() {
  return `${this.name} was removed from the game.`;
}

/*
  === CharacterStats ===
  * healthPoints
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/
function CharacterStats(characterStatsArgs) {
  GameObject.call(this, characterStatsArgs)
  this.healthPoints = characterStatsArgs.healthPoints;
}

CharacterStats.prototype = Object.create(GameObject.prototype);
CharacterStats.prototype.takeDamage = function () {
  return `${this.name} took damage.`;
}

/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/
function Humanoid(humanoidArgs) {
  CharacterStats.call(this, humanoidArgs)
  this.team = humanoidArgs.team;
  this.weapons = humanoidArgs.weapons;
  this.language = humanoidArgs.language;
}

Humanoid.prototype = Object.create(CharacterStats.prototype);
Humanoid.prototype.greet = function() {
  return `${this.name} offers a greeting in ${this.language}.`;
}

/*
  * Inheritance chain: GameObject -> CharacterStats -> Humanoid
  * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
  * Instances of CharacterStats should have all of the same properties as GameObject.
*/

// Test you work by un-commenting these 3 objects and the list of console logs below:

/*
  const mage = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 1,
      height: 1,
    },
    healthPoints: 5,
    name: 'Bruce',
    team: 'Mage Guild',
    weapons: [
      'Staff of Shamalama',
    ],
    language: 'Common Tongue',
  });

  const swordsman = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 2,
      height: 2,
    },
    healthPoints: 15,
    name: 'Sir Mustachio',
    team: 'The Round Table',
    weapons: [
      'Giant Sword',
      'Shield',
    ],
    language: 'Common Tongue',
  });

  const archer = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 4,
    },
    healthPoints: 10,
    name: 'Lilith',
    team: 'Forest Kingdom',
    weapons: [
      'Bow',
      'Dagger',
    ],
    language: 'Elvish',
  });

  console.log(mage.createdAt); // Today's date
  console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
  console.log(swordsman.healthPoints); // 15
  console.log(mage.name); // Bruce
  console.log(swordsman.team); // The Round Table
  console.log(mage.weapons); // Staff of Shamalama
  console.log(archer.language); // Elvish
  console.log(archer.greet()); // Lilith offers a greeting in Elvish.
  console.log(mage.takeDamage()); // Bruce took damage.
  console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.
*/

  // Stretch task: 
  // * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.  
  // * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
  // * Create two new objects, one a villain and one a hero and fight it out with methods!

  function Villain(villainArgs) {
    Humanoid.call(this, villainArgs);
    this.wieldedWeapon = villainArgs.weapons[0];
    this.attack = this.backstab;
  }
  Villain.prototype = Object.create(Humanoid.prototype);
  Villain.prototype.backstab = function(victim) {
    const backstabMaxDmg = 8; // 1-circleDmg dmg points possible
    const dmgDealt = Math.round((((Math.random() * 100) + 1) % backstabMaxDmg) + 1);
    victim.healthPoints -= dmgDealt;
    console.log(`${this.name} quietly backstabs ${victim.name} with a ${this.wieldedWeapon}, dealing ${dmgDealt} damage!!`);

    if (victim.healthPoints <= 0) {
      console.log(`${victim.name} has died!!!`)
      victim.destroy();
    }
  }

  function Hero(heroArgs) {
    Humanoid.call(this, heroArgs);
    this.wieldedWeapon = heroArgs.weapons[0]; 
    this.attack = this.smite;
    this.godsArePleased = true;
  }

  Hero.prototype = Object.create(Humanoid.prototype);
  Hero.prototype.smite = function(victim) {
    const smiteMaxDmg = 5;
    const dmgDealt = Math.round((((Math.random() * 100) + 1) % smiteMaxDmg));
    victim.healthPoints -= dmgDealt; // Damages his foe with holy wrath
    if (dmgDealt > 0) {
      console.log(`${this.name} strongly smites ${victim.name} with a ${this.wieldedWeapon}, dealing ${dmgDealt} damage!!`);
      this.godsArePleased = true;
    } else {
      console.log(`${this.name} swings with a ${this.wieldedWeapon} and misses ${victim.name}.`)
      this.godsArePleased = false;
    }

          
    if (this.godsArePleased) {
      console.log(`${this.name} has pleased the gods and is bathed in healing light!`);
      this.healthPoints += (dmgDealt * 0.25); // Heals hero half of damage dealt to his/her foe
    }

    if (victim.healthPoints <= 0) {
      console.log(`${victim.name} has died!!!`)
      victim.destroy();
    } 
  }

  function CombatLoop(combatLoopArgs) {
    this.attacker = combatLoopArgs.attacker;
    this.defender = combatLoopArgs.defender;
    this.combat(this.attacker, this.defender); // Call this function on init
  }
    
  CombatLoop.prototype.combat = function (attacker, defender) {
    console.log(`${attacker.name} attacks ${defender.name}!`);
    console.log("");

    // Attacker gets first attack
    while (attacker.healthPoints > 0 && defender.healthPoints > 0) {
      attacker.attack(defender);
      if (defender.healthPoints > 0) {
        defender.attack(attacker);
      }
    }

    console.log("");
    console.log("Combat is over!");
  }

  const paladin = new Hero({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 3,
      height: 5,
    },
    healthPoints: 20,
    name: 'Damion',
    team: 'Highcastle',
    weapons: [
      'Blessed Greathammer',
    ],
    language: 'Old Norse',
  });

  const assassin = new Villain({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 3,
    },
    healthPoints: 12,
    name: 'Slilth the Cutthroat',
    team: 'Underground Caverns',
    weapons: [
      'Serrated Black Steel Dagger',
    ],
    language: 'Goblin',
  });

 const combat = new CombatLoop({
    attacker: assassin, 
    defender: paladin
  });