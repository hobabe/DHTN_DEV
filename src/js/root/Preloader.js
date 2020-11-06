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

		var progressBar = this.add.graphics();
		var progressBox = this.add.graphics();
		
		progressBox.fillStyle(0x2c3a47, 1);
		progressBox.fillRect(240, 270, 320, 55);
		
		progressBar.setDepth(2);
		progressBox.setDepth(1);

		this.load.on('progress', function (value) {
			progressBar.clear();
			progressBar.fillStyle(0xf8efba, 1);
			progressBar.fillRect(245, 275, 310 * value, 45);
		});

		var pathAssets = 'media/img/shooting-to-stars/root/';
		var pathAssets_happyboy =  'media/img/shooting-to-stars/happy-boy/';
		var bossPath =  'media/img/shooting-to-stars/boss/';
		var weaponPath =  'media/img/shooting-to-stars/weapon/';
		var sheetPath =  'media/img/shooting-to-stars/sheet/';
		var heroPath =  sheetPath + '/CharacterLevelDesign/';

		var resources = {
			'image': [
				['sky', pathAssets + 'sky.png'],
				['ground', pathAssets + 'platform.png'],
				['star', pathAssets + 'star.png'],
				['bomb', pathAssets + 'bomb.png'],
				['enemy', pathAssets_happyboy +'happy-boy.svg'],

				
				['bullet', weaponPath + 'bullet.svg'],
				['gun', weaponPath + 'gun.svg'],
				['light-attack', weaponPath + 'light-attack.svg'],
				['sword', weaponPath + 'sword.svg'],

				['shark1', bossPath +'shark01.svg'],
				['shark2', bossPath +'shark02.svg'],

				['octopus1', bossPath +'octopus01.svg'],
				['octopus2', bossPath +'octopus02.svg'],

				['crab1', bossPath +'crab01.svg'],
				['crab2', bossPath +'crab02.svg'],
				['crab3', bossPath +'crab03.svg'],
			],
			'spritesheet': [
				['dude',  pathAssets + 'dude.png', { frameWidth: 32, frameHeight: 48 }],
				['tiles', sheetPath+'platform.png', { frameWidth: 40, frameHeight: 40 }],

				['hero-level-1',  heroPath + 'full1.png', { frameWidth: 64, frameHeight: 64 }],
				['hero-level-2',  heroPath + 'full2.png', { frameWidth: 64, frameHeight: 64 }],
				['hero-level-3',  heroPath + 'full3.png', { frameWidth: 64, frameHeight: 64 }],
				['hero-level-4',  heroPath + 'full4.png', { frameWidth: 64, frameHeight: 64 }],
				['hero-level-5',  heroPath + 'full5.png', { frameWidth: 64, frameHeight: 64 }],
			],
			'audio': [
				['shoot', ['media/sfx/shoot.mp3']],
				['running', ['media/sfx/running.mp3']],
				['bgm', ['media/sfx/bgm.mp3']],
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
		EPT.Sfx.manage('shoot', 'init', this);
		EPT.Sfx.manage('running', 'init', this);
		EPT.Sfx.manage('bgm', 'init', this);
		
		EPT.Sfx.play('bgm', true);
		EPT.fadeOutScene('ShootingToStars', this);
	}
}