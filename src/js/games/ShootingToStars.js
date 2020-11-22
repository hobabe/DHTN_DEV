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
        EPT._game.generateMaps(GS, T);

        //keyboard

        EPT._keyboard.createInitJoystick(GS.players.list, 0, ['A', 'W', 'D', 'S', 'SPACE']);
        EPT._keyboard.createInitJoystick(GS.players.list, 1, ['LEFT', 'UP', 'RIGHT', 'DOWN', 'END']);

        //------ Player init setting -----

        T.createInitPlayerSetting(0, 300, 450);
        T.createInitPlayerSetting(1, 100, 450);


        //-------- Init player animation -------
        EPT._keyboard.createInitAnimationMoving(0, GS, T);
        EPT._keyboard.createInitAnimationMoving(1, GS, T);

        //-------- Init boom ----
        T.createInitBoom();

        //  Input Events
        GS.cursors = EPT._keyboard.createInitKeyboard(GS.players.list);

        //------ Init stars ------
        // T.createInitStars();

        //------Init player colision-----------
        EPT._player.createPlayer(0, GS, T);
        EPT._player.createPlayer(1, GS, T);

        //------ Init enemy ------
        EPT._enemy.createInitEnemy(GS, T);

        //------ Create Weapon ------
        T.createPlayerWeapon(0);
        T.createPlayerWeapon(1);

        //------ Init Options -------
        T.createOptions();

        //------ Init Items Setting-------
        T.initItemSettings();

        //------ Init Collision -----
        EPT._game.createColision(GS, T);
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
            EPT._game.generateMaps(GS, T);
            EPT._enemy.clearEnemy(GS);
            EPT._enemy.createInitEnemy(GS, T);

            EPT._game.createColision(GS, T);
            
            GS.map.levelText.setText('LEVEL: ' + (GS.gameLevel));
            GS.bosses.meet = false;

            //clear boss existed
            if (GS.bosses.sprite) {
                GS.bosses.sprite.destroy();
                clearInterval(GS.bosses.funcUseSkill);
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
                EPT._sprites.setBossBar(0, true, GS, T);
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

    createInitBoom() {
        GS.bombs = T.physics.add.group();
    }

    

    createInitPlayerSetting(indexPlayer, x, y) {
        var player = GS.players.list[indexPlayer];

        // The player and its settings
        player.sprite = T.physics.add.sprite(x, y).setBodySize(26, 40).setOffset(16, 26);;

        //  Player physics properties. Give the little guy a slight bounce.
        player.sprite.setBounce(0.2);
        player.sprite.setCollideWorldBounds(true);
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
        EPT._sprites.setBossBar(boss.health,false,GS, T);

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

        T.bossSkills(boss, GS, T);
    }

    bossSkills(bossCf, GS, T) {
        //load skill
        EPT._enemy.drawSkill(GS.bosses.sprite, bossCf.skill, GS, T);
    }

    //------- player create -----


    createPlayerWeapon(indexPlayer) {
        var player = GS.players.list[indexPlayer];

        EPT._weapon.createSword(player, GS, T);
        EPT._weapon.createBullets(player, GS, T);
    }


    initItemSettings() {
        GS.items.group = this.physics.add.group({
            bounceX: 0,
            bounceY: 0,
            collideWorldBounds: true
        });

        T.physics.add.collider(GS.items.group, GS.map.platforms);
    }

    //================= CLEAR ==============//


    clearPlayer() {
    }
}