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
var RESULT_IMAGE_WIDTH = 600;
var RESULT_IMAGE_HEIGHT = 252;
var RESULT_BG_IMAGE_WIDTH = 683;
var RESULT_BG_IMAGE_HEIGHT = 640;

// value information
var TEXT_COLOR_TAPPED = 'lightgray';
var TEXT_COLOR_UNTAPPED = 'black';
var INPUT_RECT_COLOR_TAPPED = '#f8f988';
var INPUT_RECT_COLOR_UNTAPPED = '#dbffe5';
var DIFFICULTY = 'normal'; // 'normal' or 'hard'
var MINUTES_FOR_NORMAL = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

// value updated by anywhere
var DISPLAY_TIME = [];
var CONTINUOUS_CORRECT_ANSWER = 0;

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
    'result': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaMojiAwase/image/answer.png',
    'result_bg': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaClockQuiz/image/result_bg.png',
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
    'result_ss':
    {
      "frame": {
        "width": RESULT_IMAGE_WIDTH,
        "height": RESULT_IMAGE_HEIGHT,
        "cols": 2,
        "rows": 1,
      },
      "animations" : {
      }
    },
    'result_bg_ss':
    {
      "frame": {
        "width": RESULT_BG_IMAGE_WIDTH,
        "height": RESULT_BG_IMAGE_HEIGHT,
        "cols": 1,
        "rows": 3,
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
    // display times
    this.timePanelGroup = DisplayElement().addChildTo(this);
    this.timePanels = TimePanels();
    this.timePanels.loading(this.timePanelGroup);
    // input panels
    this.inputPanelGroup = DisplayElement().addChildTo(this);
    this.inputPanels = InputPanels();
    this.inputPanels.loading(this.inputPanelGroup);
    // load question
    this.load_question();
  },
  update: function() {
    for(var i=0; i<DISPLAY_TIME.length; i++) {
      if(i >= 2) {
        this.timePanels.insert_number(i+1, DISPLAY_TIME[i]);
      } else {
        this.timePanels.insert_number(i, DISPLAY_TIME[i]);
      }
    }
    this.check_answer();
  },
  load_question: function() {
    this.answer_hour = Math.randint(1, 12);
    if(DIFFICULTY == 'normal') {
      this.answer_minute = MINUTES_FOR_NORMAL[Math.randint(0, 11)];
    } else if(DIFFICULTY == 'hard') {
      this.answer_minute = Math.randint(0, 59);
    }
    this.clock.set_needles(this.answer_hour, this.answer_minute);
    if(this.answer_hour < 10) {
      DISPLAY_TIME[0] = 0;
    }
  },
  check_answer: function() {
    if(DISPLAY_TIME.length != 4) {
      return;
    }
    if(this.is_correct_answer(this.answer_hour, this.answer_minute)) {
      this.correct();
    } else {
      this.incorrect();
    }
  },
  is_correct_answer: function(answer_hour, answer_minute) {
    var input_hour = DISPLAY_TIME[0]*10+DISPLAY_TIME[1];
    var input_minute = DISPLAY_TIME[2]*10+DISPLAY_TIME[3];
    if(input_hour !== answer_hour) return false;
    if(input_minute !== answer_minute) return false;
    return true;
  },
  correct: function() {
    CONTINUOUS_CORRECT_ANSWER++;
    SoundManager.play('ok');
    this.exit({
      result: 'correct',
    });
  },
  incorrect: function() {
    CONTINUOUS_CORRECT_ANSWER = 0;
    SoundManager.play('ng');
    this.exit({
      result: 'incorrect',
    });
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
  },
  insert_number: function(index, num) {
    this.panels[index].number.text = num;
  },
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
    this.result_effect(param, this);
  },
  show_result_bg: function() {
    this.result_bg = Sprite('result_bg').addChildTo(this);
    this.result_bg.setPosition(SCREEN_WIDTH*0.7, SCREEN_HEIGHT*0.8);
    this.result_bg.width = RESULT_BG_IMAGE_WIDTH;
    this.result_bg.height = RESULT_BG_IMAGE_HEIGHT;
    this.result_bg.frameIndex = Math.randint(0, 2);
    this.result_bg.scaleX = 1.4;
    this.result_bg.scaleY = 1.4;
    this.result_bg.alpha = 0.5;
  },
  show_label_to_next: function() {
    Label({
      text: 'つぎのもんだい にすすむ',
      fontSize: 52,
      fontWeight:"bold",
      fill: 'black',
      stroke: 'white',
      strokeWidth: 10,
      fontFamily: FONT_FAMILY,
    }).addChildTo(this).setPosition(SCREEN_WIDTH*0.5, SCREEN_HEIGHT*0.7);
  },
  result_sprite: function(param) {
    var result_image = Sprite('result');
    result_image.setPosition(SCREEN_WIDTH*0.5, SCREEN_HEIGHT*0.25);
    result_image.width = RESULT_IMAGE_WIDTH;
    result_image.height = RESULT_IMAGE_HEIGHT;
    result_image.alpha = 0;
    var ss = FrameAnimation('result_ss');
    ss.attachTo(this);
    var image_index = this.is_correct(param.result) ? 0 : 1;
    result_image.frameIndex = image_index;
    return result_image;
  },
  result_sprite_animation: function() {
    var tween1 = Tweener().fadeIn(1000);
    var tween2 = Tweener().scaleTo(1.1, 1000);
    tween1.attachTo(this.resultSprite);
    tween2.attachTo(this.resultSprite);
  },
  result_effect: function(param) {
    if(CONTINUOUS_CORRECT_ANSWER % 10 === 0) {
      this.multiple_of_10(param);
      return;
    } else if(CONTINUOUS_CORRECT_ANSWER % 5 === 0) {
      this.multiple_of_5(param);
      return;
    } else {
      this.noraml_effect(param);
      return;
    }
  },
  multiple_of_5: function(param) {
    // tmp function
    this.noraml_effect(param)
  },
  multiple_of_10: function(param) {
    // tmp function
    this.noraml_effect(param)
  },
  noraml_effect: function(param) {
      this.show_result_bg();
      this.show_label_to_next();
      this.resultSprite = this.result_sprite(param);
      this.resultSprite.addChildTo(this);
      this.result_sprite_animation();
  },
  is_correct: function(result) {
    return (result == 'correct') ? true : false;
  },
  reset_question_info: function() {
    DISPLAY_TIME = [];
  },
  onpointstart: function() {
    this.reset_question_info();
    this.exit();
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
