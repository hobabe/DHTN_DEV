EPT._enemy = {
  
    hitBomb(player, bomb) {
        var ST = this.ST;
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('down');

        ST.gameOver = true;
    }

};