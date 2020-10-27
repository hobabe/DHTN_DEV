EPT._enemy = {
  
    hitBomb(player, bomb) {
        var ST = this.ST;
        this.physics.pause();

        EPT._player.setTint(player.sprite, 0xff0000)

        player.anims.play('down');

        ST.gameOver = true;

    },
    updateEnemyMove(ST){
        if (ST.enemy1.body.touching.down) {
            if (ST.enemy1.body.right >= 250) {
               ST.enemy1.body.velocity.x *= -1;
            }
            else if (ST.enemy1.body.left <= 0) {
               ST.enemy1.body.velocity.x *= -1;
            }
            else {
               ST.enemy1.body.velocity.x *= 1;
            }
        }
        if (ST.enemy2.body.touching.down) {
            if (ST.enemy2.body.right >= 800) {
               ST.enemy2.body.velocity.x *= -1;
            }
            else if (ST.enemy2.body.left <= 390) {
               ST.enemy2.body.velocity.x *= -1;
            }
            else {
               ST.enemy2.body.velocity.x *= 1;
            }
        }
        if (ST.enemy3.body.touching.down) {
            if (ST.enemy3.body.right >= 800) {
               ST.enemy3.body.velocity.x *= -1;
            }
            else if (ST.enemy3.body.left <= 0) {
               ST.enemy3.body.velocity.x *= -1;
            }
            else {
               ST.enemy3.body.velocity.x *= 1;
            }
        }
    },
    beKilled(sword, enemy)
    {
      enemy.disableBody(true, true);
    }

};