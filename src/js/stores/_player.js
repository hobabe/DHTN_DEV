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
            sprite.setVelocityX(-player.speed.run);

            sprite.anims.play(keyPlay + joyKeys[0], true);//'left'
            // console.log(GS.cursors);
            EPT.Sfx.play('running', false);
        }
        else if (GS.cursors[joystick[joyKeys[2]]].isDown) {
            sprite.setVelocityX(player.speed.run);

            sprite.anims.play(keyPlay + joyKeys[2], true);//right
            EPT.Sfx.play('running', false);
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
    attackEnemy(GS, keyPlayer, enemy, keyEnemyLife)
    {
        var player = GS.players.list[keyPlayer];
        var joystick = player.joystick;
        var joyKeys = player.joyKeys;
        var swordRight = player.swordRight;
        var swordLeft = player.swordLeft;
        // if (GS.cursors[joystick[joyKeys[4]]].isDown)
        // {
        //     if((Math.abs(swordRight.body.x - enemy.body.x)<=50) && (Math.abs(swordRight.body.y- enemy.body.y)<=100))
        //     {
        //         EPT._enemy.beKilled(enemy, keyEnemyLife);
        //     }
        // }
        // if (GS.cursors[joystick[joyKeys[4]]].isDown)
        // {
        //     if((Math.abs(swordLeft.body.x - enemy.body.x)<=50) && (Math.abs(swordLeft.body.y- enemy.body.y)<=100))
        //     {
        //         EPT._enemy.beKilled(enemy, keyEnemyLife);
        //     }
        // }

        var GS= this.GS
    },

        // EPT._player.attackEnemy(GS, 0, GS.enemy1, 0);
        // EPT._player.attackEnemy(GS, 0, GS.enemy2, 1);
        // EPT._player.attackEnemy(GS, 0, GS.enemy3, 2);

        // EPT._player.attackEnemy(GS, 1, GS.enemy1, 0);
        // EPT._player.attackEnemy(GS, 1, GS.enemy2, 1);
        // EPT._player.attackEnemy(GS, 1, GS.enemy3, 2);

    slicing(GS, keyPlayer)
    {
        var player = GS.players.list[keyPlayer];
        var sprite = player.sprite;
        var joystick = player.joystick;
        var joyKeys = player.joyKeys;
        var swordRight = player.swordRight;
        var swordLeft = player.swordLeft;

        if (Phaser.Input.Keyboard.JustDown(GS.cursors[joystick[joyKeys[4]]]))
        {
            // console.log("sword "+ swordRight.body.right);
            // console.log(sprite.body.x)
            if(player.attack == 1)
            {
                swordRight.enableBody(true, sprite.body.x, sprite.body.y, true, true);   
                swordRight.angle = 0;
            }
            else if(player.attack == -1)
            {
                swordLeft.enableBody(true, sprite.body.x, sprite.body.y, true, true);   
                swordLeft.angle = 0;
            }
        }

        if(player.attack == 1)
        {
            swordRight.angle += 9*player.attack;  
            if(swordRight.angle <= 100  && swordRight.angle > 85)
            {
                swordRight.disableBody(true, true);
                swordRight.angle = 0;
            }
        }
        else {
            swordRight.disableBody(true, true);
        }
        if(player.attack == -1)
        {
            swordLeft.angle += 9*player.attack;  

            if(swordLeft.angle >= -100  && swordLeft.angle < -85)
            {
                swordLeft.disableBody(true, true);
                swordLeft.angle = 0;
            }
        }
        else {
            swordLeft.disableBody(true, true);
        }

        EPT._player.attackEnemy(GS, 0, GS.enemy1, 0);
        EPT._player.attackEnemy(GS, 0, GS.enemy2, 1);
        EPT._player.attackEnemy(GS, 0, GS.enemy3, 2);

        EPT._player.attackEnemy(GS, 1, GS.enemy1, 0);
        EPT._player.attackEnemy(GS, 1, GS.enemy2, 1);
        EPT._player.attackEnemy(GS, 1, GS.enemy3, 2);

    }, 
    fireBullet(GS, keyPlayer)
    {
        var player = GS.players.list[keyPlayer];
        var sprite = player.sprite;
        var joystick = player.joystick;
        var joyKeys = player.joyKeys;
        // console.log(player.right);

        // if (Phaser.Input.Keyboard.JustDown(GS.cursors[joystick[joyKeys[4]]]))

        if (Phaser.Input.Keyboard.JustDown(GS.cursors[joystick[joyKeys[5]]]))        
        {
            var bulletLeft = player.bulletsLeft.get();
            var bulletRight = player.bulletsRight.get();
            if (bulletRight && player.right == true)
            {

                bulletRight.fire(sprite.body.x + 10, sprite.body.y + 20);
            }
            else if(bulletLeft && player.left == true)
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
};