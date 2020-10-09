EPT._player = {
  
    playerMove(ST, keyPlayer) {
        var player = ST.players[keyPlayer];
        var sprite = player.sprite;
        var joystick = player.joystick;

        if (ST.cursors[joystick.left].isDown) {
            sprite.setVelocityX(-160);

            sprite.anims.play(joystick.left, true);//'left'
            // console.log(ST.cursors);
        }
        else if (ST.cursors[joystick.right].isDown) {
            sprite.setVelocityX(160);

            sprite.anims.play(joystick.right, true);//right
        }
        else //if (ST.cursors[joystick.down].isDown)
        {
            sprite.setVelocityX(0);

            sprite.anims.play(joystick.down);//'turn'
        }

        if (ST.cursors[joystick.up].isDown && sprite.body.touching.down) {
            sprite.setVelocityY(-330);
        }
    }
};