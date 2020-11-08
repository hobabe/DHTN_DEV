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
    collectItem(player, item, itemRan, T) {
        this.collectStar_UpdateInfo(player, itemRan.type, T)

        item.destroy();

        // if (GS.stars.countActive(true) === 0)
    },
    collectStar_UpdateInfo(player, typeCollect, T) {
        var scoreAdd = 0;
        switch (typeCollect) {
            case 'star':
                player.value.starCount++;
                //check level : 3 stars increase level : max level is 5
                if (player.value.starCount % 3 == 0 && player.value.level < 5) {
                    player.value.level++;
                    player.value.speed.run += 20;
                    player.text.levelText.setText('Level: ' + player.value.level);

                    T.createInitAnimationMoving(player.index);
                }
                break;
            case 'gun':
                player.weapon.using = typeCollect;
                player.weapon.bulletCount++;
                T.createBullets(player, T)
            case 'sword':
                player.weapon.using = typeCollect;
            case 'life':
                player.value.life++;
                player.text.lifeText.setText('Life: ' + player.value.life)
                break;
        }
        //  Add and update the score
        scoreAdd = 10;
        player.value.score += scoreAdd;
        player.text.scoreText.setText('Score: ' + player.value.score);
    },
    createItems(x, y, T) {
        var itemIndex = EPT._array.randomInt(1, 0);
        console.log(itemIndex)
        var itemRan = GS.items.infoList[itemIndex];

        var itemCreated = GS.items.group.create(x, y, itemRan.type).setScale(itemRan.scale);
        //player
        var _this = this;
        GS.players.list.filter((player) => {
            T.physics.add.overlap(player.sprite, itemCreated, function(a, itemCollect){
                _this.collectItem(player, itemCreated, itemRan, T)
            });
        });
    }
};