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
            keys[p.joyKeys[5]] = KeyCodes[p.joyKeys[5]];
        }

        return T.input.keyboard.addKeys(keys);
    },
    
    createInitJoystick(players, keyPlayer, joysticks) {
        var player = players[keyPlayer];
        var joy = {};
        var key = ''

        joy[joysticks[0]] = key + joysticks[0];//['LEFT']
        joy[joysticks[1]] = key + joysticks[1];//['UP']
        joy[joysticks[2]] = key + joysticks[2];//['RIGHT']
        joy[joysticks[3]] = key + joysticks[3];//['DOWN']
        joy[joysticks[4]] = key + joysticks[4];//['SLICE']
        joy[joysticks[5]] = key + joysticks[5];//['SHOOT']

        player.joyKeys = joysticks;
        player.joystick = joy;
    }


};