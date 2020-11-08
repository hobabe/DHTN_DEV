EPT._weapon = {
    Bullet(direction, key) {

        return new Phaser.Class({

            Extends: Phaser.GameObjects.Image,

            initialize:

                function Bullet(scene) {
                    Phaser.GameObjects.Image.call(this, scene, 0, 0, key);

                    this.speed = Phaser.Math.GetSpeed(300, 1)
                    this.direction = direction;
                    if (direction == -1) {
                        this.angle = 180;
                    }

                    scene.physics.add.existing(this, 0);
                    // this.left = false;
                    // this.right = false;
                    this.setVisible(100, 100);
                    const scale = 0.3;
                    this.setScale(scale);
                    this.body.setSize(60 + 60 * scale, 10 + 10 * scale)
                    this.body.allowGravity = false;
                },

            fire: function (x, y) {
                this.setPosition(x, y);

                this.setActive(true);
                this.setVisible(true);
            },

            update: function (time, delta) {
                this.x += this.speed * delta * this.direction;
                // console.log(this.x);
                if (this.x > 900 || this.x < -100) {
                    this.setActive(false);
                    this.setVisible(false);
                }
            }

        });
    }

};