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
    beKilled(enemy, weapon, type , GS, T)
    {
        //check
      if(enemy.isUred){
         return;
      }

      var sprite = enemy.sprite;
      
      //get position player to set drop item
       var r =  sprite.body.right;
       var b =  sprite.body.bottom;
      //  sprite.destroy();

      //check weapon
      switch (type) {
         case 'gun':
            weapon.destroy();
            break;
         
         default:
            weapon.disableBody(true, true);
            break;
      }
      
      //check enemy type
      switch (enemy.type) {
         case 'boss': //check boss
            this.blinkEffect(enemy, T);

            if(enemy.healthReal > 0) {
               enemy.healthReal--;
            } else {
               sprite.disableBody(true, true);
               EPT._item.createItems(r, b, T);
            }
            T.setBossBar(enemy.healthReal);
            break;
      
         default:
            GS.enemy.killedCount++;
            sprite.disableBody(true, true);
            EPT._item.createItems(r, b, T);
            
            //check next level
            break;
      }

      if(T.isNextLevel(GS)){
         T.nextLevel();
      }
     
    },
    updateEnemyMove(GS){
      GS.enemy.list.filter((e) => {
         if (e.sprite.body) {// && e.sprite.body.touching.down
            if (e.sprite.body.right = 250) {
               e.sprite.body.velocity.x *= -1;
            }
            else if (e.sprite.body.left <= 0) {
               e.sprite.body.velocity.x *= -1;
            }
            // else {
            //    e.sprite.body.velocity.x *= 1;
            // }
        }
     });
    },
    blinkEffect(enemy, T){
      enemy.sprite.setAlpha(0);
      T.tweens.add({
          targets: enemy.sprite,
          alpha: 1,
          duration: 100,
          ease: 'Linear',
          repeat: 20,
          onStart : ()=>{enemy.isUred = true;},
          onComplete: ()=>{enemy.isUred = false;},
      });
  },

};