EPT._item = {
    collectStar(player, star) {
        star.disableBody(true, true);

        if (GS.stars.countActive(true) === 0) {
            //  A new batch of stars to collect
            GS.stars.children.iterate((child) => {

                child.enableBody(true, child.x, 0, true, true);

            });

            // var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            // var bomb = GS.bombs.create(x, 16, 'bomb');
            // bomb.setBounce(1);
            // bomb.setCollideWorldBounds(true);
            // bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            // bomb.allowGravity = false;
        }
    },
    collectItem(player, item, itemRan, GS, T) {
        this.collectStar_UpdateInfo(player, itemRan.type, GS, T)

        item.destroy();

        // if (GS.stars.countActive(true) === 0)
    },
    collectStar_UpdateInfo(player, typeCollect, GS, T) {
        var scoreAdd = 0;
        console.log(typeCollect);
        switch (typeCollect) {
            case 'star':
                player.value.starCount++;
                //check level : 3 stars increase level : max level is 5
                if (player.value.starCount % 3 == 0 && player.value.level < 5) {
                    player.value.level++;
                    player.value.speed.run += 20;
                    player.text.levelText.setText('Level: ' + player.value.level);

                    T.createInitAnimationMoving(player.index);
                    EPT._player.blinkLevelUp(player, T);
                }
                break;
            case 'gun':
                player.weapon.using = typeCollect;
                player.weapon.bulletCount++;
                T.createBullets(player, GS, T);

                GS.enemy.list.filter((enemy) => {
                    T.createBulletsCollision(player, enemy, GS, T);
                });

                player.swordLeft.disableBody(true, true);
                player.swordRight.disableBody(true, true);

                player.text.weaponText.setText('Weapon: ' +typeCollect);
                break;
            case 'sword':
                player.weapon.using = typeCollect;
                player.text.weaponText.setText('Weapon: ' +typeCollect);
                // player.weapon.bulletCount = 1;

                // T.createBullets(player, GS, T);
                // GS.enemy.list.filter((enemy) => {
                //     T.createBulletsCollision(player, enemy, GS, T);
                // });
                break;
            case 'bullet':
                player.value.life++;
                player.text.lifeText.setText('Life: ' + player.value.life)
                break;
            default:
                break;
        }
        //  Add and update the score
        scoreAdd = 10;
        player.value.score += scoreAdd;
        player.text.scoreText.setText('Score: ' + player.value.score);
    },
    createItems(x, y, T) {
        var itemIndex = EPT._array.randomPercentInt(GS.items.percents, 0);
        const itemRan = GS.items.infoList[itemIndex];

        var itemCreated = GS.items.group.create(x, y-10, itemRan.type).setScale(itemRan.scale);
        T.physics.add.collider(itemCreated, GS.map.platforms);

        //player
        var _this = this;
        GS.players.list.filter((player) => {
            T.physics.add.overlap(player.sprite, itemCreated, function(a, itemCollect){
                _this.collectItem(player, itemCollect, itemRan, GS, T)
            });
        });
    }
};