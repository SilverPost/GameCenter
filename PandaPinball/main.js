/*
 * Panda Pinball
 */

phina.globalize();

// size information
var SCREEN_WIDTH  = 600;
var SCREEN_HEIGHT = 960;
var BALL_SIZE     = 32;
var PIN_SIZE      = 26;

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
    ball.setPosition(SCREEN_WIDTH*0.3, SCREEN_HEIGHT*0.3);
    // to show Box2d debug menu
    ball.alpha = 0.5;
    // create Box2d object
    layer.createBody({
      type: 'dynamic', 
      shape: 'circle',
    }).attachTo(ball);
    
    // pin
    var pin = CircleShape().addChildTo(this);
    pin.fill = 'yellow'
    pin.radius = PIN_SIZE;
    pin.setPosition(SCREEN_WIDTH*0.28, SCREEN_HEIGHT*0.5);
    // to show Box2d debug menu
    pin.alpha = 0.5;
    // create Box2d object
    layer.createBody({
      type: 'static', 
      shape: 'circle',
    }).attachTo(pin);
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
