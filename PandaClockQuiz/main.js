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
var CLOCK_BG_WIDTH  = SCREEN_WIDTH*0.66;
var CLOCK_BG_HEIGHT = CLOCK_BG_WIDTH/1300*1283;
var NEEDLE_WIDTH  = 63;
var NEEDLE_HEIGHT = 1090;
var NUMBER_RECT_WIDTH = 100;
var NUMBER_RECT_HEIGHT = 120;
var NUMBER_FONT_SIZE = 64;
var RESULT_IMAGE_WIDTH = 600;
var RESULT_IMAGE_HEIGHT = 252;
var RESULT_BG_IMAGE_WIDTH = 683;
var RESULT_BG_IMAGE_HEIGHT = 683;
var RESULT_ANIMATION_WIDTH = 300;
var RESULT_ANIMATION_HEIGHT = 171;

// value information
var TEXT_COLOR_TAPPED = 'lightgray';
var TEXT_COLOR_UNTAPPED = 'black';
var INPUT_RECT_COLOR_TAPPED = '#f8f988';
var INPUT_RECT_COLOR_UNTAPPED = '#dbffe5';
var DIFFICULTY = 'easy'; // 'easy', normal' or 'hard'
var MINUTES_FOR_EASY = [0, 15, 30, 45];
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
    'animation': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaClockQuiz/image/animation.png',
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
        "cols": 2,
        "rows": 3,
      },
      "animations" : {
      }
    },
    'result_animation_ss':
    {
      "frame": {
        "width": RESULT_ANIMATION_WIDTH,
        "height": RESULT_ANIMATION_HEIGHT,
        "cols": 35,
        "rows": 4,
      },
      "animations" : {
        "hayabusa": {
          "frames": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
          "frequency": 4,
        },
        "komachi": {
          "frames": [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
          "frequency": 4,
        },
        "kagayaki": {
          "frames": [70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104],
          "frequency": 4,
        },
        "nozomi": {
          "frames": [105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139],
          "frequency": 4,
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
    if(DIFFICULTY == 'easy') {
      this.answer_minute = MINUTES_FOR_EASY[Math.randint(0, 3)];
    } else if(DIFFICULTY == 'normal') {
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
    this.setPosition(SCREEN_WIDTH*0.5, CLOCK_BG_HEIGHT*0.54);
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
      switch (i) {
        case 0:
        case 1:
          // hour
          this.panels[i].loading(group, '？', 'white', 'red',
                                 Math.round(SCREEN_WIDTH/6*(i+1)), Math.round(SCREEN_HEIGHT*0.54));
          break;
        case 2:
          this.panels[i].loading(group, 'じ', 'transparent', 'transparent',
                                 Math.round(SCREEN_WIDTH/6*(i+1)), Math.round(SCREEN_HEIGHT*0.54));
          break;
        case 3:
        case 4:
          this.panels[i].loading(group, '？', 'white', 'blue',
                                 Math.round(SCREEN_WIDTH/6*(i+1)), Math.round(SCREEN_HEIGHT*0.54));
          break;
        default:
      }
    }
  },
  insert_number: function(index, num) {
    if(index > 4) {
      return;
    }
    this.panels[index].num.text = num;
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
        this.panels[i][j].loading(group, i*5+j, '#dbffe5', 'black', panel_x, panel_y);
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
  loading: function(group, num, rect_color, stroke_color, x, y) {
    this.superMethod('loading', group, num, rect_color, stroke_color, x, y);
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
    if(DISPLAY_TIME.length > 4) {
      return;
    }
    
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
    
    DISPLAY_TIME.push(self.num.text);
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
  loading: function(group, num, rect_color, stroke_color, x, y) {
    this.rect = this.rectangle(rect_color, stroke_color, x, y);
    this.rect.addChildTo(group);
    this.num = this.number(num, x, y);
    this.num.addChildTo(group);
  },
  rectangle: function(rect_color, stroke_color, x, y) {
    var rect = RectangleShape();
    rect.setPosition(x, y);
    rect.width = NUMBER_RECT_WIDTH;
    rect.height = NUMBER_RECT_HEIGHT;
    rect.fill = rect_color;
    rect.stroke = stroke_color;
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
    this.backgroundColor = '#f5f5f5';
    this.result_effect(param, this);
  },
  show_result_bg: function() {
    this.result_bg = Sprite('result_bg').addChildTo(this);
    this.result_bg.setPosition(SCREEN_WIDTH*0.5, SCREEN_HEIGHT*0.7);
    this.result_bg.width = RESULT_BG_IMAGE_WIDTH;
    this.result_bg.height = RESULT_BG_IMAGE_HEIGHT;
    this.result_bg.frameIndex = Math.randint(0, 5);
    this.result_bg.alpha = 0.5;
  },
  show_label_to_next: function(w, h) {
    Label({
      text: 'つぎのもんだい にすすむ',
      fontSize: 52,
      fontWeight:"bold",
      fill: 'black',
      stroke: 'white',
      strokeWidth: 10,
      fontFamily: FONT_FAMILY,
    }).addChildTo(this).setPosition(w, h);
  },
  result_sprite: function(param, w, h) {
    var result_image = Sprite('result');
    result_image.setPosition(w, h);
    result_image.width = RESULT_IMAGE_WIDTH;
    result_image.height = RESULT_IMAGE_HEIGHT;
    result_image.alpha = 0;
    var ss = FrameAnimation('result_ss');
    ss.attachTo(this);
    var image_index = this.is_correct(param.result) ? 0 : 1;
    result_image.frameIndex = image_index;
    return result_image;
  },
  result_sprite_animation: function(scale) {
    var tween1 = Tweener().fadeIn(1000);
    var tween2 = Tweener().scaleTo(scale, 1000);
    tween1.attachTo(this.resultSprite);
    tween2.attachTo(this.resultSprite);
  },
  result_effect: function(param) {
    if(CONTINUOUS_CORRECT_ANSWER === 0) {
      this.noraml_effect(param);
      return;
    } else if(CONTINUOUS_CORRECT_ANSWER % 12 === 0) {
      this.just_num('nozomi');
      return;
    } else if(CONTINUOUS_CORRECT_ANSWER % 9 === 0) {
      this.just_num('kagayaki');
      return;
    } else if(CONTINUOUS_CORRECT_ANSWER % 6 === 0) {
      this.just_num('komachi');
      return;
    } else if(CONTINUOUS_CORRECT_ANSWER % 3 === 0) {
      this.just_num('hayabusa');
      return;
    } else {
      this.noraml_effect(param);
      return;
    }
  },
  just_num: function(anim_name) {
    this.result_ss_animation(anim_name);
    this.show_label_to_next(SCREEN_WIDTH*0.5, SCREEN_HEIGHT*0.9);
    var str = CONTINUOUS_CORRECT_ANSWER + '\nれんぞく\nせいかい';
    Label({
      text: str,
      fontSize: 128,
      fontWeight:"bold",
      fill: 'red',
      stroke: 'white',
      strokeWidth: 10,
      fontFamily: FONT_FAMILY,
    }).addChildTo(this).setPosition(SCREEN_WIDTH*0.5, SCREEN_HEIGHT*0.24);
  },
  noraml_effect: function(param) {
      this.show_result_bg();
      this.show_label_to_next(SCREEN_WIDTH*0.5, SCREEN_HEIGHT*0.42);
      this.resultSprite = this.result_sprite(param, SCREEN_WIDTH*0.5, SCREEN_HEIGHT*0.2);
      this.resultSprite.addChildTo(this);
      this.result_sprite_animation(1.1);
  },
  result_ss_animation: function(anim_name) {
    var result_anime = Sprite('animation').addChildTo(this);
    result_anime.setPosition(SCREEN_WIDTH*0.5, SCREEN_HEIGHT*0.66);
    result_anime.width = SCREEN_WIDTH*0.5;
    result_anime.height = SCREEN_HEIGHT*0.25;
    result_anime.scaleX = 2;
    result_anime.scaleY = 2;
    var anim = FrameAnimation('result_animation_ss');
    anim.attachTo(result_anime);
    anim.gotoAndPlay(anim_name);
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
