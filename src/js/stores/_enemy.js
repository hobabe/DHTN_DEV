EPT._enemy = {
   updateEnemyMove_2(enemy, platRight, platLeft, keyPlayer)
   {
      var player = ST.players[keyPlayer];
      var sprite = player.sprite;

      if (enemy.body.touching.down) {
         if (enemy.body.right >= platRight || enemy.body.left <= platLeft) {
            enemy.body.velocity.x *= -1;
         }
         else {

            // enemy patrol toward the players
            if (sprite.body.bottom == enemy.body.bottom && Math.abs(sprite.body.x - enemy.body.x) < 400) {    
               if (sprite.body.x < enemy.body.x && enemy.body.velocity.x > 0) {
                   enemy.body.velocity.x *= -1;
               }
               else if (sprite.body.x > enemy.body.x && enemy.body.velocity.x < 0) {
                   enemy.body.velocity.x *= -1; 
               }
            }
            enemy.body.velocity.x *= 1;
         }
      }
   },
  
   beKilled(enemy, keyEnemyLife)
   {
         if( ST.enemyLife[keyEnemyLife] > 0)
         {
            enemy.disableBody(true, true);
            ST.enemyLife[keyEnemyLife] -= 1;
            var x =  enemy.body.right;
            var y =  enemy.body.bottom;
            EPT._item.createItems(x, y);
         }
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