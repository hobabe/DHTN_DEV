EPT._player = {
    playerMove(ST, keyPlayer) {
        var player = ST.players[keyPlayer];
        var sprite = player.sprite;
        var joystick = player.joystick;
        var joyKeys = player.joyKeys;

        if (ST.cursors[joystick[joyKeys[0]]].isDown) {
            sprite.setVelocityX(-player.speed.run);

            sprite.anims.play(joystick[joyKeys[0]], true);//'left'
            // console.log(ST.cursors);
            EPT.Sfx.play('running', false);
            player.attack = -1;
        }
        else if (ST.cursors[joystick[joyKeys[2]]].isDown) {
            sprite.setVelocityX(player.speed.run);

            sprite.anims.play(joystick[joyKeys[2]], true);//right
            EPT.Sfx.play('running', false);
            player.attack = 1;
        }
        else //if (ST.cursors[joystick.down].isDown)
        {
            sprite.setVelocityX(0);

            sprite.anims.play(joystick[joyKeys[3]]);//'turn'
        }

        if (ST.cursors[joystick[joyKeys[1]]].isDown && sprite.body.touching.down) {
            sprite.setVelocityY(-350);
        }
    },
    attackEnemy(ST, keyPlayer, enemy, keyEnemyLife)
    {
        var player = ST.players[keyPlayer];
        var joystick = player.joystick;
        var joyKeys = player.joyKeys;
        var swordRight = player.swordRight;
        var swordLeft = player.swordLeft;
        // if (ST.cursors[joystick[joyKeys[4]]].isDown)
        // {
        //     if((Math.abs(swordRight.body.x - enemy.body.x)<=50) && (Math.abs(swordRight.body.y- enemy.body.y)<=100))
        //     {
        //         EPT._enemy.beKilled(enemy, keyEnemyLife);
        //     }
        // }
        // if (ST.cursors[joystick[joyKeys[4]]].isDown)
        // {
        //     if((Math.abs(swordLeft.body.x - enemy.body.x)<=50) && (Math.abs(swordLeft.body.y- enemy.body.y)<=100))
        //     {
        //         EPT._enemy.beKilled(enemy, keyEnemyLife);
        //     }
        // }

        var ST= this.ST
    },

        // EPT._player.attackEnemy(ST, 0, ST.enemy1, 0);
        // EPT._player.attackEnemy(ST, 0, ST.enemy2, 1);
        // EPT._player.attackEnemy(ST, 0, ST.enemy3, 2);

        // EPT._player.attackEnemy(ST, 1, ST.enemy1, 0);
        // EPT._player.attackEnemy(ST, 1, ST.enemy2, 1);
        // EPT._player.attackEnemy(ST, 1, ST.enemy3, 2);

    slicing(ST, keyPlayer)
    {
        var player = ST.players[keyPlayer];
        var sprite = player.sprite;
        var joystick = player.joystick;
        var joyKeys = player.joyKeys;
        var swordRight = player.swordRight;
        var swordLeft = player.swordLeft;

        if (Phaser.Input.Keyboard.JustDown(ST.cursors[joystick[joyKeys[4]]]))
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

        EPT._player.attackEnemy(ST, 0, ST.enemy1, 0);
        EPT._player.attackEnemy(ST, 0, ST.enemy2, 1);
        EPT._player.attackEnemy(ST, 0, ST.enemy3, 2);

        EPT._player.attackEnemy(ST, 1, ST.enemy1, 0);
        EPT._player.attackEnemy(ST, 1, ST.enemy2, 1);
        EPT._player.attackEnemy(ST, 1, ST.enemy3, 2);

    },
    gameOver(ST, T)
    {
       var player1 = ST.players[0];
       var player2 = ST.players[1];
       if(player1.life == 0 && player2.life == 0)
       {
            T.physics.pause();
            ST.gameOver == true;
       }
    },
}

