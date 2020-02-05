var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
scene: {
		init: init,
		preload: preload,
		create: create,
		update: update
	}
};

var game = new Phaser.Game(config);
var score = 0;

function init(){
	var sauvesaut;
	var saut;
 	var platforms;
	var player;
	var cursors; 
	var stars;
	var scoreText;
	var bomb;
}

function preload(){
	this.load.image('background','image/fondcool.png');	
	this.load.image('fond','image/fond.png');
	this.load.image('etoile','image/star.png');
	this.load.image('sol','image/platform.png');
	this.load.image('bomb','image/bomb.png');
	this.load.spritesheet('perso','image/blabla.png',{frameWidth: 50, frameHeight: 37});
}



function create(){
	this.add.image(400,300,'background');

	platforms = this.physics.add.staticGroup();
	platforms.create(290,580,'sol');
	platforms.create(100,580,'sol');
		platforms.create(490,580,'sol');
			platforms.create(690,580,'sol');
	platforms.create(600,400,'sol');
	platforms.create(50,250,'sol');
	
	player = this.physics.add.sprite(100,450,'perso');
	player.setCollideWorldBounds(true);
	player.body.setGravityY(000);
	this.physics.add.collider(player,platforms);
	
	cursors = this.input.keyboard.createCursorKeys(); 
	
	this.anims.create({
		key:'left',
		frames: this.anims.generateFrameNumbers('perso', {start: 9, end: 11}),
		frameRate: 10,
		repeat: -1
	});
	this.anims.create({
		key:'leftsaut',
		frames: this.anims.generateFrameNumbers('perso', {start: 20, end: 22}),
		frameRate: 10,
		repeat: -1
	});
	
	this.anims.create({
		key:'stop',
		frames: this.anims.generateFrameNumbers('perso', {start: 0, end: 3}),
		frameRate: 10
	});
	
	this.anims.create({
		key:'saut',
		frames: this.anims.generateFrameNumbers('perso', {start: 16, end: 18}),
		frameRate: 30
	});
	
	stars = this.physics.add.group({
		key: 'etoile',
		repeat:11,
		setXY: {x:12,y:0,stepX:70}
	});
	
	this.physics.add.collider(stars,platforms);
	this.physics.add.overlap(player,stars,collectStar,null,this);

	scoreText = this.add.text(16,16, 'score: 0', {fontSize: '32px', fill:'#000'});
	bombs = this.physics.add.group();
	this.physics.add.collider(bombs,platforms);
	this.physics.add.collider(player,bombs, hitBomb, null, this);
}



function update(){
	if(cursors.left.isDown){
		if (player.body.touching.down) {
		player.anims.play('left', true);
		player.setVelocityX(-300);
		player.setFlipX(true);
		}
		else {
		player.anims.play('leftsaut', true);
		player.setVelocityX(-300);
		player.setFlipX(true);	
		}
	}else if(cursors.right.isDown){
		if (player.body.touching.down) {
		player.anims.play('left', true);
		player.setVelocityX(300);
		player.setFlipX(false);
		}
		else {
		player.anims.play('leftsaut', true);
		player.setVelocityX(300);
		player.setFlipX(false);	
		}
		
	}else{
		player.setVelocityX(0);
		if (player.body.touching.down){
			player.anims.play('stop', true);
		}
	}
	
	if(cursors.up.isUp && player.body.touching.down){
		saut=2;
	} 
	if(cursors.up.isDown && sauvesaut==1 && saut>0){
		player.anims.play('saut', true);
		sauvesaut=0;
		saut=saut-1;
		if (saut==1) {
			
		player.setVelocityY(-330);
		}
		if (saut==0) {
		player.setVelocityY(-300);	
		}
	} 
	if (cursors.up.isUp) {
		sauvesaut=1;
	}
}
function hitBomb(player, bomb){
	this.physics.pause();
	player.setTint(0xff0000);
	player.anims.play('turn');
	gameOver=true;
}

function collectStar(player, star){
	star.disableBody(true,true);
	score += 10;
	scoreText.setText('score: '+score);
	if(stars.countActive(true)===0){
		stars.children.iterate(function(child){
			child.enableBody(true,child.x,0, true, true);
		});
		
		var x = (player.x < 400) ? 
			Phaser.Math.Between(400,800):
			Phaser.Math.Between(0,400);
		var bomb = bombs.create(x, 16, 'bomb');
		bomb.setBounce(1);
		bomb.setCollideWorldBounds(true);
		bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
	}
}