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
var dasht;
var dashreset=100;
var pvjoueur=3;
var invicibilite=100;
var resetchoix=1000;
var saut=2;
var xsauveattaque=0;
var sauvechoix=2;
var choixmonstre=2;
var sauvegardedureset=1;
var attaquemonstre=0;
var timerattaque=1000;
var timertouch=0;
function init(){
	var sauvesaut;
	var saut;
 	var platforms;
	var player;
	var cursors; 
	var stars;
	var scoreText;
	var bomb;
    var sauvedash;
	var dashreset;
	var endurance;
	var fdp;
	var pointdevie;
	var pvjoueur;
	var invicibilite;
	var barredepv1;
	var barredepv2;
	var barredepv3;
	var monstre;
	var choixmonstre;
	var resetchoix;
	var textchoix;
	var sauvechoix;
	var sauvegardedureset;
	var xjoueur;
	var xmonstre;
	var xmonstremargeplus;
	var xmonstremargemoins;
	var yjoueur;
	var ymonstre;
	var xsauveattaque;
	var attaquemonstre;
	var timerattaque;
	var timertouch;
}

function preload(){
	this.load.image('background','imag/fondcool.png');	
	this.load.image('fond','imag/fond.png');
	this.load.image('etoile','imag/star.png');
	this.load.image('sol','imag/platform.png');
	this.load.spritesheet('perso','imag/statique.png',{frameWidth: 21, frameHeight: 30});
	this.load.spritesheet('run','imag/run.png',{frameWidth: 23, frameHeight: 28});
	this.load.spritesheet('saut','imag/saut.png',{frameWidth: 21, frameHeight: 28});
	this.load.spritesheet('leftjump','imag/sautleft.png',{frameWidth: 26, frameHeight: 21});
	this.load.spritesheet('dash','imag/dash.png',{frameWidth: 34, frameHeight: 29});
	this.load.spritesheet('bomb','imag/bomb.png',{frameWidth: 27, frameHeight: 27});
	this.load.spritesheet('vie','imag/vie.png',{frameWidth: 13, frameHeight: 10});
	this.load.spritesheet('monstres','imag/statiquemonstre.png',{frameWidth: 45, frameHeight: 51});
	this.load.spritesheet('leftmonstre','imag/monstreleft.png',{frameWidth: 45, frameHeight: 51});
	this.load.spritesheet('attaquemonstre','imag/attaquemonstre.png',{frameWidth: 80, frameHeight: 57});
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
	
	barredepv1 = this.add.sprite(430,16,'vie');
	barredepv2 = this.add.sprite(460,16,'vie');
	barredepv3 = this.add.sprite(490,16,'vie');
	
	player = this.physics.add.sprite(100,450,'perso');
	player.setCollideWorldBounds(true);
	player.body.setGravityY(000);
	this.physics.add.collider(player,platforms);
	
	monstre = this.physics.add.sprite(400,450,'monstres');
	monstre.setCollideWorldBounds(true);
	monstre.body.setGravityY(000);
	this.physics.add.collider(monstre,platforms);
	
	
	cursors = this.input.keyboard.createCursorKeys(); 
	dasht= this.input.keyboard.addKey('W');
	
	this.anims.create({
		key:'left',
		frames: this.anims.generateFrameNumbers('run', {start: 0, end: 5}),
		frameRate: 11,
		repeat: -1
	});
	this.anims.create({
		key:'leftsaut',
		frames: this.anims.generateFrameNumbers('leftjump', {start: 0, end: 2}),
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
		frames: this.anims.generateFrameNumbers('saut', {start: 0, end: 2}),
		frameRate: 19,
	});
	this.anims.create({
		key:'dash',
		frames: this.anims.generateFrameNumbers('dash', {start: 0, end: 3}),
		frameRate: 5,
	});
	
	this.anims.create({
		key:'animb',
		frames: this.anims.generateFrameNumbers('bomb', {start: 0, end: 3}),
		frameRate: 9,
		repeat:-1
	});
	this.anims.create({
		key:'pv',
		frames: this.anims.generateFrameNumbers('vie', {start: 0, end: 3}),
		frameRate: 9,
		repeat:-1
	});
	
	this.anims.create({
		key:'monstrestatique',
		frames: this.anims.generateFrameNumbers('monstres', {start: 0, end: 3}),
		frameRate: 9,
		repeat:-1
	});
	
		this.anims.create({
		key:'monstremarche',
		frames: this.anims.generateFrameNumbers('leftmonstre', {start: 0, end: 3}),
		frameRate: 9,
		repeat:-1
	});
	
		this.anims.create({
		key:'monstreattaque',
		frames: this.anims.generateFrameNumbers('attaquemonstre', {start: 0, end: 7}),
		frameRate: 9,
	});
	
	
	
	stars = this.physics.add.group({
		key: 'etoile',
		repeat:11,
		setXY: {x:12,y:0,stepX:70}
	});
	this.physics.add.collider(stars,platforms);
	this.physics.add.overlap(player,stars,collectStar,null,this);
    
	endurance = this.add.text(400,576,'endurance: ', {fontSize: '32px', fill:'#FFF'});
	scoreText = this.add.text(16,16, 'score: 0', {fontSize: '32px', fill:'#000'});
	bombs = this.physics.add.group();
	textchoix =	this.add.text(500, 16, 'PV : ',{fontSize: '32px', fill:'#000'});
	textchoixjoueur =	this.add.text(500, 100, 'PV : ',{fontSize: '32px', fill:'#000'});
	this.physics.add.collider(bombs,platforms);
	this.physics.add.collider(player,bombs, hitBomb, null, this);
	this.physics.add.collider(player,monstre, hitmonstre, null, this);
	
}



