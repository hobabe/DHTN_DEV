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
        T.createPlayer(0, 16);
        T.createPlayer(1, 260);

        //------ Init enemy ------
        T.createInitEnemy();

        //------ Create Weapon ------
        T.createPlayerWeapon(0);
        T.createPlayerWeapon(1);

        //------ Init Options -------
        T.createOptions();

        //------ Init map & collision -----
        T.createInitMap();
    }


    update() {
        if (GS.gameOver) {
            return;
        }

        EPT._player.playerMove(GS,T, 0);
        EPT._player.playerMove(GS,T, 1);

        EPT._enemy.updateEnemyMove(GS);
        // EPT._enemy.updateBossMove(GS);


        T.nextLevelKey();

        EPT._following.updateRender(GS);

        // ------------------------------------------
        EPT._player.updateWeapon(GS, T);
        
        // ----------- enemies hit players ----------
        GS.enemy.list.filter((e) => {
            EPT._enemy.killPlayer(GS, T, e.sprite, 0);
            EPT._enemy.killPlayer(GS, T, e.sprite, 1);
        });
        // for (var i=0;i<2;i++)
        // {
        //     EPT._enemy.killPlayer(GS, T, GS.enemy3, i)
        //     EPT._enemy.killPlayer(GS, T, GS.enemy2, i)
        //     EPT._enemy.killPlayer(GS, T, GS.enemy1, i)
        // }
    }

    //============== LEVEL -------------
    nextLevel() {
        if (GS.gameLevel < GS.gameMaxLevel) {
            GS.gameLevel++;
            T.clearEnemy();
            T.createInitEnemy();
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
                T.createBoss(GS.bosses.indexMeetBoss);

                //follow Now
                // EPT._following.followNow(T,GS,GS.bosses)
            }

            //check last map
            if(GS.gameLevel == GS.gameMaxLevel)
            {
                GS.gameOver = true;
                T.camShake(1000);
            }

            
            EPT._maps.generateMaps(GS, T);
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

    createInitMap(){
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

    getKeyLevel(indexPlayer){
        var player = GS.players.list[indexPlayer];
        return  GS.players.keySheet + (player.level+1);
    }

    createInitAnimationMoving(indexPlayer) {
        var player = GS.players.list[indexPlayer];
        var joystick = player.joystick;
        var joyKeys = player.joyKeys;
        var textureLevel = this.getKeyLevel(indexPlayer);
        var keyPlay = 'p-' +indexPlayer+ '_'+ textureLevel + '_';

        //  Our player animations, turning, walking left and walking right.
        T.anims.create({//left
            key: keyPlay+ joyKeys[0] ,
            frames: T.anims.generateFrameNumbers(textureLevel, { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        T.anims.create({//up
            key: keyPlay+ joyKeys[1] ,
            frames: [{ key: textureLevel, frame: 4 }],
            frameRate: 20
        });

        T.anims.create({//right
            key: keyPlay+ joyKeys[2] ,
            frames: T.anims.generateFrameNumbers(textureLevel, { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        T.anims.create({//down
            key: keyPlay+ joyKeys[3] ,
            frames: [{ key: textureLevel, frame: 4 }],
            frameRate: 20
        });
    }

    createInitPlayerSetting(indexPlayer, x, y) {
        var player = GS.players.list[indexPlayer];
        var sprite = player.sprite;

        // The player and its settings
        player.sprite = T.physics.add.sprite(x, y).setBodySize(26, 40).setOffset(16,26);;

        //  Player physics properties. Give the little guy a slight bounce.
        player.sprite.setBounce(0.2);
        player.sprite.setCollideWorldBounds(true);
    }

    createInitEnemy() {

        GS.enemy.list.filter((e) => {
            e.sprite = this.physics.add.sprite(e.x, e.y, e.key);
            e.sprite.setScale(e.scale).refreshBody();
            e.sprite.setVelocityX(100);
        })
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

    //------- boss create ---- 
    createBoss(indexBoss) {
        var boss = GS.bosses.cf[indexBoss];
        GS.bosses.duration = boss.duration;
        // var sp = GS.bosses.sprite;
        // sp = this.physics.add.sprite(0, 0, boss.name);
        // sp.setScale(0.5).refreshBody();
        // sp.setVelocityX(100);
        // GS.bosses.sprite = this.physics.add.sprite(boss.x, boss.y, boss.name).setScale(0.5);
        GS.bosses.sprite = T.add.sprite(boss.x, boss.y, boss.name).setScale(0.5);
        // GS.bosses.sprite.setVelocityX(100);
        GS.bosses.sprite.setDepth(1)
        // this.physics.add.collider(GS.bosses.sprite, GS.map.platforms);
        GS.bosses.sprite.play(boss.name);

        EPT._following.initFollowerPath(GS, T, boss.name, GS.bosses);

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
    
    createPlayer(indexPlayer, x) {
        var player = GS.players.list[indexPlayer];

        //------ Init item -------
        T.createInitItem(player);

        //  Collide the player and the stars with the platforms
        T.physics.add.collider(player.sprite, GS.platforms);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar 
        T.physics.add.overlap(player.sprite, GS.stars, function(a,b){
            EPT._item.collectStar(a, b);
            EPT._item.collectStar_UpdateInfo(player, 'star', T, indexPlayer);
        }, null, T);

        // if(indexPlayer==1)
        // {
        //     T.physics.add.collider(player.sprite, GS.enemy3, EPT._enemy.hitBomb_2, null , T);
        //     T.physics.add.collider(player.sprite, GS.enemy2, EPT._enemy.hitBomb_2, null , T);
        //     T.physics.add.collider(player.sprite, GS.enemy1, EPT._enemy.hitBomb_2, null , T);

        // }
        // else if(indexPlayer==0)
        // {
        //     T.physics.add.collider(player.sprite, GS.enemy3, EPT._enemy.hitBomb, null , T);
        //     T.physics.add.collider(player.sprite, GS.enemy2, EPT._enemy.hitBomb, null , T);
        //     T.physics.add.collider(player.sprite, GS.enemy1, EPT._enemy.hitBomb, null , T);
        // }
    }

    createPlayerWeapon(indexPlayer){
        var player = GS.players.list[indexPlayer];

        T.createSword(player);
        T.createBullets(player);
    }

    createSword(player)
    {
        
        player.swordLeft = T.physics.add.sprite(player.sprite.body.x, player.sprite.body.y, 'sword');
        player.swordRight = T.physics.add.sprite(player.sprite.body.x, player.sprite.body.y, 'sword');

        player.swordLeft.angle = 270;
        player.swordRight.angle = 90;
        player.swordLeft.flipX = true;

        player.swordLeft.setBodySize(136, 14).setOffset(0,90);
        player.swordRight.setBodySize(136, 14).setOffset(0,90);

        player.swordLeft.body.allowGravity = false;
        player.swordRight.body.allowGravity = false;
        // player.swordRight.setGravity(0)

        // player.swordLeft.setDisplaySize(44, 64);
        // player.swordRight.setDisplaySize(44, 64);

        // T.physics.add.collider(player.swordRight, GS.enemy1, EPT._enemy.beKilled, null, T);
        // T.physics.add.collider(player.swordRight, GS.enemy2, EPT._enemy.beKilled, null, T);
        // T.physics.add.collider(player.swordRight, GS.enemy3, EPT._enemy.beKilled, null, T);

        // T.physics.add.collider(player.swordLeft, GS.enemy1, EPT._enemy.beKilled, null, T);
        // T.physics.add.collider(player.swordLeft, GS.enemy2, EPT._enemy.beKilled, null, T);
        // T.physics.add.collider(player.swordLeft, GS.enemy3, EPT._enemy.beKilled, null, T);

        GS.enemy.list.filter((e) => {
            T.physics.add.overlap(player.swordRight, e.sprite, function(a,b){
                EPT._enemy.beKilled(player.swordRight, e.sprite);
            }, null, T);
        });
        

        // T.physics.add.collider(player.sprite, GS.enemy2, EPT._enemy.hitBomb_2, null , T);

        // player.swordRight.disableBody(true, true);
        // player.swordLeft.disableBody(true, true);

    }

    createBullets(player)
    {
        //ưerw
        var joystick = player.joystick;
        var joyKeys = player.joyKeys;
    
        player.bulletsRight = this.add.group({
            classType: T.Bullet(1),
            maxSize: 100,
            runChildUpdate: true,
            setScale: { x: 2, y: 2}
        });
    
        player.bulletsLeft = this.add.group({
            classType: T.Bullet(-1),
            maxSize: 100,
            runChildUpdate: true,
            setScale: { x: 2, y: 2}
        });
    }
    Bullet(direction){
        
        return new Phaser.Class({

            Extends: Phaser.GameObjects.Image,
    
            initialize:
    
            function Bullet (scene)
            {
                Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
    
                this.speed = Phaser.Math.GetSpeed(300, 1)
                this.direction = direction;

                // this.left = false;
                // this.right = false;
            },
    
            fire: function (x, y)
            {
                this.setPosition(x, y);
                this.setScale(0.2);
                this.setActive(true);
                this.setVisible(true);
            },
    
            update: function (time, delta)
            {
                this.x += this.speed * delta * this.direction;
                // console.log(this.velocityX);
                if (this.x > 800 || this.x < 0)
                {
                    this.setActive(false);
                    this.setVisible(false);
                } 
            }
    
        });
    }

    //================= CLEAR ==============


    clearEnemy() {

        GS.enemy.list.filter((e) => {
            e.sprite.destroy();
        });
    }

    clearPlayer() {
    }
}