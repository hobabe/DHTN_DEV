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
        }
        else if (ST.cursors[joystick[joyKeys[2]]].isDown) {
            sprite.setVelocityX(player.speed.run);

            sprite.anims.play(joystick[joyKeys[2]], true);//right
            EPT.Sfx.play('running', false);
            // console.log(player.weapon.sword.body.x);
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
            // var sword = player.weapon.sword.get();

            // if (sword)
            // {
            //     sword.fire(sprite.body.x, sprite.body.y);
            // }
            ST.attack = true;


        }
        console.log("angle: "+sword.angle);
        if(ST.attack == true)
        {

            sword.angle += 9 ;
            if(sword.angle == 81)
            {
                sword.disableBody(true, true);
                sword.angle = 0;
                ST.attack = false;
            }
        //     while(sword.angle <= 91)
        //     {
        //         sword.angle += 7;
        //     }
        //     sword.disableBody(true, true);
        //     sword.angle = 0;
        //     ST.attack = false;
           
        }

    }
};