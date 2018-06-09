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
 * pins
 */
phina.define("Pin", {
  superClass: "CircleShape",
  
  init: function(layer, color, x, y, size) {
    this.superInit();
    this.fill = color;
    this.setPosition(x, y);
    this.radius = size;
    // to show Box2d debug menu
    this.alpha = 0.5;
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
    var layer = Box2dLayer({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    }).addChildTo(this);
    
    // ball
    var ball = CircleShape().addChildTo(this);
    ball.radius = BALL_SIZE;
    ball.setPosition(SCREEN_WIDTH*0.3, PIN_SIZE/2);
    // to show Box2d debug menu
    ball.alpha = 0.5;
    // create Box2d object
    layer.createBody({
      type: 'dynamic', 
      shape: 'circle',
    }).attachTo(ball);
    
    // Pins
    var pin_x = [SCREEN_WIDTH*0.25, SCREEN_WIDTH*0.4, SCREEN_WIDTH*0.4, 
                 SCREEN_WIDTH*0.6, SCREEN_WIDTH*0.75, SCREEN_WIDTH*0.7];
    var pin_y = [SCREEN_HEIGHT*0.4, SCREEN_HEIGHT*0.5, SCREEN_HEIGHT*0.7,
                 SCREEN_HEIGHT*0.55, SCREEN_HEIGHT*0.45, SCREEN_HEIGHT*0.75];
    for (var i = 0; i < pin_x.length; i++) {
      Pin(layer, 'yellow', pin_x[i], pin_y[i], PIN_SIZE).addChildTo(this);
    }
  },
});

/*
 * main function
 */
phina.main(function() {
  // create application
  var app = GameApp({
    title: 'Panda Pinball',
    startLabel: 'title',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  });
  
  // enable FPS
  app.enableStats();
  
  app.run();
});
