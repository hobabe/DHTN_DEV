EPT._player = {
    
    setTint(sprite, color){
        sprite.setTint(color);
    },
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
            player.left = true;
            player.right = false;
        }
        else if (ST.cursors[joystick[joyKeys[2]]].isDown) {
            sprite.setVelocityX(player.speed.run);

            sprite.anims.play(joystick[joyKeys[2]], true);//right
            EPT.Sfx.play('running', false);
            player.right = true;
            player.left = false;
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
    fireBullet(ST, keyPlayer)
    {
        var player = ST.players[keyPlayer];
        var sprite = player.sprite;
        var joystick = player.joystick;
        var joyKeys = player.joyKeys;
        // console.log(player.right);


        if (Phaser.Input.Keyboard.JustDown(ST.cursors[joystick[joyKeys[4]]]) )        
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
    }
};