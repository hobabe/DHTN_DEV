EPT._enemy = {
  
    hitBomb(player, bomb) {
        var ST = this.ST;
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('down');

        ST.gameOver = true;

    },
    updateEnemyMove(ST){

      for(var j=0;j<ST.enemy.sprites.length; j++)
      {
         for(var i=0;i<ST.enemy.sprites[j].length;i++)
         {
            if (ST.enemy.sprites[j][i].sprite.body.touching.down) {
               if (ST.enemy.sprites[j][i].sprite.body.right >= ST.enemy.sprites[j][i].max) {
                  ST.enemy.sprites[j][i].sprite.body.velocity.x *= -1;
               }
               else if (ST.enemy.sprites[j][i].sprite.body.left <= ST.enemy.sprites[j][i].min) {
                  ST.enemy.sprites[j][i].sprite.body.velocity.x *= -1;
               }
               else {
                  ST.enemy.sprites[j][i].sprite.body.velocity.x *= 1;
               }
            }
         }
      }
     

      //   if (ST.enemy1.body.touching.down) {
      //       if (ST.enemy1.body.right >= 250) {
      //          ST.enemy1.body.velocity.x *= -1;
      //       }
      //       else if (ST.enemy1.body.left <= 0) {
      //          ST.enemy1.body.velocity.x *= -1;
      //       }
      //       else {
      //          ST.enemy1.body.velocity.x *= 1;
      //       }
      //   }
      //   if (ST.enemy2.body.touching.down) {
      //       if (ST.enemy2.body.right >= 800) {
      //          ST.enemy2.body.velocity.x *= -1;
      //       }
      //       else if (ST.enemy2.body.left <= 390) {
      //          ST.enemy2.body.velocity.x *= -1;
      //       }
      //       else {
      //          ST.enemy2.body.velocity.x *= 1;
      //       }
      //   }
      //   if (ST.enemy3.body.touching.down) {
      //       if (ST.enemy3.body.right >= 800) {
      //          ST.enemy3.body.velocity.x *= -1;
      //       }
      //       else if (ST.enemy3.body.left <= 0) {
      //          ST.enemy3.body.velocity.x *= -1;
      //       }
      //       else {
      //          ST.enemy3.body.velocity.x *= 1;
      //       }
      //   }
    }

};