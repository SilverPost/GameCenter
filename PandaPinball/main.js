/*
 * Panda Pinball
 */

phina.globalize();

// size information
var SCREEN_WIDTH  = 600;
var SCREEN_HEIGHT = 960;
var BALL_SIZE     = 28;
var PIN_SIZE      = 26;

/*
 * wall
 */
phina.define("Box2dWall", {
  superClass: "RectangleShape",
  
  init: function(layer, x, y, width, height) {
    this.superInit();
    this.fill = 'brown';
    this.setPosition(x, y);
    this.width = width;
    this.height = height;
    // create Box2d object
    layer.createBody({
      type: 'static', 
      shape: 'box',
    }).attachTo(this);
  },
});

/*
 * pin
 */
phina.define("Box2dPin", {
  superClass: "CircleShape",
  
  init: function(layer, color, x, y, size) {
    this.superInit();
    this.fill = color;
    this.setPosition(x, y);
    this.radius = size;
    // create Box2d object
    layer.createBody({
      type: 'static', 
      shape: 'circle',
    }).attachTo(this);
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
    
    // create Box2d layer
    this.layer = Box2dLayer({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    }).addChildTo(this);
    
    // ball
    var ball = CircleShape().addChildTo(this);
    ball.radius = BALL_SIZE;
    ball.setPosition(SCREEN_WIDTH*0.3, SCREEN_HEIGHT*0.2);
    // create Box2d object
    this.layer.createBody({
      type: 'dynamic', 
      shape: 'circle',
    }).attachTo(ball);
    
    // create stage
    this.stage();
    
    // pins
    var pin_x = [SCREEN_WIDTH*0.25, SCREEN_WIDTH*0.4, SCREEN_WIDTH*0.4, 
                 SCREEN_WIDTH*0.6, SCREEN_WIDTH*0.75, SCREEN_WIDTH*0.7];
    var pin_y = [SCREEN_HEIGHT*0.4, SCREEN_HEIGHT*0.5, SCREEN_HEIGHT*0.7,
                 SCREEN_HEIGHT*0.55, SCREEN_HEIGHT*0.45, SCREEN_HEIGHT*0.75];
    for (var i = 0; i < pin_x.length; i++) {
      Box2dPin(this.layer, 'yellow', pin_x[i], pin_y[i], PIN_SIZE).addChildTo(this);
    }
  },
  
  stage: function() {
    Box2dWall(this.layer, SCREEN_WIDTH*0.5, SCREEN_HEIGHT*0.025,
                          SCREEN_WIDTH, SCREEN_HEIGHT*0.05).addChildTo(this);
    Box2dWall(this.layer, SCREEN_WIDTH*0.025, SCREEN_HEIGHT*0.525,
                          SCREEN_WIDTH*0.05, SCREEN_HEIGHT*0.95).addChildTo(this);
    Box2dWall(this.layer, SCREEN_WIDTH*0.975, SCREEN_HEIGHT*0.525,
                          SCREEN_WIDTH*0.05, SCREEN_HEIGHT*0.95).addChildTo(this);
  },
});

/*
 * main function
 */
phina.main(function() {
  // create application
  var app = GameApp({
    title: 'Panda Pinball',
    startLabel: 'main',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  });
  
  // enable FPS
  app.enableStats();
  
  app.run();
});
