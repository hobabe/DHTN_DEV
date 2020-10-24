EPT._sprites = {
    fadeSprite(T, sprite) {
        T.tweens.add({
            targets: sprite,
            alpha: 0,
            duration: 300,
            ease: 'Power2'
          }, T);
    }
};