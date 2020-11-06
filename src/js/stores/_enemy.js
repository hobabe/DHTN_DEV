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
    beKilled(sword, enemy)
    {
       // enemy.disableBody(true, true);
      
       // GS.enemyLife[keyEnemyLife] -= 1;
       var a =  enemy.body.right;
       var b =  enemy.body.bottom;
       var c = enemy.body.x;
       enemy.destroy();
       // console.log("enemy "+c);
       EPT._item.createItems(a, b);
 
    },
    killPlayer(GS, T, enemy, indexPlayer)
   {
      var player = GS.players.list[indexPlayer];
      var sprite = player.sprite;
      if(GS.checkCollider[indexPlayer] != 0)
      {
         if(player.life > 0)
         {
            sprite.disableBody(true, true);
            player.life -= 1;
            player.lifeText.setText('Life: '+ player.life);
            sprite.enableBody(true, player.sprite.body.x, 0, true, true);
         }
         else 
         {
            player.lifeText.setText('Life: '+ player.life);
            sprite.disableBody(true, false);

            sprite.body.setX = 0;
            sprite.body.setY = 0;
            sprite.anims.play('down');
            sprite.setTint(0xff0000);
            EPT._player.gameOver(GS, T)
         }
         GS.checkCollider[indexPlayer] = 0;
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