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
        // var bullet = player.bullets;
        // console.log(bullet.body.x, bullet.body.y);
        // console.log(player.bullets.visible)
        if (ST.cursors[joystick[joyKeys[4]]].isDown && player.bullets.quantity > 0)
        {
            // player.bullets.enableBody(true, sprite.body.x, sprite.body.y, true, true);
            // bullet.visible = true;
            player.bullets = T.physics.add.sprite(sprite.body.x+ 10, sprite.body.y+ 20, 'bullet');
            T.physics.add.collider(player.bullets, ST.platforms);
            player.bullets.quantity-=1;
            // player.bullets.physics.add.collider()
            player.bullets.visible = true;
        }
       
        if (player.bullets.visible == true)
        {
            player.bullets.setVelocityX(1060);
        }
        

    }
};