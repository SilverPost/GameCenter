/*
 * Panda Hockey Online
 */

phina.globalize();

// size information
var SCREEN_WIDTH  = 640;
var SCREEN_HEIGHT = 960;

/*
 * title scene
 */
phina.define("TitleScene", {
  superClass: "DisplayScene",
  init: function() {
    this.superInit();
    this.backgroundColor = 'black';
    Label({
      text: 'tap to start',
      fontSize: 48,
      fill: 'white',
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
  },
  onpointstart: function() {
    this.exit();  
  },
});
 
/*
 * game scene
 */
phina.define("GameScene", {
  superClass: "DisplayScene",
  init: function(options) {
    this.superInit(options);
    this.backgroundColor = 'brown';
    Label({
      text: 'tap to exit',
      fontSize: 48,
      fill: 'white',
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
  },
  onpointstart: function() {
    this.exit();  
  },
});

/*
 * main function
 */
phina.main(function() {
  // create application
  var app = GameApp({
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    startLabel: 'title',
    scenes: [
      {
        label: "title",
        className: "TitleScene",
        nextLabel: "game",
      },
      {
        label: "game",
        className: "GameScene",
        nextLabel: "title",
      },
    ]
  });
  
  // enable FPS
  app.enableStats();
  
  app.run();
});
