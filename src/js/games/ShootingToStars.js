var d, T, ST;
class ShootingToStars extends Phaser.Scene {
    constructor() {
        super('ShootingToStars');
    }

    preload() {
        ST = EPT._gameInitSetting.ShootingToStars();
        T = this;
        var pathAssets = 'media/img/shooting-to-stars/'
        this.load.image('sky', pathAssets + 'sky.png');
        this.load.image('ground', pathAssets + 'platform.png');
        this.load.image('star', pathAssets + 'star.png');
        this.load.image('bomb', pathAssets + 'bomb.png');
        this.load.spritesheet('dude', pathAssets + 'dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    create() {
        //------ init background ----
        T.cteateInitBackground();

        T.createInitJoystick("player1", ['LEFT', 'UP', 'RIGHT', 'DOWN']);
        T.createInitJoystick("player2", ['A', 'W', 'D', 'S']);

        //------ Player init setting -----
        T.createInitPlayerSetting("player1", 100, 450);
        T.createInitPlayerSetting("player2", 300, 450);


        //-------- Init player animation -------
        T.createInitAnimationMoving("player1");
        T.createInitAnimationMoving("player2");

        //-------- Init boom ----
        T.createInitBoom();

        //  Input Events
        cursors = T.createInitKeyboard(Phaser.Input.Keyboard.KeyCodes);

        //------ Init stars ------
        T.createInitStars();

        //------Init player colision-----------
        T.createPlayer("player1", 16);
        T.createPlayer("player2", 260);
    }


    update() {
        if (gameOver) {
            return;
        }

        T.playerMove("player1");
        T.playerMove("player2");
    }

    playerMove(keyPlayer) {
        var player = ST.players[keyPlayer];
        var sprite = player.sprite;
        var joystick = player.joystick;

        if (cursors[joystick.left].isDown) {
            sprite.setVelocityX(-160);

            sprite.anims.play(joystick.left, true);//'left'
            // console.log(cursors);
        }
        else if (cursors[joystick.right].isDown) {
            sprite.setVelocityX(160);

            sprite.anims.play(joystick.right, true);//right
        }
        else //if (cursors[joystick.down].isDown)
        {
            sprite.setVelocityX(0);

            sprite.anims.play(joystick.down);//'turn'
        }

        if (cursors[joystick.up].isDown && sprite.body.touching.down) {
            sprite.setVelocityY(-330);
        }
    }

    collectStar(player, star) {
        star.disableBody(true, true);

        //  Add and update the score
        ST.score += 10;
        ST.scoreText.setText('Score: ' + score);

        if (stars.countActive(true) === 0) {
            //  A new batch of stars to collect
            stars.children.iterate((child) => {

                child.enableBody(true, child.x, 0, true, true);

            });

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;

        }
    }

    hitBomb(player, bomb) {
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        ST.gameOver = true;
    }


    //============== CREATE -------------

    createInitKeyboard(KeyCodes) {
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
    }

    createInitJoystick(keyPlayer, arrDirection) {
        var player = ST.players[keyPlayer];
        var joy = {};
        joy['left'] = arrDirection[0];
        joy['up'] = arrDirection[1];
        joy['right'] = arrDirection[2];
        joy['down'] = arrDirection[3];

        player.joystick = joy;
    }

    cteateInitBackground() {
        //  A simple background for our game
        T.add.image(400, 300, 'sky');

        //  The platforms group contains the ground and the 2 ledges we can jump on
        ST.platforms = T.physics.add.staticGroup();

        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        ST.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        //  Now let's create some ledges
        ST.platforms.create(600, 400, 'ground');
        ST.platforms.create(50, 250, 'ground');
        ST.platforms.create(750, 220, 'ground');
    }

    createInitStars() {
        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
        ST.stars = T.physics.add.group({
            key: 'star',
            repeat: 1,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        ST.stars.children.iterate((child) =>{

            //  Give each star a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });
    }

    createInitBoom() {
        ST.bombs = T.physics.add.group();
    }

    createInitAnimationMoving(keyPlayer) {
        var player = ST.players[keyPlayer];
        var joystick = player.joystick;

        //  Our player animations, turning, walking left and walking right.
        T.anims.create({
            key: joystick.left,
            frames: T.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        T.anims.create({
            key: joystick.up,
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        T.anims.create({
            key: joystick.down,
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        T.anims.create({
            key: joystick.right,
            frames: T.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }

    createInitPlayerSetting(keyPlayer, x, y) {
        var player = ST.players[keyPlayer];
        var sprite = player.sprite;

        // The player and its settings
        player.sprite = T.physics.add.sprite(x, y, 'dude');

        //  Player physics properties. Give the little guy a slight bounce.
        player.sprite.setBounce(0.2);
        player.sprite.setCollideWorldBounds(true);
    }

    createPlayer(keyPlayer, x) {
        var player = ST.players[keyPlayer];
        //  The score
        if (!scoreText) {
            scoreText = T.add.text(x, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        }

        //  Collide the player and the stars with the platforms
        T.physics.add.collider(player.sprite, ST.platforms);
        T.physics.add.collider(ST.stars, ST.platforms);
        T.physics.add.collider(ST.bombs, ST.platforms);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar 
        T.physics.add.overlap(player.sprite, ST.stars, this.collectStar, null, T);

        T.physics.add.collider(player.sprite, ST.bombs, this.hitBomb, null, T);
    }
}