
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
   
    scene: [ Menu, Play ]
}

// main game object
let game = new Phaser.Game(config);

// define game settings
game.settings = {
    gameTimer: 6000  
}


// reserve keyboard vars
let keyF, keyLEFT, keyRIGHT, keyDOWN, keyUP, keySPACE;

