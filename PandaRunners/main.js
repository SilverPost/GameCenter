/*
 * Panda Runners
 */

phina.globalize();

// size information
var SCREEN_WIDTH  = 1280; // 32*40
var SCREEN_HEIGHT = 640;  // 32*20
var BLOCK_SIZE    = 32;
var CHARA_SIZE    = 64; // 32*2

var ASSETS = {
  image: {
    'mountain': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaRunners/image/sprite_mountain.png',
    'character': 'https://rawgit.com/phi-jp/phina.js/develop/assets/images/tomapiko_ss.png',
  },
  text: {
    'mountain': 'https://raw.githubusercontent.com/SilverPost/GameCenter/c5afd673c66311666b8321065d1a45bc58bf3403/PandaRunners/stage/mountain.txt',
  },
};

/*
 * character
 */
phina.define("Character", {
  superClass: 'Sprite',
  init: function() {
    this.superInit('character', CHARA_SIZE, CHARA_SIZE);
  },
  load: function(frameIndex, start_x, start_y, group) {
    this.addChildTo(group);
    this.setPosition(start_x, start_y);
    this.frameIndex = frameIndex;
  },
});

/*
 * player1
 */
phina.define("Player1", {
  superClass: 'Character',
  init: function() {
    this.superInit();
  },
  load: function(group) {
    this.superMethod('load', 0, BLOCK_SIZE*5, BLOCK_SIZE*10, group);
  },
});

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
    
    this.charaGroup = DisplayElement().addChildTo(this);
    Player1().load(this.charaGroup);
    
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
