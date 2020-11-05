EPT._player = {
    
    setTint(sprite, color){
        sprite.setTint(color);
    },
    playerMove(GS, keyPlayer) {
        var player = GS.players.list[keyPlayer];
        var sprite = player.sprite;
        var joystick = player.joystick;
        var joyKeys = player.joyKeys;

        if (GS.cursors[joystick[joyKeys[0]]].isDown) {
            sprite.setVelocityX(-player.speed.run);

            sprite.anims.play(joystick[joyKeys[0]], true);//'left'
            // console.log(GS.cursors);
            EPT.Sfx.play('running', false);
        }
        else if (GS.cursors[joystick[joyKeys[2]]].isDown) {
            sprite.setVelocityX(player.speed.run);

            sprite.anims.play(joystick[joyKeys[2]], true);//right
            EPT.Sfx.play('running', false);
        }
        else //if (GS.cursors[joystick.down].isDown)
        {
            sprite.setVelocityX(0);

            sprite.anims.play(joystick[joyKeys[3]]);//'turn'
        }

        if (GS.cursors[joystick[joyKeys[1]]].isDown && sprite.body.onFloor()) {
            sprite.setVelocityY(GS.players.jumpHeight);
        }
    }
};