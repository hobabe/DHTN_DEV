EPT._keyboard = {
    createInitKeyboard(players) {
        var KeyCodes = Phaser.Input.Keyboard.KeyCodes;
        var keys = {};
        for(var i=0;i<players.length;i++){
            const p = players[i];
            const joyKeys = p.joyKeys;
            
            keys[p.joyKeys[0]] = KeyCodes[p.joyKeys[0]];
            keys[p.joyKeys[1]] = KeyCodes[p.joyKeys[1]];
            keys[p.joyKeys[2]] = KeyCodes[p.joyKeys[2]];
            keys[p.joyKeys[3]] = KeyCodes[p.joyKeys[3]];
            keys[p.joyKeys[4]] = KeyCodes[p.joyKeys[4]];
        }

        return T.input.keyboard.addKeys(keys);
    },
    
    createInitJoystick(players, keyPlayer, joysticks) {
        var player = players[keyPlayer];
        var joy = {};

        joy[joysticks[0]] = joysticks[0];//['LEFT']
        joy[joysticks[1]] = joysticks[1];//['UP']
        joy[joysticks[2]] = joysticks[2];//['RIGHT']
        joy[joysticks[3]] = joysticks[3];//['DOWN']
        joy[joysticks[4]] = joysticks[4];//['SHOOT']

        player.joyKeys = joysticks;
        player.joystick = joy;
    }


};