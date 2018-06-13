/*
 * Panda Runners
 */

phina.globalize();

// size information
var SCREEN_WIDTH  = 1280; // 32*40
var SCREEN_HEIGHT = 640;  // 32*20
var CELL_SIZE     = 32;

var ASSETS = {
  image: {
    mountain: "https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaRunners/image/sprite_mountain.png",
  },
  text: {
    mountain: "https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaRunners/stage/mountain.txt",
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
  load: function(stageName) {
    stageText = AssetManager.get('text', stageName).data;
    blocks = this.blocksWithStageText(stageText);
    this.layoutBlocks(blocks);
  },
  blocksWithStageText: function(stageText) {
    var blockLine = stageText.split('\n');
    var blocks = [];
    for (var i = 0; i < blockLine.length; i++) {
      blocks.push(blockLine[i].split(''));
    }
    return blocks;
  },
  layoutBlocks: function(blocks) {
    var block;
    var x;
    var y;
    for (var i = 0; i < blocks.length; i++) {
      for (var j = 0; j < blocks[i].length; j++) {
        switch (blocks[i][j]) {
          case '1':
            block = Sprite('mountain', CELL_SIZE, CELL_SIZE).addChildTo(this.parent);
            x = j*CELL_SIZE+CELL_SIZE/2;
            y = i*CELL_SIZE+CELL_SIZE/2;
            block.setPosition(x, y);
            break;
          case '2':
            block = Sprite('mountain', CELL_SIZE*2, CELL_SIZE).addChildTo(this.parent);
            x = j*CELL_SIZE+CELL_SIZE/2;
            y = i*CELL_SIZE+CELL_SIZE/2;
            block.setPosition(x, y);
            break;
          default:
            break;
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
    this.stage = Stage();
    this.stage.load('mountain');
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
