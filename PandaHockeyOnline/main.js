/*
 * Panda Hockey Online
 */

phina.globalize();

/*
 * global variables
 */
// size information
var SCREEN_WIDTH  = 640;
var SCREEN_HEIGHT = 960;
var PANDA_SIZE    = 200;
var PUCK_SIZE     = 70;
var MALLETE_SIZE  = 30;
var EFFECT_SIZE   = 66;

// value information
var PANDA_SPEED   = 6;
var PUCK_SPEED_X  = 8;
var PUCK_SPEED_Y  = 8;

var ASSETS = {
  sound: {
    'bgm': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaHockeyOnline/sound/bgm.mp3',
  },
  image: {
    'logo': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaHockeyOnline/image/logo.png',
    'stage_bg': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaHockeyOnline/image/stage_background.png',
    'stage_frame': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaHockeyOnline/image/stage_frame.png',
    'panda': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaHockeyOnline/image/panda.png',
    'puck': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaHockeyOnline/image/puck.png',
    'goal': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaHockeyOnline/image/goal.png',
    'effect': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaHockeyOnline/image/effect.png',
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
    "effect_ss":
    {
      "frame": {
        "width": EFFECT_SIZE,
        "height": EFFECT_SIZE,
        "cols": 8,
        "rows": 1,
      },
      "animations" : {
        "bounce": {
          "frames": [0, 1, 2, 3, 4, 5, 6, 7],
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
    // bgm
    SoundManager.playMusic('bgm');
    // floor
    this.floorGroup = DisplayElement().addChildTo(this);
    this.floor = Floor(this.floorGroup);
    // table
    this.tableGroup = DisplayElement().addChildTo(this);
    this.table = HockeyTable(this.tableGroup);
    var table_bg = this.table.background;
    // puck
    this.puckGroup = DisplayElement().addChildTo(this);
    this.puck = Puck();
    this.puck.loading(table_bg, this.puckGroup);
    // goal line
    this.goalGroup = DisplayElement().addChildTo(this);
    this.playerGoal = GoalLine(this.goalGroup);
    this.playerGoal.loading(SCREEN_WIDTH*0.5, table_bg.bottom);
    this.enemyGoal = GoalLine(this.goalGroup);
    this.enemyGoal.loading(SCREEN_WIDTH*0.5, table_bg.top+20);
    // panda
    this.pandaGroup = DisplayElement().addChildTo(this);
    this.player = Player();
    this.player.loading(table_bg, this.pandaGroup);
    this.enemy = Enemy();
    this.enemy.loading(table_bg, this.pandaGroup);
    // bounce effect
    this.effectGroup = DisplayElement().addChildTo(this);
    this.bounceEffect = BounceEffect(this.effectGroup);
  },
  update: function() {
    this.protectProtrusion();
    this.bounceAtMalletesWhenTheyHitsPuck();
  },
  protectProtrusion: function() {
    this.player.superMethod('protectProtrusion', this.table.background);
    this.enemy.superMethod('protectProtrusion', this.table.background);
  },
  bounceAtMalletesWhenTheyHitsPuck: function() {
    var puck = this.puck;
    var self = this;
    this.pandaGroup.children.each(function(panda) {
      var c1 = Circle(puck.x, puck.y, PUCK_SIZE/2);
      var c2 = Circle(panda.malletPositionX(), panda.malletPositionY(), MALLETE_SIZE);
      if (Collision.testCircleCircle(c1, c2)) {
        self.bounceAtMalletes(puck, panda.malletPositionX(), panda.malletPositionY());
      }
    });
  },
  bounceAtMalletes: function(puck, malletX, malletY) {
    var x_diff = malletX - puck.x;
    var y_diff = malletY - puck.y;
    if(x_diff > 0) {
      if(y_diff > 0) {
        if(puck.physical.velocity.x > 0) {
          puck.physical.velocity.x *= -1;
          puck.physical.velocity.y *= -1;
          this.bounceEffect.bounce(puck.right, puck.bottom);
        }
      } else {
        if(puck.physical.velocity.y < 0) {
          puck.physical.velocity.y *= -1;
          this.bounceEffect.bounce(puck.right, puck.top);
        }
      }
    } else {
      if(y_diff > 0) {
        if(puck.physical.velocity.y > 0) {
          puck.physical.velocity.y *= -1;
          this.bounceEffect.bounce(puck.left, puck.bottom);
        }
      } else {
        if(puck.physical.velocity.x < 0) {
          puck.physical.velocity.x *= -1;
          this.bounceEffect.bounce(puck.left, puck.top);
        }
      }
    }
  },
});

/*
 * bounce effect
 */
phina.define("BounceEffect", {
  superClass: "Sprite",
  init: function(group) {
    this.superInit('effect');
    this.width = EFFECT_SIZE;
    this.height = EFFECT_SIZE;
    this.addChildTo(group);
    this.alpha = 0;
  },
  bounce: function(x, y) {
    this.setPosition(x, y);
    this.tweener.fadeIn(10)
    .scaleTo(3, 200)
    .play();
    // animate
    var anim = FrameAnimation('effect_ss').attachTo(this);
    anim.gotoAndPlay('bounce');
    this.tweener.fadeOut(100).play();
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
 * goal line
 */
phina.define("GoalLine", {
  superClass: "Sprite",
  init: function(group) {
    this.superInit('goal');
    this.addChildTo(group);
    this.scaleX = 0.7;
  },
  loading: function(x, y) {
    this.setPosition(x, y);
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
  malletPositionX: function() {
    return this.left+this.width*0.54;
  },
  malletPositionY: function() {
    return this.top+this.height*0.2;
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
  malletPositionX: function() {
    return this.left+this.width*0.54;
  },
  malletPositionY: function() {
    return this.bottom-this.height*0.2;
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
    // movement range
    this.range_left = table_bg.left*1.1+this.width*0.8;
    this.range_right = table_bg.right*0.9-this.width*0.1;
    this.range_top = table_bg.top*1.06+this.height*0.8;
    this.range_bottom = table_bg.bottom*0.94-this.height*0.08;
    // default speed
    this.physical.velocity.x = PUCK_SPEED_X;
    this.physical.velocity.y = PUCK_SPEED_Y;
  },
  update: function() {
    // bounce at frame
    switch (this.isAtFrame(this.x, this.y)) {
      case 'left':
      case 'right':
        this.physical.velocity.x *= -1;
        break;
      case 'top':
      case 'bottom':
        this.tweener.fadeOut(200).play();
        break;
      default:
    }
  },
  isAtFrame: function(x, y) {
    if((x < this.range_left) && (this.physical.velocity.x < 0)) {
      return 'left';
    } else if((x > this.range_right) && (this.physical.velocity.x > 0)) {
      return 'right';
    } else if((y < this.range_top) && (this.physical.velocity.y < 0)) {
      return 'top';
    } else if((y > this.range_bottom) && (this.physical.velocity.y > 0)){
      return 'bottom';
    }
    return null;
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
  
  // a dummy function that sound(s) can play with smartphone(s)
  app.domElement.addEventListener('touchend', function dummy() {
    var s = phina.asset.Sound();
    s.loadFromBuffer();
    s.play().stop();
    app.domElement.removeEventListener('touchend', dummy);
  });

  // enable FPS
  app.enableStats();
  
  app.run();
});
