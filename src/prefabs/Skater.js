// Player prefab
class Skater extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene, displayList, updateList
        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
        this.isJumping = false;      // track firing status
        
    }

    update() {
        // up/down movement
        if (1==1) {
            if ((keyUP.isDown && this.y > 80)) {
                this.y -= 2;
            } else if ((keyDOWN.isDown && this.y < 325)) {
                this.y += 2;
            }
        }
        // jump button
        if ((Phaser.Input.Keyboard.JustDown(keySPACE) && !this.isJumping)){
            //this.isJumping = true;
            //this.sfxRocket.play();  // play sfx
        }
        // if jump, move up
        if (this.isJumping && this.y >= 108) {
            this.y -= 2;
        }
       
    }
    // reset rocket to "ground"
    reset() {
        this.isJumping = false;
        this.y = 280;
    }
}