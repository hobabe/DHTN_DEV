EPT._item = {
    collectStar(player, star) {
        star.disableBody(true, true);
        var ST = this.ST;
        //  Add and update the score
        ST.score += 10;
        ST.scoreText.setText('Score: ' + ST.score);

        if (ST.stars.countActive(true) === 0) {
            //  A new batch of stars to collect
            ST.stars.children.iterate((child) => {

                child.enableBody(true, child.x, 0, true, true);

            });

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = ST.bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;
        }
    }
};