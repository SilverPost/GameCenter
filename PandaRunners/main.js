/*
 * Panda Runners
 */

phina.globalize();

// size information
var SCREEN_WIDTH  = 1280; // 32*40
var SCREEN_HEIGHT = 640;  // 32*20
var BLOCK_SIZE    = 32;
var CHARA_SIZE    = 64; // 32*2

// common values
var JUMP_POWOR  = 10;
var GRAVITY     = 0.5;
var CAHRA_VX    = 2;

var ASSETS = {
  image: {
    'mountain': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaRunners/image/sprite_mountain.png',
    'character': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaRunners/image/sprite_panda.png',
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
    this.physical.force(CAHRA_VX, 0);
    this.isOnFloor = true;
    this.jumpCount = 0;
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
    this.superMethod('load', 0, BLOCK_SIZE, BLOCK_SIZE*13, group);
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
      for (var j = 0; j < blocks[0].length; j++) {
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
    this.player1 = Player1();
    this.player1.load(this.charaGroup);
    
    this.blockGroup = DisplayElement().addChildTo(this);
    Stage().load('mountain', this.blockGroup);
    
    this.onpointend = function() {
      if (this.player1.isOnFloor === true) {
        this.player1.physical.velocity.y = -JUMP_POWOR;
        this.player1.physical.gravity.y = GRAVITY;
        this.player1.isOnFloor = false;
        this.player1.jumpCount = 0;
//        player1.anim.gotoAndPlay('jump');
      }
    };
  },
  update: function(app) {
    if(this.player1.isOnFloor === false) {
      this.player1.jumpCount++;
    }
    this.xCollisionWith2Groups(this.charaGroup, this.blockGroup);
    this.yCollisionWith2Groups(this.charaGroup, this.blockGroup);
  },
  xCollisionWith2Groups: function(attacks, defences) {
    attacks.children.some( function(attack) {
      attack.collider.setSize(1, 1);
      attack.collider.offset(attack.width/2, 0);
      defences.children.some( function(defence) {
        if(attack.collider.hitTest(defence.collider)){
          attack.right = defence.left;
          attack.physical.velocity.x = 0;
        } else {
          attack.physical.velocity.x = CAHRA_VX;
        }
      });
    });
  },
  yCollisionWith2Groups: function(attacks, defences) {
    attacks.children.some( function(attack) {
      attack.collider.setSize(1, 1);
      attack.collider.offset(0, attack.height/2);
      defences.children.some( function(defence) {
        if(attack.collider.hitTest(defence.collider) && (attack.jumpCount > 3)){
          attack.bottom = defence.top;
          attack.physical.velocity.y = 0;
          attack.physical.gravity.y = 0;
          attack.isOnFloor = true;
        }
      });
    });
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
  app.enableStats();
  
  app.run();
});
