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
        var pathAssets_2 = '_design/learning-game/publish/class-1/';
        this.load.image('sky', pathAssets + 'sky.png');
        this.load.image('ground', pathAssets + 'platform.png');
        this.load.image('star', pathAssets + 'star.png');
        this.load.image('bomb', pathAssets + 'bomb.png');
        this.load.spritesheet('dude', pathAssets + 'dude.png', { frameWidth: 32, frameHeight: 48 });


        this.load.image('star', pathAssets + 'star.png');
        this.load.image('gun', pathAssets + 'bomb.png')
        this.load.image('enemy', pathAssets_2 + 'happy boy.svg')
    }

    create() {
        //------ init background ----
        T.cteateInitBackground();


        EPT._keyboard.createInitJoystick(ST.players, 0, ['LEFT', 'UP', 'RIGHT', 'DOWN', 'END']);
        EPT._keyboard.createInitJoystick(ST.players, 1, ['A', 'W', 'D', 'S', 'SPACE']);

        //------ Player init setting -----
        T.createInitPlayerSetting(0, 100, 450);
        T.createInitPlayerSetting(1, 300, 450);


        //-------- Init player animation -------
        T.createInitAnimationMoving(0);
        T.createInitAnimationMoving(1);

        //-------- Init boom ----
        T.createInitBoom();

        //  Input Events
        ST.cursors = EPT._keyboard.createInitKeyboard(ST.players);

        //------ Init stars ------
        T.createInitStars();

        //------Init player colision-----------
        T.createPlayer(0, 16);
        T.createPlayer(1, 260);

        //------ Init enemy ------
        T.createInitEnemy();
    }


    update() {
        if (ST.gameOver) {
            return;
        }

        EPT._player.playerMove(ST, 0);
        EPT._player.playerMove(ST, 1);


        EPT._enemy.updateEnemyMove(ST);
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


        ST.stars.children.iterate((child) => {

            //  Give each star a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });
    }

    createInitBoom() {
        ST.bombs = T.physics.add.group();
    }

    createInitAnimationMoving(indexPlayer) {
        var player = ST.players[indexPlayer];
        var joystick = player.joystick;
        var joyKeys = player.joyKeys;

        //  Our player animations, turning, walking left and walking right.
        T.anims.create({//left
            key: joystick[joyKeys[0]],
            frames: T.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        T.anims.create({//up
            key: joystick[joyKeys[1]],
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        T.anims.create({//right
            key: joystick[joyKeys[2]],
            frames: T.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        T.anims.create({//down
            key: joystick[joyKeys[3]],
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });
    }

    createInitPlayerSetting(indexPlayer, x, y) {
        var player = ST.players[indexPlayer];
        var sprite = player.sprite;

        // The player and its settings
        player.sprite = T.physics.add.sprite(x, y, 'dude');

        //  Player physics properties. Give the little guy a slight bounce.
        player.sprite.setBounce(0.2);
        player.sprite.setCollideWorldBounds(true);
    }

    createPlayer(indexPlayer, x) {
        var player = ST.players[indexPlayer];

        //  The score and item
        if (!ST.scoreText) {
            ST.scoreText = T.add.text(x, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        }

        //  Collide the player and the stars with the platforms
        T.physics.add.collider(player.sprite, ST.platforms);
        T.physics.add.collider(ST.stars, ST.platforms);
        T.physics.add.collider(ST.bombs, ST.platforms);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar 
        T.physics.add.overlap(player.sprite, ST.stars, EPT._item.collectStar, null, T);

        T.physics.add.collider(player.sprite, ST.bombs, EPT._enemy.hitBomb, null, T);
    }

    createInitEnemy(){
        ST.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        // for(var i=0;i<ST.enemy.sprites[0].length; i++)
        // {
        //     var enemy = ST.enemy.sprites[0][i];
        //     var sprite = enemy.sprite;

        //     sprite = this.physics.add.sprite(0, 0, 'enemy');
        //     sprite.setScale(0.5).refreshBody();
        //     sprite.setVelocityX(100);

        //     this.physics.add.collider(sprite, ST.platforms);
        //     console.log(i+" "+sprite)
        // }

        // var enemy = ST.enemy.sprites[0][1];
        // var sprite = enemy.sprite;

        ST.enemy.sprites[0][1].sprite = this.physics.add.sprite(0, 0, 'enemy');
        ST.enemy.sprites[0][1].sprite.setScale(0.5).refreshBody();
        ST.enemy.sprites[0][1].sprite.setVelocityX(100);

        this.physics.add.collider(ST.enemy.sprites[0][1].sprite, ST.platforms);




        // console.log(i+" "+sprite)
        // var enemy = ST.enemy.sprites[0][2];
        // console.log(ST.enemy.sprites[0][2])


        // ST.enemy1 = this.physics.add.sprite(0, 0, 'enemy');
        // ST.enemy1.setScale(0.5).refreshBody();
        // ST.enemy1.setVelocityX(100);
        // ST.enemy2 = this.physics.add.sprite(350, 250, 'enemy');
        // ST.enemy2.setScale(0.5).refreshBody();
        // ST.enemy2.setVelocityX(100);
        // ST.enemy3 = this.physics.add.sprite(400, 300, 'enemy');
        // ST.enemy3.setScale(0.5).refreshBody();
        // ST.enemy3.setVelocityX(-100);

        

        // this.physics.add.collider(ST.enemy1, ST.platforms);
        // this.physics.add.collider(ST.enemy2, ST.platforms);
        // this.physics.add.collider(ST.enemy3, ST.platforms);
    }
}