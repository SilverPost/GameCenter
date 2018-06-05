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

// common values
var MALLETTE_SPEED  = 8;
var PUCK_SPEED      = 6;

// objects
var playerMallette;
var enemyMallette;

/*
 * mallete
 */
phina.define("Mallette", {
  superClass : 'phina.display.RectangleShape',
  init: function(x, y, width, height){
    this.superInit();
    this.width = width;
    this.height = height;
    this.setPosition(x, y);
    this.speed = MALLETTE_SPEED;
  }
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
  }
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
  }
});

/*
 * puck
 */
phina.define("Puck", {
  superClass : 'phina.display.CircleShape',
  init: function(){
    this.superInit({radius: PUCK_SIZE, fill:'green', stroke:'white'});
    this.setPosition(SCREEN_WIDTH*0.3, SCREEN_HEIGHT*0.5);
    this.vx = PUCK_SPEED;
    this.vy = PUCK_SPEED;
  },
  
  update: function(){
    this.x += this.vx;
    this.y += this.vy;
    // bounce off player's or enemy's mallete
    if (this.hitTestElement(playerMallette) || this.hitTestElement(enemyMallette)) {
      this.vy *= -1;
    }
    // bounce off on the left or right of the screen
    if ((this.x < PUCK_SIZE/2) || (this.x > SCREEN_WIDTH-PUCK_SIZE/2)) {
      this.vx *= -1;
    }
  }
});

/*
 * main scene
 */
phina.define("MainScene", {
  superClass: 'DisplayScene',
  
  init: function(options) {
    this.superInit(options);
    
    // background
    this.backgroundColor = 'skyBlue'; 
    
    // player
    playerMallette = PlayerMallette().addChildTo(this);

    // enemy
    enemyMallette = EnemyMallette().addChildTo(this);
    
    // puck
    this.puck = Puck().addChildTo(this);
  },
  
  update: function(app) {
    // move player
    var p = app.pointer;
    if (p.getPointing()) {
      var x_diff = playerMallette.x - p.x;
      if (Math.abs(x_diff) > playerMallette.speed) {
        if (x_diff < 0) {
          playerMallette.x += playerMallette.speed;
        } else {
          playerMallette.x -= playerMallette.speed;
        }
        if (playerMallette.x < playerMallette.width/2) {
          playerMallette.x = playerMallette.width/2;
        } else if (playerMallette.x > SCREEN_WIDTH-playerMallette.width/2) {
          playerMallette.x = SCREEN_WIDTH-playerMallette.width/2;
        }
      }
    }
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
  });
  
  // enable FPS
  app.enableStats();
  
  app.run();
});
