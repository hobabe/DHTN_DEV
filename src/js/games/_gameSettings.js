EPT._gameSettings = {
    ShootingToStars(scene) {
        return {
            players : [ {sprite: null, joystick:null, joyKeys:[]}, {sprite: null, joystick:null, joyKeys:[]}],
            stars: null,
            bombs: null,
            platforms: null,
            cursors: null,
            score : 0,
            gameOver : false,
            scoreText: null,
            enemy1: null,
            enemy2: null,
            enemy3: null,
            enemy:
            {
                sprites : [
                    [{x: 80, y: 70, min: 80, max: 100, sprite:null}, {x: 60, y: 70, min: 80, max: 100, sprite: null}, {x: 80, y: 70, min: 80, max: 100, sprite:null}], //lv1
                    [{x: 80, y: 70, min: 80, max: 100, sprite:null}, {x: 80, y: 70, min: 80, max: 100, sprite: null}, {x: 80, y: 70, min: 80, max: 100, sprite:null}], //lv1
                    [{x: 80, y: 70, min: 80, max: 100, sprite:null}, {x: 80, y: 70, min: 80, max: 100, sprite: null}, {x: 80, y: 70, min: 80, max: 100, sprite:null}], //lv1
               ],
               speed:[],
            },
            scoreText: null,
        }
    }
}