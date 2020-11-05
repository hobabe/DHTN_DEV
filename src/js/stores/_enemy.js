EPT._enemy = {
  
    hitBomb(player, bomb) {
        var ST = this.ST;
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('down');

        ST.gameOver = true;

    },
    updateEnemyMove(ST){

      // for(var i=0;i<ST.enemy.sprites[0].length;i++)
      // {
      //    var enemy = ST.enemy.sprites[0][i];
      //    var sprite = enemy.sprite;

      //    if (sprite.body.touching.down) {
      //       if (sprite.body.right >= enemy.max) {
      //          sprite.body.velocity.x *= -1;
      //       }
      //       else if (sprite.body.left <= enemy.min) {
      //          sprite.body.velocity.x *= -1;
      //       }
      //       else {
      //          sprite.body.velocity.x *= 1;
      //       }
      //   }
      // }

      // var enemy = ST.enemy.sprites[0][1];
      // var sprite = enemy.sprite;

      if (ST.enemy.sprites[0][1].sprite.body.touching.down) {
         if (ST.enemy.sprites[0][1].sprite.body.right >= ST.enemy.sprites[0][1].max) {
            ST.enemy.sprites[0][1].sprite.body.velocity.x *= -1;
         }
         else if (ST.enemy.sprites[0][1].sprite.body.left <= ST.enemy.sprites[0][1].min) {
            ST.enemy.sprites[0][1].sprite.body.velocity.x *= -1;
         }
         else {
            ST.enemy.sprites[0][1].sprite.body.velocity.x *= 1;
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