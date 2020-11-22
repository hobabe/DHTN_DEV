EPT._sprites = {
    fadeSprite(T, sprite) {
        T.tweens.add({
            targets: sprite,
            alpha: 0,
            duration: 300,
            ease: 'Power2'
          }, T);
    },
    

    setBossBar(count, isClear, GS, T) {
        var text = '';
        if (!GS.bosses.healthBar) {
            GS.bosses.healthBar = T.add.text(GS.config.width / 2 - 200, 50, GS.map.type != 'boss' ? '' : this.healthCreate(GS.bosses), { fontSize: '32px', fill: '#ffee23' });
            return;
        }

        if (count > 0) {
            text = this.healthCreate(GS.bosses);
        }

        if (isClear) {
            GS.bosses.healthBar.setText('');
        } else {
            GS.bosses.healthBar.setText(text);
        }
    },
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
    },
    blinkEffect(spriteOb, T){
        spriteOb.sprite.setAlpha(0);
        T.tweens.add({
            targets: spriteOb.sprite,
            alpha: 1,
            duration: 100,
            ease: 'Linear',
            repeat: 20,
            onStart : ()=>{spriteOb.isUred = true;},
            onComplete: ()=>{spriteOb.isUred = false;},
        });
    },
    blinkLevelUp(spriteOb, T){
        spriteOb.sprite.setTint(0xffffff);
        T.tweens.add({
            targets: spriteOb.sprite,
            tint : 0x279ee2,
            duration: 100,
            ease: 'Linear',
            repeat: 20,
            onStart : ()=>{spriteOb.isUred = true;},
            onComplete: ()=>{spriteOb.isUred = false;spriteOb.sprite.setTint(spriteOb.text.color);},
        });
    }
};