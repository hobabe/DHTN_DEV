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

        EPT._initResource.resourceFrames(T, GS.bosses.cf);

        this.load.json('waves', 'src/json/waves.json');
        this.load.json('shark', 'src/json/shark.json');
        this.load.json('octopus', 'src/json/octopus.json');
        this.load.json('crab', 'src/json/crab.json');

        // Load the export Tiled JSON
        this.load.image('tiles', 'media/img/shooting-to-stars/platform-sheet.png');
        this.load.tilemapTiledJSON('map', 'src/json/map.json');
    }

    create() {
        //------ init background ----
        T.cteateInitBackground();


        //------ Init map & collision -----
        T.createInitMap();

        //keyboard

        EPT._keyboard.createInitJoystick(GS.players.list, 0, ['A', 'W', 'D', 'S', 'SPACE']);
        EPT._keyboard.createInitJoystick(GS.players.list, 1, ['LEFT', 'UP', 'RIGHT', 'DOWN', 'END']);

        //------ Player init setting -----

        T.createInitPlayerSetting(0, 300, 450);
        T.createInitPlayerSetting(1, 100, 450);


        //-------- Init player animation -------
        T.createInitAnimationMoving(0);
        T.createInitAnimationMoving(1);

        //-------- Init boom ----
        T.createInitBoom();

        //  Input Events
        GS.cursors = EPT._keyboard.createInitKeyboard(GS.players.list);

        //------ Init stars ------
        T.createInitStars();

        //------Init player colision-----------
        T.createPlayer(0);
        T.createPlayer(1);

        //------ Init enemy ------
        T.createInitEnemy();

        //------ Create Weapon ------
        T.createPlayerWeapon(0);
        T.createPlayerWeapon(1);

        //------ Init Options -------
        T.createOptions();

        //------ Init Items Setting-------
        T.initItemSettings();

        //------ Init Collision -----
        T.createColision();
    }


    update() {
        if (GS.gameOver) {
            return;
        }

        EPT._player.playerMove(GS, T, 0);
        EPT._player.playerMove(GS, T, 1);

        T.nextLevelKey();

        EPT._following.updateRender(GS);

        // ------------------------------------------
        EPT._player.updateWeapon(GS, T);
    }

    //============== LEVEL -------------
    nextLevel() {
        if (GS.gameLevel < GS.gameMaxLevel) {
            GS.gameLevel++;
            GS.enemy.killedCount = 0;

            // Init sprite
            EPT._maps.generateMaps(GS, T);
            T.clearEnemy();
            T.createInitEnemy();

            T.createColision();
            
            GS.map.levelText.setText('LEVEL: ' + (GS.gameLevel));
            GS.bosses.meet = false;

            //clear boss existed
            if (GS.bosses.sprite) {
                GS.bosses.sprite.destroy();
            }

            //check boss map
            if (GS.map.levels[GS.gameLevel - 1].kind == 'boss 😎') {
                T.camShake();
                GS.bosses.meet = true;
                //load boss
                GS.bosses.indexMeetBoss++;
                GS.map.type = 'boss';
                T.createBoss(GS.bosses.indexMeetBoss);

                //follow Now
                // EPT._following.followNow(T,GS,GS.bosses)
            } else {
                GS.map.type = 'enemy';
                T.setBossBar(0, true);
            }

            //check last map
            if (GS.gameLevel == GS.gameMaxLevel) {
                GS.gameOver = true;
                T.camShake(1000);
            }
        }
    }

    nextLevelKey() {
        if (Phaser.Input.Keyboard.JustDown(GS.config.keyNextLevel)) {
            T.nextLevel();
        }
    }


    //============ CAMERA ===========
    camFade() {
        GS.cam.fadeIn(500, 0, 0, 0);
    }
    camShake(time) {
        GS.cam.shake(time ? time : 250, 0.01);
    }



    //============== CREATE -------------
    createOptions() {
        GS.config.keyNextLevel = T.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        GS.cam = T.cameras.main;
        GS.cam.fade(0, 0, 0, 0);
        GS.gameMaxLevel = GS.map.levels.length;
        T.camFade();
    }

    createColision() {

        //init collision
        GS.enemy.list.filter((enemy) => {
            GS.players.list.filter((player) => {
                //player vs enemy
                T.createInitEnemyCollision(player, enemy, GS, T);

                //enemy vs weapon
                T.createBulletsCollision(player, enemy, GS, T);
                T.createSwordCollision(player, enemy, GS, T);
            })
        });
    }

    cteateInitBackground() {
        //  A simple background for our game
        T.add.image(400, 300, 'sky');


        GS.map.mapPhaser = T.make.tilemap({ key: 'map' });
        GS.map.tileset = GS.map.mapPhaser.addTilesetImage('platform', 'tiles');

        // //  Game level
        if (!GS.map.levelText) {
            GS.map.levelText = T.add.text(GS.config.width / 2 - 50, 16, 'LEVEL: ' + GS.gameLevel, { fontSize: '32px', fill: '#ffee23' });
        }

    }

    createInitMap() {
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

        //  Collide the player and the stars with the platforms
        T.physics.add.collider(GS.stars, GS.map.platforms);
    }

    createInitBoom() {
        GS.bombs = T.physics.add.group();
    }

    getKeyLevel(indexPlayer) {
        var player = GS.players.list[indexPlayer];
        return GS.players.keySheet + (player.value.level + 1);
    }

    createInitAnimationMoving(indexPlayer) {
        var player = GS.players.list[indexPlayer];
        var joyKeys = player.joyKeys;
        var textureLevel = this.getKeyLevel(indexPlayer);
        var keyPlay = 'p-' + indexPlayer + '_' + textureLevel + '_';

        //  Our player animations, turning, walking left and walking right.
        T.anims.create({//left
            key: keyPlay + joyKeys[0],
            frames: T.anims.generateFrameNumbers(textureLevel, { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        T.anims.create({//up
            key: keyPlay + joyKeys[1],
            frames: [{ key: textureLevel, frame: 4 }],
            frameRate: 20
        });

        T.anims.create({//right
            key: keyPlay + joyKeys[2],
            frames: T.anims.generateFrameNumbers(textureLevel, { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        T.anims.create({//down
            key: keyPlay + joyKeys[3],
            frames: [{ key: textureLevel, frame: 4 }],
            frameRate: 20
        });
    }

    createInitPlayerSetting(indexPlayer, x, y) {
        var player = GS.players.list[indexPlayer];

        // The player and its settings
        player.sprite = T.physics.add.sprite(x, y).setBodySize(26, 40).setOffset(16, 26);;

        //  Player physics properties. Give the little guy a slight bounce.
        player.sprite.setBounce(0.2);
        player.sprite.setCollideWorldBounds(true);
    }

    createInitEnemy() {
        GS.enemy.list.filter((enemy) => {
            enemy.sprite = this.physics.add.sprite(enemy.x, enemy.y, enemy.key);
            enemy.sprite.setScale(enemy.scale).refreshBody();
            enemy.sprite.setBodySize(70, 200)
            enemy.sprite.setBounce(1, 0);
            enemy.sprite.setCollideWorldBounds(true);
            enemy.sprite.setVelocityX(100);

            //flatform
            T.physics.add.collider(enemy.sprite, GS.map.platforms);
        })

        GS.enemy.killedCount = 0;
    }

    createInitEnemyCollision(player, enemy, GS, T) {
        T.physics.add.collider(player.sprite, enemy.sprite, function () {
            EPT._player.beKilled(player, enemy, GS, T);
        });
    }

    createInitItem(player) {
        var x = player.text.x;

        //  The score and item
        if (!player.text.scoreText) {
            player.text.scoreText = T.add.text(x, 16, 'Score: ' + player.value.score, { fontSize: '32px', fill: '#000' });
        }

        if (!player.text.lifeText) {
            player.text.lifeText = T.add.text(x, 50, 'Life: ' + player.value.life, { fontSize: '16px', fill: '#000' });
        }

        if (!player.text.levelText) {
            player.text.levelText = T.add.text(x, 70, 'Level: ' + player.value.level, { fontSize: '16px', fill: '#000' });
        }

        if (!player.text.weaponText) {
            player.text.weaponText = T.add.text(x, 90, 'Weapon: ' + player.weapon.using, { fontSize: '16px', fill: '#000' });
        }
    }

    //------- boss create ---- 
    createBoss(indexBoss) {
        var boss = GS.bosses.cf[indexBoss];
        GS.bosses.duration = boss.duration;
        // var sp = GS.bosses.sprite;
        GS.bosses.sprite = T.physics.add.sprite(boss.x, boss.y, boss.name).setScale(0.5);
        // GS.bosses.sprite.setVelocityX(100);
        GS.bosses.sprite.setDepth(1)
        // this.physics.add.collider(GS.bosses.sprite, GS.map.platforms);
        GS.bosses.sprite.play(boss.name);

        GS.bosses.sprite.setCircle(170, 140, 300);
        GS.bosses.sprite.body.allowGravity = false;

        //-------- health --------

        GS.bosses.healthMax = boss.health;
        GS.bosses.healthReal = boss.health;
        T.setBossBar(boss.health);

        EPT._following.initFollowerPath(GS, T, boss.name, GS.bosses);

        GS.players.list.filter((player) => {
            T.physics.add.overlap(player.sprite, GS.bosses.sprite, function (a, b) {
                EPT._player.beKilled(player, GS.bosses, GS, T);
            }, null, T);

            GS.bosses.sprite.play(player.name);
            var enemy = GS.bosses;
            //weapon
            T.physics.add.overlap(GS.bosses.sprite, player.bulletsLeft, function (eSprite, weapon) {
                EPT._enemy.beKilled(enemy, weapon, 'gun', GS, T);
            });

            T.physics.add.overlap(GS.bosses.sprite, player.bulletsRight, function (a, weapon) {
                EPT._enemy.beKilled(enemy, weapon, 'gun', GS, T);
            });

            T.physics.add.overlap(GS.bosses.sprite, player.swordRight, function (a, weapon) {
                EPT._enemy.beKilled(enemy, weapon, 'sword', GS, T);
            }, null, T);

            T.physics.add.overlap(GS.bosses.sprite, player.swordLeft, function (a, weapon) {
                EPT._enemy.beKilled(enemy, weapon, 'sword', GS, T);
            }, null, T);
        });

        T.bossSkills();
    }

    bossSkills() {
        var x = Phaser.Math.Between(400, 600);

        var bomb = GS.bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocityX(100);
        bomb.allowGravity = false;
    }

    //------- player create -----

    createPlayer(indexPlayer) {
        var player = GS.players.list[indexPlayer];

        //------ Init item -------
        T.createInitItem(player);
        EPT._player.setTint(player.sprite, player.value.tInt);

        //  Collide the player and the stars with the platforms
        T.physics.add.collider(player.sprite, GS.platforms);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar 
        T.physics.add.overlap(player.sprite, GS.stars, function (a, b) {
            EPT._item.collectStar(a, b);
            EPT._item.collectStar_UpdateInfo(player, 'star', GS, T);
        }, null, T);

        T.physics.add.collider(player.sprite, GS.map.platforms, this.enemyTouchWall);
    }

    createPlayerWeapon(indexPlayer) {
        var player = GS.players.list[indexPlayer];

        T.createSword(player, GS, T);
        T.createBullets(player, GS, T);
    }

    createSword(player) {

        player.swordLeft = T.physics.add.sprite(player.sprite.body.x, player.sprite.body.y, 'sword');
        player.swordRight = T.physics.add.sprite(player.sprite.body.x, player.sprite.body.y, 'sword');

        player.swordLeft.angle = 270;
        player.swordRight.angle = 90;
        player.swordLeft.flipX = true;

        player.swordLeft.setBodySize(136, 14).setOffset(0, 90);
        player.swordRight.setBodySize(136, 14).setOffset(0, 90);

        player.swordLeft.body.allowGravity = false;
        player.swordRight.body.allowGravity = false;
        // player.swordRight.setGravity(0)

        player.swordLeft.disableBody(true, true);
        player.swordRight.disableBody(true, true);
    }

    createSwordCollision(player, enemy, GS, T) {
        T.physics.add.overlap(player.swordRight, enemy.sprite, function (a, weapon) {
            EPT._enemy.beKilled(enemy, weapon, 'sword', GS, T);
        }, null, T);

        T.physics.add.overlap(player.swordLeft, enemy.sprite, function (a, weapon) {
            EPT._enemy.beKilled(enemy, weapon, 'sword', GS, T);
        }, null, T);
    }

    createBullets(player, GS, T) {
        player.bulletsRight = T.add.group({
            classType: EPT._weapon.Bullet(1, 'bullet'),
            maxSize: player.weapon.bulletCount,
            runChildUpdate: true,
        });

        player.bulletsLeft = T.add.group({
            classType: EPT._weapon.Bullet(-1, 'bullet'),
            maxSize: player.weapon.bulletCount,
            runChildUpdate: true,
        });

    }

    createBulletsCollision(player, enemy, GS, T) {
        //enemy vs bullet
        T.physics.add.collider(enemy.sprite, player.bulletsLeft, function (a, weapon) {
            EPT._enemy.beKilled(enemy, weapon, 'gun', GS, T)
        });

        T.physics.add.collider(enemy.sprite, player.bulletsRight, function (a, weapon) {
            EPT._enemy.beKilled(enemy, weapon, 'gun', GS, T)
        });
    }

    initItemSettings() {
        GS.items.group = this.physics.add.group({
            bounceX: 0,
            bounceY: 0,
            collideWorldBounds: true
        });

        T.physics.add.collider(GS.items.group, GS.map.platforms);
    }

    checkGameOver(GS) {

        var countDeath = 0;
        GS.players.list.filter((player) => {
            if (player.value.life == 0) {
                countDeath++;
                console.log(player.index + ' death');
            }
        });

        if (countDeath == GS.players.list.length) {
            T.add.text(GS.config.width / 2 - 200, GS.config.height / 2, 'GAME OVER', { fontSize: '62px', fill: '#ffee23' });
        }
    }

    //================= CLEAR ==============//


    clearEnemy() {

        GS.enemy.list.filter((e) => {
            e.sprite.destroy();
        });
    }

    clearPlayer() {
    }

    setBossBar(count, isClear) {
        var text = '';
        if (!GS.bosses.healthBar) {
            GS.bosses.healthBar = T.add.text(GS.config.width / 2 - 200, 50, GS.map.type != 'boss' ? '' : T.healthCreate(GS.bosses), { fontSize: '32px', fill: '#ffee23' });
            return;
        }

        if (count > 0) {
            text = T.healthCreate(GS.bosses);
        }

        if (isClear) {
            GS.bosses.healthBar.setText('');
        } else {
            GS.bosses.healthBar.setText(text);
        }
    }
    healthCreate(bossGS) {
        var text = '';
        for (var i = 0; i < bossGS.healthMax; i++) {
            if (i > bossGS.healthReal) {
                text += ''
            } else {
                text += '█'
            }
        }

        return 'BOSS:[' + text + ']';
    }
    isNextLevel(GS) {
        const condi1 = GS.map.type == 'boss' && GS.bosses.healthReal == 0 && GS.enemy.list.length == GS.enemy.killedCount;
        const condi2 = GS.map.type == 'enemy';
        const condi3 = GS.enemy.list.length == GS.enemy.killedCount

        return condi1 && condi3 || condi2 && condi3;
    }
}