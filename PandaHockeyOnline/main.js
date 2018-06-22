/*
 * Panda Hockey Online
 */

phina.globalize();

// size information
var SCREEN_WIDTH  = 640;
var SCREEN_HEIGHT = 960;
var PANDA_SIZE    = 200;

var ASSETS = {
  image: {
    'logo': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaHockeyOnline/image/logo.png',
    'stage_bg': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaHockeyOnline/image/stage_background.png',
    'stage_frame': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaHockeyOnline/image/stage_frame.png',
    'panda': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaHockeyOnline/image/panda.png',
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
    this.floorGroup = DisplayElement().addChildTo(this);
    this.floor = Floor(this.floorGroup);
    this.tableGroup = DisplayElement().addChildTo(this);
    this.table = HockeyTable(this.tableGroup);
    this.pandaGroup = DisplayElement().addChildTo(this);
    this.player = Panda();
    var table_bg = this.table.background;
    this.player.loading(3, SCREEN_WIDTH/2, table_bg.bottom, this.pandaGroup);
    this.enemy = Panda();
    this.enemy.loading(0, SCREEN_WIDTH/2, table_bg.top, this.pandaGroup);
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
    this.line = RectangleShape().addChildTo(group);
    this.line.fill = '#000080';
    this.line.setPosition(SCREEN_WIDTH*0.5, SCREEN_HEIGHT*0.5);
    this.line.width = SCREEN_WIDTH;
    this.line.height = 10;
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
