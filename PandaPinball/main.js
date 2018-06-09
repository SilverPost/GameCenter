/*
 * Panda Pinball
 */

phina.globalize();

// size information
var SCREEN_WIDTH  = 720;
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
    this.strokeWidth = 0;
    // create Box2d object
    layer.createBody({
      type: 'static', 
      shape: 'box',
    }).attachTo(this);
  },
});

/*
 * tilted wall
 */
phina.define("Box2dTiltedWall", {
  superClass: "RectangleShape",
  
  init: function(layer, x, y, width, height, deg) {
    this.superInit();
    this.fill = 'brown';
    this.setPosition(x, y);
    this.width = width;
    this.height = height;
    this.strokeWidth = 0;
    // create Box2d object
    layer.createBody({
      type: 'static', 
      shape: 'box',
    }).attachTo(this).body.SetAngle(Math.degToRad(deg));
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
    this.strokeWidth = 0;
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
    ball.strokeWidth = 0;
    ball.setPosition(SCREEN_WIDTH*0.3, SCREEN_HEIGHT*0.2);
    // create Box2d object
    this.layer.createBody({
      type: 'dynamic', 
      shape: 'circle',
    }).attachTo(ball);
    
    // create stage
    this.stage();
    
    // pins
    var pin_x = [SCREEN_WIDTH*0.20, SCREEN_WIDTH*0.35, SCREEN_WIDTH*0.25, 
                 SCREEN_WIDTH*0.60, SCREEN_WIDTH*0.55, SCREEN_WIDTH*0.55];
    var pin_y = [SCREEN_HEIGHT*0.30, SCREEN_HEIGHT*0.45, SCREEN_HEIGHT*0.65,
                 SCREEN_HEIGHT*0.55, SCREEN_HEIGHT*0.30, SCREEN_HEIGHT*0.70];
    var pin_c = ['yellow', 'blue', 'orange', 'green', 'white', 'pink'];
    for (var i = 0; i < pin_x.length; i++) {
      Box2dPin(this.layer, pin_c[i], pin_x[i], pin_y[i], PIN_SIZE).addChildTo(this);
    }
  },
  
  stage: function() {
    // top wall
    Box2dWall(this.layer, SCREEN_WIDTH*0.500, SCREEN_HEIGHT*0.025,
                          SCREEN_WIDTH*1.000, SCREEN_HEIGHT*0.050).addChildTo(this);
    // left wall
    Box2dWall(this.layer, SCREEN_WIDTH*0.025, SCREEN_HEIGHT*0.525,
                          SCREEN_WIDTH*0.050, SCREEN_HEIGHT*0.950).addChildTo(this);
    // right wall
    Box2dWall(this.layer, SCREEN_WIDTH*0.975, SCREEN_HEIGHT*0.525,
                          SCREEN_WIDTH*0.050, SCREEN_HEIGHT*0.950).addChildTo(this);
    // bottom walls
    Box2dWall(this.layer, SCREEN_WIDTH*0.175, SCREEN_HEIGHT*0.950,
                          SCREEN_WIDTH*0.250, SCREEN_HEIGHT*0.200).addChildTo(this);
    Box2dWall(this.layer, SCREEN_WIDTH*0.625, SCREEN_HEIGHT*0.950,
                          SCREEN_WIDTH*0.250, SCREEN_HEIGHT*0.200).addChildTo(this);
    Box2dWall(this.layer, SCREEN_WIDTH*0.850, SCREEN_HEIGHT*0.950,
                          SCREEN_WIDTH*0.200, SCREEN_HEIGHT*0.200).addChildTo(this);
    // spring wall
    Box2dWall(this.layer, SCREEN_WIDTH*0.775, SCREEN_HEIGHT*0.650,
                          SCREEN_WIDTH*0.050, SCREEN_HEIGHT*0.700).addChildTo(this);
    // slope
    Box2dTiltedWall(this.layer, SCREEN_WIDTH*0.150, SCREEN_HEIGHT*0.075,
                                SCREEN_WIDTH*0.050, SCREEN_HEIGHT*0.225, 60).addChildTo(this);
    Box2dTiltedWall(this.layer, SCREEN_WIDTH*0.825, SCREEN_HEIGHT*0.075,
                                SCREEN_WIDTH*0.050, SCREEN_HEIGHT*0.225, 120).addChildTo(this);
    Box2dTiltedWall(this.layer, SCREEN_WIDTH*0.150, SCREEN_HEIGHT*0.810,
                                SCREEN_WIDTH*0.050, SCREEN_HEIGHT*0.225, 120).addChildTo(this);
    Box2dTiltedWall(this.layer, SCREEN_WIDTH*0.650, SCREEN_HEIGHT*0.810,
                                SCREEN_WIDTH*0.050, SCREEN_HEIGHT*0.225, 60).addChildTo(this);
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
