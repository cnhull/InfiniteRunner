class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('skater', './assets/skater.png');
        this.load.image('sunlight', './assets/sunlight.png');
        this.load.image('snowfield', './assets/snowfield.png');
        this.load.image('ice', './assets/ice.png');
        this.load.image('gameOverBox', './assets/gameOver.png');

       
        
        
    }

    create() {

        let musicConfig = {  
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
            
        }

        let music = this.sound.add('Music', musicConfig);
        music.play(musicConfig);

        // place tile sprite
        this.snowfield = this.add.tileSprite(0, 0, 640, 480, 'snowfield').setOrigin(0, 0);
        this.icefield = this.add.tileSprite(0, 0, 640, 480, 'ice').setOrigin(0, 0);
        //this.frame = this.add.tileSprite(0, 0, 640, 480, 'frame').setOrigin(0, 0);

        // white rectangle borders
        /*this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        */

        // add Skater
        this.Player = new Skater(this, game.config.width/2 - 80, 280, 'skater').setScale(0.4, 0.4).setOrigin(0, 0);
        this.Sunlight01 = new Sunlight(this, game.config.width, 230, 'sunlight', 0, 50).setOrigin(0,0);

        

        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
     

        // animation config
        

        // player 1 score
        this.p1Score = 0;
        
        
        // score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#ffffff',
            color: '#000000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 260
        }
        
        this.scoreLeft = this.add.text(200, 10, 'The Snow Falls', scoreConfig);
        //this.scoreRight = this.add.text(369, 54, 'FIRE', scoreConfig);
        
       

        this.currentTime = game.settings.gameTimer/1000;
        this.currentTime--;
        scoreConfig.align = 'center';
        this.timeDisplay = this.add.text(200, 54, 'Time Left: '+ this.currentTime,  scoreConfig);
        
        // decrement timer
        let timedEvent = this.time.addEvent({ 
            delay: 1000, 
            callback: function() {
                this.currentTime -= 1;
                this.timeDisplay.text = 'Time Left: '+ this.currentTime; 
            }, 
            callbackScope: this, 
            loop: true
            
        });

        

        

        // game over flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.goof = this.add.rectangle(0, 0, 640, 480, 0x000000, 1).setOrigin(0, 0);
        this.end = this.add.image(game.config.width/2, game.config.height/2, 'gameOverBox');
        this.results = this.add.text(game.config.width/2, 200, this.gameOverScore + "  ", scoreConfig);
        this.results.alpha = 0;
        this.end.alpha = 0;
        

        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
           
         }, null, this);


        
    }

    update() {
        
        if(!this.gameOver){
        this.timeLeft = Math.trunc((game.settings.gameTimer - this.clock.getElapsed())/1000)
        this.totalTime = Math.trunc(this.time.now/1000);
        this.results.text = this.totalTime;
        console.log("been playing: " + this.results.text);

        //this.timeDisplay.text = 'Time Left: '+ this.timeLeft;
        //console.log(this.timeLeft);
        //this.clockDisplay.text = this.timeLeft;
        if(this.currentTime>61){
            this.goof.alpha = 0;
        }

        if(this.currentTime < 61){
            //console.log("time left: "  + this.timeLeft)
            this.col = 0.61 - 0.01*(this.currentTime);
            //console.log(0.1*this.timeLeft);
            this.goof.alpha = this.col;
            //console.log("fucka you basard " + this.col)
        }
        console.log(this.currentTime + "aaaaahhhh");
        if(this.currentTime <= 0){
            this.gameOver = true;
        }
        

        this.snowfield.tilePositionX += 4;  // scroll tile sprite
        this.icefield.tilePositionX += 4;
        this.Player.update();         // update Skater sprite
        this.Sunlight01.update();
            
    
    }
    if(this.gameOver){
        this.end.alpha = 1;
        this.results.alpha = 1;
    }

        // check key input for restart / menu
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.music.stop();
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.music.stop();
            this.scene.start("menuScene");
        }
        
        if (this.checkCollision(this.Player, this.Sunlight01)) {
            this.currentTime += 2;
            this.timeDisplay.text = 'Time Left: '+ this.currentTime;
            this.Sunlight01.reset();
            
        }
    }
        
        checkCollision(Player, Sunlight) {
            // simple AABB checking
            if (Sunlight.x < Player.x + Player.width*0.35 && 
                Sunlight.x > Player.x - Player.width*0.35 && 
                Sunlight.y < Player.y + Player.height*0.4 &&
                Sunlight.y > Player.y - Player.height*0.4) {
                    return true;
            } 
            else {
                return false;
            }
        
        }
              
        
}