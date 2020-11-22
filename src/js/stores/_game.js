EPT._game = {
    generateMaps(GS, T) {

        //========== TILED

        if (GS.map.platforms) {
            GS.map.mapPhaser.filterTiles(function (tile, index) {
                GS.map.mapPhaser.removeTile(tile);
                //console.log(tile, index)
            });
            const level = 'level-' + (GS.gameLevel);
            //console.log(level);
            GS.map.platforms = GS.map.mapPhaser.createDynamicLayer(level, GS.map.tileset, 0, 0);
            this.initCollision();
        } else {
            // setting create
            GS.map.platforms = GS.map.mapPhaser.createDynamicLayer('level-' + GS.gameLevel, GS.map.tileset, 0, 0);
        }
        GS.map.platforms.setCollisionByExclusion(-1, true);
        //=========== MY tool
        //
        // var data = JSON.parse(GS.map.levels[GS.gameLevel-1].map);

        // //  The map.platforms group contains the ground and the 2 ledges we can jump on

        // if(GS.map.platforms){
        //     GS.map.platforms.clear(true, true)
        // } else {
        //     GS.map.platforms = T.physics.add.staticGroup();
        // }

        // for(var i=0;i<data.length;i++){
        //     const x = data[i][0], y = data[i][1];
        //     GS.map.platforms.create(40*x+20, y*40+20, 'ground').refreshBody();
        // }

        //========== OLD ===============
        //  //  Here we create the ground.
        //  //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        //  GS.map.platforms.create(400, 568, 'ground').setScale(2).refreshBody();;

        //   Now let's create some ledges
        //  GS.map.platforms.create(600, 400, 'ground').setTint(0xff9659);
        //  GS.map.platforms.create(50, 250, 'ground').setTint(0xff59eb);
        //  GS.map.platforms.create(750, 220, 'ground').setTint(0x7259ff);
    },

    createColision(GS, T) {

        //init collision
        GS.enemy.list.filter((enemy) => {
            GS.players.list.filter((player) => {
                //player vs enemy
                EPT._enemy.createInitEnemyCollision(player, enemy, GS, T);

                //enemy vs weapon
                EPT._weapon.createBulletsCollision(player, enemy, GS, T);
                EPT._weapon.createSwordCollision(player, enemy, GS, T);
            })
        });
    },
    initCollision(){
        GS.players.list.filter((player)=>{
            T.physics.add.collider(player.sprite, GS.map.platforms, this.enemyTouchWall);
        })

        T.physics.add.collider(GS.items.group, GS.map.platforms);
        //enemy
        // GS.enemy.list.filter((e) => {
        //     T.physics.add.collider(e.sprite, GS.map.platforms);

        //     GS.players.list.filter((player)=>{
        //         T.physics.add.collider(player.swordLeft, GS.map.platforms);
        //         T.physics.add.collider(player.swordRight, GS.map.platforms);
        //     })
        // });
        // T.physics.add.collider(GS.enemy1, GS.map.platforms);
        // T.physics.add.collider(GS.enemy2, GS.map.platforms);
        // T.physics.add.collider(GS.enemy3, GS.map.platforms);

        

        //  Collide the player and the stars with the platforms
        // T.physics.add.collider(GS.stars, GS.map.platforms);
        // T.physics.add.collider(GS.bombs, GS.platforms);
    },
    enemyTouchWall(a,b){
        if(a.body.onWall()){
            console.log('touch');
        }
    },
    checkGameOver(GS, T) {

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
    },
    
    isNextLevel(GS) {
        const condi1 = GS.map.type == 'boss' && GS.bosses.healthReal == 0 && GS.enemy.list.length == GS.enemy.killedCount;
        const condi2 = GS.map.type == 'enemy';
        const condi3 = GS.enemy.list.length == GS.enemy.killedCount

        return condi1 && condi3 || condi2 && condi3;
    }
};