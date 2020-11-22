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
    },
    
    createSword(player) {

        player.swordLeft = T.physics.add.sprite(player.sprite.body.x, player.sprite.body.y, 'sword');
        player.swordRight = T.physics.add.sprite(player.sprite.body.x, player.sprite.body.y, 'sword');

        player.swordLeft.angle = 270;
        player.swordRight.angle = 90;
        player.swordLeft.flipX = true;

        player.swordLeft.setBodySize(136, 14).setOffset(0, 90);
        player.swordRight.setBodySize(136, 14).setOffset(0, 90);

        player.swordLeft.body.allowGravity = false;
        player.swordRight.body.allowGravity = false;
        // player.swordRight.setGravity(0)

        player.swordLeft.disableBody(true, true);
        player.swordRight.disableBody(true, true);
    },

    createSwordCollision(player, enemy, GS, T) {
        T.physics.add.overlap(player.swordRight, enemy.sprite, function (a, weapon) {
            EPT._enemy.beKilled(enemy, weapon, 'sword', GS, T);
        }, null, T);

        T.physics.add.overlap(player.swordLeft, enemy.sprite, function (a, weapon) {
            EPT._enemy.beKilled(enemy, weapon, 'sword', GS, T);
        }, null, T);
    },

    createBullets(player, GS, T) {
        player.bulletsRight = T.add.group({
            classType: EPT._weapon.Bullet(1, 'bullet'),
            maxSize: player.weapon.bulletCount,
            runChildUpdate: true,
        });

        player.bulletsLeft = T.add.group({
            classType: EPT._weapon.Bullet(-1, 'bullet'),
            maxSize: player.weapon.bulletCount,
            runChildUpdate: true,
        });

    },

    createBulletsCollision(player, enemy, GS, T) {
        //enemy vs bullet
        T.physics.add.collider(enemy.sprite, player.bulletsLeft, function (a, weapon) {
            EPT._enemy.beKilled(enemy, weapon, 'gun', GS, T)
        });

        T.physics.add.collider(enemy.sprite, player.bulletsRight, function (a, weapon) {
            EPT._enemy.beKilled(enemy, weapon, 'gun', GS, T)
        });
    }

};