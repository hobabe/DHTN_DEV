EPT._enemy = {
    hitBomb(player, bomb) {
        var GS = this.GS;
        this.physics.pause();

        EPT._player.setTint(player.sprite, 0xff0000)

        player.anims.play('down');

        GS.gameOver = true;

    },
    updateBossMove(GS){
       if(GS.bosses.meet){
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
    updateEnemyMove(GS){
        if (GS.enemy1.body.touching.down) {
            if (GS.enemy1.body.right >= 250) {
               GS.enemy1.body.velocity.x *= -1;
            }
            else if (GS.enemy1.body.left <= 0) {
               GS.enemy1.body.velocity.x *= -1;
            }
            else {
               GS.enemy1.body.velocity.x *= 1;
            }
        }
        if (GS.enemy2.body.touching.down) {
            if (GS.enemy2.body.right >= 800) {
               GS.enemy2.body.velocity.x *= -1;
            }
            else if (GS.enemy2.body.left <= 390) {
               GS.enemy2.body.velocity.x *= -1;
            }
            else {
               GS.enemy2.body.velocity.x *= 1;
            }
        }
        if (GS.enemy3.body.touching.down) {
            if (GS.enemy3.body.right >= 800) {
               GS.enemy3.body.velocity.x *= -1;
            }
            else if (GS.enemy3.body.left <= 0) {
               GS.enemy3.body.velocity.x *= -1;
            }
            else {
               GS.enemy3.body.velocity.x *= 1;
            }
        }
    }

};