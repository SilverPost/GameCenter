/*
 * Panda Block
 */

phina.globalize();

// size information
var SCREEN_WIDTH      = 720;
var SCREEN_HEIGHT     = 960;
var PLAYER_BAR_WIDTH  = 128;
var PLAYER_BAR_HEIGHT = 48;
var BALL_SIZE         = 24;
var BLOCK_WIDTH       = 140;
var BLOCK_HEIGHT      = 60;
var CORNER_RADIUS     = 10;

// common values
var PLAYER_BAR_SPEED  = 10;
var BALL_SPEED        = 10;

// common information
var colors = ["silver", "gray", "white", "maroon", "red",
              "purple", "fuchsia", "green", "lime", "olive",
              "yellow", "blue", "teal", "aqua"];

var ASSETS = {
  image: {
    'bg_frame': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaHockey/image/bg_frame.png',
    'objects': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaHockey/image/sprite.png',
  },
};

// objects
var playerBar;
var ball;

/*
 * block
 */
phina.define("Block", {
  superClass : 'RectangleShape',
  init: function (x, y, color) {
    this.superInit();
    this.setPosition(x, y);
    this.width = BLOCK_WIDTH;
    this.height = BLOCK_HEIGHT;
    this.fill = color;
    this.stroke = 'black';
    this.strokeWidth = 3;
    this.cornerRadius = CORNER_RADIUS;
    this.afterBounce = 0;
  },
  
  update: function() {
    if (this.hitTestElement(ball)) {
      // do not baounce immediately after bounce
      if (this.afterBounce > 20) {
        ball.vy *= -1;
        this.afterBounce = 0;
      }
      // fadeout block
      this.fadeout();
      // bounce off ball
     }
    this.afterBounce++;
  },
  
  fadeout: function() {
    this.tweener
    .by({
      alpha: -1,
      y: 50,
    })
    .call(function() {
      this.remove();
    }, this);
  },
});

/*
 * player's bar
 */
phina.define("PlayerBar", {
  superClass : 'RectangleShape',
  init: function() {
    this.superInit();
    this.width = PLAYER_BAR_WIDTH;
    this.height = PLAYER_BAR_HEIGHT;
    this.x = SCREEN_WIDTH*0.5;
    this.y = SCREEN_HEIGHT*0.8;
    this.speed = PLAYER_BAR_SPEED;
    this.cornerRadius = CORNER_RADIUS;
  },
  
  update: function(app) {
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
  
  protectProtrusion: function() {
    if (this.x < this.width/2) {
      this.x = this.width/2;
    } else if (this.x > SCREEN_WIDTH-this.width/2) {
      this.x = SCREEN_WIDTH-this.width/2;
    }
  },
});

/*
 * ball
 */
phina.define("Ball", {
  superClass : 'Sprite',
  init: function(options) {
    this.superInit(options);
    this.setPosition(SCREEN_WIDTH*0.3, SCREEN_HEIGHT*0.5);
    this.vx = BALL_SPEED;
    this.vy = BALL_SPEED;
    this.scaleX = 0.5;
    this.scaleY = 0.5;
    this.afterBounce = 0;
  },
  
  update: function() {
    this.x += this.vx;
    this.y += this.vy;
    this.rotation++;
    // bounce off player's bar
    if (this.hitTestElement(playerBar)) {
      // do not baounce immediately after bounce
      if (this.afterBounce > 20) {
        this.vy *= -1;
        this.afterBounce = 0;
      }
    }
    this.afterBounce++;
    // bounce off on the left or right of the screen
    if ((this.x < BALL_SIZE/2) || (this.x > SCREEN_WIDTH-BALL_SIZE/2)) {
      this.vx *= -1;
    } else if (this.y < BALL_SIZE/2) {
      this.vy *= -1;
    }
    // drop judge
    this.drop();
  },
  
  drop: function() {
    if (this.y == SCREEN_HEIGHT) {
      // drop the bottom side
      this.setPosition(SCREEN_WIDTH*0.3, SCREEN_HEIGHT*0.5);
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
    this.backgroundColor = 'black';
    
    // player
    playerBar = PlayerBar().addChildTo(this);
    // ball
    ball = Ball('objects').addChildTo(this);
    
    // background frame
    var bg_frame = Sprite("bg_frame").addChildTo(this);
    bg_frame.setPosition(SCREEN_WIDTH*0.5, SCREEN_HEIGHT*0.5);
    bg_frame.scaleX = 1.2;
    
    // blocks
    this.blocks();
  },
  
  update: function(app) {
  },
  
  blocks: function() {
    // 1st line
    var block_y = 150;
    Block(150, block_y, colors[Math.randint(0, 13)]).addChildTo(this);
    Block(300, block_y, colors[Math.randint(0, 13)]).addChildTo(this);
    Block(450, block_y, colors[Math.randint(0, 13)]).addChildTo(this);
    Block(600, block_y, colors[Math.randint(0, 13)]).addChildTo(this);
    // 2nd line
    block_y = 230;
    Block(100, block_y, colors[Math.randint(0, 13)]).addChildTo(this);
    Block(250, block_y, colors[Math.randint(0, 13)]).addChildTo(this);
    Block(400, block_y, colors[Math.randint(0, 13)]).addChildTo(this);
    Block(550, block_y, colors[Math.randint(0, 13)]).addChildTo(this);
    // 3rd line
    block_y = 310;
    Block(150, block_y, colors[Math.randint(0, 13)]).addChildTo(this);
    Block(300, block_y, colors[Math.randint(0, 13)]).addChildTo(this);
    Block(450, block_y, colors[Math.randint(0, 13)]).addChildTo(this);
    Block(600, block_y, colors[Math.randint(0, 13)]).addChildTo(this);
  },
});

/*
 * main function
 */
phina.main(function() {
  // create application
  var app = GameApp({
    title: 'Panda Block',
    startLabel: 'title',
    backgroundColor: 'black',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    assets: ASSETS,
  });
  
  // enable FPS
  app.enableStats();
  
  app.run();
});
