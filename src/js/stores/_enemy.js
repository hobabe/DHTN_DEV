EPT._enemy = {
  
    hitBomb(ST, player) {
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('down');

        ST.gameOver = true;
    }

};