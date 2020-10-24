EPT._following = {
    initFollowerPath(GS, T, key) {
        var f = GS.following;
        f.graphics = T.add.graphics();//.lineStyle(1, 0x2d2d2d, 1);

        f.path = new Phaser.Curves.Path(T.cache.json.get(key));

        f.path.draw(f.graphics);

        // for (var i = 0; i < 20; i++)
        // {
            f.follower = T.add.follower(f.path, 0, 0);
            // f.follower = { t: 0, vec: new Phaser.Math.Vector2() };
            
            f.follower.startFollow({
                duration: 5000,
                positionOnPath: true,
                repeat: -1,
                ease: 'Linear',
                // delay: i * 70
            });
        // }
    },
    followNow(T, GS, duration){
        var f = GS.following;

        T.tweens.add({
            targets: f.follower,
            t: 1,
            ease: 'Sine.easeInOut',
            duration: duration,
            yoyo: true,
            repeat: -1
        });
    },
    initFollowerCircal(GS, T) {
        var f = GS.following;
        f.curve = new Phaser.Curves.Ellipse(400, 300, 200);

        f.points = f.curve.getSpacedPoints(32);

        f.tempVec = new Phaser.Math.Vector2();
        f.tempVecP = new Phaser.Math.Vector2();

        f.ship = T.impact.add.image(points[0].x, points[0].y, 'ship');
    },
    updateRender(GS, sprite) {
        var f = GS.following;
        // f.graphics.fillCircle(f.follower.vec.x, f.follower.vec.y, 12);
        if(GS.bosses.sprite){
            GS.bosses.sprite.x = f.follower.pathVector.x;
            GS.bosses.sprite.y = f.follower.pathVector.y;
        }
    },
    nextPoint(GS, T) {
        var f = GS.following;

        var next = f.points[f.t % f.points.length];

        moveToXY(f.ship, next.x, next.y, 0, 500);

        f.t++;

        T.time.addEvent({ delay: 500, callback: f.nextPoint, callbackScope: T, args: [T] });
    },

    moveToXY(GS) {
        var f = GS.following;

        if (f.speed === undefined) { f.speed = 60; }
        if (f.maxTime === undefined) { f.maxTime = 0; }

        var angle = Math.atan2(f.y - f.gameObject.y, f.x - f.gameObject.x);

        if (f.maxTime > 0) {
            //  We know how many pixels we need to move, but how fast?
            var dx = f.gameObject.x - f.x;
            var dy = f.gameObject.y - f.y;

            f.speed = Math.sqrt(dx * dx + dy * dy) / (f.maxTime / 1000);
        }

        f.gameObject.setVelocityX(Math.cos(angle) * f.speed);
        f.gameObject.setVelocityY(Math.sin(angle) * f.speed);

        // gameObject.rotation = angle;
    }

};