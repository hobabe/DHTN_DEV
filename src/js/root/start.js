var enablePWA = false;
if (enablePWA) {
  // SERVICE WORKER
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./js/sw.js");
  }
  // NOTIFICATIONS TEMPLATE
  Notification.requestPermission().then(function(result) {
    if (result === "granted") {
      exampleNotification();
    }
  });
  function exampleNotification() {
    var notifTitle = "Enclave Phaser 1Template";
    var notifBody = "Created by the Enclave Games team.";
    var notifImg = "img/icons/icon-512.png";
    var options = {
      body: notifBody,
      icon: notifImg
    };
    var notif = new Notification(notifTitle, options);
    setTimeout(exampleNotification, 30000);
  }
}

var gameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: { //physics outsite to add physics.add
      default: 'arcade',
      arcade: {
          gravity: { y: 300 },
          debug: false
      }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Preloader, ShootingToStars]
};
game = new Phaser.Game(gameConfig);
window.focus();
