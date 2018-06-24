/*
 * Panda Hockey Online
 */

phina.globalize();

// size information
var SCREEN_WIDTH  = 640;
var SCREEN_HEIGHT = 960;
var PANDA_SIZE    = 200;
var PUCK_SIZE     = 70;

// value information
var PANDA_SPEED   = 6;

var ASSETS = {
  image: {
    'logo': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaHockeyOnline/image/logo.png',
    'stage_bg': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaHockeyOnline/image/stage_background.png',
    'stage_frame': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaHockeyOnline/image/stage_frame.png',
    'panda': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaHockeyOnline/image/panda.png',
    'puck': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaHockeyOnline/image/puck.png',
  },
  spritesheet: {
    "panda_ss":
    {
      "frame": {
        "width": PANDA_SIZE,
        "height": PANDA_SIZE,
        "cols": 3,
        "rows": 2,
      },
      "animations" : {
        "stand_player": {
          "frames": [3, 4, 5],
          "next": "stand_player",
          "frequency": 6,
        },
        "stand_enemy": {
          "frames": [0, 1, 2],
          "next": "stand_enemy",
          "frequency": 6,
        },
      },
    },
  },
};

/*
 * title scene
 */
phina.define("TitleScene", {
  superClass: "DisplayScene",
  init: function() {
    this.superInit();
    this.backgroundColor = 'skyblue';
    this.logo = Sprite('logo').addChildTo(this);
    this.logo.setPosition(SCREEN_WIDTH*0.5, SCREEN_HEIGHT*0.3);
    this.logo.scaleX = 0.3;
    this.logo.scaleY = 0.3;
    Label({
      text: 'tap to start',
      fontSize: 48,
      fill: 'black',
    }).addChildTo(this).setPosition(SCREEN_WIDTH*0.5, SCREEN_HEIGHT*0.7);
  },
  update: function() {
    this.logo.tweener
      .scaleTo(0.31, 500)
      .scaleTo(0.29, 1000)
      .scaleTo(0.30, 500)
      .play();
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
    // floor
    this.floorGroup = DisplayElement().addChildTo(this);
    this.floor = Floor(this.floorGroup);
    // table
    this.tableGroup = DisplayElement().addChildTo(this);
    this.table = HockeyTable(this.tableGroup);
    // panda
    this.pandaGroup = DisplayElement().addChildTo(this);
    this.player = Player();
    this.player.loading(this.table.background, this.pandaGroup);
    this.enemy = Enemy();
    this.enemy.loading(this.table.background, this.pandaGroup);
    // puck
    this.puckGroup = DisplayElement().addChildTo(this);
    this.puck = Puck();
    this.puck.loading(this.table.background, this.puckGroup);
  },
  update: function() {
    this.player.superMethod('protectProtrusion', this.table.background);
    this.enemy.superMethod('protectProtrusion', this.table.background);
  },
});

/*
 * hockey table
 */
phina.define("HockeyTable", {
  superClass: "RectangleShape",
  init: function(group) {
    this.superInit();
    this.background = Sprite('stage_bg').addChildTo(group);
    this.background.setPosition(SCREEN_WIDTH*0.5, SCREEN_HEIGHT*0.5);
    this.frame = Sprite('stage_frame').addChildTo(group);
    this.frame.setPosition(SCREEN_WIDTH*0.5, SCREEN_HEIGHT*0.5);
  },
});

/*
 * floor design
 */
phina.define("Floor", {
  superClass: "RectangleShape",
  init: function(group) {
    this.superInit();
    this.fill = '#add8e6';
    this.setPosition(SCREEN_WIDTH*0.5, SCREEN_HEIGHT*0.5);
    this.width = SCREEN_WIDTH;
    this.height = SCREEN_HEIGHT;
    this.addChildTo(group);
    
    for (var i=0; i<5; i++) {
      for (var j=0; j<8; j++) {
        this.addDiamond(128*i+64, 128*j+64, 90, group);
      }
    }
    
    this.line = RectangleShape().addChildTo(group);
    this.line.fill = '#000080';
    this.line.setPosition(SCREEN_WIDTH*0.5, SCREEN_HEIGHT*0.5);
    this.line.width = SCREEN_WIDTH;
    this.line.height = 10;
  },
  addDiamond: function(x, y, size, group) {
    var rectangle = RectangleShape().addChildTo(group);
    rectangle.fill = 'white';
    rectangle.alpha = 0.5;
    rectangle.setPosition(x, y);
    rectangle.width = size;
    rectangle.height = size;
    rectangle.rotation = 45;
    rectangle.stroke = null;
  },
});

/*
 * panda
 */
phina.define("Panda", {
  superClass: "Sprite",
  init: function() {
    this.superInit('panda', PANDA_SIZE, PANDA_SIZE);
  },
  loading: function(frameIndex, start_x, start_y, group) {
    this.addChildTo(group);
    this.setPosition(start_x, start_y);
    this.frameIndex = frameIndex;
  },
  protectProtrusion: function(table_bg){
    if (this.x < (table_bg.left+this.width/3)) {
      this.x = table_bg.left+this.width/3;
    } else if (this.x > (table_bg.right-this.width/3)) {
      this.x = table_bg.right-this.width/3;
    }
  },
});

/*
 * player
 */
phina.define("Player", {
  superClass: "Panda",
  init: function() {
    this.superInit();
  },
  loading: function(table_bg, group){
    this.superMethod('loading', 3, SCREEN_WIDTH/2, table_bg.bottom, group);
    // animate
    var anim = FrameAnimation('panda_ss').attachTo(this);
    anim.gotoAndPlay('stand_player');
  },
  update: function(app){
    // move
    var p = app.pointer;
    if (p.getPointing()) {
      var x_diff = this.x - p.x;
      if (Math.abs(x_diff) > PANDA_SPEED) {
        if (x_diff < 0) {
          this.x += PANDA_SPEED;
        } else {
          this.x -= PANDA_SPEED;
        }
      }
    }
  },
});

/*
 * enemy
 */
phina.define("Enemy", {
  superClass: "Panda",
  init: function() {
    this.superInit();
  },
  loading: function(table_bg, group) {
    this.superMethod('loading', 0, SCREEN_WIDTH/2, table_bg.top, group);
    // animate
    var anim = FrameAnimation('panda_ss').attachTo(this);
    anim.gotoAndPlay('stand_enemy');
  },
});

/*
 * puck
 */
phina.define("Puck", {
  superClass : 'Sprite',
  init: function() {
    this.superInit('puck');
  },
  loading: function(table_bg, group) {
    this.addChildTo(group);
    var x = table_bg.left + table_bg.width*0.3;
    var y = table_bg.top + table_bg.height*0.5;
    this.setPosition(x, y);
    this.width = PUCK_SIZE;
    this.height = PUCK_SIZE;
    this.frameIndex = 0;
  },
  update: function() {
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
    assets: ASSETS,
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
