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
    slicing(ST, keyPlayer)
    {
        var player = ST.players[keyPlayer];
        var sprite = player.sprite;
        var joystick = player.joystick;
        var joyKeys = player.joyKeys;
        var sword = player.sword;

        if (Phaser.Input.Keyboard.JustDown(ST.cursors[joystick[joyKeys[4]]]))
        {
            // console.log(player.weapon.sword.body.y);
            // sword.anchor.setTo(0.5, 0.5);

            sword.enableBody(true, sprite.body.x, sprite.body.y, true, true);   
            sword.angle = 0;
            // var sword = player.weapon.sword.get();

            // if (sword)
            // {
            //     sword.fire(sprite.body.x, sprite.body.y);
            // }
            // ST.attack = true;


        }
        console.log("angle: "+sword.angle);

        
        sword.angle += 9*player.attack;
        if(player.attack == 1)
        {
            if(sword.angle == 90 )
            {
                sword.disableBody(true, true);
                sword.angle = 0;
                // ST.attack = true;
            }
        }
        else if(player.attack == -1)
        {
            if(sword.angle == -90.00000000000023 )
            {
                sword.disableBody(true, true);
                sword.angle = 0;
                // ST.attack = true;
            }
        }

    }
};