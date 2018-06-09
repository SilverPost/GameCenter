/*
 * Panda Pinball
 */

phina.globalize();

// size information
var SCREEN_WIDTH    = 600;
var SCREEN_HEIGHT   = 960;

/*
 * main scene
 */
phina.define("MainScene", {
  superClass: 'DisplayScene',
  
  init: function(options) {
    this.superInit(options);
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
