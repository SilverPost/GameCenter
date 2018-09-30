/*
 * Panda Clock Quiz
 */

phina.globalize();

// size information
var SCREEN_WIDTH  = 640;
var SCREEN_HEIGHT = 960;
var TITLE_LOGO_WIDTH    = 600;
var TITLE_LOGO_HEIGHT   = 192;
var TITLE_PANDA_WIDTH   = 611;
var TITLE_PANDA_HEIGHT  = 575;
var CLOCK_BG_WIDTH  = SCREEN_WIDTH*0.6;
var CLOCK_BG_HEIGHT = CLOCK_BG_WIDTH/1204*1188;
var NEEDLE_WIDTH  = 63;
var NEEDLE_HEIGHT = 1090;

// font information
var FONT_FAMILY = "Verdana, Roboto, 'Droid Sans', 'Hiragino Kaku Gothic ProN', sans-serif";

var ASSETS = {
  sound: {
    'bgm': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaClockQuiz/sound/bgm.mp3',
    'ok': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaClockQuiz/sound/correct.mp3',
    'ng': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaClockQuiz/sound/boo.mp3',
    'input': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaClockQuiz/sound/input.mp3',
  },
  image: {
    'logo': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaClockQuiz/image/title_logo.png',
    'panda': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaClockQuiz/image/title_panda.png',
    'clock': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaClockQuiz/image/clock.png',
    'needle': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaClockQuiz/image/needle.png',
  },
  spritesheet: {
    'needle_ss':
    {
      "frame": {
        "width": NEEDLE_WIDTH,
        "height": NEEDLE_HEIGHT,
        "cols": 1,
        "rows": 2,
      },
      "animations" : {
      }
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
    
    SoundManager.playMusic('bgm');
    SoundManager.setVolumeMusic(0.5);
    
    this.logo = Sprite('logo').addChildTo(this);
    this.logo.setPosition(SCREEN_WIDTH*0.5, SCREEN_HEIGHT*0.25);
    this.logo.width = TITLE_LOGO_WIDTH;
    this.logo.height = TITLE_LOGO_HEIGHT;
    
    this.panda = Sprite('panda').addChildTo(this);
    this.panda.setPosition(SCREEN_WIDTH*0.7, SCREEN_HEIGHT*0.8);
    this.panda.width = TITLE_PANDA_WIDTH;
    this.panda.height = TITLE_PANDA_HEIGHT;
    this.panda.rotation = 10;
    
    Label({
      text: 'ここをおしてね',
      fontSize: 48,
      fill: 'black',
      fontFamily: FONT_FAMILY,
    }).addChildTo(this).setPosition(SCREEN_WIDTH*0.5, SCREEN_HEIGHT*0.45);
  },
  update: function(app) {
    this.logo.tweener
      .scaleTo(1.04, 1000)
      .scaleTo(0.98, 1000)
      .play();

    if(app.frame % 30 === 0) {
      this.panda.rotation *= -1;
    }
  },
  onpointstart: function() {
    SoundManager.setVolumeMusic(0.3);
    SoundManager.play('ok');
    this.exit();
  },
});

/*
 * game scene
 */
phina.define("GameScene", {
  superClass: "DisplayScene",
  init: function() {
    this.superInit();
    this.backgroundColor = '#f5f5f5';
    this.loading();
  },
  loading: function() {
    this.clock = Clock().addChildTo(this);
    this.clock.loading(this);
    // set hands (for debug)
    this.clock.set_needles(3, 0);
  },
});

/*
 * clock image
 */
phina.define("Clock", {
  superClass: "Sprite",
  init: function() {
    this.superInit('clock');
  },
  loading: function(self) {
    // background image
    this.setPosition(SCREEN_WIDTH*0.5, CLOCK_BG_HEIGHT*0.6);
    this.width = CLOCK_BG_WIDTH;
    this.height = CLOCK_BG_HEIGHT;
    // long hand
    this.long_hand = NeedleImage().addChildTo(self);
    this.long_hand.loading(0, this.x, this.y);
    // short hand
    this.short_hand = NeedleImage().addChildTo(self);
    this.short_hand.loading(1, this.x, this.y);
  },
  set_needles: function(hour, minute) {
    this.set_long_hand(minute);
    this.set_short_hand(hour, minute);
  },
  set_long_hand: function(minute) {
    this.long_hand.rotation = this.long_hand_angle(minute);
  },
  long_hand_angle: function(minute) {
    return 360 / 60 * minute;
  },
  set_short_hand: function(hour, minute) {
    this.short_hand.rotation = this.short_hand_angle(hour, minute);
  },
  short_hand_angle: function(hour, minute) {
    var long_hand_angle = this.long_hand_angle(minute);
    var short_hand_angle = (hour === 12) ? 0 : 360 / 12 * hour;
    short_hand_angle += 360 / 12 / 60 * minute;
    return short_hand_angle;
  },
});

/*
 * needle image
 */
phina.define("NeedleImage", {
  superClass: "Sprite",
  init: function() {
    this.superInit('needle');
  },
  loading: function(index, x, y) {
    this.width = NEEDLE_WIDTH;
    this.height = NEEDLE_HEIGHT;
    this.frameIndex = index;
    this.setPosition(x, y);
    this.scaleX = 0.34;
    this.scaleY = 0.34;
  }
});

/*
 * result scene
 */
phina.define("ResultScene", {
  superClass: "DisplayScene",
  init: function(param) {
    this.superInit(param);
  }
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
        nextLabel: "result",
      },
      {
        label: "result",
        className: "ResultScene",
        nextLabel: "game",
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
  
  app.run();
});
