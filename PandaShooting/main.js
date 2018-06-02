/*
 * Panda Shooting
 */

phina.globalize();

// size information
var SCREEN_WIDTH    = 600;
var SCREEN_HEIGHT   = 960;
var PLAYER_WIDTH    = 104;
var PLAYER_HEIGHT   = 104;
var BULLET_SIZE     = 8;
var ENEMY_SIZE      = 30;
var EXPLOSION_SIZE  = 80;

var FPS = 30;

var ASSETS = {
  image: {
    bg: "http://user-images.githubusercontent.com/39637599/40866206-64f140f0-6637-11e8-9988-e6ed4cc6241f.png",
    objects: 'http://user-images.githubusercontent.com/39637599/40872521-8008a498-668a-11e8-8a58-65ee832cf426.png',
    explosion: 'http://user-images.githubusercontent.com/39637599/40873790-00bb5006-66a2-11e8-8c99-da36f29a586e.png',
  },
  // animation
  spritesheet: {
    "player_ss":
    {
      "frame": {
        "width": PLAYER_WIDTH,
        "height": PLAYER_HEIGHT,
        "cols": 4,
        "rows": 2,
      },
      "animations": {
        "normal": {
          "frames": [0,1,2,3],
          "next": "normal",
          "frequency": 10,
        },
        "damage": {
          "frames": [4,5,6,7],
          "next": "normal",
          "frequency": 10,
        },
      }
    },
    "explosion_ss":
    {
      "frame": {
        "width": EXPLOSION_SIZE,
        "height": EXPLOSION_SIZE,
        "cols": 4,
        "rows": 1,
      },
      "animations": {
        "start": {
          "frames": [0,1,2,3],
          "frequency": 5,
        },
      },
    }
  }
};

// object
var player;
var enemies = [];

/*
 * player's bullet
 */
phina.define('PlayerBullet',{
  superClass : 'phina.display.CircleShape',
  init: function(){
    this.superInit({radius: BULLET_SIZE, fill:'transparent', stroke:'white'});
    this.setPosition(player.x, player.y-PLAYER_HEIGHT/2);
  },
  update: function(){
    this.y -= 10;
    if(this.y < -10){
      this.remove();
    }
    var copied = enemies.clone();
    copied.each( function(i) {
      var enemy = i;
      if (this.hitTestElement(enemy)){
        // explosion
        Explosion(enemy.x, enemy.y).addChildTo(this.parent);
        // remove
        this.remove();
        enemy.remove();
        enemies.erase(enemy);
      }
    }, this);
  }
});

/*
 * enemy
 */
phina.define('Enemy',{
  superClass : 'phina.display.TriangleShape',
  init: function(x, y){
    this.superInit({radius: ENEMY_SIZE, fill: 'red'});
    this.setPosition(x, y);
    enemies.push(this);
  },
  update: function(){
    var direction = Math.atan2(player.y - this.y , player.x - this.x) * Math.RAD_TO_DEG;
    this.setRotation(direction + 90);
    if(Math.random() < 0.01 && this.y < SCREEN_HEIGHT*0.7){
      EnemyBullet(this.x, this.y-ENEMY_SIZE/2, this.rotation - 90).addChildTo(this.parent);
    }
    if(this.x < -5 || SCREEN_WIDTH+5 <this.x || this.y < -5 || SCREEN_HEIGHT+5 < this.y){
      this.remove();
    }
  }
});

/*
 * enemy's bullet
 */
phina.define('EnemyBullet',{
  superClass : 'phina.display.CircleShape',
  direction :0,
  init: function(x, y, direction){
    this.superInit({radius: BULLET_SIZE, fill:'transparent', stroke:'red'});
    this.setPosition(x, y);
    this.direction = direction * Math.DEG_TO_RAD;
  },
  update: function(){
    this.x += Math.cos(this.direction) * 3;
    this.y += Math.sin(this.direction) * 3;
    if(this.x < -5 || SCREEN_WIDTH+5 <this.x || this.y < -5 || SCREEN_HEIGHT+5 < this.y){
      this.remove();
    }
    if(this.hitTestElement(player)){
      // explosion
      Explosion(player.x, player.y).addChildTo(this.parent);
      this.remove();
      player.remove();
    }
  }
});

