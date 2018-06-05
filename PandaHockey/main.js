/*
 * Panda Hockey
 */

phina.globalize();

// size information
var SCREEN_WIDTH    = 600;
var SCREEN_HEIGHT   = 960;
var MALLETTE_WIDTH  = 128;
var MALLETTE_HEIGHT = 24;
var PUCK_SIZE =32;

// common values
var SPEED = 4;

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
    this.speed = SPEED;
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
    this.player = PlayerMallette().addChildTo(this);

    // enemy
    this.enemy = EnemyMallette().addChildTo(this);
    
    // puck
    this.puck = Puck().addChildTo(this);
  },
  
  update: function(app) {
    // move player
    var p = app.pointer;
    if (p.getPointing()) {
      var x_diff = this.player.x - p.x;
      if (Math.abs(x_diff) > this.player.speed) {
        if (x_diff < 0) {
          this.player.x += this.player.speed;
        } else {
          this.player.x -= this.player.speed;
        }
        if (this.player.x < this.player.width/2) {
          this.player.x = this.player.width/2;
        } else if (this.player.x > SCREEN_WIDTH-this.player.width/2) {
          this.player.x = SCREEN_WIDTH-this.player.width/2;
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
