/*
 * Panda Shooting
 */

phina.globalize();

// size information
var SCREEN_WIDTH  = 600;
var SCREEN_HEIGHT = 960;
var PLAYER_WIDTH  = 120;
var PLAYER_HEIGHT = 120;

var ASSETS = {
  image: {
    bg: "http://user-images.githubusercontent.com/39637599/40866206-64f140f0-6637-11e8-9988-e6ed4cc6241f.png",
    objects: 'http://user-images.githubusercontent.com/39637599/40733177-030311ca-6470-11e8-9757-5783b9824fe8.png',
  },
  // animation
  spritesheet: {
    "player_ss":
    {
      "frame": {
        "width": PLAYER_WIDTH,
        "height": PLAYER_HEIGHT,
        "cols": 4,
        "rows": 1,
      },
      "animations" : {
        "normal": {
          "frames": [0,1,2,3],
          "next": "normal",
          "frequency": 10,
        },
      }
    },
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
    this.superInit({radius: 8, fill:'transparent', stroke:'white'});
    this.setPosition(player.x, player.y-PLAYER_HEIGHT/2);
  },
  update : function(){
    this.y -= 10;
    if(this.y < -10){
      this.remove();
    }
    var copied = enemies.clone();
    copied.each( function(i) {
      var enemy = i;
      if (this.hitTestElement(enemy)){
        this.remove();
        enemy.remove();
        enemies.erase(enemy);
      }
    },this);
  }
});

/*
 * enemy
 */
phina.define('Enemy',{
  superClass : 'phina.display.TriangleShape',
  init: function(x, y){
    this.superInit({radius: 30, fill: 'red'});
    this.setPosition(x, y);
    enemies.push(this);
  },
  update: function(){
    var direction = Math.atan2(player.y - this.y , player.x - this.x) * Math.RAD_TO_DEG;
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
    var anim = FrameAnimation('player_ss').attachTo(player);
    anim.gotoAndPlay('normal');
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
        default:
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
    startLabel: 'main',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    assets: ASSETS,
  });
  
  app.enableStats();
  
  app.run();
});
