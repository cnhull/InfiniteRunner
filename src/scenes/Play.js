let music;
class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('skater', './assets/skater.png');
        this.load.image('sunlight', './assets/sunlight.png');
        this.load.image('sky', './assets/sky.png');
        this.load.image('trees1', './assets/trees1.png');
        this.load.image('trees2', './assets/trees2.png');
        this.load.image('snowFront', './assets/snow2.png');
        this.load.image('snowBack', './assets/snow.png');
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

        music = this.sound.add('Music', musicConfig);
        music.play(musicConfig);

        // place tile sprites
        this.sky = this.add.tileSprite(0, 0, 640, 480, 'sky').setOrigin(0, 0);
        this.trees2 = this.add.tileSprite(0, 0, 640, 480, 'trees2').setOrigin(0, 0);
        this.snowfield2 = this.add.tileSprite(0, -15, 640, 480, 'snowBack').setOrigin(0, 0);
        this.trees1 = this.add.tileSprite(0, 0, 640, 480, 'trees1').setOrigin(0, 0);
        this.snowfield = this.add.tileSprite(0, 0, 640, 480, 'snowFront').setOrigin(0, 0);
        //this.snowfield2 = this.add.tileSprite(0, 0, 640, 480, 'snowBack').setOrigin(0, 0);
        this.icefield = this.add.tileSprite(0, 0, 640, 480, 'ice').setOrigin(0, 0);

        // white rectangle borders
        /*this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        */

        // add Skater
        this.Sunlight01 = new Sunlight(this, game.config.width, 230, 'sunlight', 0, 50).setOrigin(0,0);
        this.Player = new Skater(this, game.config.width/2 - 80, 280, 'skater').setScale(0.4, 0.4).setOrigin(0, 0);
        //this.Sunlight01 = new Sunlight(this, game.config.width, 230, 'sunlight', 0, 50).setOrigin(0,0);

        

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
            fontFamily: 'Trebuchet MS',
            fontSize: '20px',
            //backgroundColor: '#ffffff',
            color: '#aaaae8',
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
        this.total = 0;
        scoreConfig.align = 'center';
        this.timeDisplay = this.add.text(200, 54, 'Time Left: '+ this.currentTime,  scoreConfig);
        
        // decrement timer
        let timedEvent = this.time.addEvent({ 
            delay: 1000, 
            callback: function() {
                this.currentTime -= 1;
                this.timeDisplay.text = 'Time Left: '+ this.currentTime;
                this.total++;
            }, 
            callbackScope: this, 
            loop: true
            
        });

        

        

        // game over flag
        this.gameOver = false;
        this.sunCount = 0;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.goof = this.add.rectangle(0, 0, 640, 480, 0x000000, 1).setOrigin(0, 0);
        this.end = this.add.image(game.config.width/2, game.config.height/2, 'gameOverBox');
        this.results = this.add.text(game.config.width/2 + 10, 202,  "  ", scoreConfig);
        this.suns = this.add.text(game.config.width/2 + 35, 247, this.sunCount + "  ", scoreConfig);
        this.results.alpha = 0;
        this.end.alpha = 0;
        this.suns.alpha = 0;
        

        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
           
         }, null, this);


        
    }

    update() {
        
        if(!this.gameOver){
        this.timeLeft = Math.trunc((game.settings.gameTimer - this.clock.getElapsed())/1000)
        this.totalTime = Math.trunc(this.time.now/1000);
        this.results.text = this.total;
        this.hold = this.total;

        console.log(this.total);
        //console.log("been playing: " + this.results.text);

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
        //console.log(this.currentTime + "aaaaahhhh");
        if(this.currentTime <= 0){
            this.gameOver = true;
        }
        


        this.trees2.tilePositionX += 3;
        this.snowfield2.tilePositionX += 3;
        this.trees1.tilePositionX += 4;
        this.snowfield.tilePositionX += 4;  // scroll tile sprite
        this.icefield.tilePositionX += 4;
        this.Player.update();         // update Skater sprite
        this.Sunlight01.update();
            
    
    }
    if(this.gameOver){
        this.end.alpha = 1;
        this.results.text = (this.calcTime(this.hold));
        this.results.alpha = 1;
        this.suns.alpha = 1;
    }

        // check key input for restart / menu
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keySPACE)) {
            music.stop();
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            music.stop();
            this.scene.start("menuScene");
        }
        
        if (this.checkCollision(this.Player, this.Sunlight01)) {
            this.inc = Phaser.Math.Between(1, 2);
            this.currentTime += this.inc;
            this.sunCount++;
            this.suns.text = this.sunCount;
            this.timeDisplay.text = 'Time Left: '+ this.currentTime;
            this.speedSun();
            this.Sunlight01.reset();

            
        }
    }
        speedSun(){
            let temp = game.settings.gameSpeed;
            if(temp < 2){
                game.settings.gameSpeed = temp + 0.05;
            }
            console.log(game.settings.gameSpeed);
        }

        calcTime(seconds){
            let str = "";
            let minutes = 0;
            while(seconds > 59){
                minutes++;
                seconds -= 60;
            }
            if(!minutes==0){
                if(minutes==1){
                    str = str + minutes + " minute  " ;
                }
                else{
                    str = str + minutes + " minutes  " ;
                }
            }
            if(seconds==1){
                str = str + seconds + " second";
            }
            else{
                str = str + seconds + " seconds";
            }
            return str;
        }    

        checkCollision(player, sun) {
            // simple AABB checking
            //top right corner
            let width = player.width*0.4;
            let height = player.height*0.4;
            let mod = 0.8*height;
            
            //top right corner
            if( sun.x > player.x &&
                sun.x < player.x + width &&
                sun.y + sun.height > player.y + mod &&
                sun.y < player.y + height){
                return true;
            }
            //bottom right corner
            if( sun.x > player.x &&
                sun.x < player.x + width &&
                sun.y > player.y + mod &&
                sun.y < player.y + height){
                    return true;
                }
            //top left corner
            if( sun.x + sun.width > player.x &&
                sun.x < player.x + width &&
                sun.y + sun.height > player.y + mod &&
                sun.y < player.y + height){
                    return true;
                }
            //bottom left corner
            if( sun.x + sun.width > player.x &&
                sun.x < player.x + width &&
                sun.y > player.y + mod &&
                sun.y < player.y + height){
                    return true;
                }


            else {
                return false;
            }
        
        }
              
        
}