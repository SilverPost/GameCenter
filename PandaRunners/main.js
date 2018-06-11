/*
 * Panda Runners
 */

phina.globalize();

// size information
var SCREEN_WIDTH      = 1280; // 32*40
var SCREEN_HEIGHT     = 640;  // 32*20

/*
 * main scene
 */
phina.define("MainScene", {
  superClass: 'DisplayScene',
  
  init: function(options) {
    this.superInit(options);
    
    // background
    this.backgroundColor = 'black';
  },
  
  update: function(app) {
  },
});

/*
 * main function
 */
phina.main(function() {
  // create application
  var app = GameApp({
    title: 'Panda Runners',
    startLabel: 'title',
    backgroundColor: 'black',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  });
  
  // enable FPS
//  app.enableStats();
  
  app.run();
});
