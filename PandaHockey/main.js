/*
 * Panda Hockey
 */

phina.globalize();

// size information
var SCREEN_WIDTH    = 600;
var SCREEN_HEIGHT   = 960;
var MALLETTE_WIDTH  = 128;
var MALLETTE_HEIGHT = 24;
var PUCK_SIZE       = 32;
var SCORE_FONTSIZE  = 128;

// common values
var MALLETTE_SPEED  = 10;
var PUCK_SPEED      = 10;
var PLAYER_POINT    = 0;
var ENEMY_POINT     = 0;
var VICTORY_POINT   = 3;
var SHARE_URL = "http://";

var ASSETS = {
  image: {
    'bg': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaHockey/image/background.png',
    'bg_frame': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaHockey/image/bg_frame.png',
    'objects': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaHockey/image/sprite.png',
  },
};

// objects
var playerMallette;
var enemyMallette;
var puck;

/*
 * mallete
 */
phina.define("Mallette", {
  superClass : 'phina.display.RectangleShape',
  init: function(x, y, width, height){
    this.superInit();
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = MALLETTE_SPEED;
  },
  
  protectProtrusion: function(){
    if (this.x < this.width/2) {
      this.x = this.width/2;
    } else if (this.x > SCREEN_WIDTH-this.width/2) {
      this.x = SCREEN_WIDTH-this.width/2;
    }
  },
});

/*
 * player's mallete
 */
phina.define("PlayerMallette", {
  superClass : 'Mallette',
  init: function(){
    this.superInit(SCREEN_WIDTH*0.5, SCREEN_HEIGHT*0.9, MALLETTE_WIDTH, MALLETTE_HEIGHT);
    this.fill = 'blue';
    this.stroke = 'white';
  },
  
  update: function(app){
    // move player
    var p = app.pointer;
    if (p.getPointing()) {
      var x_diff = this.x - p.x;
      if (Math.abs(x_diff) > this.speed) {
        if (x_diff < 0) {
          this.x += this.speed;
        } else {
          this.x -= this.speed;
        }
      }
    }
    this.protectProtrusion();
  },
});

/*
 * enemy's mallete
 */
phina.define("EnemyMallette", {
  superClass : 'Mallette',
  init: function(){
    this.superInit(SCREEN_WIDTH*0.5, SCREEN_HEIGHT*0.1, MALLETTE_WIDTH, MALLETTE_HEIGHT);
    this.fill = 'red';
    this.stroke = 'white';
  },
  
  update: function(app){
    if(app.frame % 2 == 0){
      // move enemy
      var x_diff = this.x - puck.x;
      if (Math.abs(x_diff) > this.speed) {
        if (x_diff < 0) {
          this.x += this.speed;
        } else {
          this.x -= this.speed;
        }
      }
      this.protectProtrusion();
    }
  },
});

/*
 * puck
 */
phina.define("Puck", {
  superClass : 'Sprite',
  init: function(options) {
    this.superInit(options);
    this.setPosition(SCREEN_WIDTH*0.3, SCREEN_HEIGHT*0.5);
    this.vx = PUCK_SPEED;
    this.vy = PUCK_SPEED;
    this.afterBounce = 0;
  },
  
  update: function() {
    this.x += this.vx;
    this.y += this.vy;
    this.rotation++;
    // bounce off player's or enemy's mallete
    if (this.hitTestElement(playerMallette) || this.hitTestElement(enemyMallette)) {
      if (this.afterBounce > 20) {
        this.vy *= -1;
        this.afterBounce = 0;
      }
    }
    this.afterBounce++;
    // bounce off on the left or right of the screen
    if ((this.x < PUCK_SIZE/2) || (this.x > SCREEN_WIDTH-PUCK_SIZE/2)) {
      this.vx *= -1;
    }
    // goal judge
    this.goal();
  },
  
  goal: function() {
    if (this.y == SCREEN_HEIGHT) {
      // goal to the player side
      ENEMY_POINT += 1;
      this.tweener.wait(500);
      this.setPosition(SCREEN_WIDTH*0.3, SCREEN_HEIGHT*0.5);
    } else if (this.y == 0) {
      // goal to the enemy side
      PLAYER_POINT += 1;
      this.tweener.wait(500);
      this.setPosition(SCREEN_WIDTH*0.7, SCREEN_HEIGHT*0.5);
    }
  },
});

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
    playerMallette = PlayerMallette().addChildTo(this);
    // enemy
    enemyMallette = EnemyMallette().addChildTo(this);
    // puck
    puck = Puck('objects').addChildTo(this);
    // score
    this.playerPoint = Label({text: PLAYER_POINT, fontSize: SCORE_FONTSIZE, fill: 'white',})
    .addChildTo(this)
    .setPosition(SCREEN_WIDTH*0.2, SCREEN_HEIGHT*0.9);
    this.enemyPoint = Label({text: PLAYER_POINT, fontSize: SCORE_FONTSIZE, fill: 'white',})
    .addChildTo(this)
    .setPosition(SCREEN_WIDTH*0.2, SCREEN_HEIGHT*0.1);
    
    // background frame
    var bg_frame = Sprite("bg_frame").addChildTo(this);
    bg_frame.setPosition(SCREEN_WIDTH*0.5, SCREEN_HEIGHT*0.5);
  },
  
  update: function(app) {
    // score
    this.playerPoint.text = PLAYER_POINT;
    this.enemyPoint.text = ENEMY_POINT;
    // victory judge
    if (PLAYER_POINT == VICTORY_POINT) {
      this.gameover('You Win')
    } else if (ENEMY_POINT == VICTORY_POINT) {
      this.gameover('You Lose')
    }
  },
  
  gameover: function(message) {
    this.exit({
      score: PLAYER_POINT,
      message: message,
      url: SHARE_URL,
    });
    PLAYER_POINT = 0;
    ENEMY_POINT = 0;
  },
});

/*
 * main function
 */
phina.main(function() {
  // create application
  var app = GameApp({
    title: 'Panda Hockey',
    startLabel: 'title',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    assets: ASSETS,
  });
  
  // enable FPS
  app.enableStats();
  
  app.run();
});
