EPT._gameInitSetting = {
    ShootingToStars: function(scene) {
        scence['ST'] = {
            players = { player1: {sprite: null, joystick:null}, player2:  {sprite: null, joystick:null}};
            stars: null,
            bombs: null,
            platforms: null,
            cursors: null,
            score : 0,
            gameOver : false,
            scoreText: null,
            scene: null,
        }
    }
}