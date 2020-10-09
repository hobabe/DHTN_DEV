var d, T, S, ST;// T = this, ST = setting game
class ShootingToStars extends Phaser.Scene {
    constructor() {
        super('ShootingToStars');
    }

    preload() {
        ST = EPT._gameSettings.ShootingToStars(this);        
        this['ST'] = ST;
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

        EPT._keyboard.createInitJoystick(ST.players, "player1", ['LEFT', 'UP', 'RIGHT', 'DOWN']);
        EPT._keyboard.createInitJoystick(ST.players, "player2", ['A', 'W', 'D', 'S']);

        //------ Player init setting -----
        T.createInitPlayerSetting("player1", 100, 450);
        T.createInitPlayerSetting("player2", 300, 450);


        //-------- Init player animation -------
        T.createInitAnimationMoving("player1");
        T.createInitAnimationMoving("player2");

        //-------- Init boom ----
        T.createInitBoom();

        //  Input Events
        ST.cursors = EPT._keyboard.createInitKeyboard();

        //------ Init stars ------
        T.createInitStars();

        //------Init player colision-----------
        T.createPlayer("player1", 16);
        T.createPlayer("player2", 260);
    }


    update() {
        if (ST.gameOver) {
            return;
        }

        EPT._player.playerMove(ST, "player1");
        EPT._player.playerMove(ST, "player2");
    }


    


    //============== CREATE -------------


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
        if (!ST.scoreText) {
            ST.scoreText = T.add.text(x, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        }

        //  Collide the player and the stars with the platforms
        T.physics.add.collider(player.sprite, ST.platforms);
        T.physics.add.collider(ST.stars, ST.platforms);
        T.physics.add.collider(ST.bombs, ST.platforms);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar 
        T.physics.add.overlap(player.sprite, ST.stars, EPT._item.collectStar, null, T);

        T.physics.add.collider( player.sprite, ST.bombs, EPT._enemy.hitBomb, null, T);
    }
}