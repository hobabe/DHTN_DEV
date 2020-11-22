EPT._enemy = {
    hitBomb(player, bomb) {
        var GS = this.GS;
        this.physics.pause();

        EPT._player.setTint(player.sprite, 0xff0000)

        player.anims.play('down');

        GS.gameOver = true;

    },

    createInitEnemy(GS, T) {
        var keyEnemy = GS.enemy.nextLevels[GS.gameLevel];
        GS.enemy.oldKey = keyEnemy ? keyEnemy : GS.enemy.oldKey;
        GS.enemy.list.filter((enemy) => {
            enemy.sprite = T.physics.add.sprite(enemy.x, enemy.y, GS.enemy.oldKey);
            enemy.sprite.setScale(enemy.scale).refreshBody();
            enemy.sprite.setBodySize(60, 80)
            enemy.sprite.setBounce(1, 0);
            enemy.sprite.setCollideWorldBounds(true);
            enemy.sprite.setVelocityX(100);

            //flatform
            T.physics.add.collider(enemy.sprite, GS.map.platforms);
        })

        GS.enemy.killedCount = 0;
    },

    createInitEnemyCollision(player, enemy, GS, T) {
        T.physics.add.collider(player.sprite, enemy.sprite, function () {
            EPT._player.beKilled(player, enemy, GS, T);
        });
    },
    drawSkill(sprite, skillCf, GS, T) {
        GS.bosses.funcUseSkill = setInterval(() => {
            //time per attack skill
            var bomb = GS.bombs.create(sprite.x, sprite.y, skillCf.keyArt);
            bomb.setScale(skillCf.scale);//.setBounce(1)
            bomb.setTint(bomb, 0xa6ff6f).setDepth(2);
            bomb.angle = skillCf.angle;
            // bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

            GS.players.list.filter((player) => {
                //player vs enemy
                T.physics.add.collider(player.sprite, bomb, function () {
                    EPT._player.beKilled(player, { sprite: bomb }, GS, T);
                });
            })
            //timeout of Gravity
            setTimeout(() => {
                bomb.allowGravity = false;
            }, skillCf.delayGravity ? skillCf.delayGravity : 0);
        }, skillCf.timePerAttack);
    },
    updateBossMove(GS) {
        if (GS.bosses.meet) {
            if (GS.bosses.sprite.body.touching.down) {
                if (GS.bosses.sprite.body.right >= 250) {
                    GS.bosses.sprite.body.velocity.x *= -1;
                }
                else if (GS.bosses.sprite.body.left <= 0) {
                    GS.bosses.sprite.body.velocity.x *= -1;
                }
                else {
                    GS.bosses.sprite.body.velocity.x *= 1;
                }
            }
        }
    },
    beKilled(enemy, weapon, type, GS, T) {
        //check
        if (enemy.isUred) {
            return;
        }

        var sprite = enemy.sprite;

        //get position player to set drop item
        var r = sprite.body.right;
        var b = sprite.body.bottom;
        //  sprite.destroy();

        //check weapon
        switch (type) {
            case 'gun':
                weapon.destroy();
                break;

            default:
                weapon.disableBody(true, true);
                break;
        }

        //check enemy type
        switch (enemy.type) {
            case 'boss': //check boss
                EPT._sprites.blinkEffect(enemy, T);

                if (enemy.healthReal > 0) {
                    enemy.healthReal--;
                } else {
                    sprite.disableBody(true, true);
                    EPT._item.createItems(r, b, T);
                }
                EPT._sprites.setBossBar(enemy.healthReal, false, GS, T);
                break;

            default:
                GS.enemy.killedCount++;
                sprite.disableBody(true, true);
                EPT._item.createItems(r, b, T);

                //check next level
                break;
        }

        if (EPT._game.isNextLevel(GS)) {
            T.nextLevel();
        }

    },
    updateEnemyMove(GS) {
        GS.enemy.list.filter((e) => {
            if (e.sprite.body) {// && e.sprite.body.touching.down
                if (e.sprite.body.right = 250) {
                    e.sprite.body.velocity.x *= -1;
                }
                else if (e.sprite.body.left <= 0) {
                    e.sprite.body.velocity.x *= -1;
                }
                // else {
                //    e.sprite.body.velocity.x *= 1;
                // }
            }
        });
    },
    clearEnemy(GS) {

        GS.enemy.list.filter((e) => {
            e.sprite.destroy();
        });
    }
};