function update(){
	
	if (dasht.isUp) {
		sauvedash=40;
		if (dashreset<200) {
		dashreset=dashreset+0.5;	
		}
	}
	if(cursors.left.isDown){
		
		if (player.body.touching.down) {
		 if (dasht.isDown && sauvedash>0 && dashreset>9) {
		dashreset=dashreset-2;
		
		player.setVelocityX(-600);
		player.setFlipX(true);
		sauvedash=sauvedash-1;
		if (dashreset>19) {
		player.anims.play('dash', true);	
		}
		 } else {
		player.anims.play('left', true);
		player.setVelocityX(-300);
		player.setFlipX(true);
		}}
		else {
		player.anims.play('leftsaut', true);
		player.setVelocityX(-300);
		player.setFlipX(true);	
		}
	}else if(cursors.right.isDown){
		if (player.body.touching.down) {
			 if (dasht.isDown && sauvedash>0 && dashreset>9) {
		dashreset=dashreset-2;
		player.setVelocityX(600);
		player.setFlipX(false);
		sauvedash=sauvedash-1;
		if (dashreset>19) {
		player.anims.play('dash', true);	
		}
		 } else {	
		player.anims.play('left', true);
		player.setVelocityX(300);
		player.setFlipX(false);
		}}
		else {
		player.anims.play('leftsaut', true);
		player.setVelocityX(300);
		player.setFlipX(false);	
		}
		
	}else{
		player.setVelocityX(0);
		if (player.body.touching.down && cursors.up.isUp ){
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
	if (dashreset<35) {
	endurance.setText('endurance: 0 dash ');
	}
	if (dashreset>=35 && dashreset<100) {
	endurance.setText('endurance: 1 dash ');
	}
	if (dashreset>=100 && dashreset<170) {
	endurance.setText('endurance: 2 dashs ');
	}
	
	if (dashreset>=170 && dashreset<=200) {
	endurance.setText('endurance: 3 dashs ');
	}
	if (invicibilite<100){
	invicibilite=invicibilite+1;
	}
	if (invicibilite>90 && pvjoueur!=0) {
	player.clearTint()
	}
	if (pvjoueur==3) {	
	barredepv1.anims.play('pv', true);
	barredepv2.anims.play('pv', true);
	barredepv3.anims.play('pv', true);
	
	}
	if (pvjoueur==2) {

	barredepv1.anims.play('pv', true);
	barredepv2.anims.play('pv', true);
	barredepv3.destroy(true);
	}
	if (pvjoueur==1) {
	barredepv1.anims.play('pv', true);
	barredepv2.destroy(true);
	}
	if (pvjoueur==0) {
	barredepv1.destroy(true);
	}
	
	xmonstre=monstre.x;
	xjoueur=player.x;
	ymonstre=monstre.y;
	yjoueur=player.y;
	
	
	if (resetchoix<1000) {
     resetchoix=resetchoix+1;
	}
	if (resetchoix==1000) {
	choixmonstre = Phaser.Math.Between(1,2);
	if (choixmonstre==0) {
	sauvechoix=0;
	resetchoix=0;
	}
	if (choixmonstre==1) {
	sauvechoix=1;
	resetchoix=800;
	}
	if (choixmonstre==2) {
	sauvechoix=2;
	resetchoix=0;
	}
	}
	if (sauvechoix<2) {
	monstre.setVelocityX(0);
	monstre.anims.play('monstrestatique', true);
	}
	if (sauvechoix==2) { 
	if (ymonstre+20>=yjoueur && ymonstre-89<=yjoueur && xmonstre+100>=xjoueur && xmonstre-100<=xjoueur){
		
		xsauveattaque=1;
		
	
	}else if (xmonstre+20>=xjoueur && xmonstre-20<=xjoueur && xsauveattaque==0 ) {
	monstre.setVelocityX(0);	
	monstre.anims.play('monstrestatique', true);
 }
		
	else if (player.x<monstre.x && xsauveattaque==0) {
	monstre.setVelocityX(-75);
	monstre.anims.play('monstremarche', true);
	monstre.setFlipX(true);	
	
		}
	else if (player.x>monstre.x && xsauveattaque==0) {
	monstre.setVelocityX(75);
	monstre.anims.play('monstremarche', true);
	monstre.setFlipX(false);
	
		
	 }
	}
	
	
	if (timerattaque<1000) {
	timerattaque=timerattaque+1;
	if (timerattaque<100) {
	timerattaque=1000;	
	}
	}
	
	if (xsauveattaque==1 && timerattaque>80) {
			monstre.setVelocityX(0);
		monstre.anims.play('monstreattaque',true);
		timerattaque=timerattaque-5;
		timertouch=timertouch+1;
		if (timerattaque<100) {
		xsauveattaque=0;
		}
		if (timertouch==100) {
		timertouch=0;
		}
		if (timertouch>=80 && timertouch<100) {
		attaquemonstre=3;	
		} else {
		attaquemonstre=0;	
		}
	}
	if (xsauveattaque==0) {
	attaquemonstre=0;
	timertouch=0;	
	}
	
	 textchoixjoueur.setText(timertouch +'/4');
	 textchoix.setText(attaquemonstre +'wow');
	
	
	if (invicibilite==100 && ymonstre+20>=yjoueur && ymonstre-59<=yjoueur && xmonstre+80>=xjoueur && xmonstre-100<=xjoueur && attaquemonstre==3) {
    pvjoueur=pvjoueur-1;
	invicibilite=0;
	player.setTint(0xff6969);
	}
	if (pvjoueur==0) {
	this.physics.pause();
	player.setTint(0xff0000);
	player.anims.play('turn');
	gameOver=true;
	}
}


function hitBomb(player, bomb){
	if (invicibilite==100) {
    pvjoueur=pvjoueur-1;
	invicibilite=0;
	player.setTint(0xff6969);
	}
	if (pvjoueur==0) {
	this.physics.pause();
	player.setTint(0xff0000);
	player.anims.play('turn');
	gameOver=true;
	}
}

function hitmonstre(player,monstre) {
	if (invicibilite==100) {
    pvjoueur=pvjoueur-1;
	invicibilite=0;
	player.setTint(0xff6969);
	}
	if (pvjoueur==0) {
	this.physics.pause();
	player.setTint(0xff0000);
	player.anims.play('turn');
	gameOver=true;
	}
	
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
		bomb.anims.play('animb', true);
		bomb.setBounce(1);
		bomb.setCollideWorldBounds(true);
		bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
	}
}

