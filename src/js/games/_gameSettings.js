EPT._gameSettings = {
    ShootingToStars(scene) {
        return {
            players : [ 
                {
                    sprite: null, joystick:null, joyKeys:[],
                    weapon: {
                        gun: false,
                        sword: false,
                        using: 'sword'
                    },
                    level: 0,
                    starCount: 0,
                    life: 2,
                    score: 0,
                    speed: {
                        run: 100,
                        attack: 50
                    },
                     // text show
                    scoreText: null,
                    lifeText: null,
                    levelText: null,
                    weaponText: null,
                    info: {
                        x: 16,
                        color: 0x5bafc7
                    },
                    sword: null,
                    attack : 1,

                }, 
                {
                    sprite: null, joystick:null, joyKeys:[],
                    weapon: {
                        gun: false,
                        sword: false,
                        using: 'sword'
                    },
                    level: 0,
                    starCount: 0,
                    life: 2,
                    score: 0,
                    speed: {
                        run: 100,
                        attack: 50
                    },
                     // text show
                    scoreText: null,
                    lifeText: null,
                    levelText: null,
                    weaponText: null,
                    info: {
                        x: 550,
                        color: 0x94c75b
                    },
                    sword: null,
                    attack : 1,
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
