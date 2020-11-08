EPT._player = {
    
    setTint(sprite, color){
        sprite.setTint(color);
    },
    playerMove(GS, T, indexPlayer) {
        var player = GS.players.list[indexPlayer];
        var sprite = player.sprite;
        var joystick = player.joystick;
        var joyKeys = player.joyKeys;
        var keyPlay = 'p-' +indexPlayer+ '_'+ T.getKeyLevel(indexPlayer) + '_';
        if (GS.cursors[joystick[joyKeys[0]]].isDown) {
            sprite.setVelocityX(-player.value.speed.run);

            sprite.anims.play(keyPlay + joyKeys[0], true);//'left'
            // console.log(GS.cursors);
            EPT.Sfx.play('running', false);
            player.value.directionAttack = -1;
        }
        else if (GS.cursors[joystick[joyKeys[2]]].isDown) {
            sprite.setVelocityX(player.value.speed.run);

            sprite.anims.play(keyPlay + joyKeys[2], true);//right
            EPT.Sfx.play('running', false);
            player.value.directionAttack = 1;
        }
        else //if (GS.cursors[joystick.down].isDown)
        {
            sprite.setVelocityX(0);

            sprite.anims.play(keyPlay + joyKeys[3]);//'turn'
        }

        if (GS.cursors[joystick[joyKeys[1]]].isDown && sprite.body.onFloor()) {
            sprite.setVelocityY(GS.players.jumpHeight);
        }
    },

    updateWeapon(GS, T){
        GS.players.list.filter((player)=>{
            if(player.value.life> 0){
                if(player.weapon.using=='sword'){
                    EPT._player.slicing(GS, player);
                } else {
                    EPT._player.fireBullet(GS,player);  
                }
            }
        });
    },

    slicing(GS, player)
    {
        var sprite = player.sprite;
        var joystick = player.joystick;
        var joyKeys = player.joyKeys;
        var swordRight = player.swordRight;
        var swordLeft = player.swordLeft;


        if (Phaser.Input.Keyboard.JustDown(GS.cursors[joystick[joyKeys[4]]]))
        {
            // console.log("sword "+ swordRight.body.right);
            // console.log(sprite.body.x)

            swordRight.x = sprite.body.x;
            player.value.playerPointAttack = sprite.body.x;

            if(player.value.directionAttack == 1)
            {
                swordRight.enableBody(true, sprite.body.x, sprite.body.y, true, true);  
            }
            else if(player.value.directionAttack == -1)
            {
                swordLeft.enableBody(true, sprite.body.x, sprite.body.y, true, true);   
            }
        }

        if(swordLeft.body && swordLeft.body.enable){
            if(player.value.directionAttack == -1)
            {
                swordLeft.x -= 5;
                const maxLeft = player.value.playerPointAttack - player.weapon.swordRange;  
                if(swordLeft.x < maxLeft)
                {
                    swordLeft.disableBody(true, true);
                    swordLeft.x = 0;
                }
            }
            else {
                swordLeft.disableBody(true, true);
            }
        }

        if(swordRight.body && swordRight.body.enable){
            if(player.value.directionAttack == 1)
            {
                swordRight.x += 5;  
                const maxRight = player.value.playerPointAttack + player.weapon.swordRange;
                if(swordRight.x > maxRight)
                {
                    swordRight.disableBody(true, true);
                    swordRight.x = 0;
                }
            }
            else {
                swordRight.disableBody(true, true);
            }
        }

    }, 
    
    beKilled(player, enemy, GS, T)
    {
        //check
        if(player.isUred){
            return;
        }

        //re-active run
        enemy.sprite.setVelocityX(100);
        
        var sprite = player.sprite;
        if(player.value.life > 0)
        {
            player.weapon.using = 'sword';
            sprite.disableBody(true, true);
            player.value.life -= 1;
            player.text.lifeText.setText('Life: '+ player.value.life);

            sprite.enableBody(true, player.value.revivalX, 400, true, true);
            EPT._player.setTint(sprite, player.value.tInt);

            this.blinkEffect(player, T);

            //reset level
            player.value.level = 0;
            player.value.speed.run = 100;
            player.weapon.bulletCount = 1;
            
            T.createBullets(player, GS, T);
        }
        else 
        {
            player.text.lifeText.setText('Life: <Death>');
            sprite.disableBody(true, true);
            // sprite.body.setX = 0;
            // sprite.body.setY = 0;
            // sprite.anims.play('down');
            // sprite.setTint(0xff0000);
            // EPT._player.gameOver(GS, T)

            T.checkGameOver(GS);
        }
    },
    fireBullet(GS, player)
    {
        var sprite = player.sprite;
        var joystick = player.joystick;
        var joyKeys = player.joyKeys;
        // console.log(player.right);

        // if (Phaser.Input.Keyboard.JustDown(GS.cursors[joystick[joyKeys[4]]]))

        if (Phaser.Input.Keyboard.JustDown(GS.cursors[joystick[joyKeys[4]]]))        
        {
            var bulletLeft = player.bulletsLeft.get();
            var bulletRight = player.bulletsRight.get();
            if (bulletRight && player.value.directionAttack == 1)
            {
                bulletRight.fire(sprite.body.x + 10, sprite.body.y + 20);
            }
            else if(bulletLeft && player.value.directionAttack == -1)
            {
                bulletLeft.fire(sprite.body.x + 10, sprite.body.y + 20);
            }
        }
    },
    gameOver(GS, T)
    {
       var player1 = GS.players[0];
       var player2 = GS.players[1];
       if(player1.life == 0 && player2.life == 0)
       {
            T.physics.pause();
            GS.gameOver == true;
       }
    },
    blinkEffect(player, T){
        player.sprite.setAlpha(0);
        T.tweens.add({
            targets: player.sprite,
            alpha: 1,
            duration: 100,
            ease: 'Linear',
            repeat: 20,
            onStart : ()=>{player.isUred = true;},
            onComplete: ()=>{player.isUred = false;},
        });
    }
};