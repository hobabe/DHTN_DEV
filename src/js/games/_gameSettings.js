EPT._gameSettings = {
    ShootingToStars(scene) {
        return {
            players : [ 
                {
                    sprite: null, joystick:null, joyKeys:[],
                    life: 2,
                    info: {
                        x: 16
                    }
                }, 
                {
                    sprite: null, joystick:null, joyKeys:[],
                    life: 2,
                    info: {
                        x: 600
                    }
                }
            ],
            stars: null,
            bombs: null,
            platforms: null,
            cursors: null,
            gameOver : false,
            enemy1: null,
            enemy2: null,
            enemy3: null,
            gameLevel: 0,
        }
    }
}
