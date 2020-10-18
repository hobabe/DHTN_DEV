var d, T, S, ST;// T = this, ST = setting game
class ShootingToStars extends Phaser.Scene {
    constructor() {
        super('ShootingToStars');
    }
    preload() {

        ST = EPT._gameSettings.ShootingToStars();
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


        EPT._keyboard.createInitJoystick(ST.players, 0, ['LEFT', 'UP', 'RIGHT', 'DOWN', 'SPACE']);
        EPT._keyboard.createInitJoystick(ST.players, 1, ['A', 'W', 'D', 'S', 'SPACE']);

        //------ Player init setting -----
        T.createInitPlayerSetting(0, 100, 450);
        T.createInitPlayerSetting(1, 300, 450);


        //-------- Init player animation -------
        T.createInitAnimationMoving(0);
        T.createInitAnimationMoving(1);

        //-------- Init boom ----
        // T.createInitBoom();

        //  Input Events
        ST.cursors = EPT._keyboard.createInitKeyboard(ST.players);

        //------ Init stars ------
        T.createInitStars();

        //------ Init enemy ------
        T.createInitEnemy();

        //------ Init Items ------
        // T.createItems();

        //------Init player colision-----------
        T.createPlayer(0, 16);
        T.createPlayer(1, 260);

    }


    update() {
        if (ST.gameOver) {
            return;
        }

        EPT._player.playerMove(ST, 0);
        EPT._player.playerMove(ST, 1);

        EPT._enemy.updateEnemyMove(ST);

       // ------------- attack enemy -------------
        EPT._player.attackEnemy(ST, 0, ST.enemy1);
        EPT._player.attackEnemy(ST, 0, ST.enemy2);
        EPT._player.attackEnemy(ST, 0, ST.enemy3);
        
        // ------------ enemies hit players ----------
        for (var i=0;i<2;i++)
        {
            EPT._enemy.killPlayer(ST, T, ST.enemy3, i)
            EPT._enemy.killPlayer(ST, T, ST.enemy2, i)
            EPT._enemy.killPlayer(ST, T, ST.enemy1, i)
        }

    }
hhhh
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

        //------ Init item -------
        T.createInitItem(player);

        //  Collide the player and the stars with the platforms
        T.physics.add.collider(player.sprite, ST.platforms);
        T.physics.add.collider(ST.stars, ST.platforms);
        // T.physics.add.collider(ST.bombs, ST.platforms);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar 
        T.physics.add.overlap(player.sprite, ST.stars, function(a,b){
            EPT._item.collectStar(a, b);
            EPT._item.collectStar_UpdateInfo(player, 'star');
        }, null, T);

        if(indexPlayer==1)
        {
            T.physics.add.collider(player.sprite, ST.enemy3, EPT._enemy.hitBomb_2, null , T);
            T.physics.add.collider(player.sprite, ST.enemy2, EPT._enemy.hitBomb_2, null , T);
            T.physics.add.collider(player.sprite, ST.enemy1, EPT._enemy.hitBomb_2, null , T);

        }
        else if(indexPlayer==0)
        {
            T.physics.add.collider(player.sprite, ST.enemy3, EPT._enemy.hitBomb, null , T);
            T.physics.add.collider(player.sprite, ST.enemy2, EPT._enemy.hitBomb, null , T);
            T.physics.add.collider(player.sprite, ST.enemy1, EPT._enemy.hitBomb, null , T);

        }
    }

    createInitEnemy(){
        ST.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        ST.enemy1 = this.physics.add.sprite(0, 0, 'enemy');
        ST.enemy1.setScale(0.5).refreshBody();
        ST.enemy1.setVelocityX(100);
        ST.enemy2 = this.physics.add.sprite(350, 250, 'enemy');
        ST.enemy2.setScale(0.5).refreshBody();
        ST.enemy2.setVelocityX(100);
        ST.enemy3 = this.physics.add.sprite(400, 300, 'enemy');
        ST.enemy3.setScale(0.5).refreshBody();
        ST.enemy3.setVelocityX(-100);

        this.physics.add.collider(ST.enemy1, ST.platforms);
        this.physics.add.collider(ST.enemy2, ST.platforms);
        this.physics.add.collider(ST.enemy3, ST.platforms);
    }

    createInitItem(player)
    {
        var x = player.info.x;
         //  The score and item
        if (!player.scoreText) {
            player.scoreText = T.add.text(x, 16, 'Score: '+ player.score, { fontSize: '32px', fill: '#000' });
        }

        if (!player.lifeText) {
            player.lifeText = T.add.text(x, 50, 'Life: '+ player.life, { fontSize: '16px', fill: '#000' });
        }

        if (!player.levelText) {
            player.levelText = T.add.text(x, 70, 'Level: '+ player.level, { fontSize: '16px', fill: '#000' });
        }

        if (!player.weaponText) {
            player.weaponText = T.add.text(x, 90, 'Weapon: '+ player.weapon.using, { fontSize: '16px', fill: '#000' });
        }
    }
}