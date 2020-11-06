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
            player.directionAttack = -1;
        }
        else if (GS.cursors[joystick[joyKeys[2]]].isDown) {
            sprite.setVelocityX(player.speed.run);

            sprite.anims.play(keyPlay + joyKeys[2], true);//right
            EPT.Sfx.play('running', false);
            player.directionAttack = 1;
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
            if(player.weapon.using=='sword'){
                EPT._player.slicing(GS, player);
            } else {
                EPT._player.fireBullet(GS,player);  
            }
        });
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
            player.playerPointAttack = sprite.body.x;

            if(player.directionAttack == 1)
            {
                swordRight.enableBody(true, sprite.body.x, sprite.body.y, true, true);  
            }
            else if(player.directionAttack == -1)
            {
                swordLeft.enableBody(true, sprite.body.x, sprite.body.y, true, true);   
            }
        }

        if(swordLeft.body.enable){
            if(player.directionAttack == -1)
            {
                swordLeft.x -= 5;
                const maxLeft = player.playerPointAttack - player.swordRange;  
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

        if(swordRight.body.enable){
            if(player.directionAttack == 1)
            {
                swordRight.x += 5;  
                const maxRight = player.playerPointAttack + player.swordRange;
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

        // GS.enemy.list.filter((e) => {
        //     EPT._player.attackEnemy(GS, 0, e.sprite, 0);
        // });
        // EPT._player.attackEnemy(GS, 0, GS.enemy1, 0);
        // EPT._player.attackEnemy(GS, 0, GS.enemy2, 1);
        // EPT._player.attackEnemy(GS, 0, GS.enemy3, 2);

        // EPT._player.attackEnemy(GS, 1, GS.enemy1, 0);
        // EPT._player.attackEnemy(GS, 1, GS.enemy2, 1);
        // EPT._player.attackEnemy(GS, 1, GS.enemy3, 2);

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
            if (bulletRight && player.directionAttack == 1)
            {
                bulletRight.fire(sprite.body.x + 10, sprite.body.y + 20);
            }
            else if(bulletLeft && player.directionAttack == -1)
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