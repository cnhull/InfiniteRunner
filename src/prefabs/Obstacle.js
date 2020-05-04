class Obstacle extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene, displayList, updateList
    }

    update() {
        // move sunlight left
        this.x -= 4*game.settings.gameSpeed;
        // wraparound from left to right edge
        if (this.x <= 0-this.width) {
            game.settings.hit = false;
            this.reset();
        }

    }

    reset() {
        var value = Phaser.Math.Between(165, 430);
        this.x = 700;
        this.y = value;
        this.done = false;
        //game.settings.hit = false;
        
    }
}