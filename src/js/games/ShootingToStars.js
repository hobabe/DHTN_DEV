var d, T, S, GS;// T = this, GS = setting game
class ShootingToStars extends Phaser.Scene {
    constructor() {
        super('ShootingToStars');
    }
    preload() {

        GS = EPT._gameSettings.ShootingToStars();
        this['GS'] = GS;
        T = this;
        GS['T'] = T;
    }

    create() {
        //------ init background ----
        T.cteateInitBackground();


        EPT._keyboard.createInitJoystick(GS.players.list, 0, ['LEFT', 'UP', 'RIGHT', 'DOWN', 'END']);
        EPT._keyboard.createInitJoystick(GS.players.list, 1, ['A', 'W', 'D', 'S', 'HOME']);

        //------ Player init setting -----
        T.createInitPlayerSetting(0, 100, 450);
        T.createInitPlayerSetting(1, 300, 450);


        //-------- Init player animation -------
        T.createInitAnimationMoving(0);
        T.createInitAnimationMoving(1);

        //-------- Init boom ----
        // T.createInitBoom();

        //  Input Events
        GS.cursors = EPT._keyboard.createInitKeyboard(GS.players.list);

        //------ Init stars ------
        T.createInitStars();

        //------Init player colision-----------
        T.createPlayer(0, 16);
        T.createPlayer(1, 260);

        //------ Init enemy ------
        T.createInitEnemy();

        //Next level
        T.createOptions();
    }


    update() {
        if (GS.gameOver) {
            return;
        }

        EPT._player.playerMove(GS, 0);
        EPT._player.playerMove(GS, 1);

        EPT._enemy.updateEnemyMove(GS);

        T.nextLevelKey();
    }

    //============== LEVEL -------------
    nextLevel() {
        if (GS.gameLevel < GS.gameMaxLevel) {
            GS.gameLevel++;
            EPT._maps.generateMaps(GS, T);
            T.clearEnemy();
            T.createInitEnemy();
            GS.map.levelText.setText('LEVEL: ' + GS.gameLevel);
        } else {
            GS.gameOver = true;
        }
    }

    nextLevelKey(){
        if (Phaser.Input.Keyboard.JustDown(GS.config.keyNextLevel))
        {
            T.nextLevel();
        }
    }



    //============== CREATE -------------
    createOptions(){
        GS.config.keyNextLevel = T.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    cteateInitBackground() {
        //  A simple background for our game
        T.add.image(400, 300, 'sky');

        //  Game level
        if (!GS.map.levelText) {
            GS.map.levelText = T.add.text(GS.config.width / 2 - 50, 16, 'LEVEL: ' + GS.gameLevel, { fontSize: '32px', fill: '#ffee23' });
        }

        EPT._maps.generateMaps(GS, T);
    }

    createInitStars() {
        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
        GS.stars = T.physics.add.group({
            key: 'star',
            repeat: 1,
            setXY: { x: 12, y: 0, stepX: 70 }
        });


        GS.stars.children.iterate((child) => {

            //  Give each star a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });
    }

    createInitBoom() {
        GS.bombs = T.physics.add.group();
    }

    createInitAnimationMoving(indexPlayer) {
        var player = GS.players.list[indexPlayer];
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
        var player = GS.players.list[indexPlayer];
        var sprite = player.sprite;

        // The player and its settings
        player.sprite = T.physics.add.sprite(x, y, 'dude');

        //  Player physics properties. Give the little guy a slight bounce.
        player.sprite.setBounce(0.2);
        player.sprite.setCollideWorldBounds(true);
    }

    createPlayer(indexPlayer, x) {
        var player = GS.players.list[indexPlayer];

        //color
        EPT._player.setTint(player.sprite, player.info.color)
        //------ Init item -------
        T.createInitItem(player);

        //  Collide the player and the stars with the map.platforms
        T.physics.add.collider(player.sprite, GS.map.platforms);
        T.physics.add.collider(GS.stars, GS.map.platforms);
        // T.physics.add.collider(GS.bombs, GS.map.platforms);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar 
        T.physics.add.overlap(player.sprite, GS.stars, function (a, b) {
            EPT._item.collectStar(a, b);
            EPT._item.collectStar_UpdateInfo(player, 'star');
        }, null, T);

        // T.physics.add.collider(player.sprite, GS.bombs, EPT._enemy.hitBomb, null, T);
    }

    createInitEnemy() {

        GS.enemy1 = this.physics.add.sprite(0, 0, 'enemy');
        GS.enemy1.setScale(0.5).refreshBody();
        GS.enemy1.setVelocityX(100);
        GS.enemy2 = this.physics.add.sprite(350, 250, 'enemy');
        GS.enemy2.setScale(0.5).refreshBody();
        GS.enemy2.setVelocityX(100);
        GS.enemy3 = this.physics.add.sprite(400, 300, 'enemy');
        GS.enemy3.setScale(0.5).refreshBody();
        GS.enemy3.setVelocityX(-100);

        this.physics.add.collider(GS.enemy1, GS.map.platforms);
        this.physics.add.collider(GS.enemy2, GS.map.platforms);
        this.physics.add.collider(GS.enemy3, GS.map.platforms);
    }

    createInitItem(player) {
        var x = player.info.x;
        //  The score and item
        if (!player.scoreText) {
            player.scoreText = T.add.text(x, 16, 'Score: ' + player.score, { fontSize: '32px', fill: '#000' });
        }

        if (!player.lifeText) {
            player.lifeText = T.add.text(x, 50, 'Life: ' + player.life, { fontSize: '16px', fill: '#000' });
        }

        if (!player.levelText) {
            player.levelText = T.add.text(x, 70, 'Level: ' + player.level, { fontSize: '16px', fill: '#000' });
        }

        if (!player.weaponText) {
            player.weaponText = T.add.text(x, 90, 'Weapon: ' + player.weapon.using, { fontSize: '16px', fill: '#000' });
        }
    }

    //================= CLEAR ==============


    clearEnemy() {
        GS.enemy1.destroy();
        GS.enemy2.destroy();
        GS.enemy3.destroy();
    }

    clearPlayer() {
    }
}