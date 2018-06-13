/*
 * Panda Runners
 */

phina.globalize();

// size information
var SCREEN_WIDTH  = 1280; // 32*40
var SCREEN_HEIGHT = 640;  // 32*20
var BLOCK_SIZE     = 32;

var ASSETS = {
  image: {
    mountain: "https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaRunners/image/sprite_mountain.png",
  },
  text: {
    mountain: "https://raw.githubusercontent.com/SilverPost/GameCenter/c5afd673c66311666b8321065d1a45bc58bf3403/PandaRunners/stage/mountain.txt",
  },
};

/*
 * stage
 */
phina.define("Stage", {
  superClass: 'RectangleShape',
  init: function() {
    this.superInit();
  },
  load: function(stageName, group) {
    var stageText = AssetManager.get('text', stageName).data;
    var blocks = this.blocksWithStageText(stageText);
    this.layout(stageName, blocks, group);
  },
  blocksWithStageText: function(stageText) {
    var blockLine = stageText.split('\n');
    var blocks = [];
    for (var i = 0; i < blockLine.length; i++) {
      blocks.push(blockLine[i].split(''));
    }
    return blocks;
  },
  layout: function(stageName, blocks, group) {
    for (var i = 0; i < blocks.length; i++) {
      for (var j = 0; j < blocks[i].length; j++) {
        if(blocks[i][j] !== ' ') {
          var block = Sprite(stageName, BLOCK_SIZE, BLOCK_SIZE).addChildTo(group);
          var x = j*BLOCK_SIZE+BLOCK_SIZE/2;
          var y = i*BLOCK_SIZE+BLOCK_SIZE/2;
          block.setPosition(x, y);
          block.frameIndex = Number(blocks[i][j])-1;
        }
      }
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
    this.blockGroup = DisplayElement().addChildTo(this);
    Stage().load('mountain', this.blockGroup);
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
