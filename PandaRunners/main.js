/*
 * Panda Runners
 */

phina.globalize();

// size information
var SCREEN_WIDTH      = 1280; // 32*40
var SCREEN_HEIGHT     = 640;  // 32*20

var ASSETS = {
  image: {
    mountain_img: "https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaRunners/image/sprite_mountain.png",
  },
  text: {
    mountain_txt: "https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaRunners/stage/mountain.txt",
  },
};

/*
 * create stage
 */
phina.define("Stage", {
  superClass: 'RectangleShape',
  
  init: function() {
    this.stageText = AssetManager.get('text', 'mountain_txt').data;
    console.log(this.stageText);
  },
})

/*
 * main scene
 */
phina.define("MainScene", {
  superClass: 'DisplayScene',
  
  init: function(options) {
    this.superInit(options);
    
    Stage();
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
    backgroundColor: 'skyblue',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    assets: ASSETS,
  });
  
  // enable FPS
//  app.enableStats();
  
  app.run();
});
