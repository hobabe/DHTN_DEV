EPT._enemy = {
  
   // hitBomb(player, bomb) {
   //      var ST = this.ST;
   //      this.physics.pause();

   //      player.setTint(0xff0000);

   //      player.anims.play('down');

   //      ST.gameOver = true;

   // },
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
         var ST = this.ST;
         if( player.life == 0)
         {
            this.physics.pause();
            player.setTint(0xff0000);
            player.anims.play('down');
            ST.gameOver = true;
         }
         else 
         {
            player.disableBody(true, true);
            player.life -=1;
            // player.lifeText.setText('Life: '+ player.life);
            console.log('life: '+player.life);
            player.enableBody(true, player.body.x, 0, true, true);
            
         }
   },

};