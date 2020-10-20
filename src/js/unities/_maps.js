EPT._maps = {
    generateMaps(GS, T) {
        var data = JSON.parse(GS.map.levels[GS.gameLevel-1].map);

        //  The map.platforms group contains the ground and the 2 ledges we can jump on

        if(GS.map.platforms){
            GS.map.platforms.clear(true, true)
        } else {
            GS.map.platforms = T.physics.add.staticGroup();
        }
        
        for(var i=0;i<data.length;i++){
            const x = data[i][0], y = data[i][1];
            GS.map.platforms.create(40*x+20, y*40+20, 'ground').refreshBody();
        }

        //========== OLD ===============
        //  //  Here we create the ground.
        //  //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        //  GS.map.platforms.create(400, 568, 'ground').setScale(2).refreshBody();;

        //   Now let's create some ledges
        //  GS.map.platforms.create(600, 400, 'ground').setTint(0xff9659);
        //  GS.map.platforms.create(50, 250, 'ground').setTint(0xff59eb);
        //  GS.map.platforms.create(750, 220, 'ground').setTint(0x7259ff);
    }
};