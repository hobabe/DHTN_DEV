EPT._enemy = {
   hitBomb(player, bomb) {
      var GS = this.GS;
      this.physics.pause();

      EPT._player.setTint(player.sprite, 0xff0000)
      player.anims.play('down');
      GS.gameOver = true;

   },
   drawSkill(sprite, skillCf) {
      GS.bosses.funcUseSkill = setInterval(() => {
         //time per attack skill
         var bomb = GS.bombs.create(sprite.x, sprite.y, skillCf.keyArt);
         bomb.setBounce(1).setScale(skillCf.scale);
         bomb.setTint(bomb, 0xa6ff6f).setDepth(2);
         bomb.angle = skillCf.angle;
         // bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

         //timeout of Gravity
         setTimeout(() => {
            bomb.allowGravity = false;
         }, skillCf.delayGravity ? skillCf.delayGravity : 0);
      }, skillCf.timePerAttack);
   },
   updateEnemyMove(GS) {
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