class Preloader extends Phaser.Scene {
	constructor() {
			super('Preloader');
	}
	preload() {
		EPT.world = {
            width: this.cameras.main.width,
            height: this.cameras.main.height,
            centerX: this.cameras.main.centerX,
            centerY: this.cameras.main.centerY
		};
		
		// this.add.sprite(0, 0, 'background').setOrigin(0, 0);
		this.cameras.main.backgroundColor.setTo(255,255,255);

		var progress = this.add.graphics();

		var loadingBg = this.add.sprite(EPT.world.centerX/4, EPT.world.centerY+100,  'background');
		loadingBg.setOrigin(0.5, 0.5);

		this.load.on('progress', function (value) {
			progress.clear();
			progress.fillStyle(0xf3ffa3, 1);
			progress.fillRect(loadingBg.x-(loadingBg.width*0.5)+20, loadingBg.y-(loadingBg.height*0.5)+10, 540 * value, 25);
		});

		var pathAssets = 'media/img/shooting-to-stars/root/';
		var pathAssets_happyboy =  'media/img/shooting-to-stars/happy-boy/';

		var resources = {
			'image': [
				['sky', pathAssets + 'sky.png'],
				['ground', pathAssets + 'platform.png'],
				['star', pathAssets + 'star.png'],
				['bomb', pathAssets + 'bomb.png'],
				['gun', pathAssets + 'gun.png'],
				['enemy', 'media/img/shooting-to-stars/happy-boy/happy-boy.svg'],
			],
			'spritesheet': [
				['dude',  pathAssets + 'dude.png', { frameWidth: 32, frameHeight: 48 }],
			],
			'audio': [
				['sound-shoot', ['media/sfx/shoot.mp3']],
				['sound-running', ['media/sfx/running.mp3']],
				['sound-bgm', ['media/sfx/bgm.mp3']],
			]
		};

		for(var method in resources) {
			resources[method].forEach(function(args) {
				var loader = this.load[method];
				loader && loader.apply(this.load, args);
			}, this);
		};
	}
	create() {
		EPT.Sfx.manage('sound-shoot', 'init', this);
		EPT.Sfx.manage('sound-running', 'init', this);
		EPT.Sfx.manage('sound-bgm', 'init', this);
		
		EPT.Sfx.play('sound-bgm');
		EPT.fadeOutScene('ShootingToStars', this);
	}
}