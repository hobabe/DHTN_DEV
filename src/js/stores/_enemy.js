EPT._enemy = {
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
      
      // console.log('enemy2: '+ST.enemy2.body.y)
   },
   beKilled(enemy)
   {
         enemy.disableBody(true, true);
         var x =  enemy.body.right;
         var y =  enemy.body.bottom;
         EPT._item.createItems(x, y);
   },
   hitBomb(player, enemy) {
         ST.checkCollider[0] = 1;
   },
   hitBomb_2(player, enemy) {
      ST.checkCollider[1] = 1;   
   },
   killPlayer(ST, T, enemy, indexPlayer)
   {
      var player = ST.players[indexPlayer];
      if(ST.checkCollider[indexPlayer] != 0)
      {
         if(player.life > 1)
         {
            player.sprite.disableBody(true, true);
            player.life -= 1;
            console.log('player'+indexPlayer+player.life);
            player.lifeText.setText('Life: '+ player.life);
            player.sprite.enableBody(true, player.sprite.body.x, 0, true, true);
         }
         else 
         {
            player.lifeText.setText('Life: '+ player.life);
            player.sprite.anims.play('down');

            T.physics.pause();
            player.sprite.setTint(0xff0000);
            ST.gameOver = true;
         }
         ST.checkCollider[indexPlayer] = 0;
      }
   }
};