// explosion
phina.define('Explosion',{
  superClass : 'Sprite',
  init : function(x, y){
    this.superInit('explosion', EXPLOSION_SIZE, EXPLOSION_SIZE);
    this.setPosition(x, y);
    var anim = FrameAnimation('explosion_ss').attachTo(this) ;
    anim.gotoAndPlay('start');
    this.count = 0;
  },
  update: function(){
    this.y += 10;
    this.count += 1;
    if(this.count > FPS/2){
      this.remove();
      player.damage();
    }
  }
});

// explosion
phina.define('Explosion',{
  superClass : 'Sprite',
  init : function(x, y){
    this.superInit('explosion', EXPLOSION_SIZE, EXPLOSION_SIZE);
    this.setPosition(x, y);
    var anim = FrameAnimation('explosion_ss').attachTo(this) ;
    anim.gotoAndPlay('start');
    this.count = 0;
  },
  update: function(){
    this.y += 10;
    this.count += 1;
    if(this.count > FPS){
      this.remove();
    }
  }
});

// player's dafault speed
var DEFAULT_SPEED = 8;

/*
 * main scene
 */
phina.define("MainScene", {
  superClass: 'DisplayScene',
  
  init: function(options) {
    this.superInit(options);
    
    // background
    this.bg = Sprite("bg").addChildTo(this);
    this.bg.origin.set(0, 0);
    
    // player
    player = Sprite('objects', PLAYER_WIDTH, PLAYER_HEIGHT).addChildTo(this);
    player.setPosition(SCREEN_WIDTH/2, SCREEN_HEIGHT*0.8);
    //  player animation
    var normal_anim = FrameAnimation('player_ss').attachTo(player);
    normal_anim.gotoAndPlay('normal');
  },

  // update
  update: function(app) {
    var p = app.pointer;
    var player_speed = DEFAULT_SPEED;
    if (p.getPointing()) {
      var x_diff = player.x - p.x;
      if (Math.abs(x_diff) > player_speed) {
        // move horizontal direction
        if (x_diff < 0) {
          player.x += player_speed;
        } else {
          player.x -= player_speed;
        }
      }
      var y_diff = player.y - p.y;
      if (Math.abs(y_diff) > player_speed) {
        // move vertical direction
        if (y_diff < 0) {
          player.y += player_speed;
        } else {
          player.y -= player_speed;
        }
      }
      if(app.frame % 10 === 0){
        PlayerBullet().addChildTo(this);
      }
    }
    if(app.frame % 60 === 0){
      var enemy = Enemy(Math.randint(SCREEN_WIDTH*0.1, SCREEN_WIDTH*0.9), 0);
      var pattern = Math.randint(0, 2);
      switch (pattern){
        case 0:
          enemy.tweener
          .to({
            y: SCREEN_HEIGHT*0.5,
            rotation: 360,
          },2000, 'easeInOutQuint')
          .wait(1000)
          .to({
            x: SCREEN_WIDTH*1.1,
            y: SCREEN_HEIGHT*0.9,
            rotation: -360,
          },2000, 'easeInOutQuint')
          break;
        case 1:
          enemy.tweener
          .to({
            y: SCREEN_HEIGHT*0.5,
            rotation: 360,
          },2000, 'easeInCirc')
          .wait(1000)
          .to({
            x: SCREEN_WIDTH*0.7,
            y: SCREEN_HEIGHT*1.1,
            rotation: -360,
          },2000, 'easeInCirc')
          break;
        case 2:
          enemy.tweener
          .to({
            y: SCREEN_HEIGHT*0.5,
            rotation: 360,
          },2000, 'easeInOutQubic')
          .wait(1000)
          .to({
            x: -SCREEN_WIDTH*0.1,
            y: SCREEN_HEIGHT*0.9,
            rotation: -360,
          },2000, 'easeInOutQubic')
          break;
      }
      enemy.addChildTo(this);
    }
  }
});

/*
 * main function
 */
phina.main(function() {
  // create application
  var app = GameApp({
    title: 'Panda Shooting',
    startLabel: 'title',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    assets: ASSETS,
  });
  
  app.enableStats();
  
  app.run();
});
