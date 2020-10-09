EPT._keyboard = {
    createInitKeyboard() {
        var KeyCodes = Phaser.Input.Keyboard.KeyCodes;
        return T.input.keyboard.addKeys({
            UP: KeyCodes.UP,//player 1
            DOWN: KeyCodes.DOWN,
            LEFT: KeyCodes.LEFT,
            RIGHT: KeyCodes.RIGHT,
            W: KeyCodes.W,//player 2
            S: KeyCodes.S,
            A: KeyCodes.A,
            D: KeyCodes.D,
        });
    },
    
    createInitJoystick(players, keyPlayer, arrDirection) {
        var player = players[keyPlayer];
        var joy = {};
        joy['left'] = arrDirection[0];
        joy['up'] = arrDirection[1];
        joy['right'] = arrDirection[2];
        joy['down'] = arrDirection[3];

        player.joystick = joy;
    }


};