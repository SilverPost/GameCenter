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
var NUMBER_RECT_WIDTH = 100;
var NUMBER_RECT_HEIGHT = 120;
var NUMBER_FONT_SIZE = 64;

// value information
var TEXT_COLOR_TAPPED = 'lightgray';
var TEXT_COLOR_UNTAPPED = 'black';
var INPUT_RECT_COLOR_TAPPED = 'white';
var INPUT_RECT_COLOR_UNTAPPED = '#dbffe5';

// display time
var DISPLAY_TIME = [];

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
    // display times
    this.timePanelGroup = DisplayElement().addChildTo(this);
    this.timePanels = TimePanels();
    this.timePanels.loading(this.timePanelGroup);
    // input panels
    this.inputPanelGroup = DisplayElement().addChildTo(this);
    this.inputPanels = InputPanels();
    this.inputPanels.loading(this.inputPanelGroup);
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
 * time panels
 */
phina.define("TimePanels", {
  superClass: "RectangleShape",
  init: function() {
    this.superInit();
    this.fill = 'transparent';
    this.stroke = 'transparent';
  },
  loading: function(group) {
    var initNum;
    this.panels = [];
    for(var i=0; i<5; i++) {
      this.panels[i] = NumberPanel().addChildTo(group);
      initNum = (i === 2) ? '：' : '?';
      this.panels[i].loading(group, initNum, 'white', 
                             Math.round(SCREEN_WIDTH/6*(i+1)), Math.round(SCREEN_HEIGHT*0.54));
    }
  }
});

/*
 * input panels
 */
phina.define("InputPanels", {
  superClass: "RectangleShape",
  init: function() {
    this.superInit();
    this.fill = 'transparent';
    this.stroke = 'transparent';
  },
  loading: function(group) {
    this.panels = [];
    var panel_x
    var panel_y;
    for(var i=0; i<2; i++) {
      for(var j=0; j<5; j++) {
        this.panels[i] = [];
        this.panels[i][j] = InputPanel().addChildTo(group);
        panel_x = Math.round(SCREEN_WIDTH/6*(j+1));
        panel_y = Math.round((SCREEN_HEIGHT*0.74)+(NUMBER_RECT_HEIGHT*i));
        this.panels[i][j].loading(group, i*5+j, '#dbffe5', panel_x, panel_y);
        this.panels[i][j].tap_action(group);
      }
    }
  }
});

/*
 * panel to input answer numbers
 */
phina.define("InputPanel", {
  superClass: "NumberPanel",
  init: function() {
    this.superInit();
  },
  loading: function(group, num, color, x, y) {
    this.superMethod('loading', group, num, color, x, y);
  },
  tap_action: function(group) {
    this.inputButton = InputButton(this.rect.width, this.rect.height,
                                   this.rect.x, this.rect.y).addChildTo(group);
    var self = this;
    this.inputButton.onpointend = function() {
      self.tapped(self);
    };
  },
  tapped: function(self) {
    SoundManager.play('input');
    
    self.rect.tweener.to({
      scaleX: 1.1,
      scaleY: 1.1,
    },100)
    .set({
      fill: INPUT_RECT_COLOR_TAPPED,
    })
    .wait(100)
    .to({
      scaleX: 1,
      scaleY: 1,
    },100)
    .set({
      fill: INPUT_RECT_COLOR_UNTAPPED,
    })
    .play();
    
    DISPLAY_TIME.push(self.number.text);
  },
});

phina.define("InputButton", {
  superClass: "Button",
  init: function(w, h, x, y) {
    this.superInit({
      width: w,
      height: h,
      text: '',
      strokeWidth: 0,
    });
    this.setPosition(x, y);
    this.fill = 'transparent';
  },
});

/*
 * number panel
 */
phina.define("NumberPanel", {
  superClass: "RectangleShape",
  init: function() {
    this.superInit();
    this.fill = 'transparent';
    this.stroke = 'transparent';
  },
  loading: function(group, num, color, x, y) {
    this.rect = this.rect(color, x, y);
    this.rect.addChildTo(group);
    this.number = this.number(num, x, y);
    this.number.addChildTo(group);
  },
  rect: function(color, x, y) {
    var rect = RectangleShape();
    rect.setPosition(x, y);
    rect.width = NUMBER_RECT_WIDTH;
    rect.height = NUMBER_RECT_HEIGHT;
    rect.fill = color;
    return rect;
  },
  number: function(num, x, y) {
    var numLabel = Label({
      text:num,
      fontSize:NUMBER_FONT_SIZE,
      fontFamily: FONT_FAMILY,
    });
    numLabel.setPosition(x, y);
    return numLabel;
  },
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
