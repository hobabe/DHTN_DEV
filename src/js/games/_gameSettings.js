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
                        run: 160,
                        attack: 50
                    },
                     // text show
                    scoreText: null,
                    lifeText: null,
                    levelText: null,
                    weaponText: null,
                    info: {
                        x: 16
                    }
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
                        run: 160,
                        attack: 50
                    },
                     // text show
                    scoreText: null,
                    lifeText: null,
                    levelText: null,
                    weaponText: null,
                    info: {
                        x: 600
                    }
                }
            ],
            items: [
                {
                    type: 'gun',
                    text: null,
                    quantity: 0,
                    body: null
                },
                {
                    type: 'bullet',
                    text: null,
                    quantity: 0,
                    body: null
                },
                {
                    type: 'life',
                    text: null,
                    quantity: 0,
                    body: null
                },
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
