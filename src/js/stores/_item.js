EPT._item = {
    collectStar(player, star) {
        star.disableBody(true, true);

        if (GS.stars.countActive(true) === 0) {
            //  A new batch of stars to collect
            GS.stars.children.iterate((child) => {

                child.enableBody(true, child.x, 0, true, true);

            });

            T.nextLevel();
            // var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            // var bomb = GS.bombs.create(x, 16, 'bomb');
            // bomb.setBounce(1);
            // bomb.setCollideWorldBounds(true);
            // bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            // bomb.allowGravity = false;
        }
    },
    collectStar_UpdateInfo(player, typeCollect, T, indexPlayer) {
        var scoreAdd = 0;
        var ST = this.SeTinggame;
        switch(typeCollect){
            case 'star': 
                scoreAdd = 10;
                player.starCount++;
                //check level : 3 stars increase level : max level is 5
                if(player.starCount%3==0 && player.level < 5){
                    player.level++;
                    player.speed.run+=20;
                    player.levelText.setText('Level: ' + player.level);

                    T.createInitAnimationMoving(indexPlayer);
                }
                break;
            case 'life': 
                scoreAdd = 10;
                player.life++;
                player.lifeText.setText('Life: '+ player.life)
            break;
        }
        //  Add and update the score
        player.score += scoreAdd;
        player.scoreText.setText('Score: ' + player.score);
    },
    createItems(_x, _y)
    {
        var indexItem = EPT._array.randomInt(1, 0);
        ST.items[indexItem] = T.physics.add.group({
            key: ST.items[indexItem].type,
            repeat: 0,
            setXY: { x: _x, y: _y-20}
        });
        
        ST.items[indexItem].children.iterate((child) => {

            //  Give each star a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });
        T.physics.add.collider(ST.items[indexItem], ST.platforms);
    }
};